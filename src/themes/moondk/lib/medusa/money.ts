/** Shared Medusa Store API money parsing / display (cart line items, variants). */

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

export function formatMedusaCurrencyAmount(amount: number, currencyCode: string): string {
  const code = currencyCode.length === 3 ? currencyCode.toUpperCase() : "USD";
  try {
    return new Intl.NumberFormat("en-SG", { style: "currency", currency: code }).format(amount);
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
}

/** Cart line `unit_price` (amount + currency_code). */
export function moneyFromLineItemUnitPrice(unitPrice: unknown): { amount: number; currency: string } | null {
  const o = asRecord(unitPrice);
  if (!o) return null;
  const amount = o.amount;
  const currency = typeof o.currency_code === "string" ? o.currency_code : "usd";
  const n = typeof amount === "number" ? amount : typeof amount === "string" ? parseFloat(amount) : NaN;
  if (!Number.isFinite(n)) return null;
  return { amount: n, currency };
}

/** Variant `calculated_price` (calculated_amount + currency_code). */
export function moneyFromVariantCalculatedPrice(variant: Record<string, unknown>): {
  amount: number;
  currency: string;
} | null {
  const cp = asRecord(variant.calculated_price);
  if (!cp) return null;
  const raw = cp.calculated_amount;
  const currency = String(cp.currency_code ?? "usd");
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return { amount: raw, currency };
  }
  if (typeof raw === "string") {
    const n = parseFloat(raw);
    if (Number.isFinite(n)) return { amount: n, currency };
  }
  return null;
}

/** First entry in variant `prices[]` (amount + currency_code). */
export function moneyFromVariantPrices(prices: unknown): { amount: number; currency: string } | null {
  if (!Array.isArray(prices) || prices.length === 0) return null;
  const first = asRecord(prices[0]);
  if (!first) return null;
  const amount = first.amount;
  const currency = typeof first.currency_code === "string" ? first.currency_code : "usd";
  const n = typeof amount === "number" ? amount : typeof amount === "string" ? parseFloat(amount) : NaN;
  if (!Number.isFinite(n)) return null;
  return { amount: n, currency };
}

/**
 * Display price for a cart line: prefer line `unit_price`, then variant calculated price, then variant prices.
 */
export function formatCartLineDisplayPrice(
  lineItem: Record<string, unknown>,
  variant: Record<string, unknown> | null,
): string {
  const fromUnit = moneyFromLineItemUnitPrice(lineItem.unit_price);
  if (fromUnit) return formatMedusaCurrencyAmount(fromUnit.amount, fromUnit.currency);
  if (variant) {
    const fromCalc = moneyFromVariantCalculatedPrice(variant);
    if (fromCalc) return formatMedusaCurrencyAmount(fromCalc.amount, fromCalc.currency);
    const fromPrices = moneyFromVariantPrices(variant.prices);
    if (fromPrices) return formatMedusaCurrencyAmount(fromPrices.amount, fromPrices.currency);
  }
  return "—";
}

/**
 * Parse formatted storefront prices (e.g. "S$32.00", "US$1,234.50", "$37") for cart/checkout math.
 * Must match strings from `formatMedusaCurrencyAmount` / `Intl.NumberFormat` (not raw API minor units).
 */
export function parseMoondkDisplayPriceForSum(price: string): number {
  const s = String(price).trim();
  if (!s || s === "—") return 0;
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Normalize API money for display (handles integer minor units heuristically). */
export function medusaDisplayAmount(raw: unknown): number {
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? parseFloat(raw) : NaN;
  if (!Number.isFinite(n)) return 0;
  if (Number.isInteger(n) && Math.abs(n) >= 1000) return n / 100;
  return n;
}
