/**
 * Unit tests for shared themeSettings (branding, localization helpers).
 * Run: npm run test:unit
 */
import { describe, it, expect, vi } from 'vitest';
import {
  getSiteName,
  getSiteTagline,
  getSiteDescription,
  getLogoSrc,
  getFaviconSrc,
  getCountry,
  getTimezone,
  getLanguage,
  applyFavicon,
} from './themeSettings';

vi.mock('@/utils/api', () => ({
  resolveBackendAssetUrl: (url: string) => (url ? `https://resolved/${url}` : ''),
}));

describe('themeSettings', () => {
  describe('getSiteName', () => {
    it('returns site_name from branding when present', () => {
      expect(getSiteName({ site_name: 'My Site' } as any, 'Fallback')).toBe('My Site');
    });
    it('returns fallback when branding is null or undefined', () => {
      expect(getSiteName(null, 'Fallback')).toBe('Fallback');
      expect(getSiteName(undefined, 'Fallback')).toBe('Fallback');
    });
    it('returns empty string when site_name is empty (nullish coalescing keeps "")', () => {
      expect(getSiteName({ site_name: '' } as any, 'Fallback')).toBe('');
    });
  });

  describe('getSiteTagline', () => {
    it('returns site_tagline from branding when present', () => {
      expect(getSiteTagline({ site_tagline: 'Tag' } as any)).toBe('Tag');
    });
    it('returns empty string when branding is null', () => {
      expect(getSiteTagline(null)).toBe('');
    });
    it('uses custom fallback', () => {
      expect(getSiteTagline(null, 'Default Tag')).toBe('Default Tag');
    });
  });

  describe('getSiteDescription', () => {
    it('returns site_description from branding when present', () => {
      expect(getSiteDescription({ site_description: 'Desc' } as any)).toBe('Desc');
    });
    it('returns empty string when branding is null', () => {
      expect(getSiteDescription(null)).toBe('');
    });
  });

  describe('getLogoSrc', () => {
    it('resolves site_logo via resolveBackendAssetUrl', () => {
      expect(getLogoSrc({ site_logo: '/logo.png' } as any, '/fallback.png')).toBe(
        'https://resolved//logo.png'
      );
    });
    it('uses fallback when site_logo is missing', () => {
      expect(getLogoSrc(null, '/fallback.png')).toBe('https://resolved//fallback.png');
    });
  });

  describe('getFaviconSrc', () => {
    it('returns null when raw is null or empty', () => {
      expect(getFaviconSrc(null, null)).toBeNull();
      expect(getFaviconSrc({ site_favicon: '' } as any, null)).toBeNull();
    });
    it('resolves favicon URL when present', () => {
      expect(getFaviconSrc({ site_favicon: '/fav.ico' } as any, null)).toBe(
        'https://resolved//fav.ico'
      );
    });
  });

  describe('getCountry', () => {
    it('returns country from localization when present', () => {
      expect(getCountry({ country: 'US' } as any)).toBe('US');
    });
    it('returns default SG when localization is null', () => {
      expect(getCountry(null)).toBe('SG');
    });
    it('uses custom fallback', () => {
      expect(getCountry(null, 'FR')).toBe('FR');
    });
  });

  describe('getTimezone', () => {
    it('returns timezone from localization when present', () => {
      expect(getTimezone({ timezone: 'America/New_York' } as any)).toBe('America/New_York');
    });
    it('returns default Asia/Singapore when null', () => {
      expect(getTimezone(null)).toBe('Asia/Singapore');
    });
  });

  describe('getLanguage', () => {
    it('returns language from localization when present', () => {
      expect(getLanguage({ language: 'fr' } as any)).toBe('fr');
    });
    it('returns default en when null', () => {
      expect(getLanguage(null)).toBe('en');
    });
  });

  describe('applyFavicon', () => {
    it('does not throw when faviconSrc is null', () => {
      expect(() => applyFavicon(null)).not.toThrow();
    });
    it('does not throw when faviconSrc is empty string', () => {
      expect(() => applyFavicon('')).not.toThrow();
    });
  });
});
