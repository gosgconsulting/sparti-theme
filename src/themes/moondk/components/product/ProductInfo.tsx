import { useState } from "react";
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
import { ThemeLink } from "@/components/ThemeLink";
import { useCart } from "../../contexts/CartContext";
import { products } from "../category/products";
import { AddToBagNotification } from "../ui/AddToBagNotification";

interface ProductInfoProps {
  productId?: string;
}

const ProductInfo = ({ productId }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  // Get product data from products array
  const product = products.find((p) => p.id.toString() === productId);
  const productName = product?.name || "Hovenia Dulcis Extract (헛개수)";
  const productPrice = product?.price || "$37";
  const productImage = product?.image || "";
  const productCategory = product?.category || "Product";

  // Product descriptions mapping
  const productDescriptions: Record<string, string> = {
    "1": "A restorative concentrate derived from the Oriental Raisin Tree, traditionally used in Korea for liver support and recovery. It has a bold, earthy character with unique bittersweet undertones, perfect for hydration after physical activity or a long night.",
    "2": "Known for its smooth, mild, and naturally sweet profile, this \"Okmisu\" extract is a favorite in K-beauty for its reputation in supporting a slim \"V-line\" and reducing bloating. It transforms ordinary water into a delicate herbal infusion that is both hydrating and light on the stomach.",
    "3": "High Concentration: This extract features a 97% authentic black bean tea base, offering a deep and savory taste without the wait of brewing.\n\n• Korean Superfood: Made from 100% domestic Korean black soybeans, often referred to as \"Beef from the Field\" for its incredible nutrient density.\n\n• Nutritional Powerhouse: Naturally rich in plant-based protein, dietary fiber, vitamins (A, B, C, E), beta-carotene, and essential minerals.",
    "4": "A modern take on Korea's most beloved daily tea, this extract offers the authentic, nutty flavor of traditionally roasted barley without the hassle of boiling grains. It provides a clean, savory finish that refreshes the palate and is naturally caffeine-free, making it the perfect \"all-day\" water substitute for families.",
    "5": "A highly aromatic, traditional oil that is essential for adding a rich, nutty finish to Korean cuisine. It is particularly effective at enhancing the absorption of vitamins in leafy greens.\n\nLow-Temperature Mastery: Unlike standard oils that can be roasted at high heat to increase yield, Kkosi Kkosi uses low-temperature roasting to maximize flavor while preventing the formation of benzopyrene.",
    "6": "Marbled, tender, and rich with umami — this is more than meat; it's the taste that defines Korean tables.\n\nFrom hanwoo cuts to barbecue-ready selections, every piece is curated for perfect sear and unforgettable savor. The kind of flavor that stops conversation mid-sentence — because everyone's too busy tasting.",
    "7": "Known for its unique, earthy, and deep savory profile. It is a nutritional powerhouse often used to balance the flavors of wild or dried mountain herbs.\n\nLow-Temperature Mastery: Unlike standard oils that can be roasted at high heat to increase yield, Kkosi Kkosi uses low-temperature roasting to maximize flavor while preventing the formation of benzopyrene.",
    "8": "Includes Sesame Oil (180ml) and Perilla Oil (180ml)\n\nThe Kkosi Kkosi Premium Set is a curated duo of Korea's most essential culinary oils, representing the pinnacle of \"Young Farmer\" craftsmanship. Both the Sesame and Perilla oils are produced using a strict \"One-Press\" rule—extracting from 100% whole seeds just once to ensure maximum freshness and nutritional density. Unlike mass-produced oils, these are cold-pressed at low temperatures to preserve their delicate, natural aromas and to prevent the formation of harmful substances like benzopyrene.",
    "9": "• A Fortified Masterpiece: Seoriju is made through the careful fermentation of glutinous rice with nuruk (traditional Korean fermentation starter), which is then fortified with Korean traditional soju\n\n• Complex Flavor Profile: Despite being unfiltered to preserve its soul, it delivers light, fruity, and intricate flavors with a pleasant, slightly sweet taste and grounded earthy undertones.",
    "10": "These vibrant noodles are made using domestic Korean wheat and red rice for a distinct, high-quality profile. Through Myeongawon's specialized aging process, these noodles achieve a premium chewy texture that holds its shape and won't become mushy even if you slightly miss the timing.",
    "11": "A luxurious collection of hand-stretched noodles featuring a variety of natural colors and flavors derived from traditional ingredients like plum, matcha, and sweet pumpkin. This set is the pinnacle of Sooyeon craftsmanship, offering a diverse tasting experience in one elegant package.",
    "12": "200g (2 servings)\nIngredients: Potato flour (domestic), refined salt, canola oil\n\nThe first potato noodles in Korea that offer a perfect balance of chewiness and softness in just 3 minutes. Through 12 steps of HACCP certification and 8 aging processes, these noodles retain their ideal texture even if the cooking time is slightly off.",
    "13": "Infused with a staggering 35% of domestic Hallabong (premium Jeju citrus), these noodles carry a bright, refreshing aroma and a beautiful natural yellow hue. The citrus acidity adds a unique bounce to the noodle's texture, making it a refreshing sensory experience.",
  };

  // Default description for products without specific descriptions
  const defaultDescription = "Premium Hovenia Dulcis extract (헛개수), a traditional Korean beverage concentrate known for its refreshing taste and health benefits. This premium extract is made from 100% domestic Hovenia Dulcis fruit, carefully processed to preserve its natural flavor and nutrients.";

  const productDescription = productDescriptions[productId || ""] || defaultDescription;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToBag = () => {
    addToCart({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
      category: productCategory,
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
          <div>
            <p className="text-sm font-body font-light text-muted-foreground mb-2">Product</p>
          <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground leading-tight break-words mb-3">{productName}</h1>
            <p className="text-2xl font-body font-light text-foreground">{productPrice}</p>
        </div>
      </div>

      {/* CTA Section - Premium container */}
      <div className="mt-8 md:mt-10">
        <div className="bg-foreground/[0.015] rounded-2xl pt-2 pb-2 md:pt-3 md:pb-3">
          <div className="space-y-3 md:space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-body font-light text-foreground">Quantity</span>
              <div className="flex items-center border border-border-light overflow-hidden bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
                  className="h-11 w-11 p-0 hover:bg-foreground/[0.05] rounded-none border-none transition-colors"
                  aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
                <span className="h-11 flex items-center px-4 text-sm font-body font-light min-w-12 justify-center border-l border-r border-border-light bg-background">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
                  className="h-11 w-11 p-0 hover:bg-foreground/[0.05] rounded-none border-none transition-colors"
                  aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {product?.stock !== undefined && product.stock < 5 && (
                <span className="text-sm font-body font-light text-foreground/70">* Limited stock left</span>
          )}
        </div>

        <Button 
              className="w-full h-14 bg-primary !text-white hover:bg-primary-hover font-body font-medium rounded-full text-base transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2"
          onClick={handleAddToBag}
        >
          Add to Bag
        </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductInfo;
