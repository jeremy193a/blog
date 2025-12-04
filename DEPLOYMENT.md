# Deployment Guide

This guide covers deploying your Ultra-Light Astro Blog to various hosting platforms.

## Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Updated `site` URL in `astro.config.mjs`
- [ ] Updated sitemap URL in `public/robots.txt`
- [ ] Added `og-default.jpg` to `public/images/`
- [ ] Added `logo.png` to `public/images/`
- [ ] Customized site name in `src/layouts/BaseLayout.astro`
- [ ] Written at least one blog post
- [ ] Tested locally with `npm run build && npm run preview`
- [ ] Verified all meta tags in page source

---

## Netlify (Recommended)

### Option 1: Drag & Drop

1. Build locally:
   ```bash
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the `dist/` folder to the upload area

4. Done! Your site is live.

### Option 2: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [Netlify](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

6. Click "Deploy site"

7. (Optional) Configure custom domain in site settings

### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Vercel

### Deploy via CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts

### Deploy via Git

1. Push code to GitHub

2. Go to [Vercel](https://vercel.com)

3. Click "Add New Project"

4. Import your repository

5. Vercel auto-detects Astro - just click "Deploy"

6. Done!

### Vercel Configuration

Create `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

## Cloudflare Pages

### Deploy via Git

1. Push code to GitHub/GitLab

2. Go to [Cloudflare Pages](https://pages.cloudflare.com)

3. Click "Create a project"

4. Connect your repository

5. Configure build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: `NODE_VERSION = 18`

6. Click "Save and Deploy"

### Cloudflare Wrangler CLI

1. Install Wrangler:
   ```bash
   npm i -g wrangler
   ```

2. Login:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

---

## GitHub Pages

### Using GitHub Actions

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name', // Only if not using custom domain
});
```

3. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

4. Push to main branch - automatic deployment!

---

## Other Platforms

### Render

1. Create new "Static Site"
2. Build command: `npm run build`
3. Publish directory: `dist`

### Railway

1. Create new project from GitHub
2. Add build command: `npm run build`
3. Add start command: `npx serve dist`

### DigitalOcean App Platform

1. Create new app from GitHub
2. Build command: `npm run build`
3. Output directory: `dist`

### AWS S3 + CloudFront

1. Build locally: `npm run build`
2. Upload `dist/` to S3 bucket
3. Enable static website hosting
4. (Optional) Add CloudFront distribution

---

## Post-Deployment Tasks

### 1. Verify Deployment

- [ ] Visit your site URL
- [ ] Check all pages load correctly
- [ ] Test navigation links
- [ ] Verify `/sitemap.xml` works
- [ ] Verify `/rss.xml` works
- [ ] Test 404 page

### 2. SEO Setup

#### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

#### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### 3. Social Media Validation

#### Twitter Card Validator
- Visit: https://cards-dev.twitter.com/validator
- Enter a blog post URL
- Verify card displays correctly

#### Facebook Sharing Debugger
- Visit: https://developers.facebook.com/tools/debug/
- Enter a blog post URL
- Verify OG tags are correct
- Click "Scrape Again" to refresh cache

#### LinkedIn Post Inspector
- Visit: https://www.linkedin.com/post-inspector/
- Enter a blog post URL
- Verify preview looks good

### 4. Performance Testing

#### Lighthouse
```bash
# Install Lighthouse CLI
npm i -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

#### PageSpeed Insights
- Visit: https://pagespeed.web.dev/
- Enter your URL
- Aim for 95+ on all metrics

#### WebPageTest
- Visit: https://www.webpagetest.org/
- Test from multiple locations
- Check waterfall chart

### 5. Monitoring Setup

Consider adding:

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Analytics**: Plausible, Fathom, Umami (privacy-friendly)
- **Error tracking**: Sentry (if you add any JS)
- **Performance monitoring**: SpeedCurve, Calibre

---

## Custom Domain Setup

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Update DNS records at your registrar:
   - Add CNAME record pointing to Netlify
   - Or use Netlify DNS

### Vercel

1. Go to Project settings → Domains
2. Add your domain
3. Update DNS:
   - Add CNAME record: `your-domain.com` → `cname.vercel-dns.com`
   - Or use Vercel nameservers

### Cloudflare Pages

1. Go to Custom domains
2. Add your domain
3. Cloudflare automatically configures DNS

---

## SSL/HTTPS

All recommended platforms provide free SSL certificates automatically:

- Netlify: Let's Encrypt (automatic)
- Vercel: Let's Encrypt (automatic)
- Cloudflare: Cloudflare SSL (automatic)
- GitHub Pages: Let's Encrypt (automatic)

No configuration needed! 🎉

---

## Continuous Deployment

Once connected to Git, deployments are automatic:

1. Make changes locally
2. Commit and push to main branch
3. Platform detects changes
4. Builds and deploys automatically
5. Live in 1-3 minutes

### Preview Deployments

Most platforms support preview deployments:

- **Netlify**: Every PR gets a preview URL
- **Vercel**: Every push gets a preview URL
- **Cloudflare**: Branch previews available

---

## Rollback

If something goes wrong:

### Netlify
1. Go to Deploys
2. Find previous successful deploy
3. Click "Publish deploy"

### Vercel
1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

### Git-based Rollback
```bash
git revert HEAD
git push origin main
```

---

## Environment Variables

If you need environment variables (API keys, etc.):

### Netlify
Site settings → Build & deploy → Environment variables

### Vercel
Project settings → Environment Variables

### Cloudflare Pages
Settings → Environment variables

Example:
```
PUBLIC_ANALYTICS_ID=your-id-here
```

Access in Astro:
```js
const analyticsId = import.meta.env.PUBLIC_ANALYTICS_ID;
```

---

## Troubleshooting

### Build Fails

**Error**: "Command not found: astro"
- **Fix**: Ensure `package.json` has correct dependencies
- Run `npm install` locally first

**Error**: "Node version too old"
- **Fix**: Set Node version to 18+ in platform settings

### 404 on Routes

**Problem**: `/blog/post-name` returns 404
- **Fix**: Ensure `dist/blog/post-name/index.html` exists after build
- Check Astro config for correct `site` URL

### Missing Styles

**Problem**: Site has no CSS
- **Fix**: Check that `src/styles/global.css` is imported in `BaseLayout.astro`
- Verify CSS file is in `dist/` after build

### Broken Images

**Problem**: Images don't load
- **Fix**: Use absolute paths from `public/`: `/images/photo.jpg`
- Don't use relative paths in Markdown

---

## Cost Estimates

All these platforms have generous free tiers:

| Platform | Free Tier | Bandwidth | Build Minutes |
|----------|-----------|-----------|---------------|
| Netlify | Yes | 100 GB/mo | 300 min/mo |
| Vercel | Yes | 100 GB/mo | 6000 min/mo |
| Cloudflare Pages | Yes | Unlimited | 500 builds/mo |
| GitHub Pages | Yes | 100 GB/mo | Unlimited |

**For a blog, you'll likely never exceed free tier limits.** 🎉

---

## Recommended Setup

For most users, I recommend:

1. **Host on**: Netlify or Vercel (easiest)
2. **DNS**: Cloudflare (free, fast, DDoS protection)
3. **Analytics**: Plausible or Fathom (privacy-friendly)
4. **Monitoring**: UptimeRobot (free uptime checks)

This gives you:
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Preview deployments
- ✅ 99.9% uptime

---

**You're all set!** Your ultra-light blog is now live and bla[object Object]

