import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { ThemeLink } from "@/components/ThemeLink";
import { products as allProducts, type Product } from "./products";
import { isMoondkMedusaEnabled, type MoondkMedusaProductView } from "../../lib/medusa";
import { useMoondkMedusaProductsListQuery } from "../../hooks/useMoondkMedusaCatalog";

const PAGE_SIZE = 16;

interface ProductGridProps {
  activeTab?: string;
  sortBy?: "featured" | "price-low" | "price-high" | "newest" | "name";
}

type GridRow = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  isNew?: boolean;
  createdAt?: string;
};

function productToRow(p: Product): GridRow {
  return {
    id: String(p.id),
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    isNew: p.isNew,
  };
}

function parsePrice(price: string) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function filterRows(rows: GridRow[], activeTab: string): GridRow[] {
  if (!activeTab || activeTab === "All") return rows;
  if (activeTab === "Foods") {
    return rows.filter((p) => p.category === "Oil" || p.category === "Noodles");
  }
  if (activeTab === "Drinks") {
    return rows.filter((p) => p.category === "Alcohol" || p.category === "Tea");
  }
  return rows.filter((p) => p.category === activeTab);
}

function sortRows(
  rows: GridRow[],
  sortBy: "featured" | "price-low" | "price-high" | "newest" | "name",
): GridRow[] {
  const sorted = [...rows];
  sorted.sort((a, b) => {
    if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === "newest") {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (tb !== ta) return tb - ta;
      return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    }
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });
  return sorted;
}

function viewToRow(v: MoondkMedusaProductView): GridRow {
  return {
    id: v.id,
    name: v.name,
    price: v.price,
    image: v.image,
    category: v.category,
    isNew: v.isNew,
    createdAt: v.createdAt,
  };
}

export default function ProductGrid({
  activeTab = "All",
  sortBy = "featured",
}: ProductGridProps) {
  const medusa = isMoondkMedusaEnabled();
  const { data: medusaViews, isLoading, isError, error } = useMoondkMedusaProductsListQuery(medusa);

  const sourceRows: GridRow[] = useMemo(() => {
    if (medusa && medusaViews) {
      return medusaViews.map(viewToRow);
    }
    return allProducts.map(productToRow);
  }, [medusa, medusaViews]);

  const filtered = useMemo(() => filterRows(sourceRows, activeTab), [sourceRows, activeTab]);
  const sortedProducts = useMemo(() => sortRows(filtered, sortBy), [filtered, sortBy]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, sortBy, medusa, medusaViews]);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalProducts);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  const showingCount = paginatedProducts.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [clampedPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (medusa && isLoading) {
    return (
      <section className="w-full px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body font-light text-foreground/70">Loading products…</p>
        </div>
      </section>
    );
  }

  if (medusa && isError) {
    return (
      <section className="w-full px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-destructive">
            Could not load products from Medusa.{error instanceof Error ? ` ${error.message}` : ""}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-sm font-body font-light text-foreground/70">
          Showing {showingCount} of {totalProducts} products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col rounded-[1.5rem] border-0 shadow-md ring-0 transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-0 flex flex-col flex-1">
                <ThemeLink to={`/product/${product.id}`} className="block">
                  <div
                    className={`relative rounded-t-[1.5rem] overflow-hidden bg-white aspect-square ${
                      product.category === "Tea" ? "p-8" : ""
                    }`}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full ${
                          product.category === "Tea" ? "object-contain" : "object-cover"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </ThemeLink>

                <div className="p-4 flex flex-col flex-1">
                  <ThemeLink to={`/product/${product.id}`} className="block">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-heading leading-tight hover:underline underline-offset-4 flex-1">
                        {product.name}
                      </h3>
                      <span className="text-lg font-body font-medium text-foreground whitespace-nowrap">
                        {product.price}
                      </span>
                    </div>
                  </ThemeLink>

                  <div className="mt-auto pt-4">
                    <Button asChild className="rounded-full w-full bg-primary hover:bg-primary-hover !text-white">
                      <ThemeLink to={`/product/${product.id}`} className="!text-white">
                        View product
                      </ThemeLink>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination currentPage={clampedPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
