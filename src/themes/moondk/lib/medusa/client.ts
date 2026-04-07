import { createMedusaStorefront, type MedusaCommerce } from "@/lib/medusa";
import { isMoondkMedusaEnabled } from "./enabled";

let storefront: MedusaCommerce | null = null;

/** Lazy singleton; only call when `isMoondkMedusaEnabled()` is true. */
export function getMoondkMedusa(): MedusaCommerce {
  if (!isMoondkMedusaEnabled()) {
    throw new Error("getMoondkMedusa: VITE_MEDUSA_BACKEND_URL is not set");
  }
  if (!storefront) {
    storefront = createMedusaStorefront();
  }
  return storefront;
}
