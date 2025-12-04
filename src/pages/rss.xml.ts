import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Ultra-Light Blog',
    description: 'A minimal, SEO-optimized blog built with Astro. Fast, lightweight, and focused on great content.',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
    stylesheet: '/rss-styles.xsl',
  });
}

