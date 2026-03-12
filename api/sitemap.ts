import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSitemapXml } from '../src/themes/pagesRegistry';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const siteUrl = process.env.SITE_URL || '';
  const themeSlug = process.env.DEPLOY_THEME_SLUG || '';

  const xml = generateSitemapXml(siteUrl, themeSlug);

  if (!xml) {
    res.status(404).send(`<!-- Sitemap not available: unknown or empty theme "${themeSlug}" -->`);
    return;
  }

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).send(xml);
}
