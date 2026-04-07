import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../../contexts/CartContext";
import {
  FALLBACK_PRODUCT_DISPLAY_NAME,
  getProductByRouteId,
  productShowsLowStockBadge,
} from "../category/products";
import { AddToBagNotification } from "../ui/AddToBagNotification";
import { ProductDetailBreadcrumb } from "./ProductDetailBreadcrumb";
import { isMoondkMedusaEnabled } from "../../lib/medusa";
import { useMoondkMedusaProductQuery } from "../../hooks/useMoondkMedusaCatalog";

interface ProductInfoProps {
  productId?: string;
}

function splitProductDisplayTitle(name: string): { primary: string; paren?: string } {
  const t = name.trim();
  const m = t.match(/^(.+?)\s+\(([^)]+)\)\s*$/);
  if (!m) return { primary: t };
  return { primary: m[1].trim(), paren: m[2].trim() };
}

const ProductInfo = ({ productId }: ProductInfoProps) => {
  const medusa = isMoondkMedusaEnabled();
  const { data: medusaView, isLoading, isError } = useMoondkMedusaProductQuery(
    medusa ? productId : undefined,
  );

  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const staticProduct = medusa ? undefined : getProductByRouteId(productId);

  const productName = medusa
    ? medusaView?.name ?? FALLBACK_PRODUCT_DISPLAY_NAME
    : staticProduct?.name ?? FALLBACK_PRODUCT_DISPLAY_NAME;
  const productPrice = medusa ? medusaView?.price || "—" : staticProduct?.price || "$37";
  const productImage = medusa ? medusaView?.image || "" : staticProduct?.image || "";
  const productCategory = medusa
    ? medusaView?.category || "Product"
    : staticProduct?.category || "Product";
  const variantId = medusa ? medusaView?.variantId : undefined;

  const showLowStock = medusa
    ? productId
      ? productShowsLowStockBadge(productId)
      : false
    : staticProduct
      ? productShowsLowStockBadge(staticProduct.id)
      : false;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToBag = async () => {
    await addToCart(
      {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity,
        category: productCategory,
        ...(variantId ? { variantId } : {}),
      },
      false,
    );
    setShowNotification(true);
  };

  const { primary: titlePrimary, paren: titleParen } = splitProductDisplayTitle(productName);

  if (medusa && isLoading) {
    return (
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-11">
        <p className="text-sm font-body font-light text-foreground/70">Loading product…</p>
      </div>
    );
  }

  if (medusa && isError) {
    return (
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-11">
        <p className="text-sm text-destructive">Could not load this product from Medusa.</p>
      </div>
    );
  }

  if (medusa && !medusaView) {
    return (
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-11">
        <p className="text-sm font-body font-light text-foreground/70">Product not found.</p>
      </div>
    );
  }

  const showCategoryEyebrow = medusa
    ? productCategory !== "Product"
    : staticProduct && productCategory !== "Product";

  return (
    <>
      <AddToBagNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        productName={productName}
      />
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-11">
        <div className="flex flex-col gap-5 md:gap-6">
          <ProductDetailBreadcrumb productName={productName} className="hidden lg:block" />

          <div className="flex flex-col gap-4 md:gap-5">
            {showCategoryEyebrow && (
              <p className="text-[11px] font-body font-medium uppercase tracking-[0.14em] text-foreground/42">
                {productCategory}
              </p>
            )}

            {titleParen ? (
              <h1 className="text-balance text-foreground">
                <span className="block text-[1.4375rem] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[1.5625rem] md:text-[1.6875rem]">
                  {titlePrimary}
                </span>
                <span className="mt-2 block text-sm font-normal leading-relaxed text-foreground/65 sm:text-[0.9375rem] md:text-base">
                  ({titleParen})
                </span>
              </h1>
            ) : (
              <h1 className="text-balance text-[1.4375rem] font-medium leading-[1.3] tracking-[-0.02em] text-foreground sm:text-[1.5625rem] md:text-[1.6875rem]">
                {titlePrimary}
              </h1>
            )}

            <p className="pt-1 text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-[1.625rem] md:text-[1.75rem]">
              {productPrice}
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <span className="shrink-0 text-xs font-medium text-foreground/48">Quantity</span>
                <div
                  className="inline-flex h-10 shrink-0 items-stretch overflow-hidden rounded-lg border border-border/16 bg-background"
                  role="group"
                  aria-label="Adjust quantity"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    className="h-10 w-10 shrink-0 rounded-none border-0 bg-transparent p-0 text-foreground/65 shadow-none transition-colors hover:!bg-transparent hover:text-foreground active:!bg-transparent focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </Button>
                  <span className="flex h-10 min-w-[2.75rem] items-center justify-center border-x border-border/12 bg-background px-3 text-sm font-medium tabular-nums text-foreground">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={incrementQuantity}
                    className="h-10 w-10 shrink-0 rounded-none border-0 bg-transparent p-0 text-foreground/65 shadow-none transition-colors hover:!bg-transparent hover:text-foreground active:!bg-transparent focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </Button>
                </div>
              </div>

              {showLowStock && (
                <div
                  className="flex w-full items-center gap-2 rounded-lg border border-primary/18 bg-primary/[0.07] px-3 py-2 sm:w-auto sm:py-1.5"
                  role="status"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                    Low stock
                  </span>
                  <span className="text-[11px] font-normal text-foreground/55">· Few units left</span>
                </div>
              )}
            </div>

            <Button
              type="button"
              disabled={medusa && !variantId}
              className="h-auto min-h-[3rem] w-full rounded-full bg-primary px-6 py-3.5 text-[0.9375rem] font-semibold tracking-wide text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary hover:shadow-md hover:brightness-[1.04] active:translate-y-px active:shadow-sm active:brightness-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              onClick={() => void handleAddToBag()}
            >
              Add to Bag
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
