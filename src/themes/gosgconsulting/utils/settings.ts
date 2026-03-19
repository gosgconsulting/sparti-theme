/**
 * Settings utility for gosgconsulting theme.
 * Re-exports shared themeSettings with theme-specific fallbacks.
 */
import { getThemeAssetUrl } from '@/utils/themeAssets';
import * as themeSettings from '@/utils/themeSettings';

const FALLBACK_LOGO = getThemeAssetUrl(undefined, 'go-sg-logo-official.png', 'gosgconsulting');

export const getSiteName = (b: Parameters<typeof themeSettings.getSiteName>[0]) =>
  themeSettings.getSiteName(b, 'GO SG Consulting');
export const getSiteTagline = (b: Parameters<typeof themeSettings.getSiteTagline>[0]) =>
  themeSettings.getSiteTagline(b, '');
export const getSiteDescription = (b: Parameters<typeof themeSettings.getSiteDescription>[0]) =>
  themeSettings.getSiteDescription(b, '');
export const getLogoSrc = (b: Parameters<typeof themeSettings.getLogoSrc>[0]) =>
  themeSettings.getLogoSrc(b, FALLBACK_LOGO);
export const getFaviconSrc = (b: Parameters<typeof themeSettings.getFaviconSrc>[0]) =>
  themeSettings.getFaviconSrc(b, null);
export const getCountry = themeSettings.getCountry;
export const getTimezone = themeSettings.getTimezone;
export const getLanguage = themeSettings.getLanguage;
export const applyFavicon = themeSettings.applyFavicon;
