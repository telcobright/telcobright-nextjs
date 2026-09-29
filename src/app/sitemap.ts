import type { MetadataRoute } from 'next';
import { getPublishedPages, getSite } from '@/server/content';
import { listOpenJobs } from '@/server/careers';

/** Built from the store, so anything added in the admin is listed. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, pages, jobs] = await Promise.all([getSite(), getPublishedPages(), listOpenJobs()]);
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    ...pages.map((p) => ({
      url: `${site.url}/solutions/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...jobs.map((job) => ({
      url: `${site.url}/careers/${job.slug}`,
      lastModified: new Date(job.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}

/**
 * Generated at build time in both builds — it already prerendered in the
 * dynamic one, and a static export requires it to say so. A job posted after
 * a deploy therefore reaches the sitemap on the next build; the route itself
 * is revalidated when a post changes.
 */
export const dynamic = 'force-static';
