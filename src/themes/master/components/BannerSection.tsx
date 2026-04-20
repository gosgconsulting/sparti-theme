import React from "react";
import Reveal from "@/libraries/flowbite/components/Reveal";
import { useInViewOnce } from "@/libraries/flowbite/hooks/useInViewOnce";
import type { ComponentSchema } from "../../../types/schema";

interface BannerSectionProps {
  component: ComponentSchema;
  className?: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  component,
  className = "",
}) => {
  const props = component.props || {};
  const items = component.items || [];

  const { ref: sectionRef, inView: sectionInView } = useInViewOnce<HTMLElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1,
  });

  const getText = (key: string) => {
    const item = items.find(
      (i) => i.key?.toLowerCase() === key.toLowerCase() && typeof (i as any).content === "string"
    ) as any;
    return item?.content || "";
  };

  const getButton = (keys: string[]) => {
    const lower = keys.map((k) => k.toLowerCase());
    const item = items.find(
      (i) => i.type === "button" && lower.includes(String(i.key || "").toLowerCase())
    ) as any;
    return { content: item?.content || "", link: item?.link || "#" };
  };

  const title = getText("title") || props.title || "";
  const description = getText("description") || props.description || "";
  const subtitle = getText("subtitle") || props.subtitle || "";
  const primaryCta = getButton(["cta", "primaryCta"]);

  // Split title at \n: first part dark, second part brand-color
  const [titleLine1, titleLine2] = title.includes("\n")
    ? title.split("\n").map((s: string) => s.trim())
    : [title, ""];

  return (
    <section
      ref={sectionRef as any}
      className={`relative bg-white flex items-center justify-center py-28 sm:py-36 overflow-hidden ${className}`}
    >
      {/* Subtle top radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--brand-primary) 6%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-4xl">

        {/* Badge pill */}
        {subtitle && (
          <Reveal direction="up" delayMs={0}>
            <div className="label-section gap-2 mb-8 shadow-sm">
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 shrink-0"
                style={{ color: "var(--brand-primary)" }}
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 1l1.545 4.755H15l-4.045 2.94 1.545 4.755L8 10.51l-4.5 2.94 1.545-4.755L1 5.755h5.455z" />
              </svg>
              <span>{subtitle}</span>
            </div>
          </Reveal>
        )}

        {/* Headline */}
        {title && (
          <Reveal direction="up" delayMs={80}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              {titleLine2 ? (
                <>
                  <span className="block text-gray-900">{titleLine1}</span>
                  <span
                    className="block"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    {titleLine2}
                  </span>
                </>
              ) : (
                <span className="text-gray-900">{titleLine1}</span>
              )}
            </h1>
          </Reveal>
        )}

        {/* Description */}
        {description && (
          <Reveal direction="up" delayMs={160}>
            <p className="text-lg sm:text-xl text-[color:var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </Reveal>
        )}

        {/* Single CTA */}
        {primaryCta.content && (
          <Reveal direction="up" delayMs={240}>
            <div className="flex justify-center">
              <a
                href={primaryCta.link}
                className={"btn-cta " + (sectionInView ? "animate-master-cta-pulse-once" : "")}
              >
                {primaryCta.content}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
