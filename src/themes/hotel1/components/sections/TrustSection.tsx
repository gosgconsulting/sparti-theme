import React, { useState, useEffect } from "react";

const TrustSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [guestScore, setGuestScore] = useState(0);
  const [directBooking, setDirectBooking] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "New York",
      text: "The attention to detail and personalized service made our stay exceptional. Booking directly gave us access to amenities we wouldn't have had otherwise.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      location: "London",
      text: "A truly refined experience from check-in to departure. The direct booking perks were substantial, and the team went above and beyond.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      location: "Sydney",
      text: "Every moment felt thoughtfully designed. The rooms, the dining, the service—all exceeded our expectations. We'll definitely book directly again.",
      rating: 5,
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

  return (
    <section className="bg-white py-20 lg:py-32">
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

          {/* Right: Testimonials */}
          <div className="space-y-6">
            <div>
              <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
                Guest Stories
              </p>
              <h2 className="font-headline text-3xl font-semibold text-brand-text mb-8">
                What our guests say
              </h2>
            </div>

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-full text-left p-6 rounded-lg border transition-all ${
                    activeTestimonial === index
                      ? "border-brand-warm bg-brand-main shadow-md"
                      : "border-brand-neutral/20 hover:border-brand-neutral/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <span className="font-headline text-sm font-semibold text-brand-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-body text-sm font-medium text-brand-text">
                        {testimonial.name}
                      </div>
                      <div className="font-body text-xs text-brand-text/60">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-brand-warm text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-sm text-brand-text/80 leading-relaxed">
                    {testimonial.text}
                  </p>
                </button>
              ))}
            </div>

            {/* Featured Testimonial Display */}
            <div className="mt-8 bg-brand-warm/5 p-8 rounded-lg border border-brand-warm/20">
              <div className="flex items-start gap-4">
                <div className="text-brand-warm text-4xl">"</div>
                <div>
                  <p className="font-body text-lg text-brand-text/90 leading-relaxed mb-4">
                    {testimonials[activeTestimonial].text}
                  </p>
                  <div className="font-body text-sm font-medium text-brand-text">
                    — {testimonials[activeTestimonial].name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
