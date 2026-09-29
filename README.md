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

`main` is the site. It carries the design pass that was developed on
`design-2026` — aurora-lit dark bands, bento composition, cursor spotlight,
scroll progress and a tokenised palette — merged in on 28 September 2026.

`design-2026` is kept as the record of that pass and is now identical to
`main`. Nothing depends on it; delete it whenever you like.

## Design system

The whole visual layer lives in two files, and almost nothing should need a
one-off value:

| Where | What |
| --- | --- |
| `tailwind.config.ts` | Brand palette and gradient, the themed colour tokens, the shadow scale (`soft` / `card` / `lift` / `glow`), the easing curve (`ease-out-expo`), keyframes |
| `src/app/globals.css` | Both theme palettes, type scales (`.h-hero`, `.h-section`, `.h-page`, `.lede`), section rhythm (`.section`), buttons (`.btn-*`), cards (`.card`, `.card-dark`, `.edge-lit`, `.spotlight`), the bento grid, the aurora and grain layers, scroll reveal and progress, and the long-form `.page-body` styles |

### Colour

Surfaces and text are CSS custom properties on `:root` in `globals.css`, stored
as bare `R G B` triplets so Tailwind's opacity modifiers keep working
(`bg-surface/70`, `border-ink-200/60`).

- **Use `bg-surface`, `text-ink-900`, `border-ink-200`** rather than `bg-white`
  or a hex value, so the palette stays in one place.
- **`text-white` is still literal white** — correct on the product tiles, the
  hero and the footer, which are dark bands by design.
- **Adding a colour?** Add it to the palette in `globals.css`, not to a class.

### Conventions worth knowing before editing a page

- `data-reveal` on an element, or `data-reveal-children` on a list, makes it
  rise into place as it scrolls in. Pure CSS — `animation-timeline: view()`
  behind an `@supports` guard — so browsers without scroll-driven animations
  just render the content, and `prefers-reduced-motion` opts out.
- `data-surface="dark"` on any dark section switches the site-wide focus
  outline to white, so keyboard focus stays visible on it.
- `<Spotlight>` wraps a tile to give it the cursor light. Content inside needs
  `relative z-[2]`, or the light paints over the text.
- `<Aurora />` is the ambient layer for a dark band; the parent needs
  `relative overflow-hidden`.

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

There are two builds, because the site has two halves.

### GitHub Pages — the public site, free

```bash
npm run build:static     # writes out/
```

Pushing to `main` does this automatically and publishes it:
**https://telcobright.github.io/telcobright-nextjs/**

`scripts/build-static.mjs` moves the server half out of the tree, exports what
is left, then puts everything back — the working copy is unchanged afterwards,
whether the build succeeded or not. What that costs, and what stands in its
place:

| Lost | Instead |
| --- | --- |
| `/admin` | Runs locally: `npm run dev`, edit, commit `data/`, push. The next deploy carries the change. |
| Applying with a CV | An email with the role in the subject, or set `NEXT_PUBLIC_APPLY_FORM_URL` to a Google Form or Formspree page. |
| The contact form | Email and phone. |
| Real 301s | Meta-refresh stubs with a canonical link, one per legacy URL. Crawlers follow them; they cost a round trip. |
| New job posts appearing by themselves | A post added locally is published by the next push. |

The base path is worked out from the repository, so nothing needs editing if
the repo is renamed. Add `public/CNAME` for a custom domain and it builds for
the root instead.

**Editing content with the static site:** run the admin locally, make your
changes, then `git add data && git commit && git push`. Treat `data/` as part
of the site in this mode — it is gitignored by default precisely because it
holds CVs, so if you go this route, un-ignore only what you mean to publish.

### A Node host — everything working

`render.yaml` describes the service; in the Render dashboard it is
**New → Blueprint → this repo**. Keep this build if you want the admin on the
public URL, real CV uploads and real redirects. Render only attaches a
persistent disk to a paid instance — on the free plan `/data` is wiped on
every deploy, taking saved content and every CV with it.

Any host that runs `npm start` and keeps a directory works just as well:

```bash
npm ci && npm run build && npm start
```

Set `AUTH_SECRET`, and `DATA_DIR` if the data should live outside the
checkout. **Back up whatever `DATA_DIR` points at** — the CVs exist nowhere
else.

## Read this before going live

`MIGRATION.md` covers three things that need a decision from you:

- **The legacy WordPress install needs a security review** and its credentials
  rotated before any cutover. Details are in `SECURITY-NOTE.md` in the working copy,
  kept out of this repository because it is public.
- **80 images were recovered from a staging host** because they are 404 on
  telcobright.com today — every SMS Gateway diagram and all 48 Billing Solutions
  screenshots. This repo is currently the second copy of them.
- **Seven things that look like bugs were kept on purpose**, because they are on the
  live site and parity was the brief: repeated placeholder copy, twelve dead footer
  links, three empty sections and a lorem-ipsum newsletter. Each is a one-line fix.
