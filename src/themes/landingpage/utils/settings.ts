/**
 * Settings utility for landingpage theme.
 * Re-exports shared themeSettings with theme-specific fallbacks.
 */
import * as themeSettings from '@/utils/themeSettings';

const FALLBACK_LOGO = '/theme/landingpage/assets/752d249c-df1b-46fb-b5e2-fb20a9bb88d8.png';
const FALLBACK_FAVICON = '/theme/landingpage/assets/favicon.ico';

export const getSiteName = (b: Parameters<typeof themeSettings.getSiteName>[0]) =>
  themeSettings.getSiteName(b, 'ACATR Business Services');
export const getSiteTagline = (b: Parameters<typeof themeSettings.getSiteTagline>[0]) =>
  themeSettings.getSiteTagline(b, '');
export const getSiteDescription = (b: Parameters<typeof themeSettings.getSiteDescription>[0]) =>
  themeSettings.getSiteDescription(b, '');
export const getLogoSrc = (b: Parameters<typeof themeSettings.getLogoSrc>[0]) =>
  themeSettings.getLogoSrc(b, FALLBACK_LOGO);
export const getFaviconSrc = (b: Parameters<typeof themeSettings.getFaviconSrc>[0]) =>
  themeSettings.getFaviconSrc(b, FALLBACK_FAVICON);
export const getCountry = themeSettings.getCountry;
export const getTimezone = themeSettings.getTimezone;
export const getLanguage = themeSettings.getLanguage;
export const applyFavicon = themeSettings.applyFavicon;
