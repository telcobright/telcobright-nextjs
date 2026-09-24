# WordPress → Next.js migration notes

## What the old site was

| | |
| --- | --- |
| Platform | WordPress 6.9.7 |
| Page builder | Elementor 4.2.4 + Elementor Pro |
| Add-ons | Jeg Elementor Kit, MetForm, Templately, Envato Elements |
| Theme | Royal Elementor Kit |
| Caching | LiteSpeed Cache |
| Real content | 12 pages (2 of them empty), 0 legitimate posts |

## The goal of this pass

Reproduce telcobright.com page for page: same words, same order, same figures,
same design. Nothing paraphrased, nothing dropped, nothing "improved".

Two things make that verifiable rather than a claim — see **How to re-run it**
below.

## Content parity

Page bodies are not hand-typed. `npm run migrate:*` reads the live HTML and
writes `content/solutions/*.ts` from it, so every heading, paragraph, list item
and table cell is the string WordPress rendered.

`npm run migrate:verify` then compares three things, per page:

1. the live WordPress page,
2. the extracted block list,
3. the page this site actually renders,

as word multisets — whitespace-independent, because neither Elementor nor React
puts spaces between block tags. Current result:

```
OK   /                                          live 790 words   rendered 790
OK   /solutions/sms-gateway                     live 6465 words  rendered 6693
OK   /solutions/billing-solutions               live 451 words   rendered 665
OK   /solutions/cdr-analyzer-system             live 119 words   rendered 124
OK   /solutions/common-interconnection-sms      live 114 words   rendered 119
OK   /solutions/mobile-app-development          live 1056 words  rendered 1093
OK   /solutions/ip-pbx-and-webrtc               live 591 words   rendered 631
OK   /solutions/voice-broadcasting              live 789 words   rendered 793
OK   /solutions/session-border-controller       live 428 words   rendered 468

All pages: no word lost.
```

The rendered counts run higher because the Quick Navigation sidebar repeats the
page's headings, and because the old header/footer are excluded from the live
side (Elementor prints the whole nav four times and renders icon class names as
text).

## Recovered images

**80 images were missing and have been restored.** They are the ones that
matter most: every architecture diagram on the SMS Gateway page and all 48
product screenshots on the Billing Solutions page.

They were not lost in migration — **they are 404 on telcobright.com right now.**
29 of the 32 images on the live SMS Gateway page are broken; the entire
`wp-content/uploads/2023/03/` folder is gone from the server, absent from the
WordPress media library, and was never captured by the Wayback Machine.

They survive on the staging host the site was built on
(`testing.brandprotektor.com`), which still serves the originals at full
resolution. `npm run fetch:media` tries telcobright.com first, then that mirror,
then the mirror through an image proxy — the mirror blocks some networks
outright, and the proxy fetches from an IP it does not block.

**This is worth acting on independently of this project:** whatever deleted that
folder on the live server may have deleted more, and the staging host is now the
only copy of those 80 files. They are committed under `public/media/2023/03/`
here, which makes this repo the second copy.

One image cannot be recovered: `2023/03/Image_024.jpg`. The live page points it
at `assets/img/sms_files/Image_024.jpg`, a relative path left over from the Word
document the SMS Gateway page was built from; it 404s on every host. That slot
renders as a labelled placeholder that keeps its position in the document — drop
the file into `public/media/2023/03/` and it becomes a normal figure again.

## ⚠️ The live WordPress install is compromised

This turned up while inventorying content, and it matters more than the
migration:

- **Injected spam posts.** All 13 "posts" in the database are spam — Russian
  betting sites (1xbet, Pin-Up), "Immediate Edge" crypto-scam reviews, and
  generic ebook filler. They created spam categories and tags too
  (`1xbet-russian-top`, `pin-up`, `immediate`).
- **A hijacked sitemap.** `https://telcobright.com/wp-sitemap.xml` serves
  thousands of auto-parts affiliate URLs such as
  `/Dorman-748-129-Front-Driver-Side-Power-Window-Regulator-Motor/597135`, each
  with today's date and `changefreq: daily` — a doorway-page campaign running
  under your domain and being fed to Google.
