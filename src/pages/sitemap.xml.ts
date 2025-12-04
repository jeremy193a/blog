import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Site URL is not configured in astro.config.mjs');
  }

  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map((post) => {
      const url = new URL(`/blog/${post.slug}/`, site).href;
      const lastmod = post.data.updatedDate || post.data.pubDate;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

