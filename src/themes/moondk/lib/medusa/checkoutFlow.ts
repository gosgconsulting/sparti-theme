import { getMoondkMedusa } from "./client";
import { isMedusaOrderPlaced } from "@/lib/medusa";
import { MOONDK_MEDUSA_CART_RETRIEVE_FIELDS } from "./fields";
import { debugError } from "@/utils/debugLogger";
import { pickDefaultMedusaPaymentProviderId } from "./paymentProviderDefaults";

function hostedPaymentCheckoutUrl(cart: unknown): string | null {
  const c = cart as Record<string, unknown> | null;
  const pc = c?.payment_collection as Record<string, unknown> | undefined;
  const sessions = pc?.payment_sessions as unknown[] | undefined;
  if (!Array.isArray(sessions)) return null;
  for (const s of sessions) {
    const sess = s as Record<string, unknown>;
    const data = sess?.data as Record<string, unknown> | undefined;
    const url = data?.url;
    if (typeof url === "string" && /^https?:\/\//i.test(url)) return url;
  }
  return null;
}

function countryCode(country: string): string {
  const m: Record<string, string> = {
    Singapore: "sg",
    Malaysia: "my",
    "United States": "us",
    "South Korea": "kr",
  };
  return m[country] ?? (country.length === 2 ? country.toLowerCase() : "sg");
}

export type MedusaCheckoutAddressInput = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export type MoondkMedusaCheckoutResult =
  | { ok: true; flow: "order_placed" }
  | { ok: true; flow: "redirect"; redirectUrl: string }
  | { ok: false; message: string };

/**
 * After HitPay redirects back, the Medusa webhook captures payment; poll `cart.complete` until it returns an order.
 */
export type PollMoondkMedusaCartResult =
  | { ok: true; orderId: string }
  | { ok: false; message: string; pending?: boolean };

export async function pollMoondkMedusaCartToOrder(
  cartId: string,
  options?: { maxAttempts?: number; initialDelayMs?: number; retryDelayMs?: number },
): Promise<PollMoondkMedusaCartResult> {
  const api = getMoondkMedusa();
  const maxAttempts = options?.maxAttempts ?? 28;
  const initialDelayMs = options?.initialDelayMs ?? 600;
  const retryDelayMs = options?.retryDelayMs ?? 1200;

  for (let i = 0; i < maxAttempts; i++) {
    if (i === 0) {
      await new Promise((r) => setTimeout(r, initialDelayMs));
    } else {
      await new Promise((r) => setTimeout(r, retryDelayMs));
    }
    try {
      const result = await api.cart.complete(cartId, { fields: "id,*items" });
      if (isMedusaOrderPlaced(result as { type: string })) {
        const order = result as { order?: { id?: string } };
        return { ok: true, orderId: order.order?.id ?? "" };
      }
    } catch (e) {
      debugError("pollMoondkMedusaCartToOrder attempt failed:", e);
    }
  }

  return {
    ok: false,
    message:
      "We could not confirm the order yet. If you were charged, check your email or contact support. You can also refresh this page.",
    pending: true,
  };
}

export async function runMoondkMedusaCheckout(params: {
  cartId: string;
  email: string;
  shipping: MedusaCheckoutAddressInput;
  billing?: MedusaCheckoutAddressInput | null;
  shippingOptionId: string;
  /** Selected Store payment provider id (e.g. pp_hitpay_hitpay). */
  paymentProviderId?: string;
}): Promise<MoondkMedusaCheckoutResult> {
  const api = getMoondkMedusa();
  const { cartId, email, shipping, billing, shippingOptionId, paymentProviderId: selectedProvider } = params;

  try {
    await api.cart.update(
      cartId,
      {
        email,
        shipping_address: {
          first_name: shipping.firstName,
          last_name: shipping.lastName,
          address_1: shipping.address,
          city: shipping.city,
          country_code: countryCode(shipping.country),
          postal_code: shipping.postalCode,
          ...(shipping.phone ? { phone: shipping.phone } : {}),
        },
        ...(billing
          ? {
              billing_address: {
                first_name: billing.firstName,
                last_name: billing.lastName,
                address_1: billing.address,
                city: billing.city,
                country_code: countryCode(billing.country),
                postal_code: billing.postalCode,
                ...(billing.phone ? { phone: billing.phone } : {}),
              },
            }
          : {}),
      },
      { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
    );

    await api.cart.addShippingMethod(
      cartId,
      { option_id: shippingOptionId },
      { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
    );

    const { cart } = await api.cart.retrieve(cartId, { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS });
    if (!cart?.region_id) {
      return { ok: false, message: "Cart has no region." };
    }

    const envPid = import.meta.env.VITE_MEDUSA_PAYMENT_PROVIDER_ID?.trim() ?? null;
    const { payment_providers } = await api.checkout.listPaymentProviders({
      region_id: cart.region_id,
    });
    const providers = (payment_providers ?? []) as { id?: string }[];
    const providerIds = providers.map((p) => p.id).filter((id): id is string => typeof id === "string" && id.length > 0);
    const chosen = selectedProvider?.trim();
    const provider_id =
      chosen && providerIds.includes(chosen)
        ? chosen
        : pickDefaultMedusaPaymentProviderId(providerIds, envPid);
    if (!provider_id) {
      return { ok: false, message: "No payment provider available for this region." };
    }

    await api.checkout.initiatePaymentSession(cart, { provider_id });

    const { cart: withPayment } = await api.cart.retrieve(cartId, {
      fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS,
    });
    const redirectUrl = hostedPaymentCheckoutUrl(withPayment);
    if (redirectUrl) {
      return { ok: true, flow: "redirect", redirectUrl };
    }

    const result = await api.cart.complete(cartId, { fields: "id,*items" });
    if (isMedusaOrderPlaced(result as { type: string })) {
      return { ok: true, flow: "order_placed" };
    }
    const fail = result as { type?: string; error?: { message?: string } };
    const msg = fail.error?.message ?? "Could not complete cart.";
    debugError("Medusa cart.complete returned cart/error:", fail);
    return { ok: false, message: msg };
  } catch (e) {
    debugError("runMoondkMedusaCheckout failed:", e);
    const msg = e instanceof Error ? e.message : "Checkout failed.";
    return { ok: false, message: msg };
  }
}
