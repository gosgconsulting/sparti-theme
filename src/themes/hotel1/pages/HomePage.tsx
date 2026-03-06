import React from "react";
import HeroSection from "../components/sections/HeroSection";
import DirectBookingSection from "../components/sections/DirectBookingSection";
import GallerySection from "../components/sections/GallerySection";
import TrustSection from "../components/sections/TrustSection";
import AmenitiesSection from "../components/sections/AmenitiesSection";
import LocationSection from "../components/sections/LocationSection";

interface PageProps {
  themeSlug?: string;
  basePath?: string;
  tenantId?: string;
  tenantName?: string;
}

const HomePage: React.FC<PageProps> = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <DirectBookingSection />
      <GallerySection />
      <TrustSection />
      <AmenitiesSection />
      <LocationSection />
    </div>
  );
};

export default HomePage;
