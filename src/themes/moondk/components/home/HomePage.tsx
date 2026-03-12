import HomeHeroSlider from "./HomeHeroSlider";
import HomeCategoryCarousel from "./HomeCategoryCarousel";
import HomeNewArrivalsSection from "./HomeNewArrivalsSection";
import HomeAboutSection from "./HomeAboutSection";
import HomeFineDiningSection from "./HomeFineDiningSection";
// HIDDEN: HomeRecipesSection - can be restored by uncommenting
// import HomeRecipesSection from "./HomeRecipesSection";

export default function HomePage() {
  return (
    <main>
      {/* Hero slider (LoveWellness-style) */}
      <HomeHeroSlider />

      {/* Product categories */}
      <HomeCategoryCarousel />

      {/* About MoonDk */}
      <HomeAboutSection />

      {/* New arrivals */}
      <HomeNewArrivalsSection />

      {/* Fine Dining at Beok */}
      <HomeFineDiningSection />

      {/* HIDDEN: Recipes - can be restored by uncommenting */}
      {/* <HomeRecipesSection /> */}
    </main>
  );
}