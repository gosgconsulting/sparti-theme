import { useQuery } from "@tanstack/react-query";
import { medusaClient } from "../services/medusa";

const DEFAULT_PRODUCT_FIELDS = "*variants.calculated_price,*variants.prices";
const ENV_REGION_ID = import.meta.env.VITE_MEDUSA_REGION_ID as string | undefined;

let cachedRegionId: string | undefined;
let pendingRegionLookup: Promise<string | undefined> | null = null;

type RegionCountry = {
    iso_2?: string | null;
};

type StoreRegion = {
    id: string;
    name?: string | null;
    countries?: RegionCountry[] | null;
};

const SEA_COUNTRY_CODES = new Set([
    "BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN",
]);

const EUROPE_COUNTRY_CODES = new Set([
    "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI",
    "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MD",
    "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI",
    "ES", "SE", "CH", "UA", "GB", "VA",
]);

/**
 * Extracts an ISO-2 country code from browser locale settings.
 * Input: none.
 * Output: uppercase country code (e.g. "SG") or undefined.
 */
function getBrowserCountryCode(): string | undefined {
    if (typeof navigator === "undefined") return undefined;

    const locales = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    for (const locale of locales) {
        const match = locale.match(/-([A-Za-z]{2})(?:-|$)/);
        if (match?.[1]) {
            return match[1].toUpperCase();
        }
    }

    return undefined;
}

/**
 * Returns browser timezone when available.
 * Input: none.
 * Output: IANA timezone string (e.g. "Asia/Singapore") or undefined.
 */
function getBrowserTimeZone(): string | undefined {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
        return undefined;
    }
}

/**
 * Scores region fit when exact country match is unavailable.
 * Input: region object and browser timezone.
 * Output: higher score means closer regional fit.
 */
function getRegionHeuristicScore(region: StoreRegion, timeZone?: string): number {
    const regionName = (region.name || "").toLowerCase();
    const countryCodes = (region.countries || [])
        .map((country) => (country.iso_2 || "").toUpperCase())
        .filter(Boolean);

    const hasSeaCountries = countryCodes.some((code) => SEA_COUNTRY_CODES.has(code));
    const hasEuropeCountries = countryCodes.some((code) => EUROPE_COUNTRY_CODES.has(code));

    let score = 0;

    if (timeZone?.startsWith("Asia/")) {
        if (hasSeaCountries) score += 60;
        if (regionName.includes("sea") || regionName.includes("southeast") || regionName.includes("asean")) {
            score += 20;
        }
    }

    if (timeZone?.startsWith("Europe/")) {
        if (hasEuropeCountries) score += 60;
        if (regionName.includes("europe") || regionName.includes("eu")) {
            score += 20;
        }
    }

    return score;
}

/**
 * Picks best region from available regions using country > nearest heuristic > first.
 * Input: list of store regions.
 * Output: best matching region id, or first region id when no better signal exists.
 */
function pickBestRegionId(regions: StoreRegion[]): string | undefined {
    if (!regions.length) return undefined;

    const browserCountry = getBrowserCountryCode();
    if (browserCountry) {
        const exactCountryRegion = regions.find((region) =>
            (region.countries || []).some(
                (country) => (country.iso_2 || "").toUpperCase() === browserCountry
            )
        );
        if (exactCountryRegion?.id) {
            return exactCountryRegion.id;
        }
    }

    const timeZone = getBrowserTimeZone();
    let bestRegion: StoreRegion | undefined;
    let bestScore = -1;

    for (const region of regions) {
        const score = getRegionHeuristicScore(region, timeZone);
        if (score > bestScore) {
            bestScore = score;
            bestRegion = region;
        }
    }

    if (bestRegion?.id && bestScore > 0) {
        return bestRegion.id;
    }

    return regions[0]?.id;
}

/**
 * Resolves a storefront region id for Medusa pricing context.
 * Input: none.
 * Output: region id string or undefined if unavailable.
 */
async function resolveRegionId(): Promise<string | undefined> {
    if (ENV_REGION_ID) return ENV_REGION_ID;
    if (cachedRegionId) return cachedRegionId;
    if (pendingRegionLookup) return pendingRegionLookup;

    pendingRegionLookup = medusaClient.regions
        .list()
        .then(({ regions }) => {
            cachedRegionId = pickBestRegionId((regions || []) as StoreRegion[]);
            return cachedRegionId;
        })
        .catch(() => undefined)
        .finally(() => {
            pendingRegionLookup = null;
        });

    return pendingRegionLookup;
}

/**
 * Adds pricing context fields used by Medusa Store API.
 * Input: existing query params and optional region id.
 * Output: query params enriched with region and fields.
 */
function withPricingParams(params: any, regionId?: string) {
    const nextParams = { ...(params || {}) };

    if (regionId && !nextParams.region_id) {
        nextParams.region_id = regionId;
    }

    if (typeof nextParams.fields !== "string" || nextParams.fields.length === 0) {
        nextParams.fields = DEFAULT_PRODUCT_FIELDS;
    } else {
        if (!nextParams.fields.includes("variants.calculated_price")) {
            nextParams.fields = `${nextParams.fields},*variants.calculated_price`;
        }
        if (!nextParams.fields.includes("variants.prices")) {
            nextParams.fields = `${nextParams.fields},*variants.prices`;
        }
    }

    return nextParams;
}

export const useProducts = (params = {}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const regionId = await resolveRegionId();
            const queryParams = withPricingParams(params, regionId);
            const { products, count } = await medusaClient.products.list(queryParams);
            return { products, count };
        },
    });
};

export const useCategories = (params = {}) => {
    return useQuery({
        queryKey: ["product_categories", params],
        queryFn: async () => {
            const { product_categories, count } = await medusaClient.productCategories.list(params);
            return { product_categories, count };
        },
    });
};

export const useProduct = (idOrHandle: string) => {
    return useQuery({
        queryKey: ["product", idOrHandle],
        queryFn: async () => {
            try {
                const regionId = await resolveRegionId();

                if (idOrHandle.startsWith("prod_")) {
                    const queryParams = withPricingParams({ id: idOrHandle }, regionId);
                    const { products } = await medusaClient.products.list(queryParams);
                    if (products && products.length > 0) {
                        return products[0];
                    }

                    // Fallback to retrieve in case id-based filtering differs by backend version.
                    const { product } = await medusaClient.products.retrieve(idOrHandle as any);
                    return product;
                }

                // For handles, list + pricing params gives consistent calculated pricing.
                const queryParams = withPricingParams({ handle: idOrHandle }, regionId);
                const { products } = await medusaClient.products.list(queryParams);
                if (products && products.length > 0) {
                    return products[0];
                }

                throw new Error(`Product with handle ${idOrHandle} not found`);
            } catch (err) {
                console.error("Error fetching product:", err);
                throw err;
            }
        },
        enabled: !!idOrHandle,
    });
};
