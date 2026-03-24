import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  LayoutTemplate,
  Layers,
  ExternalLink,
  ChevronUp,
  Globe,
  Blocks,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PORTFOLIO_THEMES: { slug: string; name: string; category: string }[] = [
  { slug: "master", name: "Master Template", category: "reference" },
  { slug: "landingpage", name: "ACATR Business Services", category: "live" },
  { slug: "sparti-seo-landing", name: "Sparti SEO Landing", category: "live" },
  { slug: "gosgconsulting", name: "Digital Marketing", category: "live" },
  { slug: "sissonne", name: "Sissonne Dance Academy", category: "live" },
  { slug: "storefront", name: "Storefront", category: "live" },
  { slug: "moondk", name: "Moondk", category: "live" },
  { slug: "str", name: "STR", category: "live" },
  { slug: "optimalconsulting", name: "Optimal Consulting", category: "live" },
  { slug: "e-shop", name: "E-shop", category: "live" },
  { slug: "hotel", name: "Hotel Adina", category: "live" },
  { slug: "hotel1", name: "Hotel1", category: "live" },
  { slug: "hotel2", name: "Hotel2", category: "live" },
  { slug: "nail-queen", name: "Nail Queen", category: "live" },
];

type Section = "themes" | "design-system" | "components";

const NAV_SECTIONS = [
  {
    id: "themes" as Section,
    label: "Themes",
    icon: Globe,
    description: "All theme builds",
  },
  {
    id: "design-system" as Section,
    label: "Design System",
    icon: Palette,
    description: "Component library",
  },
  {
    id: "components" as Section,
    label: "Templates",
    icon: Blocks,
    description: "Reusable sections",
  },
];

/**
 * PublicDashboard: SaaS-style dev dashboard for theme navigation.
 */
const PublicDashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("themes");
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 border-r border-border bg-muted/20 flex flex-col">
        {/* Workspace header */}
        <div className="flex items-center gap-2.5 px-3 py-3.5 border-b border-border">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold shrink-0">
            SP
          </div>
          <span className="text-sm font-semibold text-foreground truncate flex-1">
            Sparti
          </span>
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="px-2 pt-3 pb-4 space-y-4">
            {/* Channels label */}
            <div>
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Channels
              </p>
              <ul className="space-y-0.5">
                {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button
                      onClick={() => setActiveSection(id)}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors text-left",
                        activeSection === id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          activeSection === id
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Themes sub-list (only when themes section active) */}
            {activeSection === "themes" && (
              <div>
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Sites
                </p>
                <ul className="space-y-0.5">
                  {PORTFOLIO_THEMES.map(({ slug, name }) => (
                    <li key={slug}>
                      <button
                        onClick={() => setActiveTheme(slug)}
                        className={cn(
                          "flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left",
                          activeTheme === slug
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <LayoutTemplate className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </ScrollArea>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto bg-background">
        {activeSection === "themes" && !activeTheme && (
          <ThemesOverview
            themes={PORTFOLIO_THEMES}
            onSelect={setActiveTheme}
          />
        )}
        {activeSection === "themes" && activeTheme && (
          <ThemeDetail
            theme={PORTFOLIO_THEMES.find((t) => t.slug === activeTheme)!}
            onBack={() => setActiveTheme(null)}
          />
        )}
        {activeSection === "design-system" && <DesignSystemPanel />}
        {activeSection === "components" && <TemplatesPanel />}
      </main>
    </div>
  );
};

/* ── Sub-panels ── */

function ThemesOverview({
  themes,
  onSelect,
}: {
  themes: typeof PORTFOLIO_THEMES;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Themes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {themes.length} sites · click a card to preview or open
        </p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {themes.map(({ slug, name, category }) => (
          <li key={slug}>
            <button
              onClick={() => onSelect(slug)}
              className="group w-full text-left rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      /theme/{slug}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
                    category === "reference"
                      ? "text-amber-600 border-amber-200 bg-amber-50"
                      : "text-emerald-600 border-emerald-200 bg-emerald-50"
                  )}
                >
                  {category}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeDetail({
  theme,
  onBack,
}: {
  theme: { slug: string; name: string; category: string };
  onBack: () => void;
}) {
  return (
    <div className="p-8 max-w-2xl">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="text-xs text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
      >
        <Layers className="h-3 w-3" />
        Themes
        <span className="mx-1 text-border">·</span>
        {theme.name}
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{theme.name}</h1>
          <p className="text-xs text-muted-foreground">
            Sparti · {theme.category}
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to={`/theme/${theme.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open site
        </Link>
        <Link
          to={`/design-system?theme=${theme.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Palette className="h-3.5 w-3.5" />
          Design system
        </Link>
      </div>

      {/* Meta */}
      <div className="mt-8 rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Slug</span>
          <code className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            {theme.slug}
          </code>
        </div>
        <Separator />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Dev URL</span>
          <code className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            /theme/{theme.slug}
          </code>
        </div>
        <Separator />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Entry file</span>
          <code className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            src/themes/{theme.slug}/index.tsx
          </code>
        </div>
      </div>
    </div>
  );
}

function DesignSystemPanel() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Palette className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Design System</h1>
          <p className="text-xs text-muted-foreground">
            Sparti · Component library &amp; tokens
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <p className="text-sm text-muted-foreground mb-6">
        Browse live component previews, token reference, and per-theme variants.
        Use components here as templates when building new themes.
      </p>

      <Link
        to="/design-system"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Open Design System
      </Link>
    </div>
  );
}

function TemplatesPanel() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Blocks className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Templates</h1>
          <p className="text-xs text-muted-foreground">
            Sparti · Reusable section templates
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="rounded-lg border border-dashed border-border bg-muted/10 p-8 text-center">
        <Blocks className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">Coming soon</p>
        <p className="text-xs text-muted-foreground mt-1">
          Shared template sections will live in{" "}
          <code className="bg-muted px-1 rounded">src/templates/</code> and appear here.
        </p>
      </div>
    </div>
  );
}

export default PublicDashboard;
