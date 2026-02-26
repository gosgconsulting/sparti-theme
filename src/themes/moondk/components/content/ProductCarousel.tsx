import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeLink } from "../ThemeLink";
import { useProducts } from "../../hooks/useProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  excludeProductId?: string | number;
  onApiChange?: (api: CarouselApi | undefined) => void;
}

function getLowestPrice(product: any) {
  if (!product.variants || product.variants.length === 0) return 0;
  const prices = product.variants
    .map((v: any) => (v.prices && v.prices.length > 0 ? v.prices[0].amount : 0))
    .filter((p: number) => p > 0);
  return prices.length > 0 ? Math.min(...prices) / 100 : 0;
}

function formatPrice(amount: number, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

const ProductCarousel = ({ excludeProductId, onApiChange }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  const { data, isLoading } = useProducts({ limit: 12 });
  const products: any[] = data?.products || [];

  useEffect(() => {
    if (onApiChange) {
      onApiChange(api);
    }
  }, [api, onApiChange]);

  // Filter out the current product if excludeProductId is provided
  const displayProducts = excludeProductId
    ? products.filter((product) => product.id !== excludeProductId?.toString())
    : products;

  if (isLoading) {
    return (
      <section className="w-full mb-20 px-6">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-64 h-80 bg-muted/20 animate-pulse rounded-xl flex-shrink-0" />
          ))}
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full mb-20 px-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {displayProducts.map((product) => {
            const price = getLowestPrice(product);
            const formattedPrice = price > 0 ? formatPrice(price) : 'Sold Out';
            const category = product.collection?.title || (product.metadata?.category as string) || "Product";

            return (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
              >
                <ThemeLink to={`/product/${product.handle || product.id}`}>
                  <Card className="border-none shadow-none bg-transparent group">
                    <CardContent className="p-0">
                      <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/[0.02]"></div>
                        {false && ( // Update with actual "isNew" logic based on created_at if desired
                          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-body font-medium text-primary bg-background/90">
                            NEW
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-body font-light text-foreground/70">{category}</p>
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-heading font-medium text-foreground">{product.title}</h3>
                          <p className="text-sm font-body font-light text-foreground">{formattedPrice}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ThemeLink>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
