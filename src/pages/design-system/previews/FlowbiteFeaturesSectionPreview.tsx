import React from "react";
import FlowbiteFeaturesSection from "@/libraries/flowbite/components/FlowbiteFeaturesSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "features",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Our Solution" },
    { key: "subtitle", type: "text", content: "Design system features section preview." },
    {
      key: "features",
      type: "array",
      items: [
        { key: "title", type: "heading", content: "Feature One" },
        { key: "description", type: "text", content: "First feature description." },
        { key: "title", type: "heading", content: "Feature Two" },
        { key: "description", type: "text", content: "Second feature description." },
        { key: "title", type: "heading", content: "Feature Three" },
        { key: "description", type: "text", content: "Third feature description." },
      ],
    },
  ],
};

export function FlowbiteFeaturesSectionPreview() {
  return <FlowbiteFeaturesSection component={mockSchema} />;
}
