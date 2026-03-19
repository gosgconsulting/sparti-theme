import React, { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  DESIGN_SYSTEM_ENTRIES,
  getEntriesBySource,
  getEntryById,
  type DesignSystemEntry,
} from "@/config/designSystemRegistry";
import { getPreviewComponent, hasPreview } from "@/pages/design-system/DesignSystemPreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const DESIGN_SYSTEM_PATH = "/design-system";

export default function DesignSystemPage() {
  const { componentId } = useParams<{ componentId?: string }>();
  const entriesBySource = useMemo(() => getEntriesBySource(), []);
  const selectedEntry = componentId ? getEntryById(componentId) : null;
  const preview = selectedEntry ? getPreviewComponent(selectedEntry.id) : null;
  const showPreview = selectedEntry && hasPreview(selectedEntry.id);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-muted/30 flex flex-col">
        <div className="p-4 border-b border-border">
          <a href={DESIGN_SYSTEM_PATH} className="font-semibold text-foreground hover:underline">
            Design System
          </a>
          <p className="text-xs text-muted-foreground mt-1">
            Components from all themes and Flowbite. Use as reference when building new themes.
          </p>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-4">
            {Array.from(entriesBySource.entries()).map(([source, entries]) => {
              if (entries.length === 0) return null;
              return (
                <div key={source}>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {source}
                  </div>
                  <ul className="space-y-0.5">
                    {entries.map((entry) => (
                      <li key={entry.id}>
                        <NavLink
                          to={`${DESIGN_SYSTEM_PATH}/${entry.id}`}
                          className={({ isActive }) =>
                            cn(
                              "block px-2 py-1.5 rounded-md text-sm",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
                            )
                          }
                          end={false}
                        >
                          {entry.name}
                          {!hasPreview(entry.id) && (
                            <span className="ml-1 text-muted-foreground" title="Preview not implemented">
                              ·
                            </span>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {selectedEntry ? (
          <div className="p-6 max-w-5xl">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-foreground">
                {selectedEntry.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedEntry.source} · {selectedEntry.category}
                {selectedEntry.pathHint && (
                  <span className="block mt-1 font-mono text-xs">
                    src/{selectedEntry.pathHint}.tsx
                  </span>
                )}
              </p>
            </div>
            {showPreview ? (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                {preview}
              </div>
            ) : (
              <PlaceholderCard entry={selectedEntry} />
            )}
          </div>
        ) : (
          <WelcomePanel entries={DESIGN_SYSTEM_ENTRIES} />
        )}
      </main>
    </div>
  );
}

function PlaceholderCard({ entry }: { entry: DesignSystemEntry }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
      <p className="text-muted-foreground">
        Preview not yet implemented for <strong>{entry.name}</strong>.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Add a preview in <code className="bg-muted px-1 rounded">src/pages/design-system/DesignSystemPreview.tsx</code> and a wrapper in{" "}
        <code className="bg-muted px-1 rounded">src/pages/design-system/previews/</code>.
      </p>
      {entry.pathHint && (
        <p className="text-xs text-muted-foreground mt-2">
          Component: <code className="bg-muted px-1 rounded">src/{entry.pathHint}.tsx</code>
        </p>
      )}
    </div>
  );
}

function WelcomePanel({ entries }: { entries: DesignSystemEntry[] }) {
  const withPreview = entries.filter((e) => hasPreview(e.id)).length;
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground">Design System</h1>
      <p className="text-muted-foreground mt-2">
        Browse components from every theme and the shared Flowbite library. Use them as reference
        when creating new themes or when adding new components (which should also be registered here).
      </p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        <li>· <strong>{entries.length}</strong> components in the registry (sidebar)</li>
        <li>· <strong>{withPreview}</strong> with live preview; add more in <code className="bg-muted px-1 rounded">DesignSystemPreview.tsx</code></li>
        <li>· New theme? Reuse components from this list and from <code className="bg-muted px-1 rounded">src/libraries/flowbite/</code></li>
        <li>· New component? Add an entry in <code className="bg-muted px-1 rounded">src/config/designSystemRegistry.ts</code></li>
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        Select a component from the sidebar to see its details and preview (when available).
      </p>
    </div>
  );
}
