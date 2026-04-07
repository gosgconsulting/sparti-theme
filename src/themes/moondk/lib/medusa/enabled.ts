/** True when moondk should use Medusa for catalog/cart/checkout (see `VITE_MEDUSA_BACKEND_URL`). */
export function isMoondkMedusaEnabled(): boolean {
  return Boolean(String(import.meta.env.VITE_MEDUSA_BACKEND_URL ?? "").trim());
}
