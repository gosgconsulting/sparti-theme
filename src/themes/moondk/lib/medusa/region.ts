import { getMoondkMedusa } from "./client";
import { debugError } from "@/utils/debugLogger";

const ENV_REGION = () => String(import.meta.env.VITE_MEDUSA_REGION_ID ?? "").trim();

let cachedRegionId: string | null = null;

/**
 * Region for cart.create. Uses VITE_MEDUSA_REGION_ID or first region from the API.
 */
export async function resolveMoondkMedusaRegionId(): Promise<string> {
  const fromEnv = ENV_REGION();
  if (fromEnv) return fromEnv;

  if (cachedRegionId) return cachedRegionId;

  try {
    const api = getMoondkMedusa();
    const { regions } = await api.regions.list({ limit: 50 });
    const first = regions?.[0]?.id;
    if (!first) {
      throw new Error("No regions returned from Medusa");
    }
    cachedRegionId = first;
    return first;
  } catch (e) {
    debugError("resolveMoondkMedusaRegionId failed:", e);
    throw e;
  }
}

export function clearMoondkMedusaRegionCache(): void {
  cachedRegionId = null;
}
