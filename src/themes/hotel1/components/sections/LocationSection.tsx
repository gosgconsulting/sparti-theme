import React, { useState } from "react";

const LocationSection = () => {
  const [activeHighlight, setActiveHighlight] = useState("Culture");

  const highlights = [
    {
      id: "Culture",
      title: "Cultural District",
      description: "Within walking distance of museums, galleries, and performance venues.",
      distance: "5 min walk",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    },
    {
      id: "Dining",
      title: "Culinary Scene",
      description: "Surrounded by acclaimed restaurants, cafes, and local food markets.",
      distance: "2 min walk",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    },
    {
      id: "Shopping",
      title: "Boutique Shopping",
      description: "Discover unique local boutiques and designer stores nearby.",
      distance: "8 min walk",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    },
    {
      id: "Waterfront",
      title: "Waterfront Access",
      description: "Easy access to waterfront promenades and scenic walking paths.",
      distance: "10 min walk",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    },
    {
      id: "Business",
      title: "Business District",
      description: "Conveniently located near major business centers and corporate offices.",
      distance: "12 min walk",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    },
    {
      id: "Hidden Gems",
      title: "Hidden Gems",
      description: "Local favorites and secret spots known to residents and our concierge team.",
      distance: "Various",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    },
  ];

  const activeHighlightData = highlights.find((h) => h.id === activeHighlight) || highlights[0];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Location
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-brand-text mb-6">
            Discover the area
          </h2>
          <p className="font-body text-lg text-brand-text/70 max-w-2xl mx-auto">
            Strategically located to offer easy access to the best the city has to offer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Map/Destination Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-brand-neutral/10 mb-6">
              <img
                src={activeHighlightData.image}
                alt={activeHighlightData.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                key={activeHighlight}
              />
            </div>
            <div className="bg-brand-main p-6 rounded-lg border border-brand-neutral/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline text-xl font-semibold text-brand-text">
                  {activeHighlightData.title}
                </h3>
                <span className="font-body text-sm text-brand-primary font-medium">
                  {activeHighlightData.distance}
                </span>
              </div>
              <p className="font-body text-base text-brand-text/70 leading-relaxed">
                {activeHighlightData.description}
              </p>
            </div>
          </div>

          {/* Right: Neighborhood Highlights */}
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-semibold text-brand-text mb-6">
              Nearby Highlights
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight) => (
                <button
                  key={highlight.id}
                  onClick={() => setActiveHighlight(highlight.id)}
                  className={`text-left p-5 rounded-lg border transition-all ${
                    activeHighlight === highlight.id
                      ? "border-brand-primary bg-brand-main shadow-md"
                      : "border-brand-neutral/20 hover:border-brand-neutral/40"
                  }`}
                >
                  <h4
                    className={`font-headline text-lg font-semibold mb-2 ${
                      activeHighlight === highlight.id ? "text-brand-primary" : "text-brand-text"
                    }`}
                  >
                    {highlight.title}
                  </h4>
                  <p className="font-body text-sm text-brand-text/70 mb-2">
                    {highlight.description}
                  </p>
                  <span className="font-body text-xs text-brand-text/60">
                    {highlight.distance}
                  </span>
                </button>
              ))}
            </div>
            <div className="pt-6">
              <button className="btn-primary w-full sm:w-auto">
                Discover the Area
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
