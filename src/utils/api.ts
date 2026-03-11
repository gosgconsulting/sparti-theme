/**
 * API utility for consistent API calls.
 * In development, uses relative URLs to leverage Vite proxy.
 * In production, defaults to same-origin unless VITE_API_BASE_URL is explicitly set.
 */

import { STORAGE_KEYS } from '@/utils/constants';

const getApiBaseUrl = () => {
  const raw = String(import.meta.env.VITE_API_BASE_URL || 'https://cms.sparti.ai').trim();
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    return `https://${raw}`;
  }
  return raw;
};

const API_BASE_URL = getApiBaseUrl();

// ----- Auth header helpers -----

const getAuthToken = (): string | null => {
  const session = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
  if (!session) return null;
  try {
    return JSON.parse(session)?.token ?? null;
  } catch {
    console.error('Error parsing session data');
    return null;
  }
};

const getAccessKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_KEY);
};

const getTenantApiKey = (tenantId?: string): string | null => {
  if (tenantId) {
    const tenantSpecificKey = localStorage.getItem(STORAGE_KEYS.tenantApiKey(tenantId));
    if (tenantSpecificKey) return tenantSpecificKey;
  }
  return localStorage.getItem(STORAGE_KEYS.TENANT_API_KEY);
};

const getAuthHeaders = (
  additionalHeaders: Record<string, string> = {},
  tenantId?: string
): Record<string, string> => {
  const token = getAuthToken();
  const accessKey = getAccessKey();
  const tenantApiKey = getTenantApiKey(tenantId);

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(accessKey && { 'X-Access-Key': accessKey }),
    ...(tenantApiKey && { 'X-Tenant-API-Key': tenantApiKey }),
    // Also support X-API-Key for backward compatibility
    ...(tenantApiKey && { 'X-API-Key': tenantApiKey }),
    // Automatically add X-Tenant-Id header if tenantId is provided
    ...(tenantId && { 'X-Tenant-Id': tenantId }),
    ...additionalHeaders,
  };
};

// ----- Public API -----

/** Build full API URL for use with fetch — prepends VITE_API_BASE_URL when set */
export const getApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Resolve backend asset paths (e.g. /uploads/...) to full URLs using the API base.
 * Use for branding images (logo, favicon) so they load from the backend on static deploy.
 */
export const resolveBackendAssetUrl = (path: string): string => {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads/')) return getApiUrl(path);
  return path;
};

export const api = {
  getBaseUrl: () => API_BASE_URL,
  getApiUrl,
  getTenantApiKey: (tenantId?: string) => getTenantApiKey(tenantId),

  get: async (endpoint: string, options?: RequestInit & { tenantId?: string }) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const { headers: additionalHeaders, tenantId, ...restOptions } = options || {};
    return fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(additionalHeaders as Record<string, string>, tenantId),
      ...restOptions,
    });
  },

  post: async (endpoint: string, data?: any, options?: RequestInit & { tenantId?: string }) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const { headers: additionalHeaders, tenantId, ...restOptions } = options || {};
    return fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(additionalHeaders as Record<string, string>, tenantId),
      body: data ? JSON.stringify(data) : undefined,
      ...restOptions,
    });
  },

  put: async (endpoint: string, data?: any, options?: RequestInit & { tenantId?: string }) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const { headers: additionalHeaders, tenantId, ...restOptions } = options || {};
    return fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(additionalHeaders as Record<string, string>, tenantId),
      body: data ? JSON.stringify(data) : undefined,
      ...restOptions,
    });
  },

  delete: async (endpoint: string, options?: RequestInit & { tenantId?: string }) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const { headers: additionalHeaders, tenantId, ...restOptions } = options || {};
    return fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(additionalHeaders as Record<string, string>, tenantId),
      ...restOptions,
    });
  },
};

export default api;