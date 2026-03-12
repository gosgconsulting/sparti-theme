import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateRobotsTxt } from '../src/themes/pagesRegistry';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const siteUrl = process.env.SITE_URL || '';
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).send(generateRobotsTxt(siteUrl));
}