- **A captured Wordfence block page** is saved as a post (*"Your access to this
  site has been limited by the site owner"*), which is what an attacker's
  session looks like when it gets saved into the database.
- **Missing uploads.** The whole `2023/03` folder is gone, as above.

None of this carried over. Only the legitimate pages were migrated.

**Worth doing on the WordPress side, whatever happens with this project:**

1. Rotate every WordPress, hosting, database and FTP/SSH credential.
2. Look for unexpected admin users, and for recently modified files in
   `wp-content/uploads`, `wp-content/plugins` and `mu-plugins`.
3. In Google Search Console, submit a removal request for the spam URL patterns
   and resubmit a clean sitemap once the new site is live.
4. Make the old host return **410 Gone** for the spam URL patterns rather than
   404 — Google drops 410s faster.
5. Keep the old install offline once you cut over.

## URL map

| Old URL | New URL |
| --- | --- |
| `/` | `/` |
| `/telcobright-sms-gateway/` | `/solutions/sms-gateway` |
| `/telcobright-billing-solutions/` | `/solutions/billing-solutions` |
| `/cdr-analyzer-system/` | `/solutions/cdr-analyzer-system` |
| `/common-interconnection-sms/` | `/solutions/common-interconnection-sms` |
| `/mobile-app-for-chat-instant-messaging-and-webrtc…/` | `/solutions/mobile-app-development` |
| `/ip-pbx-and-webrtc/` | `/solutions/ip-pbx-and-webrtc` |
| `/voice-broadcasting/` | `/solutions/voice-broadcasting` |
| `/session-border-controllersbc/` | `/solutions/session-border-controller` |
| `/sms/` (empty page) | `/solutions/sms-gateway` |
| `/blog-landing-page-ebook-v1/` (empty) | `/` |
| `/maintenance/` | `/` |

All permanent (301), defined in `content/redirects.mjs`.

## Design

The brand is the old site's and stays that way: Inter display over DM Sans body,
the orange → indigo gradient on accent words and primary buttons, warm-white
sections alternating with the near-black product tiles. Those values were
sampled off the live render, not eyeballed:

| | |
| --- | --- |
| Container | 1400px |
| Hero `h1` | Inter 72/72, 700, letter-spacing −2px |
| Section `h2` | Inter 48/48, 700, letter-spacing −2px, `#171717` |
| Eyebrow | Inter 13px, letter-spacing 1px, `#9CA3AF` |
| Body | DM Sans 16/1.6, `#5A5051` |
| Brand gradient | `linear-gradient(45deg, #EA580C, #4F46E5)` |
| Product cards | `2024/06/tb_bg.png`, 6px radius, background-position alternating |
| Hero / contact card | `2024/06/tb_bg-2.png`, 12px radius |

Elementor, JetKit and MetForm markup, CSS and JS are gone; roughly 2 MB of
render-blocking assets with them. The pages are static HTML.

### The refresh

A later pass modernised how those pieces are *drawn*, without touching what they
say. It is presentation only — no copy was added, removed or reworded, and
`migrate:verify` still reports **no word lost** on all nine pages afterwards.

- **Fluid type.** `.h-hero`, `.h-section` and `.h-page` are `clamp()` scales
  that hit the live site's figures at both ends (44→72 for the hero, 32→48 for
  section headings) and interpolate in between, instead of jumping at three
  fixed breakpoints. Section rhythm is one fluid `.section` step rather than
  `py-16` / `py-20` / `py-24` sprinkled per section.
- **A depth scale.** Four shadows (`soft`, `card`, `lift`, `glow`) tinted with
  the ink brown `#200F10` rather than pure black — on this warm white, black
  shadows read grey and dirty. Elevation now carries hover state; borders
  mostly stay put.
- **One easing curve.** `cubic-bezier(.16,1,.3,1)`, exposed as `--ease` and as
  Tailwind's `ease-out-expo`, on every hover, panel and transition.
- **Scroll reveal with no JavaScript.** `[data-reveal]` and
  `[data-reveal-children]` animate on `animation-timeline: view()`, guarded by
  `@supports`. No IntersectionObserver, no hydration cost, and nothing is left
  hidden if a script fails — browsers without scroll-driven animations simply
  render the content. `prefers-reduced-motion` opts out.
- **A fixed, frosted header.** It was absolute and transparent, which meant the
  nav vanished into the white sections once you scrolled. It is now fixed and
  turns into a frosted dark bar past 12px of scroll; the product dropdown got a
  rounded panel, an arrow that slides in on hover and a current-page state;
  Escape closes both it and the mobile drawer.
- **Cards.** Light cards are a hairline plus a shadow that deepens. The
  near-black product tiles light their *edge* in the brand gradient on hover
  (a masked `::before`) instead of the whole tile changing tone.
- **Tables.** A `.table-wrap` carries the rounding, the hairline and the
  horizontal scroll, so cells only draw their inner rules — no doubled line at
  the edge, round corners at any column count, and a row highlight on hover,
  which matters on the wide merged-cell spec tables.
