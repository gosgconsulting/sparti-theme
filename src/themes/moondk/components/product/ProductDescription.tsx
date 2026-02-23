import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDescriptionProps {
  productId?: string;
}

const ProductDescription = ({ productId }: ProductDescriptionProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);

  return (
    <div className="space-y-0 mt-8 border-t border-border-light">
      <div className="border-b border-border-light">
        <Button
          variant="ghost"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-body font-light rounded-none"
        >
          <span>Description</span>
          {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDescriptionOpen && (
          <div className="pb-6 space-y-4">
            {productId === "1" || productId === "2" || productId === "3" || productId === "4" ? (
              <>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed font-medium">
                  Byulhasu
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  Byulhasu is a South Korean "emotional food brand" that operates under the motto, "Half of memories are taste
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  Led by CEO Noh Hae-woon, the company focuses on "1-second" convenience, modernizing traditional Korean flavors for a busy global lifestyle.
                </p>
              </>
            ) : productId === "5" || productId === "7" || productId === "8" ? (
              <>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed font-medium">
                  Kkosi Kkosi
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • A New Generation of Farming: The owner is a "Young Successor Farmer" officially selected by the Ministry of Agriculture, Food, and Rural Affairs.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • Direct Sourcing: The owner grows his own crops and personally selects seeds from neighboring farms to ensure absolute quality.
                </p>
              </>
            ) : productId === "9" ? (
              <>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed font-medium">
                  Beok's Seoriju
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  The Name: "Seori" (서리) translates to "Frost," evoking a sense of crisp purity, while "Ju" (주) stands for traditional Korean alcohol.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • A Summer Legacy: Seoriju belongs to the rare category of Gwahaju (과하주), which literally means "Passing through Summer". This traditional variety was historically brewed to withstand the intense summer heat without spoiling, making it a "fortified" masterpiece.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • Crafted Partnership: Produced as a premium OEM through a specialized Korean brewery (Agricultural Corporation Baekkyung Distillery Inc.), Seoriju represents the bridge between ancient fermentation secrets and modern aesthetic lifestyle.
                </p>
              </>
            ) : productId === "10" || productId === "11" ? (
              <>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed font-medium">
                  Myeongawon
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • A Master's Legacy: Founded in 1975 by Chairman Kang Hee-tak, a former Navy spy officer who mastered the art of "Sooyeon" (hand-stretched) noodles with incredible stubbornness.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • The 150,000-Hour Rule: CEO Choi Woo-guk has dedicated over 150,000 hours to perfecting handmade somen, believing that while shape can be imitated, authentic taste cannot be replicated.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  • Artisanal Process: Every strand is created through a rigorous 12-step HACCP-certified process and 8 distinct aging stages to ensure a superior, chewy texture.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  Our Chef's Selection Box brings together the finest Korean ingredients, carefully curated by our chef partners 
                  to help you create authentic home dining experiences. Each item is selected for its quality, authenticity, and 
                  ability to elevate your Korean cooking.
                </p>
                <p className="text-sm font-body font-light text-foreground/70 leading-relaxed">
                  This collection includes premium gochujang, traditional kimchi, high-quality sesame oil, and doenjang paste, 
                  along with a comprehensive recipe guide from our chef partners. Perfect for both beginners and experienced 
                  home cooks looking to explore Korean cuisine.
                </p>
              </>
            )}
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
              <>
                <div className="flex justify-between">
                  <span className="text-sm font-body font-light text-foreground/70">SKU</span>
                  <span className="text-sm font-body font-light text-foreground">MDK-CSB-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body font-light text-foreground/70">Collection</span>
                  <span className="text-sm font-body font-light text-foreground">Chef's Selection</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body font-light text-foreground/70">Shelf Life</span>
                  <span className="text-sm font-body font-light text-foreground">6-12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-body font-light text-foreground/70">Storage</span>
                  <span className="text-sm font-body font-light text-foreground">Cool, dry place</span>
                </div>
              </>
            )}
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
            {productId === "1" || productId === "2" || productId === "3" || productId === "4" ? (
              <ul className="space-y-2">
                <li className="text-sm font-body font-light text-foreground/70">
                  • Usage: The liquid dissolves instantly in both hot and cold water; simply use the included pump for easy dispensing.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Storage: Must be refrigerated unconditionally after opening and stored in a cool place away from direct sunlight.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Shelf Life: The product has an expiration date of 24 months (2 years) from the date of manufacture.
                </li>
              </ul>
            ) : productId === "5" || productId === "7" || productId === "8" ? (
              <>
                <ul className="space-y-2">
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Sesame Oil: Store in a cool, dark place at room temperature away from direct sunlight.
                  </li>
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Perilla Oil: Must be refrigerated (0-5C) to maintain freshness and prevent oxidation.
                  </li>
                </ul>
                <p className="text-sm font-body font-light text-foreground/70">
                  The natural sediment at the bottom of the oil is perfectly safe to consume. It consists of edible proteins and is rich in Vitamin E and essential minerals that are beneficial for your health. We recommend shaking the bottle gently before use to enjoy the full nutritional value
                </p>
              </>
            ) : productId === "9" ? (
              <ul className="space-y-2">
                <li className="text-sm font-body font-light text-foreground/70">
                  • Optimal Environment: Store in a cool and dry place away from direct sunlight.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Pro-Tip: For the best tasting experience and to preserve its delicate fruity notes, refrigeration is highly recommended.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Serving Suggestion: Best enjoyed Chilled or Warm. Serve in a small glass to appreciate the intricate earthy aromas.
                </li>
              </ul>
            ) : productId === "10" || productId === "11" ? (
              <ul className="space-y-2">
                <li className="text-sm font-body font-light text-foreground/70">
                  • Shelf Life: 2 years from manufacture.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Storage : Store in a cool, dry area to prevent the noodles from absorbing moisture.
                </li>
                <li className="text-sm font-body font-light text-foreground/70">
                  • Key Feature: Fast-cooking and convenient—ready in just 2 minutes and 30 seconds.
                </li>
              </ul>
            ) : (
              <>
                <ul className="space-y-2">
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Store in a cool, dry place away from direct sunlight
                  </li>
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Refrigerate after opening for best quality
                  </li>
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Use clean utensils to prevent contamination
                  </li>
                  <li className="text-sm font-body font-light text-foreground/70">
                    • Follow recipe guide for best results
                  </li>
                </ul>
                <p className="text-sm font-body font-light text-foreground/70">
                  For questions about storage or usage, contact our customer service team or refer to the included recipe guide.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
