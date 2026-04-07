import { medusaAssetUrl } from "./assetUrl";
import type { CartItem } from "../../components/header/ShoppingBag";

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

function formatLineUnitPrice(unitPrice: unknown): string {
  const o = asRecord(unitPrice);
  if (!o) return "—";
  const amount = o.amount;
  const currency = typeof o.currency_code === "string" ? o.currency_code : "usd";
  const n = typeof amount === "number" ? amount : typeof amount === "string" ? parseFloat(amount) : NaN;
  if (!Number.isFinite(n)) return "—";
  const code = currency.length === 3 ? currency.toUpperCase() : "USD";
  try {
    return new Intl.NumberFormat("en-SG", { style: "currency", currency: code }).format(n);
  } catch {
    return `${code} ${n.toFixed(2)}`;
  }
}

/** Map Store cart line items to moondk `CartItem` (id = line item id). */
export function mapMedusaCartLineItemsToCartItems(items: unknown[] | undefined): CartItem[] {
  if (!Array.isArray(items)) return [];
  const base = medusaPublicBase();

  return items.map((raw) => {
    const li = asRecord(raw);
    const id = typeof li?.id === "string" ? li.id : String(li?.id ?? "");
    const title = typeof li?.title === "string" ? li.title : "Item";
    const qty = typeof li?.quantity === "number" && li.quantity > 0 ? li.quantity : 1;
    const variant = asRecord(li?.variant);
    const variantId = variant && typeof variant.id === "string" ? variant.id : undefined;
    const product = variant ? asRecord(variant.product) : asRecord(li?.product);
    const cats = product && Array.isArray(product.categories) ? product.categories : [];
    const c0 = asRecord(cats[0]);
    const category = typeof c0?.name === "string" && c0.name.trim() ? c0.name.trim() : "Product";

    const thumb =
      typeof li?.thumbnail === "string" && li.thumbnail
        ? medusaAssetUrl(li.thumbnail, base)
        : "";
    const prodThumb =
      product && typeof product.thumbnail === "string" && product.thumbnail
        ? medusaAssetUrl(product.thumbnail, base)
        : "";
    const image = thumb || prodThumb || "";

    const price = formatLineUnitPrice(li?.unit_price);

    return {
      id,
      name: title,
      price,
      image,
      quantity: qty,
      category,
      lineItemId: id,
      variantId,
    };
  });
}
