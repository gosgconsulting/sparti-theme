/**
 * Shared theme settings helpers (branding, localization, favicon).
 * Themes import from here and re-export with theme-specific fallbacks via their utils/settings.ts.
 */

import type { ThemeBrandingSettings, ThemeLocalizationSettings } from '@/hooks/useThemeSettings';
import { resolveBackendAssetUrl } from '@/utils/api';

export type { ThemeBrandingSettings, ThemeLocalizationSettings };

export function getSiteName(
  branding: ThemeBrandingSettings | null | undefined,
  fallback: string
): string {
  return branding?.site_name ?? fallback;
}

export function getSiteTagline(
  branding: ThemeBrandingSettings | null | undefined,
  fallback: string = ''
): string {
  return branding?.site_tagline ?? fallback;
}

export function getSiteDescription(
  branding: ThemeBrandingSettings | null | undefined,
  fallback: string = ''
): string {
  return branding?.site_description ?? fallback;
}

export function getLogoSrc(
  branding: ThemeBrandingSettings | null | undefined,
  fallback: string
): string {
  const raw = branding?.site_logo ?? fallback;
  return resolveBackendAssetUrl(raw);
}

export function getFaviconSrc(
  branding: ThemeBrandingSettings | null | undefined,
  fallback: string | null
): string | null {
  const raw = branding?.site_favicon ?? fallback;
  if (raw == null || raw === '') return null;
  return resolveBackendAssetUrl(raw);
}

export function getCountry(
  localization: ThemeLocalizationSettings | null | undefined,
  fallback: string = 'SG'
): string {
  return localization?.country ?? fallback;
}

export function getTimezone(
  localization: ThemeLocalizationSettings | null | undefined,
  fallback: string = 'Asia/Singapore'
): string {
  return localization?.timezone ?? fallback;
}

export function getLanguage(
  localization: ThemeLocalizationSettings | null | undefined,
  fallback: string = 'en'
): string {
  return localization?.language ?? fallback;
}

/**
 * Apply favicon to document head; normalizes relative URLs and re-applies if removed (e.g. by SEO hook).
 */
export function applyFavicon(faviconSrc: string | null): void {
  if (typeof document === 'undefined' || !faviconSrc) return;

  const getFaviconType = (src: string): string => {
    if (src.endsWith('.png')) return 'image/png';
    if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg';
    if (src.endsWith('.svg')) return 'image/svg+xml';
    if (src.endsWith('.ico')) return 'image/x-icon';
    return 'image/png';
  };

  const faviconType = getFaviconType(faviconSrc);
  let faviconUrl = faviconSrc;
  if (
    !faviconUrl.startsWith('http://') &&
    !faviconUrl.startsWith('https://') &&
    !faviconUrl.startsWith('/')
  ) {
    faviconUrl = '/' + faviconUrl;
  }

  const existingLinks = document.querySelectorAll(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]'
  );
  existingLinks.forEach((link) => link.remove());

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = faviconType;
  link.href = faviconUrl;
  document.head.appendChild(link);

  const shortcutLink = document.createElement('link');
  shortcutLink.rel = 'shortcut icon';
  shortcutLink.type = faviconType;
  shortcutLink.href = faviconUrl;
  document.head.appendChild(shortcutLink);

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const el = node as HTMLElement;
            if (
              el.tagName === 'LINK' &&
              (el.getAttribute('rel') === 'icon' || el.getAttribute('rel') === 'shortcut icon')
            ) {
              setTimeout(() => {
                if (!document.querySelector('link[rel="icon"]')) {
                  const newLink = document.createElement('link');
                  newLink.rel = 'icon';
                  newLink.type = faviconType;
                  newLink.href = faviconUrl;
                  document.head.appendChild(newLink);
                  const newShortcut = document.createElement('link');
                  newShortcut.rel = 'shortcut icon';
                  newShortcut.type = faviconType;
                  newShortcut.href = faviconUrl;
                  document.head.appendChild(newShortcut);
                }
              }, 100);
            }
          }
        });
      });
    });
    observer.observe(document.head, { childList: true, subtree: false });
    (window as unknown as { __faviconObserver?: MutationObserver }).__faviconObserver = observer;
  }
}
