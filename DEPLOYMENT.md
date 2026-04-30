# Ballouard Atelier — Deployment Guide

## Production Build Status
✅ Build successful
✅ No errors
✅ Static export ready
✅ SEO optimized
✅ Mobile responsive

## Deployment Options

### Option 1: Cloudflare Pages (Recommended)
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
cd .next
wrangler pages deploy . --project-name=ballouard-atelier
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 4: Static Hosting (GitHub Pages, S3, etc.)
```bash
# Build the static export
npm run build

# The static files are in the .next/static directory
# Upload the .next directory to your static host
```

## Pre-Deployment Checklist

### SEO & Metadata
- ✅ JSON-LD schema (Person, Organization, Products, WebSite, WebPage)
- ✅ OpenGraph tags
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Robots.txt configured
- ✅ Sitemap.xml present

### Performance
- ✅ Static export (no server-side rendering needed)
- ✅ Optimized images
- ✅ CSS minified
- ✅ JavaScript bundled
- ✅ Font loading optimized

### Responsive Design
- ✅ Mobile breakpoints (< 768px)
- ✅ Tablet breakpoints (769-1024px)
- ✅ Desktop breakpoints (> 1024px)
- ✅ Touch device detection for cursor

### Accessibility
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader friendly

## Post-Deployment Steps

1. **Google Search Console**
   - Add property: https://ballouard-atelier.com
   - Submit sitemap: https://ballouard-atelier.com/sitemap.xml
   - Request indexing

2. **Analytics**
   - Add Google Analytics (if desired)
   - Add Cloudflare Web Analytics (if using Cloudflare)

3. **Domain Configuration**
   - Point domain to hosting provider
   - Configure SSL (automatic on most platforms)
   - Set up redirects (www → non-www or vice versa)

4. **Testing**
   - Test on multiple devices
   - Test on multiple browsers
   - Check all animations work
   - Verify custom cursor on desktop
   - Verify default cursor on mobile

## Environment Variables (if needed)
Currently no environment variables are required for this static site.

## Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Production server
npm start
```

## File Structure
```
ballouard-atelier/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx
│   ├── Philosophy.tsx
│   ├── Collections.tsx
│   ├── Horologist.tsx
│   ├── Contact.tsx
│   ├── LiveTime.tsx
│   └── CustomCursor.tsx
├── lib/
│   └── SplitText.tsx
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── .next/                  # Build output (deploy this)
```

## Contact
For issues or questions, contact the development team.
