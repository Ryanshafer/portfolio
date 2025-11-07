import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const toAbsoluteUrl = (value: string | undefined, siteOrigin: string | undefined) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (!siteOrigin) return value;
  return new URL(value, siteOrigin).toString();
};

export const GET: APIRoute = async ({ site }) => {
  const studies = await getCollection('studies');
  const siteOrigin = site?.origin;

  const items = studies.map((study) => {
    const detailPath = `/case-studies/${study.slug}/`;
    return {
      slug: study.slug,
      title: study.data.title,
      description: study.data.description,
      categories: study.data.categories ?? [],
      companies: study.data.company ?? [],
      readTime: study.data.readTime ?? null,
      summary: study.data.summary ?? null,
      heroImage: toAbsoluteUrl(
        study.data.heroImagePromo ?? study.data.heroImageWide,
        siteOrigin
      ),
      seo: {
        description: study.data.seo?.description ?? null,
        image: toAbsoluteUrl(
          study.data.seo?.image ?? study.data.heroImagePromo ?? study.data.heroImageWide,
          siteOrigin
        ),
      },
      published: study.data.pubDate ?? null,
      contentMarkdown: study.body,
      url: siteOrigin ? new URL(detailPath, siteOrigin).toString() : detailPath,
    };
  });

  return new Response(
    JSON.stringify({
      updated: new Date().toISOString(),
      count: items.length,
      items,
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
};
