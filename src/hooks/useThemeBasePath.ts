import { useContext } from 'react';
import { ThemeBasePathContext } from '@/context/ThemeBasePathContext';

/**
 * Returns the theme base path for building internal links.
 * Provided by TenantLandingPage (resolved from DEPLOY_THEME_SLUG or /theme/{slug}).
 */
export function useThemeBasePath(): string | undefined {
  return useContext(ThemeBasePathContext);
}
