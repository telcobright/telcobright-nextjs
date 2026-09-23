import { redirects } from './content/redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Until `npm run fetch:media` has pulled the library into /public/media,
    // images can still be served straight from the legacy WordPress host.
    remotePatterns: [
      { protocol: 'https', hostname: 'telcobright.com', pathname: '/wp-content/uploads/**' },
    ],
  },
  experimental: {
    serverActions: {
      // CVs and media uploads travel through Server Actions, and the default
      // cap is 1 MB. This is the ceiling for the *request*; the CV limit
      // itself (5 MB) and the image limit (8 MB) are enforced in the server
      // modules, with a readable error rather than a rejected request.
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
