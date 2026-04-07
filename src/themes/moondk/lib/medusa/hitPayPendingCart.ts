/** Survives full page navigation to HitPay and CartProvider clearing localStorage after the cart is completed. */
const SESSION_KEY = "moondk_hitpay_pending_cart_id";

export function storeMoondkHitPayPendingCartId(cartId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, cartId.trim());
  } catch {
    /* quota / private mode */
  }
}

export function readMoondkHitPayPendingCartId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(SESSION_KEY);
    return v && v.trim() ? v.trim() : null;
  } catch {
    return null;
  }
}

export function clearMoondkHitPayPendingCartId(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
