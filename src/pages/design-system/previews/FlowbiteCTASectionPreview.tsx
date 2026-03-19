import React from "react";
import FlowbiteCTASection from "@/libraries/flowbite/components/FlowbiteCTASection";
import type { ComponentSchema } from "@/types/schema";

const mockCTASchema: ComponentSchema = {
  type: "cta",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Ready to get started?" },
    { key: "description", type: "text", content: "Join thousands of teams building with our design system." },
    { key: "cta", type: "button", content: "Get started", link: "#" },
  ],
};

export function FlowbiteCTASectionPreview() {
  return <FlowbiteCTASection component={mockCTASchema} />;
}
