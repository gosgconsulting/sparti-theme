import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDescriptionProps {
  product?: any;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [isBrandStoryOpen, setIsBrandStoryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);

  const productId = product?.id?.toString();

  return (
    <div className="space-y-0 mt-8 border-t border-border-light">
      <div className="border-b border-border-light">
        <Button
          variant="ghost"
          onClick={() => setIsBrandStoryOpen(!isBrandStoryOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-body font-light rounded-none"
        >
          <span>Brand Story</span>
          {isBrandStoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isBrandStoryOpen && (
          <div className="pb-6 space-y-4">
            <p className="text-sm font-body font-light text-foreground/70 leading-relaxed whitespace-pre-line">
              {product?.metadata?.brand_story || "No brand story available."}
            </p>
          </div>
        )}
      </div>

      <div className="border-b border-border-light">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-body font-light rounded-none"
        >
          <span>Product Details</span>
          {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            <div className="text-sm font-body font-light text-foreground/70 space-y-1 whitespace-pre-line">
              {product?.metadata?.details ? (
                product.metadata.details as string
              ) : (
                <p>No product details available.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-b border-border-light lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsCareOpen(!isCareOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-body font-light rounded-none"
        >
          <span>Storage & Usage</span>
          {isCareOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isCareOpen && (
          <div className="pb-6 space-y-4">
            <div className="text-sm font-body font-light text-foreground/70 space-y-2 whitespace-pre-line">
              {product?.metadata?.storage_usage ? (
                product.metadata.storage_usage as string
              ) : (
                <p>No storage and usage information available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
