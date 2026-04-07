export {
  createMedusaClient,
  resolveMedusaBaseUrl,
  type MedusaClientOptions,
} from './client';
export {
  createMedusaCommerce,
  isMedusaOrderPlaced,
  type MedusaCommerce,
} from './commerce';

import { createMedusaClient } from './client';
import { createMedusaCommerce } from './commerce';
import type { MedusaClientOptions } from './client';

/** One-step: configured JS SDK client + grouped Store methods. */
export function createMedusaStorefront(options?: MedusaClientOptions) {
  return createMedusaCommerce(createMedusaClient(options));
}
