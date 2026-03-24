/**
 * Theme Registry
 *
 * Dynamically discovers all themes in the `src/themes/` directory
 * using `import.meta.glob`. This eliminates the need to manually
 * register new themes in router.tsx and TenantLandingPage.tsx.
 *
 * To add a new theme, simply create a new folder under `src/themes/`
 * with an `index.tsx` file that exports a default React component.
 */

import React, { lazy } from 'react';

// Use import.meta.glob to auto-discover all theme entry points.
// Each theme must have a `src/themes/<slug>/index.tsx` file.
// The `{ import: 'default' }` option makes each module return the default export directly.
const themeModules = import.meta.glob('./**/index.tsx');

/**
 * Map of theme slug → lazy-loaded React component.
 * Keys are derived from the directory name of each discovered theme.
 *
 * Example: `./gosgconsulting/index.tsx` → key: `'gosgconsulting'`
 */
export const themeComponentMap: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = Object.fromEntries(
  Object.entries(themeModules)
    .filter(([path]) => {
      // Only include direct children (single-level subdirectories), not deeply nested files.
      // e.g. './master/index.tsx' ✓   but  './master/pages/Home.tsx' ✗
      const parts = path.replace('./', '').split('/');
      return parts.length === 2 && parts[1] === 'index.tsx';
    })
    .map(([path, importFn]) => {
      const slug = path.replace('./','').split('/')[0];
      const component = lazy(importFn as () => Promise<{ default: React.ComponentType<any> }>);
      return [slug, component];
    })
);

/**
 * List of all known theme slugs, derived from `themeComponentMap`.
 * Used in the router to determine if a short URL segment matches a theme.
 */
export const KNOWN_THEME_SLUGS: string[] = Object.keys(themeComponentMap);

/**
 * Theme display names. Add friendly names for the UI here.
 * Falls back to the slug itself if a display name is not provided.
 */
const THEME_DISPLAY_NAMES: Record<string, string> = {
  'landingpage': 'ACATR Business Services',
  'sparti-seo-landing': 'Sparti SEO Landing',
  'gosgconsulting': 'Digital Marketing',
  'sissonne': 'Sissonne Dance Academy',
  'storefront': 'Storefront',
  'moondk': 'Moondk',
  'str': 'STR',
  'optimalconsulting': 'Optimal Consulting',
  'master': 'Master Template',
  'e-shop': 'E-shop',
  'hotel': 'Hotel Adina',
  'hotel1': 'Hotel1',
  'hotel2': 'Hotel2',
  'nail-queen': 'Nail Queen',
  'custom': 'Custom',
};

/**
 * Get the display name for a given theme slug.
 */
export function getThemeDisplayName(slug: string): string {
  return THEME_DISPLAY_NAMES[slug] ?? slug;
}
