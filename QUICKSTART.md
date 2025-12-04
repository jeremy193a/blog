# Quick Start Guide

Get your blog running in 3 minutes:

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:4321 to see your blog!

## 3. Create Your First Post

Create a new file in `src/content/blog/my-first-post.md`:

```markdown
---
title: 'My First Post'
description: 'This is my first blog post!'
pubDate: 2024-01-15
author: 'Your Name'
---

# Hello World!

This is my first blog post. Here's what I'm excited about...
```

Save the file and it will automatically appear on your home page!

## 4. Customize Your Blog

### Update Site Information

Edit `astro.config.mjs`:
```js
site: 'https://yourblog.com', // Your domain
```

Edit `src/layouts/BaseLayout.astro`:
```js
const siteName = 'Your Blog Name'; // Line 27
```

### Add Your Images

Add these files to `public/images/`:
- `og-default.jpg` (1200x630px) - For social media sharing
- `logo.png` - Your logo

### Update Robots.txt

Edit `public/robots.txt`:
```
Sitemap: https://yourblog.com/sitemap.xml
```

## 5. Build for Production

```bash
npm run build
```

Your static site will be in the `dist/` folder, ready to deploy!

## 6. Deploy

Upload the `dist/` folder to:
- Netlify (drag & drop)
- Vercel (connect GitHub repo)
- Cloudflare Pages (connect repo)
- Any static hosting service

---

**That's it!** You now have a blazing-fast blog. 🚀

For more details, see [HANDOVER.md](./HANDOVER.md) and [README.md](./README.md).

