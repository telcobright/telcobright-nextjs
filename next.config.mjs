import { redirects } from './content/redirects.mjs';

/**
 * Two builds come out of this file.
 *
 *   npm run build         the site as built: admin, server actions, uploads,
 *                         real 301s. Needs a Node host.
 *   npm run build:static  a static export for GitHub Pages. The server half is
 *                         taken out of the tree first — see
 *                         scripts/build-static.mjs, which also explains what
 *                         that costs.
 *
 * `STATIC_EXPORT` is set by that script, never by hand.
 */
const STATIC = process.env.STATIC_EXPORT === '1';

// GitHub Pages serves a project repo under /<repo>. Set to '' for a custom
// domain or a <user>.github.io repo.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  ...(STATIC
    ? {
        output: 'export',
        // Pages has no image optimiser; the files are served as they are.
        images: { unoptimized: true },
        basePath: BASE_PATH,
        // Directory-style URLs (/contact/index.html), which is what a static
        // file host serves cleanly without rewrite rules.
        trailingSlash: true,
      }
    : {
        images: {
          // Until `npm run fetch:media` has pulled the library into
          // /public/media, images can still be served straight from the legacy
          // WordPress host.
          remotePatterns: [
            { protocol: 'https', hostname: 'telcobright.com', pathname: '/wp-content/uploads/**' },
          ],
        },
        experimental: {
          serverActions: {
            // CVs and media uploads travel through Server Actions, and the
            // default cap is 1 MB. This is the ceiling for the *request*; the
            // CV limit itself (5 MB) and the image limit (8 MB) are enforced
            // in the server modules, with a readable error rather than a
            // rejected request.
            bodySizeLimit: '10mb',
          },
        },
        async redirects() {
          return redirects;
        },
      }),
};

export default nextConfig;
