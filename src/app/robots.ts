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
