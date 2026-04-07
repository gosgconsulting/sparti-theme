import ProductAccordion from "./ProductAccordion";
import { getProductLongDescription } from "../category/products";

interface ProductDescriptionProps {
  productId?: string;
  /** When true, show Medusa description + generic panels only (no static 1–13 copy). */
  isMedusaProduct?: boolean;
  medusaDescription?: string | null;
}

const ProductDescription = ({
  productId,
  isMedusaProduct,
  medusaDescription,
}: ProductDescriptionProps) => {
  if (isMedusaProduct) {
    const desc = (medusaDescription ?? "").trim() || "No description available.";
    const medusaItems = [
      {
        id: "description",
        title: "Description",
        content: (
          <div className="space-y-4">
            {desc.split("\n\n").map((paragraph, idx) =>
              paragraph.trim() ? (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ) : null,
            )}
          </div>
        ),
      },
      {
        id: "storage-usage",
        title: "Storage & Usage",
        content: (
          <div className="space-y-4">
            <ul className="space-y-3">
              <li>• Store in a cool, dry place away from direct sunlight</li>
              <li>• Refrigerate after opening when indicated on the product label</li>
              <li>• Follow the producer&apos;s instructions on the packaging</li>
            </ul>
          </div>
        ),
      },
    ];
    return (
      <div className="mt-10 md:mt-12">
        <ProductAccordion items={medusaItems} />
      </div>
    );
  }

  const productDescription = getProductLongDescription(productId);

  // Build accordion items
  const accordionItems = [];

  // 1. Description (always first)
  accordionItems.push({
    id: "description",
    title: "Description",
    content: (
      <div className="space-y-4">
        {productDescription.split('\n\n').map((paragraph, idx) => (
          paragraph.trim() && (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          )
        ))}
      </div>
    ),
  });

  // 2. Product Details
  let productDetailsContent;
  if (productId === "1") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>• Size: 420g</p>
                <p>• Calories: 875kcal per bottle</p>
        <p>• Ingredients: Hovenia fruit base 97% [Fructooligosaccharide, Purified water, Hovenia tree fruit extract concentrate, Glucose, Flavoring (Hovenia fruit flavor)]</p>
              </div>
    );
  } else if (productId === "2") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>• Size: 870g</p>
                <p>• Calories: 1,930kcal per bottle</p>
        <p>• Ingredients: Corn silk tea base 97% [Other sugars, Purified water, Corn silk extract (Corn silk: Domestic), Roasted brown rice extract concentrate (Roasted brown rice: Domestic), Flavoring (Corn flavor), Glucose]</p>
              </div>
    );
  } else if (productId === "3") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>• Size: 870g</p>
                <p>• Calories: 2,025kcal per bottle</p>
        <p>Ingredients - 97% Korean Black Bean Tea Base [Black Bean Concentrate, Fructooligosaccharide], Water, Black Bean flavor, Citric Acid, Enzyme-treated Stevia</p>
                <p>Size - 870g (2,025Kcal)</p>
              </div>
    );
  } else if (productId === "4") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>• Size: 290g</p>
                <p>• Calories: 595kcal per bottle.</p>
        <p>• Ingredients: Barley base 97% [Fructooligosaccharide, Barley extract concentrate (Barley: Domestic, solids), Purified water, Malt extract powder (Barley: 100%), Glucose], Flavoring (Roasted barley flavor, Barley flavor)</p>
              </div>
    );
  } else if (productId === "5") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>Ingredients : Sesame Oil 100% (Korea)</p>
                <p>Size : 180ml</p>
              </div>
    );
  } else if (productId === "7") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>Ingredients : Perilla oil 100% (Korea)</p>
                <p>Size : 180ml</p>
              </div>
    );
  } else if (productId === "8") {
    productDetailsContent = (
      <div className="space-y-4">
                <div>
          <p className="font-medium">1 x Sesame oil</p>
                  <p>Ingredients : Sesame Oil 100% (Korea)</p>
                  <p>Size : 180ml</p>
                </div>
                <div>
          <p className="font-medium">1 x Perilla oil</p>
                  <p>Ingredients : Perilla oil 100% (Korea)</p>
                  <p>Size : 180ml</p>
                </div>
              </div>
    );
  } else if (productId === "9") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>• Category: Fortified Rice Wine (Gwahaju).</p>
                <p>• Volume: 375ml.</p>
                <p>• ABV (Alcohol by Volume): 20%.</p>
                <p>• Ingredients: Water, Glutinous Rice, Yeast (Nuruk), and Distilled Soju (Alcohol).</p>
                <p>• Manufacturer: Agricultural Corporation Baekkyung Distillery Inc., Sejong-si, South Korea.</p>
              </div>
    );
  } else if (productId === "10") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>Size : 200g (2 serving)</p>
                <p>Ingredients : Flour(Domastic), Red rice powder(Domastic), Refined salt, Canola oil</p>
              </div>
    );
  } else if (productId === "11") {
    productDetailsContent = (
      <div className="space-y-4">
                <p>Size : 500g (5 servings)</p>
                <p>Ingredients : Flour, Plum powder (Korea), Sweet pumpkin powder (Korea), Matecha(Korea), Black rice powder(Korea), Honey, Gardenia natural color, Refined salt, Canola oil</p>
              </div>
    );
  } else if (productId === "12") {
    productDetailsContent = (
      <div className="space-y-4">
        <p>• Weight: 500g.</p>
        <p>• Calories: 338 kcal per 100g (Total 1,690 kcal).</p>
        <p>• Ingredients: Flour 62% (Australia, USA), Potato (Domestic) 25%, Rice (Domestic) 10%, Sea salt (Domestic) 2.3%, Alcohol.</p>
      </div>
    );
  } else if (productId === "13") {
    productDetailsContent = (
      <div className="space-y-4">
        <p>• Weight: 500g.</p>
        <p>• Calories: 330 kcal per 100g (Total 1,650 kcal).</p>
        <p>• Ingredients: Flour 52% (Australia, USA), Hallabong (Domestic) 35%, Rice (Domestic) 10%, Sea salt (Domestic) 2.3%, Alcohol 0.7%.</p>
      </div>
    );
  } else {
    productDetailsContent = (
      <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
          <span>SKU</span>
          <span>MDK-CSB-001</span>
                </div>
                <div className="flex justify-between">
          <span>Collection</span>
          <span>Chef's Selection</span>
                </div>
                <div className="flex justify-between">
          <span>Shelf Life</span>
          <span>6-12 months</span>
                </div>
                <div className="flex justify-between">
          <span>Storage</span>
          <span>Cool, dry place</span>
          </div>
      </div>
    );
  }

  accordionItems.push({
    id: "product-details",
    title: "Product Details",
    content: productDetailsContent,
  });

  // 4. Chef's Notes
  let chefsNotesContent;
  if (productId === "1") {
    chefsNotesContent = (
      <p className="italic">
        The Hovenia fruit is a nutritional powerhouse traditionally prized for its ability to support liver health. I've designed this to be a robust, earthy concentrate that isn't just about flavor, but about restoration. The deep, woody undertones are best revealed when mixed with plenty of water. It is my top recommendation for those seeking a daily liver cleanse or a powerful 'morning-after' hydration boost.
      </p>
    );
  } else if (productId === "2") {
    chefsNotesContent = (
      <p className="italic">
        The beauty of Corn Silk tea lies in its subtle, silky texture. I recommend this as a morning ritual to gently awaken the body. Its light sweetness is purely natural, so it doesn't overpower your breakfast, making it a sophisticated alternative to juice
      </p>
    );
  } else if (productId === "3") {
    chefsNotesContent = (
      <p className="italic whitespace-pre-line">
        Start with 1 pump for every 1 litre of water and adjust to your preferred "nutty" intensity

While it's excellent cold for Singapore's heat, drinking it warm before bed helps highlight the Vitamin E and mineral notes for a soothing nightcap.
      </p>
    );
  } else if (productId === "4") {
    chefsNotesContent = (
      <p className="italic">
        This is the 'comfort food' of Korean teas. For a premium experience, serve it ice-cold in a chilled glass to highlight its crisp, roasted notes. It pairs excellently with spicy Singaporean dishes, as the grain's natural sweetness helps soothe the heat.
      </p>
    );
  } else if (productId === "5") {
    chefsNotesContent = (
      <p className="italic">
        Kkosi Kkosi oils are the 'liquid gold' of the Korean pantry. For the Sesame Oil, I highly recommend drizzling it over fresh spinach namul; the oil actually helps your body absorb more vitamins from the greens.
      </p>
    );
  } else if (productId === "7") {
    chefsNotesContent = (
      <p className="italic">
        For the Perilla Oil, try using it when stir-frying dried or mountain vegetables; it has a magical ability to remove bitterness and replace it with a deep, savory richness. Because these are cold-pressed from whole seeds, remember to give the bottle a gentle shake before use to incorporate the nutritious minerals at the bottom
      </p>
    );
  } else if (productId === "8") {
    chefsNotesContent = (
      <p className="italic">
        The magic of this set lies in its purity. The Sesame Oil is incredibly potent—a single drop can transform a simple bowl of rice into a gourmet experience. For the Perilla Oil, I recommend using it with dried vegetables; its unique profile removes bitterness and adds a sophisticated, buttery finish. Since these are high-protein oils, remember to 'shake to wake' the nutrients at the bottom for the full health benefit.
      </p>
    );
  } else if (productId === "9") {
    chefsNotesContent = (
      <p className="italic">
        Seoriju is a hidden gem in the world of Korean spirits. Because it is a Gwahaju, it has a beautiful, 'fortified' body that sits between a refined sake and a delicate brandy. I suggest pairing it with savory Korean pancakes (Jeon) or even a rich cheese platter. The subtle sweetness and higher ABV make it an excellent palate cleanser. For a truly 'Moondk' experience, serve it straight from the refrigerator on a quiet evening—the 'Frost' in its name really comes to life when the glass starts to mist.
      </p>
    );
  } else if (productId === "10") {
    chefsNotesContent = (
      <p className="italic">
        The red rice gives these noodles a stunning natural hue that elevates any dish. I highly recommend using these for a cold 'Bibim-guksu' (spicy mixed noodles); the firm texture provides a wonderful 'al dente' bite that beautifully complements fresh, crunchy vegetables.
      </p>
    );
  } else if (productId === "11") {
    chefsNotesContent = (
      <p className="italic">
        This set is truly a work of art. The different natural flavors, like the subtle earthiness of matecha or the sweetness of pumpkin, add a sophisticated layer to your meal. For a Michelin-star presentation at home, serve each color in small, individual nests topped with delicate garnishes.
      </p>
    );
  } else if (productId === "12") {
    chefsNotesContent = (
      <p className="italic">
        The Potato Noodle is the ultimate choice for savory comfort. Its resilient texture holds up beautifully in warm broths without becoming mushy. I recommend serving it in a clear Anchovy broth or a 'Janchi-guksu' style soup where its clean, nutty flavor can truly shine
      </p>
    );
  } else if (productId === "13") {
    chefsNotesContent = (
      <p className="italic">
        This is a masterpiece for warm weather. The subtle citrus fragrance is best highlighted in a cold salad pasta. Toss these noodles with fresh arugula, a drizzle of our Kkosi Kkosi Perilla Oil, and a squeeze of lemon to create a vibrant, Michelin-quality meal at home
      </p>
    );
  } else {
    chefsNotesContent = (
      <p className="italic">
        "Hovenia Dulcis has been cherished in Korean tradition for generations. This premium extract captures the essence of this unique fruit, perfect for creating authentic Korean home dining experiences."
      </p>
    );
  }

  if (chefsNotesContent) {
    accordionItems.push({
      id: "chefs-notes",
      title: "Chef's Notes",
      content: chefsNotesContent,
    });
  }

  // 4. Their Story (only for products 1-13)
  const isProduct1to13 = productId && parseInt(productId) >= 1 && parseInt(productId) <= 13;
  if (isProduct1to13) {
    let brandStoryContent;
    if (productId === "1" || productId === "2" || productId === "3" || productId === "4") {
      brandStoryContent = (
        <div className="space-y-4">
          <p className="font-medium">Byulhasu</p>
          <p>Byulhasu is a South Korean "emotional food brand" that operates under the motto, "Half of memories are taste</p>
          <p>Led by CEO Noh Hae-woon, the company focuses on "1-second" convenience, modernizing traditional Korean flavors for a busy global lifestyle.</p>
        </div>
      );
    } else if (productId === "5" || productId === "7" || productId === "8") {
      brandStoryContent = (
        <div className="space-y-4">
          <p className="font-medium">Kkosi Kkosi</p>
          <p>• A New Generation of Farming: The owner is a "Young Successor Farmer" officially selected by the Ministry of Agriculture, Food, and Rural Affairs.</p>
          <p>• Direct Sourcing: The owner grows his own crops and personally selects seeds from neighboring farms to ensure absolute quality.</p>
        </div>
      );
    } else if (productId === "9") {
      brandStoryContent = (
        <div className="space-y-4">
          <p className="font-medium">Beok's Seoriju</p>
          <p>The Name: "Seori" (서리) translates to "Frost," evoking a sense of crisp purity, while "Ju" (주) stands for traditional Korean alcohol.</p>
          <p>• A Summer Legacy: Seoriju belongs to the rare category of Gwahaju (과하주), which literally means "Passing through Summer". This traditional variety was historically brewed to withstand the intense summer heat without spoiling, making it a "fortified" masterpiece.</p>
          <p>• Crafted Partnership: Produced as a premium OEM through a specialized Korean brewery (Agricultural Corporation Baekkyung Distillery Inc.), Seoriju represents the bridge between ancient fermentation secrets and modern aesthetic lifestyle.</p>
        </div>
      );
    } else if (productId === "10" || productId === "11") {
      brandStoryContent = (
        <div className="space-y-4">
          <p className="font-medium">Myeongawon</p>
          <p>• A Master's Legacy: Founded in 1975 by Chairman Kang Hee-tak, a former Navy spy officer who mastered the art of "Sooyeon" (hand-stretched) noodles with incredible stubbornness.</p>
          <p>• The 150,000-Hour Rule: CEO Choi Woo-guk has dedicated over 150,000 hours to perfecting handmade somen, believing that while shape can be imitated, authentic taste cannot be replicated.</p>
          <p>• Artisanal Process: Every strand is created through a rigorous 12-step HACCP-certified process and 8 distinct aging stages to ensure a superior, chewy texture.</p>
        </div>
      );
    } else if (productId === "12" || productId === "13") {
      brandStoryContent = (
        <div className="space-y-4">
          <p className="font-medium">Grande Noodle</p>
          <p>• Heritage of Patience: Since 1987, this brand has practiced "the aesthetics of waiting" in Geochang, Gyeongnam, using natural wind and sunlight to dry their noodles instead of artificial machines.</p>
          <p>• Artisanal Mastery: Led by Master Artisan Kim Hyun-gyu, who brings over 40 years of experience to every batch, ensuring a texture that is uniquely chewy and resilient.</p>
          <p>• Whole-Ingredient Philosophy: Unlike standard noodles that use powdered additives, Geochanghan Guksu grinds fresh, seasonal ingredients whole and kneads them directly into the dough to capture authentic flavors and colors.</p>
          <p>• No Artificial Colors: All vibrant hues are derived naturally from the primary ingredients, reflecting the brand's commitment to honest, premium food.</p>
        </div>
      );
    }

    if (brandStoryContent) {
      accordionItems.push({
        id: "their-story",
        title: "Their Story",
        content: brandStoryContent,
      });
    }
  }

  // 5. Storage & Usage
  let storageContent;
  if (productId === "1" || productId === "2" || productId === "3" || productId === "4") {
    storageContent = (
      <ul className="space-y-4">
        <li>• Usage: The liquid dissolves instantly in both hot and cold water; simply use the included pump for easy dispensing.</li>
        <li>• Storage: Must be refrigerated unconditionally after opening and stored in a cool place away from direct sunlight.</li>
        <li>• Shelf Life: The product has an expiration date of 24 months (2 years) from the date of manufacture.</li>
              </ul>
    );
  } else if (productId === "5" || productId === "7" || productId === "8") {
    storageContent = (
      <div className="space-y-4">
        <ul className="space-y-3">
          <li>• Sesame Oil: Store in a cool, dark place at room temperature away from direct sunlight.</li>
          <li>• Perilla Oil: Must be refrigerated (0-5C) to maintain freshness and prevent oxidation.</li>
                </ul>
        <p>
                  The natural sediment at the bottom of the oil is perfectly safe to consume. It consists of edible proteins and is rich in Vitamin E and essential minerals that are beneficial for your health. We recommend shaking the bottle gently before use to enjoy the full nutritional value
                </p>
      </div>
    );
  } else if (productId === "9") {
    storageContent = (
      <ul className="space-y-4">
        <li>• Optimal Environment: Store in a cool and dry place away from direct sunlight.</li>
        <li>• Pro-Tip: For the best tasting experience and to preserve its delicate fruity notes, refrigeration is highly recommended.</li>
        <li>• Serving Suggestion: Best enjoyed Chilled or Warm. Serve in a small glass to appreciate the intricate earthy aromas.</li>
              </ul>
    );
  } else if (productId === "10" || productId === "11") {
    storageContent = (
      <ul className="space-y-4">
        <li>• Shelf Life: 2 years from manufacture.</li>
        <li>• Storage : Store in a cool, dry area to prevent the noodles from absorbing moisture.</li>
        <li>• Key Feature: Fast-cooking and convenient—ready in just 2 minutes and 30 seconds.</li>
              </ul>
    );
  } else if (productId === "12" || productId === "13") {
    storageContent = (
      <ul className="space-y-4">
        <li>• Standard Storage: Store in a cool, dry place at room temperature, away from direct sunlight and humidity.</li>
        <li>• Post-Opening: It is recommended to consume as soon as possible after opening; store any remaining noodles in an airtight container to maintain the best dry texture.</li>
        <li>• Cooking Tip: Due to the high content of whole ingredients, the cooking time may vary slightly from standard somen. Rinse thoroughly in ice-cold water after boiling to maximize the "springy" artisanal texture.</li>
              </ul>
    );
  } else {
    storageContent = (
      <div className="space-y-4">
        <ul className="space-y-3">
          <li>• Store in a cool, dry place away from direct sunlight</li>
          <li>• Refrigerate after opening for best quality</li>
          <li>• Use clean utensils to prevent contamination</li>
          <li>• Follow recipe guide for best results</li>
                </ul>
        <p>
                  For questions about storage or usage, contact our customer service team or refer to the included recipe guide.
                </p>
          </div>
    );
  }

  accordionItems.push({
    id: "storage-usage",
    title: "Storage & Usage",
    content: storageContent,
  });

  return (
    <div className="mt-10 md:mt-12">
      <ProductAccordion items={accordionItems} />
    </div>
  );
};

export default ProductDescription;
