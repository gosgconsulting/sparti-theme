/**
 * STR theme testimonials section (presentational).
 * Used by str/index.tsx and by design system preview with mock data.
 */

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import type { STRTestimonial, STRPlaceInfo } from "../services/googleReviews";
import { formatReviewDate, getInitials } from "../services/googleReviews";

const GOOGLE_ICON_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export interface STRTestimonialsSectionProps {
  title: string;
  buttonText: string;
  buttonUrl: string;
  testimonials: STRTestimonial[];
  placeInfo: STRPlaceInfo | null;
  loading: boolean;
}

export function STRTestimonialsSection({
  title,
  buttonText,
  buttonUrl,
  testimonials,
  placeInfo,
  loading,
}: STRTestimonialsSectionProps) {
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const testimonialsCarouselApi = useRef<{ scrollTo: (index: number) => void; selectedScrollSnap: () => number; on: (e: string, fn: () => void) => void } | null>(null);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-foreground leading-tight mb-8">
            {title}
          </h2>

          {placeInfo && placeInfo.rating > 0 && (
            <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="shrink-0">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-foreground">{placeInfo.rating.toFixed(1)}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(placeInfo.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-gray-400"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-6 w-px bg-foreground/20" />
                <div>
                  <p className="text-foreground font-medium">
                    Based on <span className="font-bold">{placeInfo.totalReviews}</span> Google reviews
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E00000] mb-4" />
              <p className="text-foreground/60">Loading reviews...</p>
            </div>
          </div>
        ) : testimonials.length > 0 ? (
          <>
            <div className="relative mb-8">
              <Carousel
                opts={{ align: "start", loop: true, slidesToScroll: 1 }}
                className="w-full"
                setApi={(api) => {
                  if (api) {
                    testimonialsCarouselApi.current = api;
                    setActiveTestimonialSlide(api.selectedScrollSnap());
                    api.on("select", () => setActiveTestimonialSlide(api.selectedScrollSnap()));
                  }
                }}
              >
                <CarouselContent className="-ml-4 md:-ml-6">
                  {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => {
                    const slideReviews = testimonials.slice(slideIndex * 3, slideIndex * 3 + 3);
                    return (
                      <CarouselItem key={slideIndex} className="pl-4 md:pl-6 basis-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {slideReviews.map((testimonial, reviewIndex) => {
                            const reviewDate = formatReviewDate(testimonial.time);
                            const initials = getInitials(testimonial.name);
                            const globalIndex = slideIndex * 3 + reviewIndex;

                            return (
                              <div
                                key={globalIndex}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col"
                              >
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="relative shrink-0">
                                    {testimonial.profilePhotoUrl ? (
                                      <img
                                        src={testimonial.profilePhotoUrl}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = "none";
                                          const parent = target.parentElement;
                                          if (parent && !parent.querySelector(".initials-fallback")) {
                                            const fallback = document.createElement("div");
                                            fallback.className =
                                              "initials-fallback w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center text-white font-bold text-lg";
                                            fallback.textContent = initials;
                                            parent.appendChild(fallback);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center text-white font-bold text-lg">
                                        {initials}
                                      </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200">
                                      {GOOGLE_ICON_SVG}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-base mb-1 truncate">{testimonial.name}</p>
                                    <p className="text-gray-500 text-sm">{reviewDate}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                <p className="text-gray-700 mb-4 leading-relaxed text-sm grow">
                                  {testimonial.quote.length > 150 ? (
                                    <>
                                      {testimonial.quote.substring(0, 150)}...{" "}
                                      <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                        Read more
                                      </button>
                                    </>
                                  ) : (
                                    testimonial.quote
                                  )}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="flex justify-center items-center gap-2 mb-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => testimonialsCarouselApi.current?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTestimonialSlide === index ? "bg-[#E00000] w-8" : "bg-gray-400 w-2 hover:bg-gray-500"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-foreground/60">No reviews available at this time.</p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-[#E00000] text-white hover:bg-[#E00000]/90 text-lg px-10 py-6 font-bold uppercase rounded-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              if (typeof window !== "undefined") window.location.href = buttonUrl;
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
