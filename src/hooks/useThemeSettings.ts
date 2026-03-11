import { useQuery } from '@tanstack/react-query';
import { getApiUrl, api } from '../utils/api';

// ----- Type Definitions -----

export interface ThemeBrandingSettings {
  site_name?: string;
  site_tagline?: string;
  site_description?: string;
  site_logo?: string;
  site_favicon?: string;
}

export interface ThemeLocalizationSettings {
  country?: string;
  timezone?: string;
  language?: string;
}

export interface ThemeStyleSettings {
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  accent?: string;
  accentForeground?: string;
  muted?: string;
  mutedForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  destructive?: string;
  destructiveForeground?: string;
  typography?: {
    fontSans?: string;
    fontSerif?: string;
    fontMono?: string;
    baseFontSize?: string;
    headingScale?: string;
    lineHeight?: string;
  };
}

export interface ThemeSettings {
  branding: ThemeBrandingSettings;
  localization: ThemeLocalizationSettings;
  styles: ThemeStyleSettings;
  [key: string]: any;
}

export interface UseThemeSettingsResult {
  settings: ThemeSettings | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// ----- Fetcher Functions -----

async function fetchThemeSettings(themeSlug: string, tenantSlug?: string): Promise<ThemeSettings> {
  const path = tenantSlug
    ? `/api/v1/theme/${themeSlug}/settings?tenantId=${encodeURIComponent(tenantSlug)}`
    : `/api/v1/theme/${themeSlug}/settings`;

  const response = await api.get(path, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
    tenantId: tenantSlug,
  });

  if (!response.ok) throw new Error(`Failed to fetch theme settings: ${response.statusText}`);
  const result = await response.json();
  if (!result.success) throw new Error(result.error || 'Failed to fetch theme settings');

  return {
    branding: result.data.branding || {},
    localization: result.data.localization || {},
    styles: result.data.theme || result.data.styles || {},
    ...result.data,
  };
}

async function fetchThemeBranding(themeSlug: string, tenantId?: string | null): Promise<ThemeBrandingSettings> {
  // Check for server-injected branding data first (used in static theme deployments)
  if (typeof window !== 'undefined') {
    const injected = (window as any).__BRANDING_SETTINGS__;
    if (injected && typeof injected === 'object' && Object.keys(injected).length > 0) {
      return injected as ThemeBrandingSettings;
    }
  }

  const effectiveTenantId = tenantId || (typeof window !== 'undefined' && (window as any).__CMS_TENANT__) || null;
  const path = effectiveTenantId
    ? `/api/v1/theme/${themeSlug}/branding?tenantId=${encodeURIComponent(effectiveTenantId)}`
    : `/api/v1/theme/${themeSlug}/branding`;

  const res = await api.get(path, {
    headers: { Accept: 'application/json' },
    tenantId: effectiveTenantId || undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const text = await res.text();
    let errorData: { error?: string } = {};
    try { errorData = JSON.parse(text); } catch { errorData = { error: text || `HTTP ${res.status}: ${res.statusText}` }; }
    throw new Error(errorData.error || `Failed to fetch branding: ${res.statusText}`);
  }
  if (!contentType.includes('application/json')) {
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  const result = await res.json();
  if (result.success && result.data) return result.data;
  if (result.branding) return result.branding;
  return result;
}

async function fetchThemeStyles(themeSlug: string, tenantSlug?: string): Promise<ThemeStyleSettings> {
  const apiUrl = tenantSlug
    ? `/api/v1/theme/${themeSlug}/styles?tenantId=${encodeURIComponent(tenantSlug)}`
    : `/api/v1/theme/${themeSlug}/styles`;

  const res = await api.get(apiUrl, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
    tenantId: tenantSlug,
  });

  if (!res.ok) throw new Error(`Failed to fetch styles: ${res.statusText}`);
  const result = await res.json();
  if (!result.success) throw new Error(result.error || 'Failed to fetch styles');
  return result.data || {};
}

// ----- Hooks -----

type HookOptions = {
  /** When false, the hook will not call the API. */
  enabled?: boolean;
};

/**
 * React hook to fetch all theme settings from the public API.
 * Uses React Query for caching and deduplication.
 */
export const useThemeSettings = (themeSlug: string, tenantSlug?: string): UseThemeSettingsResult => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['themeSettings', themeSlug, tenantSlug],
    queryFn: () => fetchThemeSettings(themeSlug, tenantSlug),
    enabled: !!themeSlug,
  });

  if (error) {
    console.error('[useThemeSettings] Error:', error instanceof Error ? error.message : error);
  }

  return {
    settings: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
};

/**
 * Hook to fetch only branding settings for a theme.
 * Uses React Query for caching and deduplication.
 */
export const useThemeBranding = (
  themeSlug: string,
  tenantId?: string,
  options: HookOptions = {}
): { branding: ThemeBrandingSettings | null; loading: boolean; error: string | null } => {
  const enabled = (options.enabled ?? true) && !!themeSlug;

  const { data, isLoading, error } = useQuery({
    queryKey: ['themeBranding', themeSlug, tenantId],
    queryFn: () => fetchThemeBranding(themeSlug, tenantId),
    enabled,
  });

  if (error) {
    console.error('[useThemeBranding] Error:', error instanceof Error ? error.message : error);
  }

  return {
    branding: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
};

/**
 * Hook to fetch only style settings for a theme.
 * Uses React Query for caching and deduplication.
 */
export const useThemeStyles = (
  themeSlug: string,
  tenantSlug?: string,
  options: HookOptions = {}
): { styles: ThemeStyleSettings | null; loading: boolean; error: string | null } => {
  const enabled = (options.enabled ?? true) && !!themeSlug;

  const { data, isLoading, error } = useQuery({
    queryKey: ['themeStyles', themeSlug, tenantSlug],
    queryFn: () => fetchThemeStyles(themeSlug, tenantSlug),
    enabled,
  });

  if (error) {
    console.error('[useThemeStyles] Error:', error instanceof Error ? error.message : error);
  }

  return {
    styles: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
};