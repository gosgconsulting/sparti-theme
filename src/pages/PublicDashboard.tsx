import React from "react";
import { Link } from "react-router-dom";
import { Palette } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Public theme portfolio: slug and display name for each theme.
 * Kept in sync with themeConfig in TenantLandingPage (same slugs/names).
 */
const PORTFOLIO_THEMES: { slug: string; name: string }[] = [
  { slug: "landingpage", name: "ACATR Business Services" },
  { slug: "sparti-seo-landing", name: "Sparti SEO Landing" },
  { slug: "gosgconsulting", name: "GO SG Consulting" },
  { slug: "sissonne", name: "Sissonne Dance Academy" },
  { slug: "storefront", name: "Storefront" },
  { slug: "moondk", name: "Moondk" },
  { slug: "str", name: "STR" },
  { slug: "optimalconsulting", name: "Optimal Consulting" },
  { slug: "master", name: "Master Template" },
  { slug: "e-shop", name: "E-shop" },
  { slug: "hotel", name: "Hotel Adina" },
  { slug: "hotel1", name: "Hotel1" },
  { slug: "nail-queen", name: "Nail Queen" },
];

/**
 * PublicDashboard: public theme portfolio. No login; lists all themes with links.
 */
const PublicDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Theme portfolio
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select a theme to view it.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_THEMES.map(({ slug, name }) => (
            <li key={slug}>
              <Link to={`/theme/${slug}`} className="block h-full">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{name}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-sm text-muted-foreground">
                      /theme/{slug}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicDashboard;
