/**
 * Shared theme asset URL helper.
 * All themes should use this for /assets/ URLs so basePath (including deploy-at-root)
 * and future CDN/prefix changes are handled in one place.
 *
 * @param basePath - Theme base path (e.g. '' for deploy-at-root, or '/theme/nail-queen')
 * @param relativePath - Path under assets (e.g. 'home-banner.jpg' or 'pricing/manicure.jpg')
 * @param themeSlug - Theme slug for fallback when basePath is undefined (e.g. 'nail-queen')
 * @returns Full URL for the asset (e.g. '/theme/nail-queen/assets/home-banner.jpg')
 */
export function getThemeAssetUrl(
  basePath: string | undefined,
  relativePath: string,
  themeSlug: string
): string {
  // Deploy-at-root (Vercel): basePath is '' but assets live at dist/theme/<slug>/assets/
  const deployAtRoot =
    typeof import.meta !== "undefined" && !!import.meta.env?.DEPLOY_THEME_SLUG;
  const base =
    basePath !== undefined && basePath !== ""
      ? basePath
      : deployAtRoot
        ? `/theme/${themeSlug}`
        : (basePath ?? `/theme/${themeSlug}`);

  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = relativePath.replace(/^\/+/, "");
  return normalizedPath ? `${normalizedBase}/assets/${normalizedPath}` : `${normalizedBase}/assets`;
}
