/**
 * Content-parity check, whitespace-independent.
 *
 * The live Elementor DOM runs adjacent list items together with no separator
 * ("topology hidingbuilt-in firewall"), so a sentence-level diff produces noise.
 * This compares word multisets instead: every word the old page shows must
 * appear at least as many times on the new page.
 *
 *   stage 1  live HTML  ->  extracted blocks   (did extraction lose anything?)
 *   stage 2  blocks     ->  rendered new page  (did rendering lose anything?)
 */
import { parse } from 'node-html-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const NEW = process.env.SITE_URL ?? 'http://localhost:3100';

/**
 * Words the new site deliberately does not carry, with the reason.
 *
 * The bar for adding to this list is a decision someone actually made, not a
 * bug being waved through — everything else must still match the old site word
 * for word.
 */
const ALLOWED = {
  '/': {
    words: ['testimonials', 'explore', 'our', 'clients', 'review'],
    why:
      'The "Explore Our Clients Review" section is hidden while it has no reviews. ' +
      'The old page rendered that heading over an empty widget and there are no ' +
      'quotes anywhere in the WordPress database; none were invented. Fill ' +
      'testimonials.items in content/home.ts and the heading returns.',
  },
};

const PAGES = [
  ['home.html', '/'],
  ['telcobright-sms-gateway.html', '/solutions/sms-gateway'],
  ['telcobright-billing-solutions.html', '/solutions/billing-solutions'],
  ['cdr-analyzer-system.html', '/solutions/cdr-analyzer-system'],
  ['common-interconnection-sms.html', '/solutions/common-interconnection-sms'],
  ['mobile-app.html', '/solutions/mobile-app-development'],
  ['ip-pbx-and-webrtc.html', '/solutions/ip-pbx-and-webrtc'],
  ['voice-broadcasting.html', '/solutions/voice-broadcasting'],
  ['session-border-controllersbc.html', '/solutions/session-border-controller'],
];

/**
 * Text of a node, with a space forced at every tag boundary.
 *
 * Neither side puts whitespace between block elements in the raw markup
 * (Elementor on one side, React's minified output on the other), so `textContent`
 * yields "applicationsHigh Performance" and turns one word into two or two into
 * one. Replacing tags with spaces makes the two sides comparable.
 */
const textOf = (node) =>
  (node ? node.innerHTML : '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#0?39;/g, "'")
    .replace(/&#8217;|&rsquo;/g, '\u2019')
    .replace(/&#8216;|&lsquo;/g, '\u2018')
    .replace(/&#8220;|&ldquo;/g, '\u201c')
    .replace(/&#8221;|&rdquo;/g, '\u201d')
    .replace(/&#8211;|&ndash;/g, '\u2013')
    .replace(/&#8212;|&mdash;/g, '\u2014')
    .replace(/&#\d+;/g, ' ');

const words = (s) =>
  s
    .replace(/\u200b/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .toLowerCase()
    // Split where a lowercase letter butts straight up against an uppercase one
    // in the source, which is how the live DOM joins two run-together widgets.
    .match(/[a-z0-9][a-z0-9'./+-]*/g) || [];

const bag = (arr) => {
  const m = new Map();
  for (const w of arr) m.set(w, (m.get(w) || 0) + 1);
  return m;
};

/** Words the left side has more of than the right side. */
function deficit(left, right) {
  const L = bag(left);
  const R = bag(right);
  const out = [];
  for (const [w, n] of L) {
    const have = R.get(w) || 0;
    if (have < n) out.push([w, n - have]);
  }
  return out.sort((a, b) => b[1] - a[1]);
}

function liveWords(file) {
  const root = parse(fs.readFileSync(path.join(ROOT, '.migration/live', file), 'utf8'));
  root.querySelectorAll('script,style,noscript,svg').forEach((n) => n.remove());
  // Body only. The live header repeats its entire nav four times (desktop,
  // sticky and two mobile variants) and renders icon class names as text
  // ("Hm-facebook"), which would swamp a word diff with non-content noise.
  const main = root.querySelector('[data-elementor-type="wp-page"]');
  return words(textOf(main));
}

function blockWords(file) {
  const { hero, blocks } = JSON.parse(fs.readFileSync(path.join(ROOT, '.migration/blocks', file.replace('.html', '.json')), 'utf8'));
  const parts = [hero.title, hero.subtitle, ...hero.breadcrumb];
  for (const b of blocks) {
    if (b.t === 'h' || b.t === 'p') parts.push(b.html);
    else if (b.t === 'ul') parts.push(...b.items);
    else if (b.t === 'table') for (const r of b.rows) parts.push(...r.cells.map((c) => c.html));
    else if (b.t === 'cta') parts.push(b.label);
  }
  return words(parts.join('\n').replace(/<[^>]+>/g, ' '));
}

async function newWords(route) {
  const html = await (await fetch(NEW + route)).text();
  const root = parse(html);
  root.querySelectorAll('script,style,noscript,svg').forEach((n) => n.remove());
  return words(textOf(root.querySelector('main') || root.querySelector('body')));
}

let bad = 0;

for (const [file, route] of PAGES) {
  const live = liveWords(file);
  const blk = blockWords(file);
  const nw = await newWords(route);

  // Home page content is hand-authored in content/home.ts, not block-generated,
  // so only the live -> rendered comparison is meaningful there.
  const stage1 = route === '/' ? [] : deficit(live, blk);
  const stage2 = deficit(live, nw);

  const allowed = ALLOWED[route];
  const allowedWords = new Set(allowed?.words ?? []);
  const unexplained = stage2.filter(([w]) => !allowedWords.has(w));

  const ok = unexplained.length === 0;
  if (!ok) bad++;
  console.log(
    `${ok ? 'OK  ' : 'LOSS'} ${route.padEnd(42)} live ${live.length} words | extracted ${blk.length} | rendered ${nw.length}`
  );
  if (stage1.length) console.log('       extraction dropped:', JSON.stringify(stage1.slice(0, 15)));
  if (unexplained.length) console.log('       rendering missing :', JSON.stringify(unexplained.slice(0, 25)));
  if (allowed && stage2.length) console.log('       by design         :', allowed.why);
}

console.log(bad === 0 ? '\nAll pages: no word lost.' : `\n${bad} page(s) with missing words.`);
