import React from 'react';

/**
 * When DEPLOY_THEME_SLUG is set and theme is served at root, basePath is ''.
 * Otherwise basePath is `/theme/${slug}` for building internal links.
 * Themes use: const basePath = useContext(ThemeBasePathContext) ?? `/theme/${tenantSlug}`;
 */
export const ThemeBasePathContext = React.createContext<string | undefined>(undefined);
