import Medusa, { type Config } from '@medusajs/js-sdk';

/** Medusa Store API header; must match backend expectation. */
export const MEDUSA_PUBLISHABLE_KEY_HEADER = 'x-publishable-api-key' as const;

export type MedusaClientOptions = Pick<
  Config,
  'globalHeaders' | 'auth' | 'debug' | 'apiKey'
> & {
  /** Medusa server origin, e.g. `https://localhost:9000`. Defaults to `VITE_MEDUSA_BACKEND_URL`. */
  baseUrl?: string;
  /** Store publishable API key. Defaults to env (see `resolveMedusaPublishableKey`). */
  publishableKey?: string;
};

function normalizeBaseUrl(url: string): string {
  const t = url.trim().replace(/\/+$/, '');
  if (!t.startsWith('http://') && !t.startsWith('https://')) {
    return `https://${t}`;
  }
  return t;
}

export function resolveMedusaBaseUrl(override?: string): string {
  const raw = (override ?? import.meta.env.VITE_MEDUSA_BACKEND_URL ?? '').trim();
  if (!raw) {
    throw new Error(
      'Medusa base URL missing: set VITE_MEDUSA_BACKEND_URL or pass baseUrl to createMedusaClient()'
    );
  }
  return normalizeBaseUrl(raw);
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const v of values) {
    const t = v?.trim();
    if (t) return t;
  }
  return undefined;
}

/**
 * Publishable key for Store API (`x-publishable-api-key`).
 * Reads `options.publishableKey`, then `VITE_MEDUSA_PUBLISHABLE_KEY`, then `VITE_MEDUSA_PUBLISHABLE_API_KEY`.
 */
export function resolveMedusaPublishableKey(options: MedusaClientOptions = {}): string | undefined {
  return firstNonEmpty(
    options.publishableKey,
    import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
    import.meta.env.VITE_MEDUSA_PUBLISHABLE_API_KEY
  );
}

export function createMedusaClient(options: MedusaClientOptions = {}): Medusa {
  const baseUrl =
    options.baseUrl != null && options.baseUrl.trim() !== ''
      ? normalizeBaseUrl(options.baseUrl)
      : resolveMedusaBaseUrl();

  const publishableKey = resolveMedusaPublishableKey(options);
  const secretApiKey = options.apiKey?.trim();

  if (!publishableKey && !secretApiKey) {
    throw new Error(
      'Medusa Store API requires a publishable key. Set VITE_MEDUSA_PUBLISHABLE_KEY in .env (or pass publishableKey). ' +
        'Create the key in Medusa Admin → Settings → Publishable API Keys. Restart the Vite dev server after changing .env.'
    );
  }

  const globalHeaders: Config['globalHeaders'] = {
    ...(publishableKey ? { [MEDUSA_PUBLISHABLE_KEY_HEADER]: publishableKey } : {}),
    ...options.globalHeaders,
  };

  const config: Config = {
    baseUrl,
    ...(publishableKey ? { publishableKey } : {}),
    ...(secretApiKey ? { apiKey: secretApiKey } : {}),
    ...(Object.keys(globalHeaders).length > 0 ? { globalHeaders } : {}),
    ...(options.auth ? { auth: options.auth } : {}),
    ...(options.debug !== undefined ? { debug: options.debug } : {}),
  };

  return new Medusa(config);
}
