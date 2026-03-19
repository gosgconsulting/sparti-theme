import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  asSection?: boolean;
};

export default function HorizontalRail({ title, subtitle, children, asSection = true }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-rail-card]");
    const step = firstCard ? firstCard.offsetWidth + 16 : Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const header = useMemo(() => {
    if (!title) return null;
    return (
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-2xl sm:text-3xl text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-2 font-body text-sm text-foreground/80 max-w-2xl">{subtitle}</p>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            className={`h-11 w-11 rounded-full border border-border bg-card hover:bg-muted transition-colors ${
              canLeft ? "" : "opacity-40 pointer-events-none"
            }`}
            aria-label="Scroll left"
            onClick={() => scrollByCards("left")}
          >
            <span aria-hidden="true" className="block -translate-x-[1px]">
              ←
            </span>
          </button>
          <button
            type="button"
            className={`h-11 w-11 rounded-full border border-border bg-card hover:bg-muted transition-colors ${
              canRight ? "" : "opacity-40 pointer-events-none"
            }`}
            aria-label="Scroll right"
            onClick={() => scrollByCards("right")}
          >
            <span aria-hidden="true" className="block translate-x-[1px]">
              →
            </span>
          </button>
        </div>
      </div>
    );
  }, [title, subtitle, canLeft, canRight]);

  const inner = (
    <div className="container mx-auto">
      {header}
      <div className={title ? "mt-6" : ""}>
        <div
          ref={scrollerRef}
          className="hotel2-rail gap-4 lg:gap-5 pb-4"
          role="region"
          aria-label={title ?? "Horizontal list"}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (!asSection) return inner;
  return <section className="py-10 lg:py-14">{inner}</section>;
}

