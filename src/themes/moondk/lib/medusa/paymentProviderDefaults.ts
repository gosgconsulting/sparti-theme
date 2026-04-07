export function labelMedusaPaymentProviderId(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes("hitpay")) return "HitPay";
  if (lower.includes("stripe")) return "Stripe";
  if (lower.includes("system_default")) return "Manual payment";
  return id.replace(/^pp_/, "").replace(/_/g, " ");
}

/** Prefer env id if valid, then any HitPay provider, then first in list. */
export function pickDefaultMedusaPaymentProviderId(
  ids: string[],
  envPreferred?: string | null,
): string | null {
  if (ids.length === 0) return null;
  const env = envPreferred?.trim();
  if (env && ids.includes(env)) return env;
  const hitpay = ids.find((i) => i.toLowerCase().includes("hitpay"));
  if (hitpay) return hitpay;
  return ids[0] ?? null;
}
