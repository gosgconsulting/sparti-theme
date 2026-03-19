/**
 * Placeholder for design system entries that are rendered inline in a theme page
 * (not a standalone component). Shows source and path for reference.
 */

import React from "react";

export interface InlineSectionPlaceholderProps {
  source: string;
  name: string;
  pathHint?: string;
}

export function InlineSectionPlaceholder({ source, name, pathHint }: InlineSectionPlaceholderProps) {
  return (
    <div className="p-8 rounded-lg border border-dashed border-border bg-muted/20 text-center">
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-1">
        Rendered inline in theme page · {source}
      </p>
      {pathHint && (
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          src/{pathHint}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        Extract to a component under themes/…/components/ to enable a full preview.
      </p>
    </div>
  );
}
