import { cookies } from 'next/headers';
import {
  createHmac,
  randomBytes,
  randomUUID,
  scrypt as scryptCb,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';
import { readDoc, updateDoc } from '@/server/store';
import type { User } from '@/server/types';

/**
 * Admin authentication.
 *
 * Built on `node:crypto` rather than a dependency, because what is needed here
 * is small and well-defined: scrypt for the password, an HMAC-signed cookie
 * for the session. No password is ever stored or logged — only `salt:hash`.
 *
 * The session cookie carries `userId.expiry.signature`. It is signed, not
 * encrypted: nothing secret is in it, and a tampered value fails the HMAC.
 * Cookies are httpOnly and sameSite=lax, so script on the page cannot read one
 * and another site cannot send one on a state-changing request.
 */

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

const COOKIE = 'tb_session';
const SESSION_DAYS = 7;

/* ------------------------------------------------------------ password --- */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const derived = await scrypt(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  // Lengths must match before timingSafeEqual, which throws otherwise.
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

/* ------------------------------------------------------------- secret --- */

/**
 * The signing key. `AUTH_SECRET` in the environment for anything real; failing
 * that, a key generated once and kept in `data/`, so a local checkout works
 * with no setup. A missing secret must never silently become a constant.
 */
async function secret(): Promise<string> {
  const fromEnv = process.env.AUTH_SECRET;
  if (fromEnv && fromEnv.length >= 16) return fromEnv;

  const generated = await updateDoc<{ value: string } | null>('auth-secret', null, (current) =>
    current ?? { value: randomBytes(32).toString('hex') }
  );
  return generated!.value;
}

/* ------------------------------------------------------------- users --- */

export async function listUsers(): Promise<User[]> {
  return readDoc<User[]>('users', []);
}

export async function hasAnyUser(): Promise<boolean> {
  return (await listUsers()).length > 0;
}

export async function createUser(email: string, name: string, password: string): Promise<User> {
  const user: User = {
    id: randomUUID(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    password: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  await updateDoc<User[]>('users', [], (users) => {
    if (users.some((u) => u.email === user.email)) {
      throw new Error('That email address already has an account.');
    }
    return [...users, user];
  });

  return user;
}

export async function changePassword(userId: string, password: string): Promise<void> {
  const hashed = await hashPassword(password);
  await updateDoc<User[]>('users', [], (users) =>
    users.map((u) => (u.id === userId ? { ...u, password: hashed } : u))
  );
}

export async function deleteUser(userId: string): Promise<void> {
  await updateDoc<User[]>('users', [], (users) => {
    const remaining = users.filter((u) => u.id !== userId);
    // Locking everyone out is not a state the admin should be able to reach.
    if (remaining.length === 0) throw new Error('This is the only account — create another one first.');
    return remaining;
  });
}

/* ----------------------------------------------------------- sessions --- */

async function sign(value: string): Promise<string> {
  return createHmac('sha256', await secret()).update(value).digest('hex');
}

export async function startSession(userId: string): Promise<void> {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${userId}.${expires}`;
  const token = `${payload}.${await sign(payload)}`;

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expires),
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** The signed-in user, or null. Verifies the signature and the expiry. */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  const [userId, expiry, signature] = token.split('.');
  if (!userId || !expiry || !signature) return null;

  const expected = await sign(`${userId}.${expiry}`);
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  if (Number(expiry) < Date.now()) return null;

  return (await listUsers()).find((u) => u.id === userId) ?? null;
}

/**
 * Guard for every admin page and every action that changes something.
 *
 * Server Actions are reachable by a direct POST, not only through the admin
 * UI, so the check belongs inside each one — the proxy redirect is a
 * convenience for humans, not the security boundary.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not signed in.');
  return user;
}
