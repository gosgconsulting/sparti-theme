import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeLink } from "@/components/ThemeLink";
import { products } from "../category/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  excludeProductId?: string | number;
  onApiChange?: (api: CarouselApi | undefined) => void;
}

const ProductCarousel = ({ excludeProductId, onApiChange }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (onApiChange) {
      onApiChange(api);
    }
  }, [api, onApiChange]);

  // Filter out the current product if excludeProductId is provided
  const displayProducts = excludeProductId
    ? products.filter((product) => {
        const currentId = typeof excludeProductId === 'string' 
          ? parseInt(excludeProductId, 10) 
          : excludeProductId;
        return product.id !== currentId;
      })
    : products;

  useEffect(() => {
    if (!api) return;
  }, [api]);

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
          {displayProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
            >
              <ThemeLink to={`/product/${product.id}`} className="block h-full">
                <Card className="group h-full border-0 bg-transparent shadow-none ring-0">
                  <CardContent className="p-0">
                    <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-muted/15">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {product.isNew && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-primary/92 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                          New
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 px-0.5">
                      <p className="text-xs font-body font-medium uppercase tracking-[0.08em] text-foreground/45">
                        {product.category}
                      </p>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-balance text-sm font-medium leading-snug text-foreground font-body transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">{product.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ThemeLink>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
