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
import { ThemeLink } from "../ThemeLink";
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
    "13": "500g (for 5 servings)\nIngredients: Flour (domestic), Hanrabong orange powder (Korea), refined salt, canola oil\n\nThe noodles made with Hanrabong, a unique citrus fruit from Jeju, offer a refreshing and chewy texture in just 3 minutes. Thanks to 12-step HACCP certification and 8 aging processes, they deliver the perfect texture and flavor, with a forgiving cooking time that ensures great results even if you miss the timing.",
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
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-body font-light text-muted-foreground mb-2">Product</p>
            <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground leading-tight">{productName}</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-body font-light text-foreground">{productPrice}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 py-6 border-b border-border-light">
        <div className="space-y-2">
          <h3 className="text-sm font-heading font-medium text-foreground">Description</h3>
          <p className="text-sm font-body font-light text-foreground/70 leading-relaxed whitespace-pre-line">
            {productDescription}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-heading font-medium text-foreground">Product Details</h3>
          {productId === "1" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>• Size: 420g</p>
              <p>• Calories: 875kcal per bottle</p>
              <p className="mt-2">• Ingredients: Hovenia fruit base 97% [Fructooligosaccharide, Purified water, Hovenia tree fruit extract concentrate, Glucose, Flavoring (Hovenia fruit flavor)]</p>
            </div>
          ) : productId === "2" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>• Size: 870g</p>
              <p>• Calories: 1,930kcal per bottle</p>
              <p className="mt-2">• Ingredients: Corn silk tea base 97% [Other sugars, Purified water, Corn silk extract (Corn silk: Domestic), Roasted brown rice extract concentrate (Roasted brown rice: Domestic), Flavoring (Corn flavor), Glucose]</p>
            </div>
          ) : productId === "3" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>• Size: 870g</p>
              <p>• Calories: 2,025kcal per bottle</p>
              <p className="mt-2">Ingredients - 97% Korean Black Bean Tea Base [Black Bean Concentrate, Fructooligosaccharide], Water, Black Bean flavor, Citric Acid, Enzyme-treated Stevia</p>
              <p>Size - 870g (2,025Kcal)</p>
            </div>
          ) : productId === "4" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>• Size: 290g</p>
              <p>• Calories: 595kcal per bottle.</p>
              <p className="mt-2">• Ingredients: Barley base 97% [Fructooligosaccharide, Barley extract concentrate (Barley: Domestic, solids), Purified water, Malt extract powder (Barley: 100%), Glucose], Flavoring (Roasted barley flavor, Barley flavor)</p>
            </div>
          ) : productId === "5" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>Ingredients : Sesame Oil 100% (Korea)</p>
              <p>Size : 180ml</p>
            </div>
          ) : productId === "7" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>Ingredients : Perilla oil 100% (Korea)</p>
              <p>Size : 180ml</p>
            </div>
          ) : productId === "8" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-3">
              <div>
                <p className="font-medium mb-1">1 x Sesame oil</p>
                <p>Ingredients : Sesame Oil 100% (Korea)</p>
                <p>Size : 180ml</p>
              </div>
              <div>
                <p className="font-medium mb-1">1 x Perilla oil</p>
                <p>Ingredients : Perilla oil 100% (Korea)</p>
                <p>Size : 180ml</p>
              </div>
            </div>
          ) : productId === "9" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>• Category: Fortified Rice Wine (Gwahaju).</p>
              <p>• Volume: 375ml.</p>
              <p>• ABV (Alcohol by Volume): 20%.</p>
              <p>• Ingredients: Water, Glutinous Rice, Yeast (Nuruk), and Distilled Soju (Alcohol).</p>
              <p>• Manufacturer: Agricultural Corporation Baekkyung Distillery Inc., Sejong-si, South Korea.</p>
            </div>
          ) : productId === "10" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>Size : 200g (2 serving)</p>
              <p>Ingredients : Flour(Domastic), Red rice powder(Domastic), Refined salt, Canola oil</p>
            </div>
          ) : productId === "11" ? (
            <div className="text-sm font-body font-light text-foreground/70 space-y-1">
              <p>Size : 500g (5 servings)</p>
              <p>Ingredients : Flour, Plum powder (Korea), Sweet pumpkin powder (Korea), Matecha(Korea), Black rice powder(Korea), Honey, Gardenia natural color, Refined salt, Canola oil</p>
            </div>
          ) : (
            <p className="text-sm font-body font-light text-foreground/70">
              Net Weight: 420g (875kcal). Made with 100% domestic Korean Hovenia Dulcis. Ready to mix with water for a 
              refreshing traditional Korean beverage.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-heading font-medium text-foreground">Chef's Notes</h3>
          {productId === "1" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              The Hovenia fruit is a nutritional powerhouse traditionally prized for its ability to support liver health. I've designed this to be a robust, earthy concentrate that isn't just about flavor, but about restoration. The deep, woody undertones are best revealed when mixed with plenty of water. It is my top recommendation for those seeking a daily liver cleanse or a powerful 'morning-after' hydration boost.
            </p>
          ) : productId === "2" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              The beauty of Corn Silk tea lies in its subtle, silky texture. I recommend this as a morning ritual to gently awaken the body. Its light sweetness is purely natural, so it doesn't overpower your breakfast, making it a sophisticated alternative to juice
            </p>
          ) : productId === "3" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed whitespace-pre-line">
              Start with 1 pump for every 1 litre of water and adjust to your preferred "nutty" intensity

