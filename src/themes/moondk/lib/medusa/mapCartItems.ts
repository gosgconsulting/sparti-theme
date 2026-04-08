import { medusaAssetUrl } from "./assetUrl";
import { formatCartLineDisplayPrice } from "./money";
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

    const price = formatCartLineDisplayPrice(li ?? {}, variant);

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

/**
 * When the cart API omits line `unit_price`, fill display price from the PDP row (same variant) so the bag/checkout stay usable.
 */
export function applyMedusaCartPriceHint(
  items: CartItem[],
  hint: { variantId?: string; price: string },
): CartItem[] {
  const { variantId, price } = hint;
  if (!variantId || !price || price === "—") return items;
  return items.map((row) =>
    row.price === "—" && row.variantId === variantId ? { ...row, price } : row,
  );
}

/** Keep prior UI prices when a cart refresh still omits `unit_price` (same line id or variant). */
export function preserveMedusaCartDisplayPrices(mapped: CartItem[], previous: CartItem[]): CartItem[] {
  return mapped.map((row) => {
    if (row.price !== "—") return row;
    const byId = previous.find((p) => p.id === row.id && p.price !== "—");
    if (byId) return { ...row, price: byId.price };
    if (row.variantId) {
      const byVar = previous.find((p) => p.variantId === row.variantId && p.price !== "—");
      if (byVar) return { ...row, price: byVar.price };
    }
    return row;
  });
}
