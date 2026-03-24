import { Leaf, Award, Heart, Sparkles } from "lucide-react";

interface ProductHighlightsProps {
  productId?: string;
}

export default function ProductHighlights({ productId }: ProductHighlightsProps) {
  // Define highlights based on product category or use defaults
  const highlights = [
    {
      icon: Leaf,
      title: "Natural",
    },
    {
      icon: Award,
      title: "Premium Quality",
    },
    {
      icon: Heart,
      title: "Wellness Focused",
    },
    {
      icon: Sparkles,
      title: "Authentic",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {highlights.map((highlight, index) => {
        const Icon = highlight.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-foreground/[0.02] border border-border/20 transition-all duration-200 hover:bg-foreground/[0.04] hover:border-border/30"
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5 text-foreground/60 mb-2 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-xs md:text-sm font-body font-light text-foreground/70 text-center leading-tight">
              {highlight.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
