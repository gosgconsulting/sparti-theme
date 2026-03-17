/**
 * Pages Registry
 *
 * Maps theme slugs to their pages.json configuration.
 * Mirrors the pattern of themeRegistry.ts but uses static imports so it
 * works in both Vite (frontend) and Vercel serverless functions (api/).
 *
 * import.meta.glob cannot be used here because API routes are bundled
 * by @vercel/node (esbuild), not Vite.
 *
 * To add a new theme, create `src/themes/<slug>/pages.json` and add an
 * import + entry below.
 */

import nailQueen from './nail-queen/pages.json';
import gosgconsulting from './gosgconsulting/pages.json';
import hotel from './hotel/pages.json';
import hotel1 from './hotel1/pages.json';
import hotel2 from './hotel2/pages.json';
import landingpage from './landingpage/pages.json';
import master from './master/pages.json';
import moondk from './moondk/pages.json';
import optimalconsulting from './optimalconsulting/pages.json';
import sissonne from './sissonne/pages.json';
import spartiSeoLanding from './sparti-seo-landing/pages.json';
import storefront from './storefront/pages.json';
import str from './str/pages.json';
import eShop from './e-shop/pages.json';

export interface ThemePage {
  slug: string;
  seo_index?: boolean;
  status?: string;
  page_type?: string;
  page_name?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface ThemePages {
  pages: ThemePage[];
}

/**
 * Map of theme slug → pages configuration.
 * Keys must match the folder names under src/themes/.
 */
export const themePagesMap: Record<string, ThemePages> = {
  'nail-queen': nailQueen,
  'gosgconsulting': gosgconsulting,
  'hotel': hotel,
  'hotel1': hotel1,
  'hotel2': hotel2,
  'landingpage': landingpage,
  'master': master,
  'moondk': moondk,
  'optimalconsulting': optimalconsulting,
  'sissonne': sissonne,
  'sparti-seo-landing': spartiSeoLanding,
  'storefront': storefront,
  'str': str,
  'e-shop': eShop,
};

/**
 * Returns only the pages that should appear in a sitemap:
 * - seo_index is not false
 * - status is published (or unset)
 * - slug has no dynamic segments (e.g. :id, :slug)
 */
export function getIndexablePages(themeSlug: string): ThemePage[] {
  const config = themePagesMap[themeSlug];
  if (!config) return [];

  return config.pages.filter((page) => {
    if (page.seo_index === false) return false;
    if (page.status && page.status !== 'published') return false;
    if (page.slug.includes(':')) return false;
    return true;
  });
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

/**
 * Generates the content for robots.txt pointing to the sitemap on the given site URL.
 */
export function generateRobotsTxt(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

# Sitemap
Sitemap: ${base}/sitemap.xml
`;
}

/**
 * Generates sitemap XML for the given theme and site URL.
 * Returns null if the theme slug is unknown.
 */
export function generateSitemapXml(siteUrl: string, themeSlug: string): string | null {
  const pages = getIndexablePages(themeSlug);
  if (!pages.length) return null;

  const base = siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .map((page) => {
      const slug = normalizeSlug(page.slug);
      return `  <url>
    <loc>${base}${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangefreq(slug)}</changefreq>
    <priority>${getPriority(slug)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${urls}
</urlset>`;
}
