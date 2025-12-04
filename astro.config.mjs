import { defineConfig } from 'astro/config';
import wikiLinkPlugin from 'remark-wiki-link';

export default defineConfig({
  site: 'https://quangha.me', // Replace with your actual domain
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, { hrefTemplate: (permalink) => `/blog/${permalink}` }]
    ]
  }
});
