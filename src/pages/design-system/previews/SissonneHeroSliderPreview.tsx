import React from "react";
import { ContactModalProvider } from "@/themes/sissonne/contexts/ContactModalContext";
import { HeroSlider } from "@/themes/sissonne/components/HeroSlider";

export function SissonneHeroSliderPreview() {
  return (
    <ContactModalProvider>
      <HeroSlider />
    </ContactModalProvider>
  );
}
