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
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
