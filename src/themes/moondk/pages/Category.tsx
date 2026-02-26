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
import { useProducts } from "../hooks/useProducts";
import { Product } from "@medusajs/medusa";

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

function parsePrice(price: number | undefined) {
  return typeof price === 'number' ? price : 0;
}

function getLowestPrice(product: Product) {
  if (!product.variants || product.variants.length === 0) return 0;
  const prices = product.variants
    .map((v) => (v.prices && v.prices.length > 0 ? v.prices[0].amount : 0))
    .filter((p) => p > 0);
  return prices.length > 0 ? Math.min(...prices) : 0;
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

  const { data, isLoading } = useProducts({
    // You could pass limit/offset here for pagination later
    limit: 100
  });

  const products: any[] = data?.products || [];

  // Client-side filtering and sorting since all products are fetched
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    if (activeTab && activeTab !== "All") {
      filtered = products.filter((p) => {
        // Here we map categories to Medusa. You might need to adjust 
        // to use Medusa Collections or Categories based on your setup.
        // For now, looking at 'metadata' or 'tags' might be a fallback.
        // We'll try to check `collection.title` or a custom metadata field.
        const categoryName = p.collection?.title || (p.metadata?.category as string) || "";

        if (activeTab === "Foods") return categoryName === "Oil" || categoryName === "Noodles";
        if (activeTab === "Drinks") return categoryName === "Soju" || categoryName === "Tea";
        return categoryName === activeTab;
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
    const urlFilter = getFilterFromURL();
    if (urlFilter && categoryTabs.includes(urlFilter)) {
      setActiveTab(urlFilter);
    } else {
      setActiveTab(labelFromSlug(category));
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <section className="w-full px-6 mb-10 border-b border-border-light pb-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {categoryTabs.map((label) => {
                  const isActive = activeTab === label;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveTab(label)}
                      className={
                        "rounded-full px-4 py-2 text-sm font-body border transition-colors " +
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