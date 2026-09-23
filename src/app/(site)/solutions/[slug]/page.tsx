import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tableOfContents } from '@content/types';
import { getPage, getPublishedPages } from '@/server/content';
import { Blocks } from '@/components/Blocks';
import { PageHero } from '@/components/PageHero';
import { QuickNav } from '@/components/QuickNav';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublishedPages()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || page.draft) return {};
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/solutions/${page.slug}` },
    openGraph: { title: page.title, description: page.summary, url: `/solutions/${page.slug}` },
  };
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || page.draft) notFound();

  const toc = tableOfContents(page.blocks);

  return (
    <>
      {/* Breadcrumb, title and subtitle, exactly as the old page carried them. */}
      <PageHero title={page.title} subtitle={page.subtitle} breadcrumb={page.title} />

      <div className="container-page py-14 lg:py-20">
        {/*
          min-w-0 on both children matters: a grid item defaults to
          min-width:auto, so one wide table would stretch the column past the
          viewport and take the whole page with it. With it, the table scrolls
          inside its own wrapper and the page does not.
        */}
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <QuickNav items={toc} />
          </aside>

          <article className="min-w-0">
            <Blocks blocks={page.blocks} />
          </article>
        </div>
      </div>
    </>
  );
}
