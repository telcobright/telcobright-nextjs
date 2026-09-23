/**
 * Turns ./blocks/<page>.json (extracted verbatim from the live WordPress render)
 * into content/solutions/<slug>.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCKS = path.join(PROJ, '.migration/blocks');
const OUT = path.join(PROJ, 'content/solutions');

const PAGES = [
  {
    file: 'telcobright-sms-gateway.json',
    slug: 'sms-gateway',
    title: 'Telcobright SMS Gateway',
    subtitle: 'Multi-Protocol Bulk SMS Platform and SMSC',
    summary:
      'Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure.',
    legacyPath: '/telcobright-sms-gateway/',
    featured: true,
  },
  {
    file: 'telcobright-billing-solutions.json',
    slug: 'billing-solutions',
    title: 'Telcobright Billing Solutions',
    summary:
      'Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure.',
    legacyPath: '/telcobright-billing-solutions/',
    featured: true,
  },
  {
    file: 'cdr-analyzer-system.json',
    slug: 'cdr-analyzer-system',
    title: 'CDR Analyzer System',
    summary:
      'CAS (CDR Analyzer System) serves as a crucial platform for the Bangladesh Telecommunication Regulatory Commission (BTRC) to analyze Call Detail Records (CDRs) and track billed duration from all ICXs (Interconnection Exchanges).',
    legacyPath: '/cdr-analyzer-system/',
    featured: true,
  },
  {
    file: 'common-interconnection-sms.json',
    slug: 'common-interconnection-sms',
    title: 'Common Interconnection SMS',
    summary:
      'CISP (Common Interconnection SMS Platform) project by the Association of ICX Operators Bangladesh (AIOB) is a significant initiative in the telecommunications sector in Bangladesh.',
    legacyPath: '/common-interconnection-sms/',
    featured: true,
  },
  {
    file: 'mobile-app.json',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    subtitle: 'Mobile App for Chat/Instant Messaging and WebRTC-based Audio and Video Features',
    summary: 'Mobile App for Chat/Instant Messaging and WebRTC-based Audio and Video Features',
    legacyPath: '/mobile-app-for-chat-instant-messaging-and-webrtc-based-audio-and-video-features/',
    featured: true,
  },
  {
    file: 'ip-pbx-and-webrtc.json',
    slug: 'ip-pbx-and-webrtc',
    title: 'IP PBX and WebRTC',
    summary:
      'The Multi-Tenant Hosted IP PBX service is designed to provide a scalable, reliable, and feature-rich IP-based communication solution for multiple tenants.',
    legacyPath: '/ip-pbx-and-webrtc/',
    featured: true,
  },
  {
    file: 'voice-broadcasting.json',
    slug: 'voice-broadcasting',
    title: 'Voice Broadcasting',
    subtitle: 'Voice Broadcasting Specifications',
    summary:
      'Our Voice Broadcasting Solution offers efficient call and email management with predictive dialing, compliance, remote access, call recording, and customizable IVRs. It supports auto-dialing, multi-server use, and integrates with databases and web pages.',
    legacyPath: '/voice-broadcasting/',
    featured: true,
  },
  {
    file: 'session-border-controllersbc.json',
    slug: 'session-border-controller',
    title: 'Session Border Controller(SBC)',
    subtitle: 'Session Border Controller(SBC)',
    summary:
      'Our Session Border Controller (SBC) offers flexible deployment models with real-time analytics and advanced security features, all within a single software solution.',
    legacyPath: '/session-border-controllersbc/',
    featured: true,
  },
];

/**
 * The live pages set every body heading as <h2>/<h3>/<h4> fairly arbitrarily
 * (Elementor defaults). Keep the level the page actually used, but never let a
 * body heading outrank the page <h1>.
 */
const normalise = (blocks) => blocks.map((b) => (b.t === 'h' ? { ...b, level: Math.max(2, b.level) } : b));

/**
 * One figure on the SMS Gateway page (Image_024.jpg) was already broken on
 * telcobright.com — it pointed at a relative path left over from the original
 * Word export and 404s there too. The file exists nowhere we can reach, so
 * rather than ship a broken image the slot renders as a labelled placeholder
 * that keeps its position in the document. Drop the file into
 * public/media/2023/03/ and it becomes a normal figure again.
 */
const missingFigure = (src) =>
  `<span class="missing-figure" role="img" aria-label="Figure not available: ${src.split('/').pop()}">` +
  `Figure unavailable &mdash; ${src.split('/').pop()}</span>`;

function markMissingImages(blocks) {
  const exists = (src) => fs.existsSync(path.join(PROJ, 'public', src));
  const fixHtml = (html) =>
    html.replace(/<img src="([^"]+)" alt="[^"]*" \/>/g, (m, src) => (exists(src) ? m : missingFigure(src)));

  return blocks
    .map((b) => {
      if (b.t === 'img') return exists(b.src) ? b : { t: 'p', html: missingFigure(b.src) };
      if (b.t === 'p') return { ...b, html: fixHtml(b.html) };
      if (b.t === 'ul') return { ...b, items: b.items.map(fixHtml) };
      if (b.t === 'table')
        return { ...b, rows: b.rows.map((r) => ({ ...r, cells: r.cells.map((c) => ({ ...c, html: fixHtml(c.html) })) })) };
      return b;
    });
}

