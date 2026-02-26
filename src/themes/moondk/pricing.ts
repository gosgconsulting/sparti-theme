export interface PriceValue {
  amount: number;
  currencyCode: string;
}

/**
 * Returns a variant unit price in major currency units.
 * Input: Medusa variant object.
 * Output: numeric amount (e.g. 15 for $15.00).
 */
export function getVariantPriceAmount(variant: any): number {
  const calculatedAmount = variant?.calculated_price?.calculated_amount;
  if (typeof calculatedAmount === "number" && Number.isFinite(calculatedAmount)) {
    return calculatedAmount;
  }

  if (variant?.prices?.length > 0 && typeof variant.prices[0]?.amount === "number") {
    return variant.prices[0].amount / 100;
  }

  return 0;
}

/**
 * Returns variant currency code if available.
 * Input: Medusa variant object.
 * Output: ISO currency code (lowercase) or undefined.
 */
export function getVariantCurrencyCode(variant: any): string | undefined {
  const calculatedCurrency = variant?.calculated_price?.currency_code;
  if (typeof calculatedCurrency === "string" && calculatedCurrency.length > 0) {
    return calculatedCurrency;
  }

  const legacyCurrency = variant?.prices?.[0]?.currency_code;
  if (typeof legacyCurrency === "string" && legacyCurrency.length > 0) {
    return legacyCurrency;
  }

  return undefined;
}

/**
 * Returns the lowest-priced variant for a product.
 * Input: Medusa product object.
 * Output: price + currency, or null when no valid price exists.
 */
export function getLowestProductPrice(product: any): PriceValue | null {
  if (!product?.variants?.length) return null;

  let lowest: PriceValue | null = null;

  for (const variant of product.variants) {
    const amount = getVariantPriceAmount(variant);
    if (amount <= 0) continue;

    const currencyCode = (getVariantCurrencyCode(variant) || "usd").toUpperCase();
    if (!lowest || amount < lowest.amount) {
      lowest = { amount, currencyCode };
    }
  }

  return lowest;
}

/**
 * Returns selected variant price when possible, otherwise product lowest price.
 * Input: Medusa product + selected variant objects.
 * Output: price + currency, or null when no valid price exists.
 */
export function getDisplayProductPrice(product: any, selectedVariant?: any): PriceValue | null {
  if (selectedVariant) {
    const amount = getVariantPriceAmount(selectedVariant);
    if (amount > 0) {
      return {
        amount,
        currencyCode: (getVariantCurrencyCode(selectedVariant) || "usd").toUpperCase(),
      };
    }
  }

  return getLowestProductPrice(product);
}
