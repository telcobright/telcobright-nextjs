import type { MetadataRoute } from 'next';
import { site } from '@content/site';
import { solutions } from '@content/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    ...solutions.map((s) => ({
      url: `${site.url}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