While it's excellent cold for Singapore's heat, drinking it warm before bed helps highlight the Vitamin E and mineral notes for a soothing nightcap.
            </p>
          ) : productId === "4" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              This is the 'comfort food' of Korean teas. For a premium experience, serve it ice-cold in a chilled glass to highlight its crisp, roasted notes. It pairs excellently with spicy Singaporean dishes, as the grain's natural sweetness helps soothe the heat.
            </p>
          ) : productId === "5" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              Kkosi Kkosi oils are the 'liquid gold' of the Korean pantry. For the Sesame Oil, I highly recommend drizzling it over fresh spinach namul; the oil actually helps your body absorb more vitamins from the greens.
            </p>
          ) : productId === "7" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              For the Perilla Oil, try using it when stir-frying dried or mountain vegetables; it has a magical ability to remove bitterness and replace it with a deep, savory richness. Because these are cold-pressed from whole seeds, remember to give the bottle a gentle shake before use to incorporate the nutritious minerals at the bottom
            </p>
          ) : productId === "8" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              The magic of this set lies in its purity. The Sesame Oil is incredibly potent—a single drop can transform a simple bowl of rice into a gourmet experience. For the Perilla Oil, I recommend using it with dried vegetables; its unique profile removes bitterness and adds a sophisticated, buttery finish. Since these are high-protein oils, remember to 'shake to wake' the nutrients at the bottom for the full health benefit.
            </p>
          ) : productId === "9" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              Seoriju is a hidden gem in the world of Korean spirits. Because it is a Gwahaju, it has a beautiful, 'fortified' body that sits between a refined sake and a delicate brandy. I suggest pairing it with savory Korean pancakes (Jeon) or even a rich cheese platter. The subtle sweetness and higher ABV make it an excellent palate cleanser. For a truly 'Moondk' experience, serve it straight from the refrigerator on a quiet evening—the 'Frost' in its name really comes to life when the glass starts to mist.
            </p>
          ) : productId === "10" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              The red rice gives these noodles a stunning natural hue that elevates any dish. I highly recommend using these for a cold 'Bibim-guksu' (spicy mixed noodles); the firm texture provides a wonderful 'al dente' bite that beautifully complements fresh, crunchy vegetables.
            </p>
          ) : productId === "11" ? (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              This set is truly a work of art. The different natural flavors, like the subtle earthiness of matecha or the sweetness of pumpkin, add a sophisticated layer to your meal. For a Michelin-star presentation at home, serve each color in small, individual nests topped with delicate garnishes.
            </p>
          ) : (
            <p className="text-sm font-body font-light text-foreground/70 italic leading-relaxed">
              "Hovenia Dulcis has been cherished in Korean tradition for generations. This premium extract captures the 
              essence of this unique fruit, perfect for creating authentic Korean home dining experiences."
            </p>
          )}
        </div>
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
