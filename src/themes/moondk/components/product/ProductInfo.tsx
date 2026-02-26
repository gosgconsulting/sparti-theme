import { useState, useEffect, useMemo } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeLink } from "../ThemeLink";
import { useCart } from "../../contexts/CartContext";
import { AddToBagNotification } from "../ui/AddToBagNotification";
import { getDisplayProductPrice } from "../../pricing";

interface ProductInfoProps {
  product?: any;
}

function formatPrice(amount: number, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [options, setOptions] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    if (product?.options) {
      const initialOptions: Record<string, string> = {};
      product.options.forEach((opt: any) => {
        if (opt.values && opt.values.length > 0) {
          initialOptions[opt.id] = opt.values[0].value;
        }
      });
      setOptions(initialOptions);
    }
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find((variant: any) => {
      // Check if for every key in `options` state, the variant has an option with that option_id and value
      return Object.entries(options).every(([optionId, value]) => {
        return variant.options?.some((vOpt: any) => vOpt.option_id === optionId && vOpt.value === value);
      });
    });
  }, [product, options]);

  const productId = product?.id?.toString();
  const productName = product?.title || "Unknown Product";
  const displayPriceValue = getDisplayProductPrice(product, selectedVariant);
  const displayPrice = displayPriceValue
    ? formatPrice(displayPriceValue.amount, displayPriceValue.currencyCode)
    : "Sold Out";

  const productImage = product?.thumbnail || "";
  const productCategory = product?.collection?.title || product?.metadata?.category || "Product";

  const productDescription = product?.description || "No description available.";

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToBag = () => {
    addToCart({
      name: productName,
      price: displayPrice,
      image: productImage,
      quantity: quantity,
      category: productCategory,
      variant: selectedVariant?.title,
    }, false); // Don't open cart, show notification instead
    setShowNotification(true);
  };

  return (
    <>
      <AddToBagNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        productName={productName}
      />
      <div className="space-y-8">
        <div className="hidden lg:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <ThemeLink to="/" className="font-body font-light text-foreground/70 hover:text-primary">
                    Home
                  </ThemeLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <ThemeLink to="/category/shop" className="font-body font-light text-foreground/70 hover:text-primary">
                    Shop
                  </ThemeLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-body font-light text-foreground">{productName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-body font-light text-muted-foreground mb-2">Product</p>
              <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground leading-tight">{productName}</h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-body font-light text-foreground">{displayPrice}</p>
            </div>
          </div>
        </div>

        {product?.options && product.options.length > 0 && (
          <div className="space-y-4 py-4 border-t border-border-light">
            {product.options.map((option: any) => {
              const uniqueValues = Array.from(new Set(option.values.map((v: any) => v.value))) as string[];
              return (
                <div key={option.id} className="space-y-2">
                  <p className="text-sm font-body font-light text-foreground">{option.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueValues.map((value: string) => (
                      <Button
                        key={value}
                        variant="outline"
                        onClick={() => setOptions((prev) => ({ ...prev, [option.id]: value }))}
                        className={`rounded-full px-4 h-10 border font-body text-sm font-light transition-colors ${options[option.id] === value
                          ? "border-primary bg-primary text-white hover:bg-primary-hover hover:text-white"
                          : "border-border-light bg-transparent text-foreground hover:border-primary/50"
                          }`}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-6 py-6 border-b border-t border-border-light">
          <div className="space-y-2">
            <h3 className="text-sm font-heading font-medium text-foreground">Description</h3>
            <p className="text-sm font-body font-light text-foreground/70 leading-relaxed whitespace-pre-line">
              {productDescription}
            </p>
          </div>

          {/* Dynamic Product Details from Medusa Metadata */}
          {product?.metadata?.details && (
            <div className="space-y-2 mt-6">
              <h3 className="text-sm font-heading font-medium text-foreground">Product Details</h3>
              <div className="text-sm font-body font-light text-foreground/70 space-y-1 whitespace-pre-line">
                {product.metadata.details as string}
              </div>
            </div>
          )}

          {/* Dynamic Chef's Notes from Medusa Metadata */}
          {product?.metadata?.chefs_notes && (
            <div className="space-y-2 mt-6">
              <h3 className="text-sm font-heading font-medium text-foreground">Chef's Notes</h3>
              <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed whitespace-pre-line">
                {product.metadata.chefs_notes as string}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-body font-light text-foreground">Quantity</span>
            <div className="flex items-center border border-border-light">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="h-10 flex items-center px-4 text-sm font-body font-light min-w-12 justify-center border-l border-r border-border-light">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
                className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {product?.stock !== undefined && product.stock < 5 && (
              <span className="text-sm font-body font-light text-foreground">* Limited stock left</span>
            )}
          </div>

          <Button
            className="w-full h-12 bg-primary !text-white hover:bg-primary-hover font-body font-medium rounded-full"
            onClick={handleAddToBag}
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
