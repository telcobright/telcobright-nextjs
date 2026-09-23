# Telcobright Limited — website

The Telcobright corporate site, rebuilt in **Next.js 16 (App Router) + TypeScript + Tailwind CSS**,
migrated from WordPress/Elementor.

Every page is edited from the admin at **`/admin`** — content, navigation, job posts and
applications. What ships in `/content` is the starting point; anything saved from the admin
lives in `/data` and takes precedence, so a fresh checkout renders the real site before
anyone has signed in.

Product-page bodies are **generated from the live WordPress HTML**, not retyped — see
`MIGRATION.md`. `npm run migrate:verify` asserts that no word was lost between the old
page and this one.

## Getting started

```bash
npm install
npm run fetch:media   # pulls images off the old WordPress site into public/media
npm run dev           # http://localhost:3000
```

`npm run fetch:media` must run from a machine that can reach `telcobright.com`. Until it has,
you can preview with images served from the old host:

```bash
echo "NEXT_PUBLIC_MEDIA_SOURCE=legacy" > .env.local
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages prerendered) |
| `npm start` | Serve the production build |
| `npm run fetch:media` | Download every referenced image into `public/media` |
| `npm run migrate:fetch` | Save the live WordPress HTML to `.migration/live` |
| `npm run migrate:extract` | Turn that HTML into block lists |
| `npm run migrate:generate` | Write `content/solutions/*.ts` from the blocks |
| `npm run migrate:verify` | Prove the rebuilt pages lost no word (needs the site running) |

## The admin

Sign in at `/admin`. The first visit to an empty install offers to create the administrator
account; after that the page closes itself and `/admin` asks for a password.

| Screen | What it controls |
| --- | --- |
| Site settings | Name, metadata, contact details, social links, header menu, footer columns, newsletter panel |
| Home page | Every section: hero, products, services, feature bands, client logos, gallery, reviews, FAQ |
| Product pages | The migrated solution pages — details plus the body, block by block |
| Jobs | Job posts on `/careers` |
| Applications | Everyone who applied, their CV, a status and private notes |
| Media | Upload images and use them anywhere an image path is asked for |
| Account | Your password, and who else can sign in |

Saving publishes immediately: each action revalidates the pages it touched.

**Where things are stored.** `/data`, one JSON document per collection, with uploads in
`/data/uploads`. There is no database to run. It is gitignored — it holds CVs — so back it
up separately and point `DATA_DIR` at a persistent disk in production.

**Before going live**, set `AUTH_SECRET` (see `.env.example`). Without it a key is generated
and kept in `/data`, which is fine on one machine and wrong behind a load balancer.

**Careers.** `/careers` lists open posts; each has its own page and an application form that
takes a PDF, DOC or DOCX up to 5 MB. Uploads are checked by their actual file signature, not
just the extension, and stored under a generated name outside the public directory — CVs are
served only through the admin, to a signed-in session.

## Project layout

```
content/
  site.ts                 Company details, footer navigation
  home.ts                 Home page: hero, services, gallery, FAQ
  types.ts                The block model every page body is built from
  redirects.mjs           301s from the old WordPress URLs
  solutions/              One file per product page
data/                     Saved content, jobs, applications, uploads (gitignored)
src/
  app/
    (site)/               The public website
    admin/                The editor, behind a sign-in
    media/uploads/        Serves uploaded images
  components/             Header, Footer, block renderer, Quick Navigation, FAQ
  components/admin/       Editor-only form pieces
  server/                 Store, content, auth, careers, media, form parsing
  proxy.ts                Sends signed-out visitors from /admin to the sign-in page
  lib/media.ts            Resolves image paths (local vs legacy host)
scripts/
  fetch-media.mjs         Media downloader (legacy host, then the staging mirror)
  migrate/                The WordPress -> content/ pipeline, re-runnable
```

## Branches

| Branch | Design |
| --- | --- |
| `main` | The migrated design: the old site's layout and palette, rebuilt and modernised. |
| `design-2026` | A newer pass: aurora-lit dark bands, bento composition, cursor spotlight, scroll progress, a tokenised palette. |

Both carry the same content, the same admin and the same careers pages — they differ only in
how the public site looks. `npm run migrate:verify` passes on each.

## Design system

The whole visual layer lives in two files, and almost nothing should need a
one-off value:

| Where | What |
| --- | --- |
| `tailwind.config.ts` | Palette, the brand gradient, the shadow scale (`soft` / `card` / `lift` / `glow`), the easing curve (`ease-out-expo`), keyframes |
| `src/app/globals.css` | Type scales (`.h-hero`, `.h-section`, `.h-page`, `.lede`), section rhythm (`.section`), buttons (`.btn-*`), cards (`.card`, `.card-dark`), nav links, the logo marquee, the scroll-reveal rules and the long-form `.page-body` styles |

Two conventions are worth knowing before editing a page:

- Put `data-reveal` on an element (or `data-reveal-children` on a list) and it
  rises into place as it scrolls in. It is pure CSS — `animation-timeline:
  view()` behind an `@supports` guard — so browsers without scroll-driven
  animations just render the content, and `prefers-reduced-motion` opts out.
- Put `data-surface="dark"` on any dark section. It switches the site-wide
  focus outline to white so keyboard focus stays visible on it.

## Editing content

**Day to day, edit in the admin** — `/admin`. The files below are the defaults it starts
from, and stay useful for bulk edits and for re-running the migration; once a page has been
saved from the admin, `/data` wins and these files no longer affect it.

**Change text on a product page in code** — open the matching file in `content/solutions/`.
Each page is a flat, ordered list of blocks in the same order the old page had them.
The block kinds are defined in `content/types.ts`:

- `h` — a heading; its `id` is what the Quick Navigation sidebar links to
- `p` — a paragraph of rich text
- `ul` — a bulleted or numbered list
- `table` — rows of cells, each carrying block-level HTML, scrollable on mobile
- `img` — a standalone figure
- `cta` — a link rendered as a button

Those files are regenerated by `npm run migrate:generate`, so edits to them are
overwritten if you re-run the pipeline — but anything saved from the admin is not, because
that lives in `/data`. Re-running the migration is therefore always safe once the site is
live; it refreshes the defaults, not the site.

**Add a product page** — create `content/solutions/<slug>.ts`, then add it to the array in
`content/solutions/index.ts`. Routing, navigation, the sitemap and `generateStaticParams`
all pick it up automatically.

**Change the navigation or footer** — `/admin/site`, or `content/site.ts` for the default.

## The contact form

`src/app/api/contact/route.ts` validates submissions and traps bots with a honeypot, but does
not yet send mail — there is a marked `TODO` where your provider goes (Resend, SES, SMTP).
Until then, submissions are only logged server-side.

## Keeping dependencies patched

This project pins caret ranges (`^`) so `npm install` picks up security patches
automatically. After any install, check nothing is outstanding:

```bash
npm audit
```

It should report **0 vulnerabilities**. If a future advisory appears, `npm audit fix`
handles it; only reach for `--force` if you have read what it intends to change, since
that flag will happily push a major version bump on you.

## Deploying

Run it on a Node host with a persistent disk — a VPS, a container with a volume, App
Platform, Render, Fly. The public pages are prerendered and the admin is dynamic, so the
only requirement is that `/data` survives a restart and is backed up.

```bash
npm ci && npm run build && npm start
```

Set `AUTH_SECRET`, and `DATA_DIR` if the data should live outside the checkout.

**On Vercel or any serverless host**, the filesystem is read-only and per-invocation, so
`/data` cannot be used: content saves and CV uploads would vanish. Moving to a hosted
database and object storage is a rewrite of `src/server/store.ts` and nothing else —
everything above it goes through that one module.

## Read this before going live

`MIGRATION.md` covers three things that need a decision from you:

- **The legacy WordPress install is compromised** — injected spam posts, a hijacked
  sitemap feeding a doorway-page campaign to Google under this domain, and a deleted
  uploads folder. Credentials need rotating whatever happens to this project.
- **80 images were recovered from a staging host** because they are 404 on
  telcobright.com today — every SMS Gateway diagram and all 48 Billing Solutions
  screenshots. This repo is currently the second copy of them.
- **Seven things that look like bugs were kept on purpose**, because they are on the
  live site and parity was the brief: repeated placeholder copy, twelve dead footer
  links, three empty sections and a lorem-ipsum newsletter. Each is a one-line fix.
