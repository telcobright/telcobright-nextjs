#!/usr/bin/env node
/**
 * Step 2 of the migration: turn the saved WordPress HTML in .migration/live
 * into the block lists in .migration/blocks.
 *
 *   npm run migrate:fetch     # step 1 — save the live HTML
 *   npm run migrate:extract   # this
 *   npm run migrate:generate  # step 3 — write content/solutions/*.ts
 *   npm run migrate:verify    # step 4 — prove no word was lost
 */
import { parse } from 'node-html-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dir = path.join(ROOT, '.migration/live');
const out = path.join(ROOT, '.migration/blocks');
fs.mkdirSync(out, { recursive: true });

// Legacy WordPress path -> new route
const ROUTES = {
  '/': '/',
  '/telcobright-sms-gateway/': '/solutions/sms-gateway',
  '/telcobright-billing-solutions/': '/solutions/billing-solutions',
  '/cdr-analyzer-system/': '/solutions/cdr-analyzer-system',
  '/common-interconnection-sms/': '/solutions/common-interconnection-sms',
  '/mobile-app-for-chat-instant-messaging-and-webrtc-based-audio-and-video-features/':
    '/solutions/mobile-app-development',
  '/ip-pbx-and-webrtc/': '/solutions/ip-pbx-and-webrtc',
  '/voice-broadcasting/': '/solutions/voice-broadcasting',
  '/session-border-controllersbc/': '/solutions/session-border-controller',
  '/sms/': '/solutions/sms-gateway',
};

const INLINE_OK = new Set(['a', 'strong', 'b', 'em', 'i', 'u', 's', 'br', 'sup', 'sub', 'code', 'small', 'mark']);
const UNWRAP = new Set(['span', 'font', 'div', 'p', 'label', 'section', 'figure', 'figcaption']);

/**
 * Tags that start a new block. Anything else is inline, so an element whose
 * children are all inline can be emitted as a single paragraph rather than
 * being descended into — which is what keeps mixed content
 * ("text <b>bold</b> more text") in one piece.
 */
const BLOCK = new Set([
  'address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main',
  'nav', 'ol', 'p', 'pre', 'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
]);

