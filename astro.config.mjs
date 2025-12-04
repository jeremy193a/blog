import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com', // Replace with your actual domain
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});

