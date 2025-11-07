import type { APIRoute } from 'astro';
import { workEntries } from '../../content/work-data.mjs';
import { renderMarkdown } from '../../utils/markdown';

export const GET: APIRoute = async ({ site }) => {
  const siteOrigin = site?.origin;

  const items = await Promise.all(
    workEntries.map(async (entry) => {
      const descriptionHtml = entry.description
        ? await renderMarkdown(entry.description)
        : null;
      return {
        ...entry,
        descriptionHtml,
      };
    })
  );

  return new Response(
    JSON.stringify({
      updated: new Date().toISOString(),
      url: siteOrigin ? new URL('/resume/', siteOrigin).toString() : '/resume/',
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
