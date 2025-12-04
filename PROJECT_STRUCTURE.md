# Project Structure

## Directory Tree

```
ultra-light-astro-blog/
│
├── [object Object]/                      # Static assets (copied as-is to dist/)
│   ├── robots.txt                  # Search engine crawler rules
│   ├── favicon.svg                 # Site favicon
│   └── 📁 images/                  # Image assets
│       └── .gitkeep                # (Add og-default.jpg, logo.png here)
│
├── [object Object]# Source code
│   │
│   ├── 📁 content/                 # Content collections
│   │   ├── config.ts               # Content schema definitions
│   │   └── 📁 blog/                # Blog posts (Markdown)
│   │       ├── welcome-to-my-blog.md
│   │       ├── why-astro-for-blogging.md
│   │       └── optimizing-web-performance.md
│   │
│   [object Object]/                 # Reusable layouts
│   │   └── BaseLayout.astro        # Main layout with SEO meta tags
│   │
│   ├── 📁 pages/                   # Routes (file-based routing)
│   │   ├── index.astro             # Home page (/)
│   │   ├── 404.astro               # Not found page
│   │   ├── sitemap.xml.ts          # Sitemap generator (/sitemap.xml)
│   │   ├── rss.xml.ts              # RSS feed (/rss.xml)
│   │   └── 📁 blog/
│   │       └── [slug].astro        # Dynamic post pages (/blog/*)
│   │
│   └[object Object]/                  # Global styles
│       └── global.css              # Main stylesheet (~5KB)
│
├── astro.config.mjs                # Astro configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── .gitignore                      # Git ignore rules
│
└── 📄 Documentation
    ├── README.md                   # Project overview & setup
    ├── HANDOVER.md                 # Detailed handover document
    ├── QUICKSTART.md               # 3-minute quick start
    └── PROJECT_STRUCTURE.md        # This file
```

## Key Files Explained

### Configuration

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro settings, site URL, build options |
| `package.json` | Dependencies (only Astro + RSS plugin) |
| `tsconfig.json` | TypeScript strict mode configuration |

### Content

| File | Purpose |
|------|---------|
| `src/content/config.ts` | Defines blog post schema with Zod validation |
| `src/content/blog/*.md` | Individual blog posts in Markdown |

### Layouts & Pages

| File | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | Main layout with complete SEO meta tags |
| `src/pages/index.astro` | Home page listing all posts |
| `src/pages/blog/[slug].astro` | Template for individual blog posts |
| `src/pages/404.astro` | Custom 404 error page |

### SEO & Feeds

| File | Purpose |
|------|---------|
| `src/pages/sitemap.xml.ts` | Auto-generates XML sitemap |
| `src/pages/rss.xml.ts` | Auto-generates RSS feed |
| `public/robots.txt` | Crawler instructions |

### Styling

| File | Purpose |
|------|---------|
| `src/styles/global.css` | Minimal global styles (~5KB) |

## Data Flow

```
Blog Post (Markdown)
    ↓
Content Collection (Type-safe)
    ↓
[slug].astro (Template)
    ↓
BaseLayout.astro (SEO + HTML structure)
    ↓
Static HTML (dist/)
```

## URL Structure

| URL | File | Description |
|-----|------|-------------|
| `/` | `src/pages/index.astro` | Home page with post list |
| `/blog/welcome-to-my-blog/` | `src/pages/blog/[slug].astro` | Individual post |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | XML sitemap |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed |
| `/robots.txt` | `public/robots.txt` | Robots file |

## Build Process

```
Source Files (src/)
    ↓
Astro Build Process
    ↓
Static HTML + CSS (dist/)
    ↓
Deploy to Hosting
```

## Content Schema

Each blog post must have this frontmatter:

```yaml
---
title: string          # Required
description: string    # Required
pubDate: date         # Required
updatedDate: date     # Optional
author: string        # Optional (default: "Anonymous")
image: string         # Optional (path to image)
draft: boolean        # Optional (default: false)
---
```

## SEO Features Per Page

### Home Page
- Title tag
- Meta description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- RSS feed link

### Blog Post Pages
All of the above, plus:
- Article-specific OG tags
- JSON-LD Article schema
- Published/modified dates
- Author information

## Performance Characteristics

| Metric | Value |
|--------|-------|
| JavaScript | 0 KB |
| CSS | ~5 KB |
| HTML (avg) | ~10 KB |
| Dependencies | 2 |
| Build time | <10s |
| Lighthouse | 95-100 |

## Adding New Features

### Add a New Page
1. Create `src/pages/about.astro`
2. Use `<BaseLayout>` component
3. Page automatically available at `/about/`

### Add a New Blog Post
1. Create `src/content/blog/new-post.md`
2. Add required frontmatter
3. Write content in Markdown
4. Automatically appears on home page

### Add a New Component
1. Create `src/components/MyComponent.astro`
2. Import in pages: `import MyComponent from '../components/MyComponent.astro'`
3. Use: `<MyComponent />`

### Modify Styles
1. Edit `src/styles/global.css` for global changes
2. Or add `<style>` block in individual `.astro` files for component-specific styles

## Dependencies

```json
{
  "dependencies": {
    "astro": "^4.16.0",           // Core framework
    "@astrojs/rss": "^4.0.7"      // RSS feed generation
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.3",   // Type checking
    "typescript": "^5.6.2"         // TypeScript support
  }
}
```

That's it! Only 2 runtime dependencies. 🎉

