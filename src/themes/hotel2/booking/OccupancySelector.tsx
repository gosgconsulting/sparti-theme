import React, { useMemo, useRef, useState } from "react";
import { useOutsideClose } from "./useOutsideClose";

type Props = {
  adults: number;
  children: number;
  onAdultsChange: (n: number) => void;
  onChildrenChange: (n: number) => void;
  variant?: "default" | "underline" | "compact";
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function OccupancySelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  variant = "default",
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useOutsideClose({
    isOpen: open,
    refs: [buttonRef, panelRef],
    onClose: () => setOpen(false),
  });

  const label = useMemo(() => {
    const aLabel = `${adults} Adult${adults === 1 ? "" : "s"}`;
    const cLabel = `${children} Child${children === 1 ? "" : "ren"}`;
    return `${aLabel}, ${cLabel}`;
  }, [adults, children]);

  const step = (kind: "adults" | "children", delta: number) => {
    if (kind === "adults") {
      onAdultsChange(clamp(adults + delta, 1, 12));
    } else {
      onChildrenChange(clamp(children + delta, 0, 8));
    }
  };

  const onButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={
          variant === "underline"
            ? "w-full h-12 px-0 bg-transparent border-b border-border text-left flex items-center justify-between gap-3 hover:border-foreground/35 transition-colors"
            : variant === "compact"
              ? "w-full h-7 px-0 bg-transparent border-0 text-left flex items-center justify-between gap-2 hover:opacity-90 transition-opacity"
            : "w-full h-12 px-4 rounded-xl bg-card border border-border text-left flex items-center justify-between gap-3 hover:border-foreground/25 transition-colors"
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
      >
        <span className="font-body text-sm text-foreground">{label}</span>
        <span
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        ref={panelRef}
        className={`absolute left-0 right-0 mt-2 z-[80] origin-top rounded-lg bg-card border border-border shadow-xl overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Occupancy"
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4 py-2">
            <div>
              <div className="font-body text-sm text-foreground">Adults</div>
              <div className="font-body text-xs text-muted-foreground">Ages 12+</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-border hover:border-foreground/25 hover:bg-muted active:bg-muted transition-colors"
                aria-label="Decrease adults"
                onClick={() => step("adults", -1)}
                disabled={adults <= 1}
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <div className="w-8 text-center font-body text-sm text-foreground tabular-nums">
                {adults}
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-border hover:border-foreground/25 hover:bg-muted active:bg-muted transition-colors"
                aria-label="Increase adults"
                onClick={() => step("adults", 1)}
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div className="my-3 h-px bg-border" />

          <div className="flex items-center justify-between gap-4 py-2">
            <div>
              <div className="font-body text-sm text-foreground">Children</div>
              <div className="font-body text-xs text-muted-foreground">Ages 2–11</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-border hover:border-foreground/25 hover:bg-muted active:bg-muted transition-colors"
                aria-label="Decrease children"
                onClick={() => step("children", -1)}
                disabled={children <= 0}
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <div className="w-8 text-center font-body text-sm text-foreground tabular-nums">
                {children}
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-border hover:border-foreground/25 hover:bg-muted active:bg-muted transition-colors"
                aria-label="Increase children"
                onClick={() => step("children", 1)}
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

