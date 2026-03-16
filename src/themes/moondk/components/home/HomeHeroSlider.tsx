import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeLink } from "../ThemeLink";

import slide1 from "../../assets/tea/barleytea_2800x1664_smaller_right_1.png";
import slide2 from "../../assets/20240514_161154.jpg";
import slide3 from "../../assets/roof.png";
import slide4 from "../../assets/alcohol/seorijju_banner_right_positioned_1.png";

type Slide = {
  id: number;
  titleStart: string;
  emphasized: string;
  titleEnd: string;
  description: string;
  ctaText: string;
  ctaTo: string;
  image: string;
  bg: string;
  accent: string;
  gradient: string;
};

const slides: Slide[] = [
  {
    id: 5,
    titleStart: "Korean Taste,",
    emphasized: "Thoughtfully",
    titleEnd: "Curated",
    description:
      "A journey through Korean ingredients and flavours, crafted for those who appreciate thoughtful cooking and quiet culinary tradition.",
    ctaText: "Shop All",
    ctaTo: "/category/shop",
    image: slide3,
    bg: "#E9C5C9",
    accent: "#2F5C3E",
    gradient: "linear-gradient(90deg, rgba(245,210,15,0.55) 0%, rgba(245,210,15,0.40) 40%, rgba(245,210,15,0.12) 70%, rgba(245,210,15,0.00) 100%)",
  },
  {
    id: 2,
    titleStart: "An Intimate",
    emphasized: "Korean",
    titleEnd: "Dining Experience",
    description:
      "A private dining setting designed for small gatherings, where seasonal Korean cuisine is prepared with balance, care, and contemporary refinement.",
    ctaText: "Discover More",
    ctaTo: "/beok-private-dinning",
    image: slide2,
    bg: "#F3C3B4",
    accent: "#2F5C3E",
    gradient: "linear-gradient(90deg, rgba(245,210,15,0.55) 0%, rgba(245,210,15,0.40) 40%, rgba(245,210,15,0.12) 70%, rgba(245,210,15,0.00) 100%)",
  },
  {
    id: 1,
    titleStart: "Tradition in",
    emphasized: "Every",
    titleEnd: "Drop",
    description:
      "Authentic Korean teas, carefully extracted. Pure flavour made simple for everyday moments.",
    ctaText: "Shop Tea",
    ctaTo: "/category/shop?filter=Tea",
    image: slide1,
    bg: "#F6B7C1",
    accent: "#B2458A",
    gradient: "linear-gradient(90deg, rgba(245,210,15,0.55) 0%, rgba(245,210,15,0.40) 40%, rgba(245,210,15,0.12) 70%, rgba(245,210,15,0.00) 100%)",
  },
  {
    id: 4,
    titleStart: "The Spirit of",
    emphasized: "Korean",
    titleEnd: "Craft",
    description:
      "A traditional Korean grain spirit shaped by patience and craft. Balanced, refined, and rooted in brewing tradition.",
    ctaText: "Explore Seoriju",
    ctaTo: "/category/shop?filter=Alcohol",
    image: slide4,
    bg: "#E9C5C9",
    accent: "#2F5C3E",
    gradient: "linear-gradient(90deg, rgba(245,210,15,0.55) 0%, rgba(245,210,15,0.40) 40%, rgba(245,210,15,0.12) 70%, rgba(245,210,15,0.00) 100%)",
  },
];

export default function HomeHeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = useMemo(() => slides[index], [index]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(t);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ 
        background: '#FFFFFF',
        transition: 'background 0.8s ease-in-out'
      }}
    >
      {/* Render all slides with smooth transitions */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover object-[70%_center]"
          />
          {/* Warm white gradient overlay behind text */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to right, rgba(255,252,235,0.95) 0%, rgba(255,248,220,0.85) 30%, rgba(255,245,200,0.6) 50%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0) 85%)',
              zIndex: 15
            }}
          />
        </div>
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-20 min-h-[500px] sm:min-h-[600px] flex items-center z-20">
        <div className="max-w-xl transition-opacity duration-500 ease-in-out">
          <h1 className="font-body text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] sm:leading-[0.95] tracking-tight text-[#1A1A1A]">
            {slide.id === 3 ? (
              <>
                <span className="whitespace-nowrap">{slide.titleStart} <span className="font-heading italic font-normal text-black">{slide.emphasized}</span> {slide.titleEnd.split(' ')[0]}</span>
                <span className="block">{slide.titleEnd.split(' ').slice(1).join(' ')}</span>
              </>
            ) : slide.id === 5 ? (
              <>
                <span className="whitespace-nowrap">{slide.titleStart}</span>
                <span className="block"><span className="font-heading italic font-normal text-black">{slide.emphasized}</span></span>
                <span className="block">{slide.titleEnd}</span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap">{slide.titleStart} <span className="font-heading italic font-normal text-black">{slide.emphasized}</span></span>
                <span className="block">{slide.titleEnd}</span>
              </>
            )}
          </h1>

          <p className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-body text-[#1A1A1A]/80 leading-relaxed ${slide.id === 3 ? 'max-w-[75%] sm:max-w-md' : 'max-w-md'}`}>
            {slide.description}
          </p>

          <div className="mt-6 sm:mt-8">
            <Button
              asChild
              className="rounded-full px-6 sm:px-8 md:px-10 h-10 sm:h-11 md:h-12 text-sm sm:text-base uppercase tracking-wide bg-primary hover:bg-primary-hover !text-white"
            >
              <ThemeLink to={slide.ctaTo} className="!text-white">{slide.ctaText}</ThemeLink>
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={
                  "transition-all rounded-full border border-white/60 bg-white/40 " +
                  (active ? "w-8 h-2" : "w-2.5 h-2.5 hover:bg-white/60")
                }
              />
            );
          })}
        </div>
      </div>

      {/* Slide Navigation Buttons - Positioned on left and right edges - Hidden on mobile */}
      <button
        type="button"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/60 hover:bg-white/80 border border-white/40 items-center justify-center transition-colors z-10"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
      </button>
      <button
        type="button"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/60 hover:bg-white/80 border border-white/40 items-center justify-center transition-colors z-10"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-[#1A1A1A]" />
      </button>
    </section>
  );
}
