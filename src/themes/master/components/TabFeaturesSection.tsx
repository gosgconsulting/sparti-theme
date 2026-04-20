import React, { useState } from "react";

/* ── Mockup illustrations ───────────────────────────────────────────── */

const SEOMockup = () => (
  <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden text-left">
    <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
      <span className="h-3 w-3 rounded-full bg-red-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-yellow-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-green-400 shrink-0" />
      <span className="ml-3 text-xs text-gray-400 font-mono">sparti / seo-agent</span>
    </div>
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-600">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        KEYWORD RESEARCH
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[10px] font-semibold text-gray-400 border-b border-gray-100 pb-1.5">
        <span>KEYWORD</span><span>VOLUME</span><span>DIFFICULTY</span>
      </div>
      {[
        { kw: "best running shoes", vol: "12.4K", diff: 34, pct: "35%", color: "#22c55e" },
        { kw: "marathon training plan", vol: "8.1K", diff: 28, pct: "28%", color: "#22c55e" },
        { kw: "trail running gear", vol: "5.7K", diff: 41, pct: "42%", color: "#eab308" },
      ].map((r) => (
        <div key={r.kw} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center text-xs py-1.5 border-b border-gray-50">
          <span className="text-gray-700">{r.kw}</span>
          <span className="text-gray-500">{r.vol}</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-14 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: r.pct, backgroundColor: r.color }} />
            </div>
            <span className="text-gray-500 w-5 text-right">{r.diff}</span>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-3.5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-blue-600 mb-2.5">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ARTICLE BRIEF
        </div>
        <div className="space-y-2">
          <div className="h-1.5 bg-blue-200/60 rounded-full w-4/5" />
          <div className="h-1.5 bg-blue-200/60 rounded-full w-3/5" />
        </div>
      </div>
      <div className="flex justify-center">
        <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
      <div className="rounded-xl bg-green-50 border border-green-100 p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
            PUBLISHED
          </div>
          <span className="text-[10px] text-green-600 font-medium">WordPress</span>
        </div>
        <div className="h-1.5 bg-green-200/60 rounded-full w-3/5" />
      </div>
    </div>
  </div>
);

const ImagesMockup = () => (
  <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden text-left">
    <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
      <span className="h-3 w-3 rounded-full bg-red-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-yellow-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-green-400 shrink-0" />
      <span className="ml-3 text-xs text-gray-400 font-mono">sparti / image-agent</span>
    </div>
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-purple-600">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>
        IMAGE GENERATION
      </div>
      <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-xs text-gray-500">
        <span className="text-gray-400">Prompt: </span>
        professional product photo, white background, studio lighting
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { bg: "bg-purple-100", label: "v1" },
          { bg: "bg-indigo-100", label: "v2" },
          { bg: "bg-blue-100", label: "v3" },
          { bg: "bg-violet-100", label: "v4" },
          { bg: "bg-fuchsia-100", label: "v5" },
          { bg: "bg-pink-100", label: "★" },
        ].map((item) => (
          <div
            key={item.label}
            className={`${item.bg} rounded-lg h-16 flex items-end justify-end p-1.5`}
          >
            <span className="text-[9px] text-gray-500 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-green-50 border border-green-100 p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
            EXPORTED
          </div>
          <span className="text-[10px] text-green-600 font-medium">Brand Kit</span>
        </div>
        <div className="h-1.5 bg-green-200/60 rounded-full w-2/3" />
      </div>
    </div>
  </div>
);

const VideosMockup = () => (
  <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden text-left">
    <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
      <span className="h-3 w-3 rounded-full bg-red-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-yellow-400 shrink-0" />
      <span className="h-3 w-3 rounded-full bg-green-400 shrink-0" />
      <span className="ml-3 text-xs text-gray-400 font-mono">sparti / video-agent</span>
    </div>
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-rose-600">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        VIDEO SCRIPT
      </div>
      {[
        { scene: "Hook", bg: "bg-rose-50 border-rose-100", text: "text-rose-700", w: "w-4/5" },
        { scene: "Problem", bg: "bg-orange-50 border-orange-100", text: "text-orange-700", w: "w-3/5" },
        { scene: "Solution", bg: "bg-yellow-50 border-yellow-100", text: "text-yellow-700", w: "w-4/5" },
        { scene: "CTA", bg: "bg-green-50 border-green-100", text: "text-green-700", w: "w-2/5" },
      ].map((s) => (
        <div key={s.scene} className={`rounded-lg border ${s.bg} p-3`}>
          <p className={`text-[10px] font-bold ${s.text} mb-1.5`}>{s.scene.toUpperCase()}</p>
          <div className={`h-1.5 bg-gray-200/60 rounded-full ${s.w}`} />
        </div>
      ))}
      <div className="rounded-xl bg-green-50 border border-green-100 p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
            PUBLISHED
          </div>
          <span className="text-[10px] text-green-600 font-medium">YouTube · TikTok</span>
        </div>
      </div>
    </div>
  </div>
);

/* ── Tab data ───────────────────────────────────────────────────────── */

interface TabDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  footer?: string;
  Mockup: React.FC;
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
    Mockup: SEOMockup,
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
    Mockup: ImagesMockup,
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
    Mockup: VideosMockup,
  },
];

/* ── Component ──────────────────────────────────────────────────────── */

const TabFeaturesSection: React.FC = () => {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId)!;

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

          {/* Left — mockup */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <active.Mockup />
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
