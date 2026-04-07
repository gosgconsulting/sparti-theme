import Medusa, { type Config } from '@medusajs/js-sdk';

export type MedusaClientOptions = Pick<
  Config,
  'globalHeaders' | 'auth' | 'debug'
> & {
  /** Medusa server origin, e.g. `https://localhost:9000`. Defaults to `VITE_MEDUSA_BACKEND_URL`. */
  baseUrl?: string;
  /** Store publishable API key. Defaults to `VITE_MEDUSA_PUBLISHABLE_KEY` when set. */
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

export function createMedusaClient(options: MedusaClientOptions = {}): Medusa {
  const baseUrl =
    options.baseUrl != null && options.baseUrl.trim() !== ''
      ? normalizeBaseUrl(options.baseUrl)
      : resolveMedusaBaseUrl();

  const envKey = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY?.trim();
  const publishableKey =
    options.publishableKey?.trim() || (envKey ? envKey : undefined);

  const config: Config = {
    baseUrl,
    ...(publishableKey ? { publishableKey } : {}),
    ...(options.globalHeaders ? { globalHeaders: options.globalHeaders } : {}),
    ...(options.auth ? { auth: options.auth } : {}),
    ...(options.debug !== undefined ? { debug: options.debug } : {}),
  };

  return new Medusa(config);
}
