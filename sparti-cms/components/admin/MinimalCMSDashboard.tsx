import React, { useMemo, useState } from "react";
import { Building2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemesManager from "./ThemesManager";
import TenantsManager from "./TenantsManager";

type TabKey = "themes" | "tenants";

interface MinimalCMSDashboardProps {
  defaultTab?: TabKey;
  /** When true, hide create/edit/delete/sync for tenants and themes (view only). */
  viewOnly?: boolean;
}

const MinimalCMSDashboard: React.FC<MinimalCMSDashboardProps> = ({
  defaultTab = "themes",
  viewOnly = true,
}) => {
  const [active, setActive] = useState<TabKey>(defaultTab);

  const content = useMemo(() => {
    if (active === "tenants") return <TenantsManager viewOnly={viewOnly} />;
    return <ThemesManager viewOnly={viewOnly} />;
  }, [active, viewOnly]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 border-r bg-card">
          <div className="p-4">
            <div className="text-sm font-semibold text-foreground">Dashboard</div>
            <div className="text-xs text-muted-foreground">Themes & tenants</div>
          </div>

          <nav className="px-2 pb-4">
            <Button
              variant={active === "themes" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActive("themes")}
            >
              <Palette className="h-4 w-4" />
              Themes
            </Button>
            <Button
              variant={active === "tenants" ? "secondary" : "ghost"}
              className="mt-1 w-full justify-start gap-2"
              onClick={() => setActive("tenants")}
            >
              <Building2 className="h-4 w-4" />
              Tenants
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-6xl">{content}</div>
        </main>
      </div>
    </div>
  );
};

export default MinimalCMSDashboard;
