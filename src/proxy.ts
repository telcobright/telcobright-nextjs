import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Sends signed-out visitors from /admin to the sign-in page.
 *
 * This is a convenience for humans, not the security boundary: it only checks
 * that a session cookie is present, because verifying the signature needs the
 * secret and the user list. Every admin page and every action that changes
 * something calls `requireUser()` itself — a Server Action is reachable by a
 * direct POST, so that is the check that has to hold.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin/setup';
  if (isPublicAdminRoute) return NextResponse.next();

  if (!request.cookies.has('tb_session')) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
