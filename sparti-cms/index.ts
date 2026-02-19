// CMS Module exports
export { AuthProvider, useAuth } from './components/auth/AuthProvider';
export { default as ProtectedRoute } from './components/auth/ProtectedRoute';
export { CMSSettingsProvider, useCMSSettings } from './context/CMSSettingsContext';
export type { CMSSettings, TypographySettings, ColorSettings, LogoSettings, MediaItem } from './context/CMSSettingsContext';
export type { ComponentSchema } from './types/schema';

// Core functionality
export * from './types';


// Component Registry
export { componentRegistry, ComponentRegistry } from './registry';
export type { ComponentDefinition, ComponentProperty } from './registry/types';


// Hooks
export { default as useDatabase } from './hooks/useDatabase';

// Utilities
export * from './utils/component-detector';