import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

interface ThemePage {
  slug: string;
  seo_index?: boolean;
  status?: string;
}

function isIndexable(page: ThemePage): boolean {
  if (page.seo_index === false) return false;
  if (page.status && page.status !== 'published') return false;
  if (page.slug.includes(':')) return false;
  return true;
}

function normalizeSlug(slug: string): string {
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function getPriority(slug: string): string {
  if (slug === '/') return '1.0';
  const depth = slug.split('/').filter(Boolean).length;
  if (depth === 1) return '0.8';
  if (depth === 2) return '0.6';
  return '0.5';
}

function getChangefreq(slug: string): string {
  if (slug === '/') return 'weekly';
  if (slug.includes('blog')) return 'weekly';
  return 'monthly';
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
  const themeSlug = process.env.DEPLOY_THEME_SLUG || '';
  const today = new Date().toISOString().split('T')[0];

  // pages.json files are deployed via vercel.json "includeFiles"
  const pagesPath = path.join(process.cwd(), 'src/themes', themeSlug, 'pages.json');

  if (!themeSlug || !fs.existsSync(pagesPath)) {
    res.status(404).send(`<!-- Sitemap not available: unknown theme "${themeSlug}" -->`);
    return;
  }

  const { pages }: { pages: ThemePage[] } = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

  const urls = pages
    .filter(isIndexable)
    .map((page) => {
      const slug = normalizeSlug(page.slug);
      return `  <url>
    <loc>${siteUrl}${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangefreq(slug)}</changefreq>
    <priority>${getPriority(slug)}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${urls}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).send(xml);
}
