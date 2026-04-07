import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductDescription from "../components/product/ProductDescription";
import ProductCarousel from "../components/content/ProductCarousel";
import { ProductDetailBreadcrumb } from "../components/product/ProductDetailBreadcrumb";
import { FALLBACK_PRODUCT_DISPLAY_NAME, getProductByRouteId } from "../components/category/products";
import { isMoondkMedusaEnabled } from "../lib/medusa";
import { useMoondkMedusaProductQuery } from "../hooks/useMoondkMedusaCatalog";

export default function ProductDetailPage({ productId }: { productId: string }) {
  const medusa = isMoondkMedusaEnabled();
  const { data: medusaProduct } = useMoondkMedusaProductQuery(medusa ? productId : undefined);
  const staticProduct = medusa ? undefined : getProductByRouteId(productId);
  const productName = medusa
    ? medusaProduct?.name ?? FALLBACK_PRODUCT_DISPLAY_NAME
    : staticProduct?.name ?? FALLBACK_PRODUCT_DISPLAY_NAME;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const remoteGallery =
    medusa && medusaProduct?.galleryImages?.length ? medusaProduct.galleryImages : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <section className="w-full px-6">
          <ProductDetailBreadcrumb productName={productName} className="lg:hidden mb-8 md:mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery productId={productId} remoteImageUrls={remoteGallery} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo productId={productId} />
              <ProductDescription
                productId={productId}
                isMedusaProduct={Boolean(medusa && medusaProduct)}
                medusaDescription={medusaProduct?.description}
              />
            </div>
          </div>
        </section>

        <section className="w-full mt-20 lg:mt-24">
          <div className="mb-6 px-6 flex items-center justify-between">
            <h2 className="text-lg font-heading font-medium text-foreground">You might also like</h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="h-10 w-10 rounded-full border border-border/60 bg-background hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Previous"
                onClick={() => carouselApi?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="h-10 w-10 rounded-full border border-border/60 bg-background hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Next"
                onClick={() => carouselApi?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ProductCarousel excludeProductId={productId} onApiChange={setCarouselApi} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
