import React, { useState } from "react";

const AmenitiesSection = () => {
  const [activeTab, setActiveTab] = useState("Rooms & Suites");

  const tabs = [
    {
      id: "Rooms & Suites",
      title: "Rooms & Suites",
      description: "Thoughtfully designed accommodations that blend comfort with refined aesthetics.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      highlights: [
        "Spacious layouts with premium furnishings",
        "Private terraces with city or garden views",
        "Signature bedding and linens",
        "Thoughtfully curated minibar selections",
      ],
      detail: "Each room and suite is individually designed to create a sense of home while maintaining the highest standards of luxury hospitality.",
    },
    {
      id: "Dining",
      title: "Dining",
      description: "Culinary experiences that celebrate local flavors and seasonal ingredients.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
      highlights: [
        "Breakfast served daily with local specialties",
        "Seasonal menus featuring regional ingredients",
        "Curated wine and cocktail selections",
        "Private dining and event spaces available",
      ],
      detail: "Our restaurant combines contemporary techniques with traditional flavors, creating memorable dining experiences throughout your stay.",
    },
    {
      id: "Wellness",
      title: "Wellness",
      description: "Spaces designed for restoration, movement, and peaceful retreat.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
      highlights: [
        "Fully equipped fitness center",
        "Spa treatments and wellness therapies",
        "Sauna and steam facilities",
        "Outdoor pool and relaxation areas",
      ],
      detail: "A dedicated wellness program that supports both active movement and restorative practices, tailored to your preferences.",
    },
    {
      id: "Concierge",
      title: "Concierge",
      description: "Personalized service and local expertise to enhance your stay.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      highlights: [
        "Destination planning and recommendations",
        "Private arrangements and transfers",
        "Restaurant reservations and event access",
        "Local insights and hidden gems",
      ],
      detail: "Our concierge team provides personalized assistance to ensure every aspect of your visit is seamless and memorable.",
    },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="bg-brand-main py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Amenities & Experience
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-brand-text mb-6">
            Every detail designed for you
          </h2>
          <p className="font-body text-lg text-brand-text/70 max-w-2xl mx-auto">
            Discover the experiences and amenities that make each stay unique and memorable.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 border-b border-brand-neutral/20 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-body text-base font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-brand-primary"
                    : "text-brand-text/60 hover:text-brand-text"
                }`}
              >
                {tab.title}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-brand-neutral/10">
              <img
                src={activeTabData.image}
                alt={activeTabData.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                key={activeTab}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-3xl font-semibold text-brand-text mb-4">
                {activeTabData.title}
              </h3>
              <p className="font-body text-lg text-brand-text/80 leading-relaxed mb-6">
                {activeTabData.description}
              </p>
            </div>

            <div className="space-y-3">
              {activeTabData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1 font-headline text-lg">•</span>
                  <span className="font-body text-base text-brand-text/80">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-brand-neutral/20">
              <p className="font-body text-base text-brand-text/70 leading-relaxed">
                {activeTabData.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
