import type { MetadataRoute } from 'next';
import { getSite } from '@/server/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  return {
    // The admin is not for search engines; it is also behind a login.
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

/**
 * Generated at build time in both builds — it already prerendered in the
 * dynamic one, and a static export requires it to say so. A job posted after
 * a deploy therefore reaches the sitemap on the next build; the route itself
 * is revalidated when a post changes.
 */
export const dynamic = 'force-static';