const q = (s) => JSON.stringify(s);

function emit(page, blocks) {
  const lines = [];
  lines.push(`import type { SolutionPage } from '../types';`);
  lines.push('');
  lines.push('/**');
  lines.push(` * ${page.title}`);
  lines.push(` *`);
  lines.push(` * Migrated verbatim from https://telcobright.com${page.legacyPath}`);
  lines.push(` * Blocks appear in the same order, with the same words, as the old page.`);
  lines.push(' */');
  lines.push(`export const page: SolutionPage = {`);
  lines.push(`  slug: ${q(page.slug)},`);
  lines.push(`  title: ${q(page.title)},`);
  if (page.subtitle) lines.push(`  subtitle: ${q(page.subtitle)},`);
  lines.push(`  summary: ${q(page.summary)},`);
  lines.push(`  legacyPath: ${q(page.legacyPath)},`);
  if (page.featured) lines.push(`  featured: true,`);
  lines.push(`  blocks: [`);
  for (const b of blocks) {
    if (b.t === 'h') {
      lines.push(`    { t: 'h', level: ${b.level}, id: ${q(b.id)}, text: ${q(b.text)}, html: ${q(b.html)} },`);
    } else if (b.t === 'p') {
      lines.push(`    { t: 'p', html: ${q(b.html)} },`);
    } else if (b.t === 'ul') {
      lines.push(`    {`);
      lines.push(`      t: 'ul',`);
      if (b.ordered) lines.push(`      ordered: true,`);
      lines.push(`      items: [`);
      for (const i of b.items) lines.push(`        ${q(i)},`);
      lines.push(`      ],`);
      lines.push(`    },`);
    } else if (b.t === 'img') {
      lines.push(`    { t: 'img', src: ${q(b.src)}, alt: ${q(b.alt)}${b.row ? `, row: ${q(b.row)}` : ''} },`);
    } else if (b.t === 'cta') {
      lines.push(`    { t: 'cta', label: ${q(b.label)}, href: ${q(b.href)} },`);
    } else if (b.t === 'table') {
      lines.push(`    {`);
      lines.push(`      t: 'table',`);
      lines.push(`      rows: [`);
      for (const r of b.rows) {
        lines.push(`        {`);
        lines.push(`          head: ${r.head},`);
        lines.push(`          cells: [`);
        for (const c of r.cells) {
          const span = (c.rowSpan ? `, rowSpan: ${c.rowSpan}` : '') + (c.colSpan ? `, colSpan: ${c.colSpan}` : '');
          lines.push(`            { html: ${q(c.html)}${span} },`);
        }
        lines.push(`          ],`);
        lines.push(`        },`);
      }
      lines.push(`      ],`);
      lines.push(`    },`);
    }
  }
  lines.push(`  ],`);
  lines.push(`};`);
  lines.push('');
  return lines.join('\n');
}

fs.mkdirSync(OUT, { recursive: true });
const index = [];

for (const page of PAGES) {
  const { hero, blocks: raw } = JSON.parse(fs.readFileSync(path.join(BLOCKS, page.file), 'utf8'));
  if (hero.title && hero.title.replace(/​/g, '').trim() !== page.title) {
    console.warn('  ! title drift:', JSON.stringify(hero.title), 'vs', JSON.stringify(page.title));
  }
  if (hero.subtitle && !page.subtitle) page.subtitle = hero.subtitle;
  const blocks = markMissingImages(normalise(raw));
  fs.writeFileSync(path.join(OUT, page.slug + '.ts'), emit(page, blocks));
  const counts = blocks.reduce((a, b) => ((a[b.t] = (a[b.t] || 0) + 1), a), {});
  console.log(page.slug.padEnd(30), String(blocks.length).padStart(4), 'blocks', JSON.stringify(counts));
  index.push(page.slug);
}

// content/solutions/index.ts
const idx = [
  `import type { SolutionPage } from '../types';`,
  ...index.map((s) => `import { page as ${s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())} } from './${s}';`),
  '',
  '/**',
  ' * Order matches the "Product and solutions we provide" card list on the home',
  ' * page of telcobright.com.',
  ' */',
  'export const solutions: SolutionPage[] = [',
  ...index.map((s) => `  ${s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())},`),
  '];',
  '',
  'export const featuredSolutions = solutions.filter((s) => s.featured);',
  '',
  'export function getSolution(slug: string): SolutionPage | undefined {',
  '  return solutions.find((s) => s.slug === slug);',
  '}',
  '',
].join('\n');
fs.writeFileSync(path.join(OUT, 'index.ts'), idx);
console.log('\nwrote', index.length + 1, 'files to content/solutions');
