import React from "react";
import FlowbiteContentSection from "@/libraries/flowbite/components/FlowbiteContentSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "content",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Design System Content Section" },
    { key: "description", type: "text", content: "Use this component as reference when building new themes. Supports default content card and about variant." },
  ],
};

export function FlowbiteContentSectionPreview() {
  return <FlowbiteContentSection component={mockSchema} />;
}
