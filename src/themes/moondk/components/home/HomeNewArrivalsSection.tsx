import { useEffect, useMemo, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ThemeLink } from "@/components/ThemeLink";
import { products } from "../category/products";
import { isMoondkMedusaEnabled } from "../../lib/medusa";
import { useMoondkMedusaProductsListQuery } from "../../hooks/useMoondkMedusaCatalog";

type ArrivalRow = { id: string; name: string; price: string; image: string };

export default function HomeNewArrivalsSection() {
  const medusa = isMoondkMedusaEnabled();
  const { data: medusaViews } = useMoondkMedusaProductsListQuery(medusa);

  const newArrivals: ArrivalRow[] = useMemo(() => {
    if (medusa && medusaViews) {
      const flagged = medusaViews.filter((v) => v.isNew);
      const pool = flagged.length ? flagged : [...medusaViews].sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
      return pool.slice(0, 4).map((v) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        image: v.image,
      }));
    }
    return products
      .filter((p) => p.isNew)
      .slice(0, 4)
      .map((p) => ({
        id: String(p.id),
        name: p.name,
        price: p.price,
        image: p.image,
      }));
  }, [medusa, medusaViews]);
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  const slideCount = useMemo(() => newArrivals.length, [newArrivals.length]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const progress = slideCount <= 1 ? 0 : index / (slideCount - 1);

  if (newArrivals.length === 0) return null;

  return (
    <section id="new-arrivals" className="px-6 pb-16 scroll-mt-24 md:scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-body tracking-tight">
              New <span className="font-heading italic font-normal">arrivals</span>
            </h2>
            <p className="mt-3 text-sm md:text-base font-body text-foreground/70 max-w-xl">
              Freshly curated essentials—just landed.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full px-8">
            <ThemeLink to="/category/new-in">Shop new</ThemeLink>
          </Button>
        </div>

        {/* Mobile Carousel - Side scroll with one product at a time */}
        <div className="mt-10 sm:hidden">
          <div className="px-2 -mx-2">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
              }}
            >
              <CarouselContent className="-ml-2">
                {newArrivals.map((p) => (
                  <CarouselItem key={p.id} className="basis-full pl-2">
                    <Card className="rounded-[1.5rem] border-none shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <ThemeLink to={`/product/${p.id}`} className="block">
                          <div className="relative rounded-t-[1.5rem] overflow-hidden bg-white">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-52 object-contain p-10"
                            />
                          </div>
                        </ThemeLink>

                        <div className="p-4 flex flex-col flex-1">
                          <ThemeLink to={`/product/${p.id}`} className="block flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-base font-heading leading-tight hover:underline underline-offset-4 flex-1">
                                {p.name}
                              </h3>
                              <span className="text-lg font-body font-medium text-foreground whitespace-nowrap">
                                {p.price}
                              </span>
                            </div>
                          </ThemeLink>

                          <div className="mt-4">
                            <Button asChild className="rounded-full w-full bg-primary hover:bg-primary/90 !text-primary-foreground">
                              <ThemeLink to={`/product/${p.id}`} className="!text-primary-foreground">View product</ThemeLink>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Mobile Navigation */}
          <div className="mt-10 flex items-center gap-4">
            <div className="relative h-px w-full bg-border/50">
              <div
                className="absolute left-0 top-0 h-px bg-foreground/60"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-10 w-10 rounded-full border border-border/60 bg-background hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Previous"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="h-10 w-10 rounded-full border border-border/60 bg-background hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Next"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid - Keep original grid layout */}
        <div className="mt-10 hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <Card
              key={p.id}
              className="rounded-[1.5rem] border-none shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <ThemeLink to={`/product/${p.id}`} className="block">
                  <div className="relative rounded-t-[1.5rem] overflow-hidden bg-white">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-52 md:h-56 object-contain p-10"
                    />
                  </div>
                </ThemeLink>

                <div className="p-4 flex flex-col flex-1">
                  <ThemeLink to={`/product/${p.id}`} className="block flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-heading leading-tight hover:underline underline-offset-4 flex-1">
                        {p.name}
                      </h3>
                      <span className="text-lg font-body font-medium text-foreground whitespace-nowrap">
                        {p.price}
                      </span>
                    </div>
                  </ThemeLink>

                  <div className="mt-4">
                    <Button asChild className="rounded-full w-full bg-primary hover:bg-primary/90 !text-primary-foreground">
                      <ThemeLink to={`/product/${p.id}`} className="!text-primary-foreground">View product</ThemeLink>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
