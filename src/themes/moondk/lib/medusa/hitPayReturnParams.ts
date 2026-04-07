/** HitPay appends `reference` (payment request id) and `status` to `redirect_url`. */
export function isMoondkHitPayReturnSearchParams(search: URLSearchParams): boolean {
  if (search.get("hitpay_return") === "1") return true;
  const status = search.get("status");
  const ref = search.get("reference");
  return Boolean(status && ref);
}
