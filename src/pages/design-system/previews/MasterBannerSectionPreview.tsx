import React from "react";
import BannerSection from "@/themes/master/components/BannerSection";
import type { ComponentSchema } from "@/types/schema";

const mockBannerSchema: ComponentSchema = {
  type: "banner",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Design System Banner" },
    { key: "subtitle", type: "text", content: "Full-screen hero with branding and CTA." },
    { key: "cta", type: "button", content: "Contact us", link: "#" },
  ],
};

export function MasterBannerSectionPreview() {
  return <BannerSection component={mockBannerSchema} />;
}