- **One focus style.** A single `:focus-visible` outline for the whole site,
  switching to white inside anything marked `data-surface="dark"`. It uses
  `outline`, not a ring, so it is never clipped by an ancestor's overflow.
- **Inner-page hero.** The flat `#4A4344` band is now one shared `PageHero`
  (solutions, the product index, contact, 404): the same grey falling into the
  near-black the header, tiles and footer already use, with the `tb_bg` texture
  and a gradient hairline closing it.

Verified after the refresh: build and typecheck clean, `migrate:verify` green on
all nine pages, 112 image URLs all 200, and no horizontal scroll across 12
routes × 390 / 768 / 1280px.

## Kept exactly as the old site has it

These look like defects. They are on telcobright.com today, and "same to same"
was the brief, so they were reproduced rather than fixed. Each is a one-line
change if you want it fixed — say which.

1. **The six service blurbs all repeat one sentence.** *"System integration
   refers to the process of bringing together different subsystems or components
   in order."* appears under all six headings in *Additional Product and
   solutions*. Real copy goes in `content/home.ts`.
2. **The Billing Solutions card repeats the SMS Gateway sentence.** On the home
   page, *Billing Solutions* is described as *"Telcobright SMS Platform is a
   highly scalable distributed carrier-grade SMS platform…"*.
3. **Twelve dead footer links.** *SMS Gateway*, *Billing Solutions*,
   *Management*, *Apps & Others*, *Who we are*, *Case Study*, *Careers*, *Blog*,
   *Work with us*, *Terms & Conditions*, *Privacy Policy* and *Press Release*
   all point at `#`. Edit `footerNav` in `content/site.ts`.
4. ~~**Three empty sections.**~~ These were filled in — see *Three empty
   sections, filled* below.
5. ~~**The newsletter body is untranslated lorem ipsum.**~~ Replaced — see
   *The footer panel* below.
6. **The Medium icon links nowhere.** Set `site.social.medium` and it becomes a
   link.
7. **Typos in headings.** *"About Telcobrigtht SMS Platform"*, *"Dynamic least
   cost routin(LCR)"*, *"Receiving a payment and appling to invoice"*,
   *"implemented easiliy"* and others are preserved as written.

## Three empty sections, filled

*Trusted by renowned companies in Bangladesh*, *Explore Our Clients Review* and
*Our Creative Environment* were headings with nothing under them — the widgets
were never filled in on the live site.

**The client strip now carries ten real logos.** All ten were already sitting
unused in the WordPress media library, so they are Telcobright's own files, not
stock art: BTRC, Summit Communications, Bangla Telecom, Mir Telecom, SR Telecom,
Agni Systems, Mango ICT Services, Jibondhara Solutions, Cosmopolitan
Communications and Brilliant Connect. They ride a seamless marquee that pauses
on hover and becomes a static centred grid under `prefers-reduced-motion`.
They render in full colour rather than the usual grayscale — BTRC's seal is red,
Agni's is a colour arc, and draining a genuine client list makes it look like
filler. **Please confirm the list is current before launch**
(`clients.logos` in `content/home.ts`). `2024/06/image-119.png` is a second copy
of the Summit mark and is left out.

**The gallery now carries six photographs of the Dhaka office and team**, again
from the library and again no stock. The grid mixes two- and one-column tiles so
each row fills exactly. Two library files are deliberately not in it:
`group-photo-1.jpeg` is the same team photograph as `group-photo.jpeg` at a
tighter crop, and `2024/08/telcobright.jpg` already appears in the hero card.
These are the only images on the site rendered through `next/image` — 2.4 MB of
originals up to 2048px wide going into tiles a few hundred pixels across was
worth the one exception.

**The review section is built but empty, and so is hidden.** There are no
quotes — not on the old page, not in the WordPress database. Rather than write
testimonials and attribute them to BTRC or Summit Communications, the carousel
(`src/components/Testimonials.tsx`) ships ready and the section stays out of the
page until `testimonials.items` in `content/home.ts` has real ones. Paste in the
quote, the person, their role and their company and it appears.

That last point is the one place the new home page shows less than the old one,
so `migrate:verify` declares it explicitly rather than quietly passing: the run
prints *"by design"* against `/` with the reason. Any other missing word still
fails the check.

## Improved on the old site

Three places where matching the live page exactly would have shipped something
broken:

