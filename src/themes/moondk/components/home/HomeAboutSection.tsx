"use client";

import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormSheet from "../ContactFormSheet";

import imgMain from "../../assets/moondk_logo.png";

export default function HomeAboutSection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-body tracking-tight">About Us</h2>
        </div>
        <div className="rounded-[2rem] bg-secondary p-6 md:p-8 border-none shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Left: content card */}
            <div className="rounded-[1.75rem] bg-white/90 backdrop-blur p-6 md:p-8 border-none shadow-md md:order-1">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-body">Comfort first</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-heading leading-tight">
              About MoonDk
              </h3>
              <div className="mt-4 text-sm md:text-base font-body text-foreground/70">
                <div
                  className={`transition-all duration-200 ${!isExpanded ? "line-clamp-4" : ""}`}
                >
                  <p>
                    &lsquo;Moondk&rsquo; (Moondeuk) signifies that sudden, quiet moment when a thought or inspiration strikes in the middle of a busy day. We aim to deliver essential values that remain unchanged, even in the fast-paced rhythm of Singapore.
                  </p>
                  <p className="mt-3">
                    We trust in a depth that cannot be replicated—the result of a creator&rsquo;s sincerity and long-term patience, rather than easily imitated forms. We curate premium Korean products that respect the natural order of things and stubbornly adhere to the basics, connecting these values to your daily life.
                  </p>
                  <p className="mt-3">
                    A brand that comes to mind &lsquo;Moondk&rsquo; (suddenly) during your most peaceful hour. We bring the subtle textures of Korea to become a refreshing pause in your life.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="mt-2 text-primary font-medium hover:underline focus:outline-none focus:underline"
                >
                  {isExpanded ? "Read less" : "Read more..."}
                </button>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="rounded-full px-6 bg-primary hover:bg-primary/90 !text-primary-foreground"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative md:order-2 flex justify-center items-center">
              <div className="rounded-[1.5rem] overflow-hidden max-w-md w-full">
                <img
                  src={imgMain}
                  alt="MOONDK Logo"
                  className="w-full h-auto object-contain aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactFormSheet
        open={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </section>
  );
}