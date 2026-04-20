import React, { useState } from "react";

/* ── Tab data ───────────────────────────────────────────────────────── */

interface TabDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  footer?: string;
}

const TABS: TabDef[] = [
  {
    id: "seo",
    label: "SEO",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: "SEO Content",
    description:
      "Research keywords, generate topic clusters, and publish long-form articles that rank — all from a single conversation with your AI agent.",
    bullets: [
      "Keyword research & topic clustering",
      "Full-length article generation with briefs",
      "Meta descriptions & internal linking",
      "Direct publishing to WordPress & Shopify",
    ],
    footer:
      "Each workflow is powered by specialized AI agents that learn your brand voice, style, and goals.",
  },
  {
    id: "images",
    label: "Images",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>
      </svg>
    ),
    title: "Marketing Images",
    description:
      "Generate on-brand visuals, product images, and social media graphics in seconds — no design skills required.",
    bullets: [
      "AI-powered image generation from prompts",
      "Brand-consistent style & color palette",
      "Batch creation for campaigns",
      "Export to Canva, Figma & brand kit",
    ],
    footer:
      "Images are generated with your brand guidelines embedded, ensuring consistency across every channel.",
  },
  {
    id: "videos",
    label: "Videos",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    title: "Video Scripts",
    description:
      "Turn your ideas into structured video scripts with hooks, problem, solution and CTA — ready to shoot in minutes.",
    bullets: [
      "Hook, story arc & CTA generation",
      "Short-form & long-form formats",
      "Platform-optimised for YouTube, TikTok & Reels",
      "Direct voiceover & subtitle generation",
    ],
    footer:
      "Scripts are tailored to your brand tone so every video feels native to your audience.",
  },
];

/* ── Component ──────────────────────────────────────────────────────── */

interface TabFeaturesSectionProps {
  themeSlug?: string;
}

const TabFeaturesSection: React.FC<TabFeaturesSectionProps> = ({ themeSlug = "master" }) => {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId)!;
  const imageSrc = `/theme/${themeSlug}/assets/placeholder.svg`;

  return (
    <section className="py-20 sm:py-28 bg-[#f8f9fc]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-0 border-b border-gray-200">
            {TABS.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors relative
                    ${isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--brand-primary)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — image */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <img
              src={imageSrc}
              alt={active.title}
              className="w-full rounded-2xl object-cover shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Right — text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {active.title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {active.description}
            </p>
            <ul className="space-y-3 mb-6">
              {active.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span
                    className="mt-1 h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
            {active.footer && (
              <p className="text-sm text-gray-400 leading-relaxed">{active.footer}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabFeaturesSection;