- **Quick Navigation.** The Elementor table-of-contents widget never finishes
  loading on any solution page — it renders a spinner forever. Here it is a real
  table of contents that lists the page's headings and tracks scroll position.
- **Figures that sat side by side.** Elementor put some pictures in separate
  columns of one row — the two book covers and the tool logos on the SMS
  Gateway page. The extractor only recognised carousel images as a row, so
  everything else came down as a stack of small pictures one per line. It now
  also recognises a column that holds a single picture and nothing else beside
  a sibling that does the same, and those render as a row again. (The files
  themselves are fine, and small on purpose: `Image_008-1.jpg` is a 97×128
  book cover, which is what WordPress held.)
- **The footer panel.** It read *"Subscribe Our Newsletter"* over four
  sentences of lorem ipsum — *"Aenean imperdiet. Etiam ultricies nisi vel
  augue…"* — with no email field and no endpoint behind it, on the live site
  as much as here. A heading promising a newsletter that cannot be subscribed
  to is worse than no panel, so it now asks for what the business actually
  wants: *"Planning a platform? Talk to our engineers."*, with a button to the
  contact page. `migrate:verify` declares the removed Latin rather than
  quietly passing. Edit the words, or take the button away, at `/admin/site`.
- **Merged table cells.** Four tables on the SMS Gateway page use `rowspan` and
  `colspan`. An early pass of the extractor dropped both, which left those rows
  one or two cells short and the tables visibly broken. The spans now survive
  into `content/solutions/*.ts` and are rendered, so the signalling-flow tables
  line their diagrams up against the right descriptions again.
- **The Billing Solutions page** is 48 screenshots with captions and little
  prose. It reads as a slide deck rather than a web page. It is migrated exactly
  as-is; worth rewriting at some point.

## The admin, and what it changed

The site is now edited from `/admin` rather than from the files. Two things about that are
worth knowing when reading the rest of this document.

**The migrated content became the default, not the source.** `content/*.ts` is what the site
renders until something is saved from the admin; from then on the saved copy in `/data`
wins for that document. `npm run migrate:generate` still rewrites `content/`, so re-running
the migration cannot trample edits — and `npm run migrate:verify` still measures the
rendered pages, so parity is checked against what visitors actually get.

**Nothing here was rewritten to suit the editor.** The block model the migration produced is
the model the editor edits, spans and all. Tables are edited as JSON because a grid with
merged cells has no honest small form, and these came from WordPress rather than being
written by hand.

## Careers

`/careers` and the application form are new — the old site had neither, and the footer's
`Careers` link went to `#`. That link now points at the page; it is the only dead link that
gained a destination.

Applications are stored in `/data` with the CV beside them. CVs are never public: they are
written under a generated name outside `public/`, checked by their file signature rather
than their extension, and served only through the admin to a signed-in session.

## Pages that exist here but not on the old site

Nothing links to either; they are reachable by URL and listed in the sitemap.

- `/solutions` — an index of the eight product pages.
- `/contact` — a working contact form. The live site has no contact page; its
  buttons open `mailto:info@telcobright.com`, and so do the ones here. See the
  `TODO` in `src/app/api/contact/route.ts` for wiring up delivery.

## How to re-run it

```bash
npm run migrate:fetch      # save the live HTML to .migration/live
npm run migrate:extract    # -> .migration/blocks/*.json
npm run migrate:generate   # -> content/solutions/*.ts
npm run fetch:media        # -> public/media  (telcobright.com, then the mirror)

npm run build && npm start -- -p 3100
npm run migrate:verify     # asserts no word was lost
```

`.migration/` is scratch and gitignored. `content/` and `public/media/` are the
committed output.

Home-page content is the one thing not generated — it lives in `content/home.ts`
because its layout is bespoke rather than a linear document. `migrate:verify`
still checks it against the live page.

## Still needs your input

1. **Client logos.** Ten are now on the page, all from your own media library.
   Confirm the list is current and complete — `clients.logos` in
   `content/home.ts`.
2. **Client reviews.** The carousel is built and waiting for real quotes;
   `testimonials.items` in `content/home.ts`.
3. **Contact form delivery.** `src/app/api/contact/route.ts`.
4. **Footer logo resolution.** `2024/01/Frame-4.png` is 141×44, the same file
   the old footer used, so it is soft on high-resolution screens. An SVG or a
   larger PNG dropped into `public/media/` and pointed at from `site.logos`
   fixes it; no component needs touching.
5. **Favicon and OG image.** `2024/06/telcobright-siteicon.png` exists; drop a
   proper `app/icon.png` and `app/opengraph-image.png` in when you have artwork.
