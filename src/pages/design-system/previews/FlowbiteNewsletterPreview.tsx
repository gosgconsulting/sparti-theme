import React from "react";
import FlowbiteNewsletter from "@/libraries/flowbite/components/FlowbiteNewsletter";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "newsletter",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Subscribe to our newsletter" },
    { key: "subtitle", type: "text", content: "Design system preview." },
    { key: "placeholder", type: "text", content: "Enter your email" },
    { key: "button", type: "button", content: "Subscribe", link: "#" },
  ],
};

export function FlowbiteNewsletterPreview() {
  return <FlowbiteNewsletter component={mockSchema} />;
}
