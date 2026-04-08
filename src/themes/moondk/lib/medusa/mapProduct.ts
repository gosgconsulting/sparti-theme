import { medusaAssetUrl } from "./assetUrl";

export interface MoondkMedusaProductView {
  id: string;
  name: string;
  price: string;
  image: string;
  /** All product images for gallery (URLs). */
  galleryImages: string[];
  /** First category name for display (eyebrow, cards). */
  category: string;
  /** All Medusa category names on this product (for filters; order may differ from list vs detail). */
  categoryNames: string[];
  /** Medusa category ids when present (match when API omits names on list). */
  categoryIds: string[];
  variantId: string;
  isNew?: boolean;
  /** Raw description for detail page */
  description?: string;
  createdAt?: string;
}

function medusaPublicBase(): string {
  const raw = String(import.meta.env.VITE_MEDUSA_BACKEND_URL ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/+$/, "");
  }
  return `https://${raw.replace(/\/+$/, "")}`;
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function extractVariantMoney(variant: Record<string, unknown>): { amount: number; currency: string } | null {
  const cp = asRecord(variant.calculated_price);
  if (cp) {
    const raw = cp.calculated_amount;
    const currency = String(cp.currency_code ?? "usd");
    if (typeof raw === "number" && Number.isFinite(raw)) {
      return { amount: raw, currency };
    }
    if (typeof raw === "string") {
      const n = parseFloat(raw);
      if (Number.isFinite(n)) return { amount: n, currency };
    }
  }
  return null;
}

function formatMoney(amount: number, currencyCode: string): string {
  const code = currencyCode.length === 3 ? currencyCode.toUpperCase() : "USD";
  try {
    return new Intl.NumberFormat("en-SG", { style: "currency", currency: code }).format(amount);
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
}

/**
 * Default variant: prefer purchasable variants, then lowest calculated price.
 * Documented choice for multi-variant products until a variant picker exists.
 */
export function pickDefaultVariant(variants: unknown): Record<string, unknown> | null {
  if (!Array.isArray(variants) || variants.length === 0) return null;
  const list = variants.map((v) => asRecord(v)).filter(Boolean) as Record<string, unknown>[];
  const purchasable = list.filter((v) => v.purchasable !== false);
  const pool = purchasable.length ? purchasable : list;

  const scored = pool.map((v) => {
    const m = extractVariantMoney(v);
    const amt = m?.amount ?? Number.POSITIVE_INFINITY;
    return { v, amt };
  });
  scored.sort((a, b) => a.amt - b.amt);
  return scored[0]?.v ?? null;
}

export function mapMedusaProductToView(product: unknown): MoondkMedusaProductView | null {
  const p = asRecord(product);
  if (!p || typeof p.id !== "string") return null;

  const base = medusaPublicBase();
  const variant = pickDefaultVariant(p.variants);
  if (!variant || typeof variant.id !== "string") return null;

  const money = extractVariantMoney(variant);
  const price = money ? formatMoney(money.amount, money.currency) : "—";

  const thumb =
    typeof p.thumbnail === "string" && p.thumbnail
      ? medusaAssetUrl(p.thumbnail, base)
      : "";
  const images = Array.isArray(p.images) ? p.images : [];
  const galleryImages: string[] = [];
  for (const img of images) {
    const ir = asRecord(img);
    if (ir && typeof ir.url === "string" && ir.url.trim()) {
      const u = medusaAssetUrl(ir.url, base);
      if (u) galleryImages.push(u);
    }
  }
  const firstImg = asRecord(images[0]);
  const imageFromImages =
    firstImg && typeof firstImg.url === "string" ? medusaAssetUrl(firstImg.url, base) : "";
  const image = thumb || imageFromImages || galleryImages[0] || "";

  const categories = Array.isArray(p.categories) ? p.categories : [];
  const categoryNames: string[] = [];
  const categoryIds: string[] = [];
  for (const cat of categories) {
    const cr = asRecord(cat);
    if (cr && typeof cr.id === "string" && cr.id.trim()) categoryIds.push(cr.id.trim());
    if (cr && typeof cr.name === "string" && cr.name.trim()) categoryNames.push(cr.name.trim());
  }
  const category = categoryNames[0] ?? "Product";

  const meta = asRecord(p.metadata);
  const isNew =
    meta?.is_new === true ||
    meta?.new === true ||
    (typeof meta?.is_new === "string" && meta.is_new === "true");

  const createdAt = typeof p.created_at === "string" ? p.created_at : undefined;
  const description = typeof p.description === "string" ? p.description : undefined;

  return {
    id: p.id,
    name: typeof p.title === "string" ? p.title : "Product",
    price,
    image,
    galleryImages: galleryImages.length ? galleryImages : image ? [image] : [],
    category,
    categoryNames,
    categoryIds,
    variantId: variant.id,
    isNew: Boolean(isNew),
    description,
    createdAt,
  };
}

export function mapMedusaProductsToViews(products: unknown[] | undefined): MoondkMedusaProductView[] {
  if (!Array.isArray(products)) return [];
  return products.map(mapMedusaProductToView).filter(Boolean) as MoondkMedusaProductView[];
}
