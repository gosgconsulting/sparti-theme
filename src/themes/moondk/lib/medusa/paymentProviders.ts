import { getMoondkMedusa } from "./client";
import { labelMedusaPaymentProviderId } from "./paymentProviderDefaults";

export type MedusaPaymentProviderOption = { id: string; label: string };

export { labelMedusaPaymentProviderId, pickDefaultMedusaPaymentProviderId } from "./paymentProviderDefaults";

export async function fetchMoondkMedusaPaymentProviderOptions(
  regionId: string,
): Promise<MedusaPaymentProviderOption[]> {
  const api = getMoondkMedusa();
  const { payment_providers } = await api.checkout.listPaymentProviders({ region_id: regionId });
  const raw = (payment_providers ?? []) as { id?: string }[];
  const ids = raw.map((p) => p.id).filter((id): id is string => typeof id === "string" && id.length > 0);
  return ids.map((id) => ({ id, label: labelMedusaPaymentProviderId(id) }));
}
