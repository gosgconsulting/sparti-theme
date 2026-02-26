import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { ThemeLink } from "../ThemeLink";
import { getLowestProductPrice } from "../../pricing";

interface ProductGridProps {
  products?: any[];
  isLoading?: boolean;
}

function formatPrice(amount: number, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export default function ProductGrid({
  products = [],
  isLoading = false,
}: ProductGridProps) {

  if (isLoading) {
    return (
      <section className="w-full px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="rounded-[1.5rem] border-none shadow-md h-[400px] animate-pulse bg-muted/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 pb-12">
        <div className="mx-auto max-w-6xl text-center py-12">
          <h3 className="text-xl font-heading text-muted-foreground">No products found</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 pb-12">
      {/* Recipe-style product cards */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const priceValue = getLowestProductPrice(product);
            const formattedPrice = priceValue
              ? formatPrice(priceValue.amount, priceValue.currencyCode)
              : 'Sold Out';

            return (
              <Card
                key={product.id}
                className="rounded-[1.5rem] border-none shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <CardContent className="p-0 flex flex-col flex-1">
                  <ThemeLink to={`/product/${product.handle || product.id}`} className="block">
                    <div className={`relative rounded-t-[1.5rem] overflow-hidden bg-white aspect-square`}>
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                          <span className="text-muted-foreground font-body text-sm">No image</span>
                        </div>
                      )}
                    </div>
                  </ThemeLink>

                  <div className="p-4 flex flex-col flex-1">
                    <ThemeLink to={`/product/${product.handle || product.id}`} className="block">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-heading leading-tight hover:underline underline-offset-4 flex-1">
                          {product.title}
                        </h3>
                        <span className="text-lg font-body font-medium text-foreground whitespace-nowrap">
                          {formattedPrice}
                        </span>
                      </div>
                    </ThemeLink>

                    <div className="mt-auto pt-4">
                      <Button asChild className="rounded-full w-full bg-primary hover:bg-primary-hover !text-white">
                        <ThemeLink to={`/product/${product.handle || product.id}`} className="!text-white">View product</ThemeLink>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Pagination />
      </div>
    </section>
  );
}
