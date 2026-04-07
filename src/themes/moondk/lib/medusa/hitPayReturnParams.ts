/** HitPay appends `reference` (payment request id) and `status` to `redirect_url`. */
export function isMoondkHitPayReturnSearchParams(search: URLSearchParams): boolean {
  if (search.get("hitpay_return") === "1") return true;
  const status = search.get("status");
  const ref = search.get("reference");
  return Boolean(status && ref);
}

/** Dedicated storefront return path (set `HITPAY_REDIRECT_URL` to …/checkout/hitpay/callback). */
export function isMoondkHitPayCallbackPathname(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p.endsWith("/checkout/hitpay/callback");
}
