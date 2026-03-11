/**
 * Application Constants
 *
 * This file contains shared constants used across the application.
 * Import from here rather than hardcoding strings in individual files.
 */

/**
 * Master Tenant ID
 *
 * All theme-related settings are saved under this tenant ID.
 * Themes are used for front-end content, while settings must be saved in a tenant.
 */
export const MASTER_TENANT_ID = 'demo';

/**
 * localStorage key constants for authentication and session state.
 * Using a single source of truth prevents typo-induced key mismatches.
 */
export const STORAGE_KEYS = {
  /** JWT session token and user data stored after login. */
  USER_SESSION: 'sparti-user-session',
  /** Short-lived access key for passwordless auth. */
  ACCESS_KEY: 'sparti-access-key',
  /** Currently selected tenant ID across sessions. */
  CURRENT_TENANT_ID: 'sparti-current-tenant-id',
  /** Global tenant API key (used when no per-tenant key exists). */
  TENANT_API_KEY: 'sparti-tenant-api-key',
  /**
   * Per-tenant API key template function.
   * @example STORAGE_KEYS.tenantApiKey('tenant-gosg') // 'sparti-tenant-api-key-tenant-gosg'
   */
  tenantApiKey: (tenantId: string) => `sparti-tenant-api-key-${tenantId}`,
  /** Demo credentials stored during createAdminUser (dev only). */
  DEMO_CREDENTIALS: 'sparti-demo-credentials',
} as const;



