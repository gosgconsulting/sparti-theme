import hoveniaTea1 from "../../assets/tea/Hovenia_Tea_fol/1.jpg";
import hoveniaDulcisImage from "../../assets/tea/Dulcis_extract.jpg";
import cornSilkTea1 from "../../assets/tea/Corn_Silk_fol/1.jpg";
import cornExtractImage from "../../assets/tea/corn_tea.jpg";
import blackBeanTea1 from "../../assets/tea/Blackbean_Tea_fol/1.jpg";
import blackBeanTeaImage from "../../assets/tea/black_bean_tea_extract.jpg";
import barleyTea1 from "../../assets/tea/Barley_Tea_fol/1.jpg";
import barleyTeaImage from "../../assets/tea/BEOK-Barleytea1.jpg";

// Oil products
import sesameOilImage from "../../assets/oil/BEOK-sesameoil1.jpg";
import perillaOilImage from "../../assets/oil/BEOK-perillaoil.jpg";
import saucesImage from "../../assets/oil/BEOK-sauces.jpg";

  // Alcohol products
import seorijuImage from "../../assets/alcohol/BEOK-seoriju1.jpg";

// Noodles products
import wheatNoodleImage from "../../assets/IMG_1701.jpg";
import wheatNoodleImage2 from "../../assets/noodles/IMG_1702.jpg";
import giftSetImage from "../../assets/noodles/Myrongawon_noodle/1.jpg";
import potatoNoodleImage1 from "../../assets/noodles/BEOK-Potatonoodle1.jpg";
import hallabongNoodleImage from "../../assets/noodles/BEOK-Hanrabongnoodle.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  isNew?: boolean;
  stock?: number;
}

export const products: Product[] = [
  // Tea products
  { id: 1, name: "Hovenia Dulcis Extract (헛개수)", category: "Tea", price: "$37", image: hoveniaTea1, isNew: true },
  { id: 2, name: "Corn Silk Tea Extract (옥미수/옥수수 수염차)", category: "Tea", price: "$58", image: cornSilkTea1, isNew: true },
  { id: 3, name: "Black Bean Tea Extract (검은콩차 진액)", category: "Tea", price: "$58", image: blackBeanTea1, isNew: true },
  { id: 4, name: "Barley Tea Extract (보리차 진액)", category: "Tea", price: "$32", image: barleyTea1, isNew: true },
  
  // Oil products
  { id: 5, name: "Cold Pressed Sesame Oil", category: "Oil", price: "$36", image: sesameOilImage },
  { id: 7, name: "Cold Pressed Perilla Oil", category: "Oil", price: "$36", image: perillaOilImage },
  { id: 8, name: "Cold Pressed Oil Gift Set", category: "Oil", price: "$68", image: saucesImage, isNew: true },
  
  // Alcohol products
  { id: 9, name: "Seoriju", category: "Alcohol", price: "$58", image: seorijuImage, isNew: true },
  
  // Noodles products
  { id: 10, name: "Myeongawon Hand-Stretched Red Rice Noodle", category: "Noodles", price: "$12", image: wheatNoodleImage2, isNew: true },
  { id: 11, name: "Myeongawon 5 Color Noodle Gift Set", category: "Noodles", price: "$26", image: giftSetImage, isNew: true },
  { id: 12, name: "Potato Noodle", category: "Noodles", price: "$22", image: potatoNoodleImage1 },
  { id: 13, name: "Hallabong Noodle", category: "Noodles", price: "$22", image: hallabongNoodleImage },
];

/**
 * Product detail only: stable pseudo-random low-stock badge (~45% of ids).
 * Same product always matches the same outcome (no flicker on refresh); not all SKUs show low stock.
 */
export function productShowsLowStockBadge(productId: string | number): boolean {
  if (typeof productId === "number" && Number.isFinite(productId)) {
    const mixed = Math.imul(productId, 7919) + 17;
    return (mixed >>> 0) % 100 < 45;
  }
  const s = String(productId);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 100 < 45;
}

export const categoryTabs = [
  "All",
  "Tea",
  "Oil",
  "Noodles",
  "Alcohol",
];

/** Breadcrumb / title when route id does not match catalog */
export const FALLBACK_PRODUCT_DISPLAY_NAME = "Hovenia Dulcis Extract (헛개수)";

export function getProductByRouteId(productId?: string): Product | undefined {
  return products.find((p) => p.id.toString() === productId);
}

const productLongDescriptions: Record<string, string> = {
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
  "12": "These noodles are crafted with 25% domestic potatoes, providing an earthy depth and a remarkably clean, savory finish. The addition of potato starch creates a superior chewiness and a smooth \"slip\" that is more satisfying than traditional wheat-only somen.",
  "13": "Infused with a staggering 35% of domestic Hallabong (premium Jeju citrus), these noodles carry a bright, refreshing aroma and a beautiful natural yellow hue. The citrus acidity adds a unique bounce to the noodle's texture, making it a refreshing sensory experience.",
};

const defaultProductLongDescription =
  "Premium Hovenia Dulcis extract (헛개수), a traditional Korean beverage concentrate known for its refreshing taste and health benefits. This premium extract is made from 100% domestic Hovenia Dulcis fruit, carefully processed to preserve its natural flavor and nutrients.";

/** Long-form copy for the product detail "Description" accordion panel */
export function getProductLongDescription(productId?: string): string {
  return productLongDescriptions[productId || ""] ?? defaultProductLongDescription;
}