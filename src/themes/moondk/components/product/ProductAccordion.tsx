import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ProductAccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null; // Index of accordion to open by default (desktop only), null/undefined means all closed
}

export default function ProductAccordion({ items, defaultOpenIndex = null }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 48 * 16); // 48rem = 768px
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set default open state based on screen size
  useEffect(() => {
    if (!isMobile && defaultOpenIndex !== null && defaultOpenIndex !== undefined && items.length > 0) {
      setOpenIndex(defaultOpenIndex);
    } else {
      setOpenIndex(null);
    }
  }, [isMobile, defaultOpenIndex, items.length]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentRef = (el: HTMLDivElement | null) => {
          contentRefs.current[item.id] = el;
        };
        
        return (
          <div
            key={item.id}
            className="border-b border-border-light/40 last:border-b-0"
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className={`w-full py-5 md:py-6 flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#195B3E] focus-visible:ring-offset-4 ${
                isOpen 
                  ? "text-foreground" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <span className={`text-base md:text-lg font-heading font-medium tracking-wide ${
                isOpen ? "text-foreground" : "text-foreground/80"
              }`}>
                {item.title}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 md:h-4 md:w-4 text-foreground/40 flex-shrink-0 ml-6 transition-transform ${
                  prefersReducedMotion ? "" : "duration-300 ease-in-out"
                } ${isOpen ? "rotate-180 text-foreground/50" : ""}`}
                aria-hidden="true"
                strokeWidth={1}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              ref={contentRef}
              className={`grid transition-all ${
                prefersReducedMotion ? "" : "duration-500 ease-in-out"
              } ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              style={{
                transitionProperty: prefersReducedMotion ? "none" : "grid-template-rows, opacity",
              }}
            >
              <div className="overflow-hidden">
                <div className="pb-6 md:pb-8 pt-0">
                  <div className={`text-sm md:text-base font-body font-light text-foreground/70 leading-[1.75] max-w-[65ch] space-y-4 transition-opacity ${
                    prefersReducedMotion ? "" : "duration-500 ease-in-out"
                  } ${
                    isOpen ? "border-l border-[#195B3E]/20 pl-6 md:pl-8 opacity-100" : "opacity-0 border-l border-transparent pl-6 md:pl-8"
                  }`}>
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
