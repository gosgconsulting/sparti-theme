import React from "react";
import FlowbitePageTitle from "@/libraries/flowbite/components/FlowbitePageTitle";
import type { ComponentSchema } from "@/types/schema";

const mockPageTitleSchema: ComponentSchema = {
  type: "page-title",
  props: {},
  items: [
    { key: "title", type: "heading", level: 1, content: "Design System Page Title" },
    { key: "subtitle", type: "text", content: "Use this component for page headers." },
  ],
};

export function FlowbitePageTitlePreview() {
  return <FlowbitePageTitle component={mockPageTitleSchema} />;
}
