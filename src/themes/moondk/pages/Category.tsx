import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductGrid from "../components/category/ProductGrid";
import { categoryTabs } from "../components/category/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories, useProducts } from "../hooks/useProducts";
import { Product } from "@medusajs/medusa";
import { getLowestProductPrice } from "../pricing";

function labelFromSlug(slug: string | undefined) {
  if (!slug || slug === "shop") return "All";
  const map: Record<string, string> = {
    "curated-sets": "Curated Sets",
    "ingredients": "Ingredients",
    "tools": "Tools",
    "essentials": "Essentials",
    "recipe-collections": "Recipe Collections",
    "all-products": "All",
  };
  return map[slug] || "All";
}

function getFilterFromURL(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("filter");
}

function getLowestPrice(product: Product) {
  return getLowestProductPrice(product)?.amount || 0;
}

export default function CategoryPage({ category }: { category: string }) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const urlFilter = getFilterFromURL();
    if (urlFilter && categoryTabs.includes(urlFilter)) {
      return urlFilter;
    }
    return labelFromSlug(category);
  });

  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "newest" | "name"
  >("featured");

  const { data, isLoading: isProductsLoading } = useProducts({
    limit: 100,
    fields: "*categories" // For Medusa V2 to include product categories in the response
  });
  const products: any[] = data?.products || [];

  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
  const categories = categoriesData?.product_categories || [];
  const dynamicTabs = ["All", ...categories.map((c: any) => c.name)];

  const isLoading = isProductsLoading || isCategoriesLoading;

  // Client-side filtering and sorting since all products are fetched
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    if (activeTab && activeTab !== "All") {
      filtered = products.filter((p) => {
        // Find if any of the product's categories match the active tab
        const categoryMatch = p.categories?.some((c: any) => c.name === activeTab);
        return categoryMatch;
      });
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return getLowestPrice(a) - getLowestPrice(b);
      if (sortBy === "price-high") return getLowestPrice(b) - getLowestPrice(a);
      if (sortBy === "newest") {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      if (sortBy === "name") return (a.title || "").localeCompare(b.title || "");
      return 0; // Default featured
    });
  };

  const displayProducts = getFilteredAndSortedProducts();

  useEffect(() => {
    if (categories.length === 0) return; // Wait for categories to load

    const urlFilter = getFilterFromURL();
    if (urlFilter && dynamicTabs.includes(urlFilter)) {
      setActiveTab(urlFilter);
    } else if (category && category !== "shop") {
      // Find the Medusa category matching the URL param
      const match = categories.find((c: any) => c.handle === category);
      setActiveTab(match ? match.name : "All");
    } else {
      setActiveTab("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categories.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <section className="w-full px-6 mb-10 border-b border-border-light pb-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {dynamicTabs.map((label: string) => {
                  const isActive = activeTab === label;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveTab(label)}
                      className={
                        "rounded-full px-4 py-2 text-sm font-body border transition-colors whitespace-nowrap " +
                        (isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-background text-primary border-primary/30 hover:border-primary/60")
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center lg:justify-end">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                  <SelectTrigger className="w-auto border-none bg-transparent text-sm font-body font-light shadow-none rounded-none pr-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="shadow-none border border-border-light rounded-none bg-background">
                    <SelectItem value="featured" className="hover:bg-muted/50 font-body font-light">
                      Featured
                    </SelectItem>
                    <SelectItem value="price-low" className="hover:bg-muted/50 font-body font-light">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="hover:bg-muted/50 font-body font-light">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest" className="hover:bg-muted/50 font-body font-light">
                      Newest
                    </SelectItem>
                    <SelectItem value="name" className="hover:bg-muted/50 font-body font-light">
                      Name A-Z
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid products={displayProducts} isLoading={isLoading} />
      </main>

      <Footer />
    </div>
  );
}