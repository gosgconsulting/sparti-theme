import React from "react";
import Reveal from "@/libraries/flowbite/components/Reveal";
import type { ComponentSchema } from "../../../types/schema";

interface AboutSectionProps {
  component: ComponentSchema;
}

const AboutSection: React.FC<AboutSectionProps> = ({ component }) => {
  const props = component.props || {};
  const items = component.items || [];

  const getText = (key: string): string => {
    const item = items.find(
      (i) => i.key?.toLowerCase() === key.toLowerCase() && typeof (i as any).content === "string"
    ) as any;
    return item?.content || props[key] || "";
  };

  const getButton = (key: string) => {
    const item = items.find(
      (i) => i.key?.toLowerCase() === key.toLowerCase() && i.type === "button"
    ) as any;
    return item ? { content: item.content || "", link: item.link || "#" } : null;
  };

  const badge = getText("badge");
  const title = getText("title");
  const imageSrc = (props.imageSrc as string) || "";
  const imageAlt = (props.imageAlt as string) || "About us";
  const cta = getButton("cta");

  // Collect paragraph blocks
  const paragraphs = items
    .filter((i) => i.key?.startsWith("content") && i.type === "text")
    .map((i) => (i as any).content as string);

  // Collect bullet points
  const bullets = items
    .filter((i) => i.key?.startsWith("bullet") && i.type === "text")
    .map((i) => (i as any).content as string);

  // Collect stats
  const stats = items
    .filter((i) => i.type === "stat")
    .map((i) => ({ value: (i as any).props?.value || "", label: (i as any).props?.label || "" }));

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — image */}
          <Reveal direction="right" delayMs={0}>
            <div className="relative w-full">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full rounded-2xl object-cover shadow-xl"
                  style={{ maxHeight: "520px" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              ) : (
                /* Placeholder when no image is set */
                <div
                  className="w-full rounded-2xl shadow-xl flex items-center justify-center"
                  style={{
                    minHeight: "400px",
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 8%, white), color-mix(in srgb, var(--brand-primary) 14%, white))",
                  }}
                >
                  <svg
                    className="h-20 w-20 opacity-20"
                    style={{ color: "var(--brand-primary)" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              )}

              {/* Decorative accent blob */}
              <div
                className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full -z-10 opacity-30 blur-2xl"
                style={{ backgroundColor: "var(--brand-primary)" }}
              />
            </div>
          </Reveal>

          {/* Right — content */}
          <div className="space-y-6">
            {badge && (
              <Reveal direction="up" delayMs={0}>
                <span className="label-section">
                  {badge}
                </span>
              </Reveal>
            )}

            {title && (
              <Reveal direction="up" delayMs={60}>
                <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--text-primary)] leading-tight">
                  {title}
                </h2>
              </Reveal>
            )}

            {paragraphs.map((text, i) => (
              <Reveal key={i} direction="up" delayMs={100 + i * 40}>
                <p className="text-[color:var(--text-muted)] leading-relaxed">{text}</p>
              </Reveal>
            ))}

            {bullets.length > 0 && (
              <Reveal direction="up" delayMs={160}>
                <ul className="space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[color:var(--text-secondary)]">
                      <span
                        className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--brand-primary)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {stats.length > 0 && (
              <Reveal direction="up" delayMs={200}>
                <div className="grid grid-cols-3 gap-6 pt-2">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p
                        className="text-3xl font-extrabold"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        {s.value}
                      </p>
                      <p className="text-xs text-[color:var(--text-muted)] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {cta && (
              <Reveal direction="up" delayMs={240}>
                <a href={cta.link} className="btn-cta inline-flex">
                  {cta.content}
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
