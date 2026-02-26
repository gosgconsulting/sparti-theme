import { ThemeLink } from "../components/ThemeLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductDescription from "../components/product/ProductDescription";
import ProductCarousel from "../components/content/ProductCarousel";
import { useProduct } from "../hooks/useProducts";
import { Product } from "@medusajs/medusa";

export default function ProductDetailPage({ productId }: { productId: string }) {
  const { data: product, isLoading, isError } = useProduct(productId);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <h2 className="text-2xl font-heading">Product not found</h2>
          <ThemeLink to="/category/shop" className="text-primary hover:underline">
            Return to shop
          </ThemeLink>
        </main>
        <Footer />
      </div>
    );
  }

  const productName = product.title || "Unknown Product";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <section className="w-full px-6">
          {/* Breadcrumb - Show above image on smaller screens */}
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <ThemeLink to="/" className="font-body font-light text-foreground/70 hover:text-primary">Home</ThemeLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <ThemeLink to="/category/shop" className="font-body font-light text-foreground/70 hover:text-primary">Shop</ThemeLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-body font-light text-foreground">{productName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery product={product} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo product={product} />
              <ProductDescription product={product} />
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
          <ProductCarousel excludeProductId={product.id} onApiChange={setCarouselApi} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
