import React, { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const DirectBookingSection = () => {
  const [activeTab, setActiveTab] = useState("Best Rate");
  const { ref, isVisible } = useScrollAnimation();

  const benefits = [
    {
      id: "Best Rate",
      title: "Best Rate Guaranteed",
      description: "Book directly and receive our lowest available rate, with price match guarantee.",
      detail: "If you find a lower rate elsewhere, we'll match it and add an additional 10% discount.",
      metadata: "Member-favorite perk",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
    },
    {
      id: "Exclusive Perks",
      title: "Exclusive Perks",
      description: "Access to amenities and services reserved for direct bookings only.",
      detail: "Complimentary breakfast, late checkout, room upgrades when available, and welcome amenities.",
      metadata: "Included when booking direct",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
    },
    {
      id: "Flexible Booking",
      title: "Flexible Booking",
      description: "More flexible cancellation and modification policies for your peace of mind.",
      detail: "Free cancellation up to 48 hours before arrival. Easy modifications through our direct booking system.",
      metadata: "Flexible reservation support",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    },
    {
      id: "Priority Experience",
      title: "Priority Experience",
      description: "Enhanced service and attention from our team when you book directly.",
      detail: "Dedicated guest services, personalized welcome, and priority for special requests and preferences.",
      metadata: "Concierge priority",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    },
  ];

  const activeBenefit = benefits.find((b) => b.id === activeTab) || benefits[0];
  const activeIndex = benefits.findIndex((b) => b.id === activeTab);

  return (
    <section
      ref={ref}
      className={`bg-brand-main py-12 lg:py-20 section-scroll-animate ${isVisible ? "visible" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Why Book Direct
          </p>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-text mb-6">
            More value, better experience
          </h2>
          <p className="font-body text-lg text-brand-text/70 leading-relaxed">
            Discover the exclusive benefits reserved for guests who book directly with us.
          </p>
        </div>

        {/* Interactive Perks Explorer */}
        <div className="max-w-7xl mx-auto">
          {/* Main Visual Area */}
          <div className="relative mb-12 lg:mb-16">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-brand-neutral/10 rounded-lg">
              {/* Featured Image */}
              <div className="absolute inset-0">
                <img
                  src={activeBenefit.image}
                  alt={activeBenefit.title}
                  className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  key={activeTab}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 via-brand-text/40 to-transparent" />
              </div>

              {/* Featured Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="max-w-3xl">
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-body text-xs text-white/80 uppercase tracking-wider">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(benefits.length).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-white/40" />
                    <span className="font-body text-xs text-white/70 uppercase tracking-wider">
                      {activeBenefit.metadata}
                    </span>
                  </div>

                  <h3 className="font-headline text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
                    {activeBenefit.title}
                  </h3>
                  <p className="font-body text-lg lg:text-xl text-white/95 leading-relaxed max-w-2xl mb-4">
                    {activeBenefit.description}
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed max-w-xl">
                    {activeBenefit.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Perk Selectors */}
          <div className="relative">
            <div className="mb-8 lg:mb-10">
              <p className="font-body text-xs text-brand-text/50 uppercase tracking-wider text-center">
                Explore Benefits
              </p>
            </div>

            {/* Perk Navigation */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {benefits.map((benefit, index) => {
                const isActive = activeTab === benefit.id;
                return (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveTab(benefit.id)}
                    className={`
                      group relative
                      text-center
                      px-6 py-4 lg:px-8 lg:py-5
                      transition-all duration-500 ease-in-out
                      border-b-2
                      ${
                        isActive
                          ? "border-brand-primary"
                          : "border-transparent hover:border-brand-neutral/30"
                      }
                    `}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-primary" />
                    )}

                    {/* Hover Underline Animation */}
                    {!isActive && (
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                    )}

                    <div className="flex flex-col items-center gap-2">
                      <h4
                        className={`
                          font-headline text-base lg:text-lg font-semibold
                          transition-colors duration-300
                          ${
                            isActive
                              ? "text-brand-primary"
                              : "text-brand-text/60 group-hover:text-brand-text/80"
                          }
                        `}
                      >
                        {benefit.title}
                      </h4>
                      <p
                        className={`
                          font-body text-xs text-brand-text/50
                          max-w-[200px]
                          transition-opacity duration-300
                          ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-90"}
                        `}
                      >
                        {benefit.description}
                      </p>
                    </div>

                    {/* Subtle Active Glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-brand-primary/5 rounded-lg pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 lg:mt-16 text-center">
            <button className="btn-primary">
              Book Direct Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectBookingSection;
