import React, { useState } from "react";

const DirectBookingSection = () => {
  const [activeTab, setActiveTab] = useState("Best Rate");

  const benefits = [
    {
      id: "Best Rate",
      title: "Best Rate Guaranteed",
      description: "Book directly and receive our lowest available rate, with price match guarantee.",
      detail: "If you find a lower rate elsewhere, we'll match it and add an additional 10% discount.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    },
    {
      id: "Exclusive Perks",
      title: "Exclusive Perks",
      description: "Access to amenities and services reserved for direct bookings only.",
      detail: "Complimentary breakfast, late checkout, room upgrades when available, and welcome amenities.",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
    },
    {
      id: "Flexible Booking",
      title: "Flexible Booking",
      description: "More flexible cancellation and modification policies for your peace of mind.",
      detail: "Free cancellation up to 48 hours before arrival. Easy modifications through our direct booking system.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
    {
      id: "Priority Experience",
      title: "Priority Experience",
      description: "Enhanced service and attention from our team when you book directly.",
      detail: "Dedicated guest services, personalized welcome, and priority for special requests and preferences.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    },
  ];

  const activeBenefit = benefits.find((b) => b.id === activeTab) || benefits[0];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Why Book Direct
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-brand-text mb-6">
            More value, better experience
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Tab Selector */}
          <div className="flex flex-col gap-2">
            {benefits.map((benefit) => (
              <button
                key={benefit.id}
                onClick={() => setActiveTab(benefit.id)}
                className={`text-left p-6 rounded-lg border transition-all ${
                  activeTab === benefit.id
                    ? "border-brand-primary bg-brand-main"
                    : "border-brand-neutral/30 hover:border-brand-neutral/50"
                }`}
              >
                <h3
                  className={`font-headline text-xl font-semibold mb-2 ${
                    activeTab === benefit.id ? "text-brand-primary" : "text-brand-text"
                  }`}
                >
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-brand-text/70">
                  {benefit.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right: Visual Panel */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-brand-neutral/10 mb-6">
              <img
                src={activeBenefit.image}
                alt={activeBenefit.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="bg-brand-main p-6 rounded-lg border border-brand-neutral/20">
              <p className="font-body text-base text-brand-text leading-relaxed">
                {activeBenefit.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectBookingSection;
