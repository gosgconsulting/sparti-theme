import { getMoondkMedusa } from "./client";
import { isMedusaOrderPlaced } from "@/lib/medusa";
import { MOONDK_MEDUSA_CART_RETRIEVE_FIELDS } from "./fields";
import { debugError } from "@/utils/debugLogger";

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

export async function runMoondkMedusaCheckout(params: {
  cartId: string;
  email: string;
  shipping: MedusaCheckoutAddressInput;
  billing?: MedusaCheckoutAddressInput | null;
  shippingOptionId: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const api = getMoondkMedusa();
  const { cartId, email, shipping, billing, shippingOptionId } = params;

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

    const envPid = import.meta.env.VITE_MEDUSA_PAYMENT_PROVIDER_ID?.trim();
    const { payment_providers } = await api.checkout.listPaymentProviders({
      region_id: cart.region_id,
    });
    const providers = (payment_providers ?? []) as { id?: string }[];
    const provider_id = envPid || providers[0]?.id;
    if (!provider_id) {
      return { ok: false, message: "No payment provider available for this region." };
    }

    await api.checkout.initiatePaymentSession(cart, { provider_id });

    const result = await api.cart.complete(cartId, { fields: "id,*items" });
    if (isMedusaOrderPlaced(result as { type: string })) {
      return { ok: true };
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
