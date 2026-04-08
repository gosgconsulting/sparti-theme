import { useState, useEffect, useMemo } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeLink } from "@/components/ThemeLink";
import { products, type Product } from "../category/products";
import type { MoondkMedusaProductView } from "../../lib/medusa";
import { isMoondkMedusaEnabled } from "../../lib/medusa";
import { useMoondkMedusaProductsListQuery } from "../../hooks/useMoondkMedusaCatalog";

interface ProductCarouselProps {
  excludeProductId?: string | number;
  /** Category names from the current product (all Medusa categories, or `[category]` for static). */
  sameCategoryNames?: string[];
  /** Medusa category ids from the current product (matches when list/detail order or names differ). */
  sameCategoryIds?: string[];
  onApiChange?: (api: CarouselApi | undefined) => void;
}

function categoryKey(label: string | undefined): string | null {
  const t = label?.trim();
  return t ? t.toLowerCase() : null;
}

function normalizeNameKeys(labels: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const l of labels) {
    const k = categoryKey(l);
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

type CarouselRow = Pick<
  MoondkMedusaProductView,
  "id" | "name" | "image" | "category" | "categoryNames" | "categoryIds" | "price" | "isNew"
>;

function rowMatchesCategories(row: CarouselRow, wantNameKeys: string[], wantIds: string[]): boolean {
  if (wantIds.length) {
    const rowIdSet = new Set(row.categoryIds);
    if (wantIds.some((id) => rowIdSet.has(id))) return true;
  }
  if (!wantNameKeys.length) return false;
  const rowLabels = row.categoryNames.length ? row.categoryNames : [row.category];
  const rowKeys = normalizeNameKeys(rowLabels);
  return wantNameKeys.some((k) => rowKeys.includes(k));
}

const ProductCarousel = ({
  excludeProductId,
  sameCategoryNames,
  sameCategoryIds,
  onApiChange,
}: ProductCarouselProps) => {
  const medusa = isMoondkMedusaEnabled();
  const { data: medusaViews } = useMoondkMedusaProductsListQuery(medusa);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    onApiChange?.(api);
  }, [api, onApiChange]);

  const displayProducts: CarouselRow[] = useMemo(() => {
    const wantIds = (sameCategoryIds ?? []).map((id) => id.trim()).filter(Boolean);
    const wantNameKeys = normalizeNameKeys(sameCategoryNames ?? []);
    const applyFilter = wantIds.length > 0 || wantNameKeys.length > 0;

    const mapMedusaRows = (views: typeof medusaViews): CarouselRow[] => {
      if (!views) return [];
      const ex = excludeProductId != null ? String(excludeProductId) : "";
      const rows = views
        .filter((p) => String(p.id) !== ex)
        .map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          category: p.category,
          categoryNames: p.categoryNames,
          categoryIds: p.categoryIds,
          price: p.price,
          isNew: p.isNew,
        }));
      if (!applyFilter) return rows;
      const same = rows.filter((p) => rowMatchesCategories(p, wantNameKeys, wantIds));
      return same.length ? same : rows;
    };

    if (medusa && medusaViews) {
      return mapMedusaRows(medusaViews);
    }

    const list: Product[] =
      excludeProductId != null
        ? products.filter((product) => {
            const currentId =
              typeof excludeProductId === "string"
                ? parseInt(excludeProductId, 10)
                : excludeProductId;
            return product.id !== currentId;
          })
        : products;
    const rows: CarouselRow[] = list.map((p) => ({
      id: String(p.id),
      name: p.name,
      image: p.image,
      category: p.category,
      categoryNames: [p.category],
      categoryIds: [],
      price: p.price,
      isNew: p.isNew,
    }));
    if (!applyFilter) return rows;
    const same = rows.filter((p) => rowMatchesCategories(p, wantNameKeys, wantIds));
    return same.length ? same : rows;
  }, [medusa, medusaViews, excludeProductId, sameCategoryNames, sameCategoryIds]);

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
          {displayProducts.map((product) => {
            const { id, name, image, category, price, isNew } = product;
            return (
              <CarouselItem
                key={id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
              >
                <ThemeLink to={`/product/${id}`} className="block h-full">
                  <Card className="group h-full border-0 bg-transparent shadow-none ring-0">
                    <CardContent className="p-0">
                      <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-muted/15">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                        {isNew && (
                          <div className="absolute left-3 top-3 z-10 rounded-full bg-primary/92 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                            New
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 px-0.5">
                        <p className="text-xs font-body font-medium uppercase tracking-[0.08em] text-foreground/45">
                          {category}
                        </p>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-balance text-sm font-medium leading-snug text-foreground font-body transition-colors group-hover:text-primary">
                            {name}
                          </h3>
                          <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">{price}</p>
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
