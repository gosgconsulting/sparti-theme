import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [guestScore, setGuestScore] = useState(0);
  const [directBooking, setDirectBooking] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "New York",
      text: "The attention to detail and personalized service made our stay exceptional. Booking directly gave us access to amenities we wouldn't have had otherwise.",
      rating: 5,
      bookedDirect: true,
    },
    {
      name: "Michael Rodriguez",
      location: "London",
      text: "A truly refined experience from check-in to departure. The direct booking perks were substantial, and the team went above and beyond.",
      rating: 5,
      bookedDirect: true,
    },
    {
      name: "Emma Thompson",
      location: "Sydney",
      text: "Every moment felt thoughtfully designed. The rooms, the dining, the service—all exceeded our expectations. We'll definitely book directly again.",
      rating: 5,
      bookedDirect: true,
    },
  ];

  useEffect(() => {
    // Animate counters on mount
    const scoreInterval = setInterval(() => {
      setGuestScore((prev) => (prev < 98 ? prev + 1 : 98));
    }, 30);
    const bookingInterval = setInterval(() => {
      setDirectBooking((prev) => (prev < 87 ? prev + 1 : 87));
    }, 30);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(bookingInterval);
    };
  }, []);

  const changeTestimonial = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveTestimonial(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match transition duration
  };

  const handleNext = () => {
    const nextIndex = (activeTestimonial + 1) % testimonials.length;
    changeTestimonial(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(prevIndex);
  };

  const getNextTestimonial = (offset: number) => {
    const index = (activeTestimonial + offset) % testimonials.length;
    return testimonials[index];
  };

  const activeTestimonialData = testimonials[activeTestimonial];

  return (
    <section
      ref={ref}
      className={`bg-white py-12 lg:py-20 section-scroll-animate ${isVisible ? "visible" : ""}`}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Trust Metrics */}
          <div className="space-y-12">
            <div>
              <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
                Guest Satisfaction
              </p>
              <div className="space-y-6">
                <div className="bg-brand-main p-8 rounded-lg border border-brand-neutral/20">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-headline text-5xl font-semibold text-brand-primary">
                      {guestScore}%
                    </span>
                    <span className="font-body text-lg text-brand-text/70">Guest Satisfaction</span>
                  </div>
                  <p className="font-body text-sm text-brand-text/70 mt-4">
                    Based on verified guest reviews from the past 12 months
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-main p-6 rounded-lg border border-brand-neutral/20">
                    <div className="font-headline text-3xl font-semibold text-brand-primary mb-1">
                      {directBooking}%
                    </div>
                    <div className="font-body text-sm text-brand-text/70">
                      Prefer Direct Booking
                    </div>
                  </div>
                  <div className="bg-brand-main p-6 rounded-lg border border-brand-neutral/20">
                    <div className="font-headline text-3xl font-semibold text-brand-primary mb-1">
                      4.8
                    </div>
                    <div className="font-body text-sm text-brand-text/70">
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Guest Stories */}
          <div className="space-y-8">
            {/* Section Label */}
            <div>
              <p className="font-body text-xs text-brand-neutral uppercase tracking-wider mb-8">
                Guest Stories
              </p>
            </div>

            {/* Featured Testimonial - Editorial Layout */}
            <div className="relative">
              {/* Oversized Quotation Mark - Background Accent */}
              <div className="absolute -top-4 -left-4 text-brand-neutral/10 font-headline text-[120px] leading-none pointer-events-none transition-opacity duration-500">
                "
              </div>

              {/* Main Featured Quote */}
              <div className="relative z-10 pt-12 pb-8">
                <div className="relative min-h-[200px]">
                  {testimonials.map((testimonial, index) => {
                    const isActive = index === activeTestimonial;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <p className="font-body text-2xl lg:text-3xl text-brand-text leading-relaxed mb-8 max-w-2xl">
                          {testimonial.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Guest Identity Row */}
                <div className="flex items-center justify-between border-t border-brand-neutral/20 pt-8 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="relative min-w-[140px] flex items-center">
                      {testimonials.map((testimonial, index) => {
                        const isActive = index === activeTestimonial;
                        return (
                          <div
                            key={index}
                            className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-500 ease-in-out ${
                              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                          >
                            <div className="font-headline text-base font-semibold text-brand-text mb-1 leading-tight">
                              {testimonial.name}
                            </div>
                            <div className="font-body text-sm text-brand-text/60 leading-tight">
                              {testimonial.location}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="h-8 w-px bg-brand-neutral/30 flex-shrink-0"></div>
                    <div className="relative min-w-[80px] flex items-center">
                      {testimonials.map((testimonial, index) => {
                        const isActive = index === activeTestimonial;
                        return (
                          <div
                            key={index}
                            className={`absolute inset-0 flex items-center gap-1 transition-opacity duration-500 ease-in-out ${
                              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                          >
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-brand-warm text-sm leading-none">
                                ★
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                    {activeTestimonialData.bookedDirect && (
                      <>
                        <div className="h-8 w-px bg-brand-neutral/30 flex-shrink-0"></div>
                        <span className="font-body text-xs text-brand-text/50 uppercase tracking-wider whitespace-nowrap">
                          Booked Direct
                        </span>
                      </>
                    )}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="font-body text-xs text-brand-text/50 font-medium whitespace-nowrap">
                      {String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevious}
                        className="w-8 h-8 flex items-center justify-center text-brand-text/50 hover:text-brand-text transition-colors"
                        aria-label="Previous story"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-8 h-8 flex items-center justify-center text-brand-text/50 hover:text-brand-text transition-colors"
                        aria-label="Next story"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Stories - Secondary Editorial Blocks */}
            <div className="space-y-4 pt-8 border-t border-brand-neutral/10">
              {[1, 2].map((offset, idx) => {
                const preview = getNextTestimonial(offset);
                const previewText = preview.text.length > 80 
                  ? preview.text.substring(0, 80) + "..." 
                  : preview.text;
                
                return (
                  <div
                    key={offset}
                    className="opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => changeTestimonial((activeTestimonial + offset) % testimonials.length)}
                  >
                    <div className={idx === 0 ? "pt-4" : "border-t border-brand-neutral/20 pt-4"}>
                      <p className="font-body text-sm text-brand-text/70 leading-relaxed mb-3">
                        {previewText}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-headline text-sm font-medium text-brand-text">
                          {preview.name}
                        </span>
                        <span className="text-brand-neutral/50">•</span>
                        <span className="font-body text-xs text-brand-text/50">
                          {preview.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
