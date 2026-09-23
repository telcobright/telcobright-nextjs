#!/usr/bin/env node
/**
 * Step 1 of the migration: save the rendered HTML of every real page on the
 * legacy WordPress site into .migration/live.
 *
 *   npm run migrate:fetch     # this
 *   npm run migrate:extract
 *   npm run migrate:generate
 *   npm run migrate:verify
 *
 * The page list is the 12 pages the WordPress REST API reports, minus the two
 * empty ones. Nothing here touches the injected spam posts — see MIGRATION.md.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, '.migration/live');
const ORIGIN = process.env.LEGACY_ORIGIN ?? 'https://telcobright.com';

/** local filename -> legacy path */
const PAGES = {
  'home.html': '/',
  'telcobright-sms-gateway.html': '/telcobright-sms-gateway/',
  'telcobright-billing-solutions.html': '/telcobright-billing-solutions/',
  'cdr-analyzer-system.html': '/cdr-analyzer-system/',
  'common-interconnection-sms.html': '/common-interconnection-sms/',
  'mobile-app.html': '/mobile-app-for-chat-instant-messaging-and-webrtc-based-audio-and-video-features/',
  'ip-pbx-and-webrtc.html': '/ip-pbx-and-webrtc/',
  'voice-broadcasting.html': '/voice-broadcasting/',
  'session-border-controllersbc.html': '/session-border-controllersbc/',
};

await mkdir(OUT, { recursive: true });

let failed = 0;

for (const [file, route] of Object.entries(PAGES)) {
  const res = await fetch(ORIGIN + route, {
    headers: { 'user-agent': 'telcobright-site-migration' },
  }).catch(() => null);

  if (!res?.ok) {
    failed += 1;
    console.warn(`  ✗ ${route} — ${res ? res.status : 'no response'}`);
    continue;
  }

  const html = await res.text();
  await writeFile(path.join(OUT, file), html);
  console.log(`  ✓ ${route} — ${(html.length / 1024).toFixed(0)} KB -> ${file}`);
}

console.log(`\nSaved to .migration/live. ${failed} failed.`);
if (failed) process.exitCode = 1;