function rewriteHref(href) {
  if (!href) return '';
  let h = href.trim();
  h = h.replace(/^https?:\/\/(www\.)?telcobright\.com/i, '');
  if (/^\/wp-content\/uploads\//.test(h)) return h.replace('/wp-content/uploads/', '/media/');
  if (ROUTES[h]) return ROUTES[h];
  if (ROUTES[h + '/']) return ROUTES[h + '/'];
  return h;
}

const stripSize = (s) => s.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1');

// The Word export left junk alt text behind ("ooxWord://word/media/image20.jpeg",
// "image"). Those describe nothing, so they become empty alt on decorative figures.
const cleanAlt = (a) => {
  const t = (a || '').trim();
  if (!t || /^ooxWord:/i.test(t) || /^image\d*$/i.test(t)) return '';
  return t.replace(/"/g, '&quot;');
};

function mediaPath(src) {
  let rel = (src || '').replace(/^https?:\/\/[^/]+\/wp-content\/uploads\//, '');
  if (/^https?:\/\//.test(rel)) return rel;
  // A few images on the SMS Gateway page used a relative path left over from the
  // original Word export ("assets/img/sms_files/Image_024.jpg"). They map to the
  // same 2023/03 upload folder as the rest of that page's figures.
  rel = rel.replace(/^assets\/img\/sms_files\//, '2023/03/');
  return '/media/' + stripSize(rel);
}

// Serialize a node's children to sanitized inline HTML
function inlineHTML(node) {
  let s = '';
  for (const c of node.childNodes) {
    if (c.nodeType === 3) {
      s += c.rawText;
      continue;
    }
    if (c.nodeType !== 1) continue;
    const tag = (c.rawTagName || '').toLowerCase();
    if (tag === 'br') {
      s += '<br />';
      continue;
    }
    if (tag === 'img') {
      const src = c.getAttribute('src');
      if (src) s += '<img src="' + mediaPath(src) + '" alt="' + cleanAlt(c.getAttribute('alt')) + '" />';
      continue;
    }
    if (tag === 'a') {
      const href = rewriteHref(c.getAttribute('href'));
      const inner = inlineHTML(c).trim();
      if (!inner) continue;
      const ext = /^https?:\/\//i.test(href);
      s += href
        ? '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + inner + '</a>'
        : inner;
      continue;
    }
    if (INLINE_OK.has(tag)) {
      const inner = inlineHTML(c);
      if (inner.trim()) s += '<' + tag + '>' + inner + '</' + tag + '>';
      continue;
    }
    s += inlineHTML(c);
  }
  return s;
}

/**
 * Typographic entities become the real character so the content files read as
 * prose. `&amp;`, `&lt;`, `&gt;` and `&quot;` are left encoded — they are
 * structurally significant in the HTML these strings carry.
 */
const TYPO = {
  '&#8211;': '–',
  '&ndash;': '–',
  '&#8212;': '—',
  '&mdash;': '—',
  '&#8216;': '‘',
  '&lsquo;': '‘',
  '&#8217;': '’',
  '&rsquo;': '’',
  '&#8220;': '“',
  '&ldquo;': '“',
  '&#8221;': '”',
  '&rdquo;': '”',
  '&#8230;': '…',
  '&hellip;': '…',
};

const clean = (h) =>
  h
    .replace(/[ \t]*\n[ \t]*/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;|&ndash;|&#8212;|&mdash;|&#8216;|&lsquo;|&#8217;|&rsquo;|&#8220;|&ldquo;|&#8221;|&rdquo;|&#8230;|&hellip;/g, (m) => TYPO[m])
    .replace(/\s{2,}/g, ' ')
    .trim();

const plain = (h) =>
  h
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

// Block-level HTML for a table cell: keeps paragraphs and lists
function cellHTML(td) {
  const parts = [];
  /** True when this node sits inside a swiper/carousel widget. */
  const inCarousel = (el) => {
    for (let p = el; p; p = p.parentNode) {
      const cls = typeof p.getAttribute === 'function' ? p.getAttribute('class') || '' : '';
      if (/swiper-slide|elementor-image-carousel|jkit-.*carousel/i.test(cls)) return true;
    }
    return false;
  };

  const walk = (el) => {
    for (const c of el.childNodes) {
      if (c.nodeType === 3) {
        const t = clean(c.rawText);
        if (t) parts.push('<p>' + t + '</p>');
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = (c.rawTagName || '').toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const x = clean(inlineHTML(c));
        if (x) parts.push('<p><strong>' + x + '</strong></p>');
        continue;
      }
      if (tag === 'p') {
        const x = clean(inlineHTML(c));
        if (x) parts.push('<p>' + x + '</p>');
        continue;
      }
      if (tag === 'ul' || tag === 'ol') {
        const its = c
          .querySelectorAll('li')
          .map((li) => clean(inlineHTML(li)))
          .filter(Boolean)
          .map((x) => '<li>' + x + '</li>');
        if (its.length) parts.push('<' + tag + '>' + its.join('') + '</' + tag + '>');
        continue;
      }
      if (tag === 'br') continue;
      if (tag === 'img') {
        const src = c.getAttribute('src');
        if (src) parts.push('<p><img src="' + mediaPath(src) + '" alt="' + cleanAlt(c.getAttribute('alt')) + '" /></p>');
        continue;
      }
      const hasBlockChild = c.childNodes.some(
        (n) => n.nodeType === 1 && !INLINE_OK.has((n.rawTagName || '').toLowerCase())
      );
      if (hasBlockChild) {
        walk(c);
        continue;
      }
      const x = clean(inlineHTML(c));
      if (x) parts.push('<p>' + x + '</p>');
    }
  };
  walk(td);
  if (!parts.length) {
    const x = clean(inlineHTML(td));
    return x ? '<p>' + x + '</p>' : '';
  }
  // collapse duplicate adjacent parts
  return parts.filter((p, i) => p !== parts[i - 1]).join('');
}

const slugify = (s) =>
  plain(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html'))) {
  const root = parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  root
    .querySelectorAll('script,style,noscript,svg,header,footer,nav,.elementor-location-header,.elementor-location-footer')
    .forEach((n) => n.remove());
  // Elementor's table-of-contents widget — the "Quick Navigation" sidebar. It
  // is chrome, not page copy, and the rebuilt page renders its own (working)
  // version of it, so its heading must not end up in the body a second time.
  root.querySelectorAll('[data-widget_type^="table-of-contents"]').forEach((n) => n.remove());
  const main = root.querySelector('[data-elementor-type="wp-page"]');
  if (!main) {
    console.log(f.padEnd(38), 'NO MAIN');
    continue;
  }

  // The first top-level <section> is the page hero: breadcrumb, <h1>, subtitle.
  // It is rendered by the page shell, not by the body, so pull it out here.
  const topSections = main.querySelectorAll('[data-elementor-type="wp-page"] > section, :scope > section');
  const heroEl = topSections[0] || null;
  const hero = { title: '', subtitle: '', breadcrumb: [] };
  if (heroEl) {
    const h1 = heroEl.querySelector('h1');
    if (h1) hero.title = plain(inlineHTML(h1));
    const crumbs = heroEl.querySelector('ul');
    if (crumbs) hero.breadcrumb = crumbs.querySelectorAll('li').map((li) => plain(inlineHTML(li))).filter(Boolean);
    // The hero is <h1> followed by an optional subtitle heading. On several
    // pages the subtitle repeats the title word for word — keep that, it is
    // what the page shows.
    const headings = heroEl
      .querySelectorAll('.elementor-heading-title')
      .map((e) => plain(inlineHTML(e)))
      .filter(Boolean);
    hero.subtitle = headings[1] || '';
    heroEl.remove();
  }

  const blocks = [];
  const ids = new Set();
  const push = (b) => {
    const last = blocks[blocks.length - 1];
    if (last && JSON.stringify(last) === JSON.stringify(b)) return;
    blocks.push(b);
  };

  /** True when this node sits inside a swiper/carousel widget. */
  const inCarousel = (el) => {
    for (let p = el; p; p = p.parentNode) {
      const cls = typeof p.getAttribute === 'function' ? p.getAttribute('class') || '' : '';
      if (/swiper-slide|elementor-image-carousel|jkit-.*carousel/i.test(cls)) return true;
    }
    return false;
  };

  const classOf = (n) => (typeof n.getAttribute === 'function' ? n.getAttribute('class') || '' : '');
  /** A column holding one picture and no words — an image cell, in effect. */
  const isPictureColumn = (n) =>
    /elementor-column/.test(classOf(n)) &&
    n.querySelectorAll('img').length === 1 &&
    !n.text.replace(/\s|&nbsp;/g, '');

  /**
   * True when this image sat in its own Elementor column beside other columns
   * that also held nothing but a picture — which is how the old page laid out
   * the book covers and the tool logos on SMS Gateway. Whole-page columns do
   * not count, or every image on the page would qualify; the column has to
   * hold this picture and nothing else, and have a picture-only sibling.
   */
  const inColumnRow = (el) => {
    let col = null;
    for (let p = el; p; p = p.parentNode) {
      if (/elementor-column/.test(classOf(p))) {
        col = p;
        break;
      }
    }
    if (!col || !isPictureColumn(col)) return false;

    const parent = col.parentNode;
    if (!parent) return false;
    const siblings = parent.childNodes.filter((n) => n.nodeType === 1 && n !== col);
    return siblings.some(isPictureColumn);
  };

  /** Which kind of side-by-side row this image belongs to, if any. */
  const rowKind = (el) => (inCarousel(el) ? 'carousel' : inColumnRow(el) ? 'column' : undefined);

  const walk = (el) => {
    for (const c of el.childNodes) {
      // Loose text sitting between elements is still page copy — several
      // paragraphs on the SMS Gateway page are written this way.
      if (c.nodeType === 3) {
        const x = clean(c.rawText);
        if (x) push({ t: 'p', html: x });
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = (c.rawTagName || '').toLowerCase();
      const cls = c.getAttribute('class') || '';
      if (/breadcrumb/i.test(cls)) continue;

      if (/^h[1-6]$/.test(tag)) {
        const text = clean(inlineHTML(c));
        if (!text) continue;
        let id = slugify(text) || 'section';
        const base = id;
        let n = 2;
        while (ids.has(id)) id = base + '-' + n++;
        ids.add(id);
        push({ t: 'h', level: Math.min(6, Math.max(2, Number(tag[1]))), html: text, text: plain(text), id });
        continue;
      }
      if (tag === 'img') {
        const src = c.getAttribute('src') || '';
        if (!src) continue;
        const img = { t: 'img', src: mediaPath(src), alt: cleanAlt(c.getAttribute('alt')) };
        // Pictures the old page showed beside each other belong side by side,
        // not stacked one per row.
        const kind = rowKind(c);
        if (kind) img.row = kind;
        push(img);
        continue;
      }
      if (tag === 'table') {
        const span = (td, attr) => {
          const n = Number(td.getAttribute(attr) || 1);
          return Number.isFinite(n) && n > 1 ? n : undefined;
        };
        const rows = c
          .querySelectorAll('tr')
          .map((tr) => ({
            head: tr.querySelectorAll('th').length > 0,
            // rowspan/colspan have to survive: without them the merged-cell
            // tables on the SMS Gateway page come out ragged, with rows one or
            // two cells short of the rest.
            cells: tr.querySelectorAll('td,th').map((td) => ({
              html: cellHTML(td),
              rowSpan: span(td, 'rowspan'),
              colSpan: span(td, 'colspan'),
            })),
          }))
          .filter((r) => r.cells.some((x) => x.html));
        if (rows.length) push({ t: 'table', rows });
        continue;
      }
      if (tag === 'ul' || tag === 'ol') {
        const items = c
          .querySelectorAll('li')
          .map((li) => {
            // Some list items hold several paragraphs (a bold run-in line and
            // then the body). Keep that structure rather than running the
            // paragraphs together into one string.
            const hasBlock = li.childNodes.some(
              (n) => n.nodeType === 1 && BLOCK.has((n.rawTagName || '').toLowerCase())
            );
            return clean(hasBlock ? cellHTML(li) : inlineHTML(li));
          })
          .filter(Boolean);
        if (items.length) push({ t: 'ul', ordered: tag === 'ol', items });
        continue;
      }
      if (tag === 'p') {
        const x = clean(inlineHTML(c));
        if (x) push({ t: 'p', html: x });
        continue;
      }
      if (tag === 'a' && !c.querySelector('img')) {
        const inner = clean(inlineHTML(c));
        if (inner) push({ t: 'cta', label: plain(inner), href: rewriteHref(c.getAttribute('href')) });
        continue;
      }
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button') continue;
      // No block-level children -> this whole element is one paragraph, so keep
      // its mixed text and inline markup together instead of descending.
      const hasBlockChild = c.childNodes.some(
        (n) => n.nodeType === 1 && BLOCK.has((n.rawTagName || '').toLowerCase())
      );
      if (!hasBlockChild) {
        const x = clean(inlineHTML(c));
        if (!x) continue;
        // A wrapper whose only content is one image is a figure, not a
        // paragraph that happens to contain a picture.
        const onlyImg = x.match(/^<img src="([^"]*)" alt="([^"]*)" \/>$/);
        if (onlyImg) {
          const img = { t: 'img', src: onlyImg[1], alt: onlyImg[2] };
          const kind = rowKind(c);
          if (kind) img.row = kind;
          push(img);
        }
        else push({ t: 'p', html: x });
        continue;
      }
      walk(c);
    }
  };
  walk(main);

  fs.writeFileSync(path.join(out, f.replace('.html', '.json')), JSON.stringify({ hero, blocks }, null, 1));
  const counts = blocks.reduce((a, b) => ((a[b.t] = (a[b.t] || 0) + 1), a), {});
  console.log(f.padEnd(38), String(blocks.length).padStart(4), JSON.stringify(counts), '| hero:', JSON.stringify(hero.title), JSON.stringify(hero.subtitle));
}
