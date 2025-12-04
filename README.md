# Ultra-Light Astro Blog

A minimal, SEO-optimized blog built with Astro. Focused on performance, accessibility, and great content.

## Features

- ⚡ **Lightning Fast**: Zero JavaScript by default, pure static HTML
- 🔍 **SEO-First**: Complete meta tags, Open Graph, Twitter Cards, JSON-LD schema
- 📱 **Responsive**: Mobile-friendly design with minimal CSS
- [object Object] Collections**: Type-safe frontmatter with Astro content collections
- [object Object] RSS**: Auto-generated sitemap.xml and RSS feed
- ♿ **Accessible**: Semantic HTML and ARIA best practices

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       └── *.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   ├── sitemap.xml.ts
│   │   ├── rss.xml.ts
│   │   └── 404.astro
│   └── styles/
│       └── global.css
└── package.json
```

## Configuration

1. **Update site URL** in `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://yourdomain.com',
   });
   ```

2. **Update robots.txt** with your domain in `public/robots.txt`

3. **Add images**:
   - Add `og-default.jpg` to `public/images/` (1200x630px recommended)
   - Add `logo.png` to `public/images/` for JSON-LD schema

## Creating Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'A brief description for SEO'
pubDate: 2024-01-15
updatedDate: 2024-01-20  # optional
author: 'Your Name'
image: '/images/post-image.jpg'  # optional
draft: false  # optional, set to true to hide
---

Your content here...
```

## SEO Features

Every page includes:
- Title and meta description
- Canonical URLs
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- JSON-LD structured data (Article schema for posts)
- Automatic sitemap generation
- RSS feed

## Performance

This blog is optimized for Core Web Vitals:
- No JavaScript shipped to client (unless you add it)
- Minimal CSS (~5KB)
- Static HTML generation
- Optimized for caching

Expected Lighthouse scores: 95-100 across all metrics.

## Deployment

Deploy to any static hosting platform:

- **Netlify**: Connect your repo and deploy
- **Vercel**: Import project and deploy
- **Cloudflare Pages**: Connect repo and deploy
- **GitHub Pages**: Use GitHub Actions workflow

Build command: `npm run build`  
Output directory: `dist`

## License

MIT

