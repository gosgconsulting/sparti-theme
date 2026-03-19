import React from "react";
import FlowbiteHeroSection from "@/libraries/flowbite/components/FlowbiteHeroSection";
import type { ComponentSchema } from "@/types/schema";

const mockHeroSchema: ComponentSchema = {
  type: "hero",
  props: { showCarousel: false },
  items: [
    { key: "title", content: "Design System Hero" },
    { key: "subtitle", content: "Use this component as reference when building new themes." },
    { key: "cta", type: "button", content: "Get started", link: "#" },
  ],
};

export function FlowbiteHeroSectionPreview() {
  return (
    <FlowbiteHeroSection component={mockHeroSchema} />
  );
}
