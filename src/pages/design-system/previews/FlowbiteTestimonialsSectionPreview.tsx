import React from "react";
import FlowbiteTestimonialsSection from "@/libraries/flowbite/components/FlowbiteTestimonialsSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "testimonials",
  props: {},
  items: [
    { key: "title", type: "heading", content: "What Our Clients Say" },
    { key: "subtitle", type: "text", content: "Design system preview with mock testimonials." },
    {
      key: "testimonials",
      type: "array",
      items: [
        { key: "name", type: "text", content: "Jane D." },
        { key: "role", type: "text", content: "Client" },
        { key: "quote", type: "text", content: "Great experience. Highly recommend." },
        { key: "rating", type: "text", content: "5" },
      ],
    },
  ],
};

export function FlowbiteTestimonialsSectionPreview() {
  return <FlowbiteTestimonialsSection component={mockSchema} />;
}
