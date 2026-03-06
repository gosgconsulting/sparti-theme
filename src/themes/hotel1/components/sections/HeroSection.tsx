import React, { useState } from "react";

const HeroSection = () => {
  const [activeMood, setActiveMood] = useState("Stay");

  const moods = [
    { id: "Stay", label: "Stay", description: "Refined accommodations" },
    { id: "Dine", label: "Dine", description: "Culinary excellence" },
    { id: "Unwind", label: "Unwind", description: "Restorative moments" },
    { id: "Explore", label: "Explore", description: "Local discovery" },
  ];

  return (
    <section className="relative min-h-[90vh] bg-brand-main flex items-center overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-2">
              <p className="font-body text-sm text-brand-neutral uppercase tracking-wider">
                Premium Hospitality
              </p>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-text leading-tight">
                Where refined
                <br />
                stays begin
              </h1>
            </div>
            <p className="font-body text-lg text-brand-text/80 max-w-lg leading-relaxed">
              Experience a thoughtfully designed retreat that combines modern luxury with
              warm hospitality. Every detail crafted for your comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Book Direct
              </button>
              <button className="btn-secondary">
                Explore Stay
              </button>
            </div>
          </div>

          {/* Right: Interactive Mood Selector */}
          <div className="relative">
            {/* Main Image Area */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-neutral/10">
              <img
                src="/theme/hotel1/assets/hero-main.jpg"
                alt="Hotel interior"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";
                }}
              />
            </div>

            {/* Floating Mood Selector */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2 border border-brand-neutral/20">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setActiveMood(mood.id)}
                    className={`px-4 py-2 rounded transition-all ${
                      activeMood === mood.id
                        ? "bg-brand-primary text-white"
                        : "text-brand-text hover:bg-brand-main"
                    }`}
                  >
                    <span className="font-body text-sm font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Perks Card */}
            <div className="absolute top-8 right-8 bg-white rounded-lg shadow-xl p-6 border border-brand-neutral/20 max-w-[240px] hidden lg:block">
              <div className="space-y-3">
                <h3 className="font-headline text-lg font-semibold text-brand-text">
                  Direct Booking Perks
                </h3>
                <ul className="space-y-2">
                  <li className="font-body text-sm text-brand-text/70 flex items-start gap-2">
                    <span className="text-brand-primary mt-1">✓</span>
                    <span>Best rate guaranteed</span>
                  </li>
                  <li className="font-body text-sm text-brand-text/70 flex items-start gap-2">
                    <span className="text-brand-primary mt-1">✓</span>
                    <span>Complimentary breakfast</span>
                  </li>
                  <li className="font-body text-sm text-brand-text/70 flex items-start gap-2">
                    <span className="text-brand-primary mt-1">✓</span>
                    <span>Priority room selection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
