import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const thoughts = await getCollection('thoughts');
  const siteOrigin = site?.origin;

  const items = thoughts.map((thought) => {
    const detailPath = `/thoughts/${thought.slug}/`;
    return {
      slug: thought.slug,
      title: thought.data.title,
      description: thought.data.description,
      categories: thought.data.categories ?? [],
      readTime: thought.data.readTime ?? null,
      published: thought.data.pubDate ?? null,
      contentMarkdown: thought.body,
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
