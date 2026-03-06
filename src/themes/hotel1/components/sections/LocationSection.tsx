import React, { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const LocationSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeHighlight, setActiveHighlight] = useState("Culture");

  const highlights = [
    {
      id: "Culture",
      title: "Cultural District",
      description: "Within walking distance of museums, galleries, and performance venues.",
      distance: "5 min walk",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    },
    {
      id: "Dining",
      title: "Culinary Scene",
      description: "Surrounded by acclaimed restaurants, cafes, and local food markets.",
      distance: "2 min walk",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    },
    {
      id: "Shopping",
      title: "Boutique Shopping",
      description: "Discover unique local boutiques and designer stores nearby.",
      distance: "8 min walk",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    },
    {
      id: "Waterfront",
      title: "Waterfront Access",
      description: "Easy access to waterfront promenades and scenic walking paths.",
      distance: "10 min walk",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    },
    {
      id: "Business",
      title: "Business District",
      description: "Conveniently located near major business centers and corporate offices.",
      distance: "12 min walk",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    },
    {
      id: "Hidden Gems",
      title: "Hidden Gems",
      description: "Local favorites and secret spots known to residents and our concierge team.",
      distance: "Various",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    },
  ];

  const activeHighlightData = highlights.find((h) => h.id === activeHighlight) || highlights[0];

  return (
    <section
      ref={ref}
      className={`bg-brand-main pt-8 lg:pt-12 pb-12 lg:pb-20 section-scroll-animate ${isVisible ? "visible" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 lg:mb-24 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Location
          </p>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-text mb-6">
            Discover the area
          </h2>
          <p className="font-body text-lg text-brand-text/70 leading-relaxed">
            Our neighborhood offers an exceptional blend of culture, cuisine, and curated experiences—each destination thoughtfully selected by our concierge team.
          </p>
        </div>

        {/* Main Discovery Module */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Destination Panel */}
          <div className="relative mb-16 lg:mb-20">
            <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-brand-neutral/10">
              {/* Featured Image */}
              <div className="absolute inset-0">
                <img
                  src={activeHighlightData.image}
                  alt={activeHighlightData.title}
                  className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  key={activeHighlight}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/70 via-brand-text/30 to-transparent" />
              </div>

              {/* Featured Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-16">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body text-xs text-white/90 uppercase tracking-wider">
                      Concierge Pick
                    </span>
                    <span className="h-px w-16 bg-white/40" />
                    <span className="font-body text-sm text-white/80 font-medium">
                      {activeHighlightData.distance} from hotel
                    </span>
                  </div>
                  <h3 className="font-headline text-3xl lg:text-5xl font-semibold text-white mb-5 leading-tight">
                    {activeHighlightData.title}
                  </h3>
                  <p className="font-body text-lg lg:text-xl text-white/95 leading-relaxed max-w-xl">
                    {activeHighlightData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Location Selectors */}
          <div className="relative">
            <div className="mb-8 lg:mb-12">
              <p className="font-body text-xs text-brand-text/50 uppercase tracking-wider text-center">
                Explore Nearby
              </p>
            </div>

            {/* Minimal Selector List */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 lg:gap-x-12">
              {highlights.map((highlight) => {
                const isActive = activeHighlight === highlight.id;
                return (
                  <button
                    key={highlight.id}
                    onClick={() => setActiveHighlight(highlight.id)}
                    className={`
                      group relative
                      text-center lg:text-left
                      px-0 py-2
                      transition-all duration-300 ease-in-out
                    `}
                  >
                    <div className="flex flex-col lg:flex-row items-center lg:items-baseline gap-1 lg:gap-2">
                      <h4
                        className={`
                          font-headline text-sm lg:text-base font-medium
                          transition-colors duration-300
                          ${
                            isActive
                              ? "text-brand-primary"
                              : "text-brand-text/60 group-hover:text-brand-text/80"
                          }
                        `}
                      >
                        {highlight.title}
                      </h4>
                      <span
                        className={`
                          font-body text-xs text-brand-text/40
                          transition-colors duration-300
                          ${isActive ? "text-brand-primary/60" : ""}
                        `}
                      >
                        {highlight.distance}
                      </span>
                    </div>
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-8 h-0.5 bg-brand-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 lg:mt-20 text-center">
            <button className="btn-primary">
              Discover the Area
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
