import React, { useMemo, useRef, useState } from "react";
import { HOTEL2_COUNTRIES, type Hotel2Destination } from "./countries";
import { useOutsideClose } from "./useOutsideClose";

type Props = {
  value: Hotel2Destination;
  onChange: (v: Hotel2Destination) => void;
  variant?: "default" | "underline" | "compact";
  placeholder?: string;
};

export default function DestinationDropdown({
  value,
  onChange,
  variant = "default",
  placeholder = "Where can we take you?",
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = HOTEL2_COUNTRIES.indexOf(value);
    return idx >= 0 ? idx : 0;
  });

  const label = value === "All" ? "All" : value || placeholder;

  const options = useMemo(() => [...HOTEL2_COUNTRIES], []);

  useOutsideClose({
    isOpen: open,
    refs: [buttonRef, panelRef],
    onClose: () => setOpen(false),
  });

  const selectAt = (idx: number) => {
    const v = options[idx];
    if (!v) return;
    onChange(v);
    setActiveIndex(idx);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        listRef.current?.querySelector<HTMLButtonElement>(`[data-opt="${activeIndex}"]`)?.focus();
      });
    }
  };

  const onOptionKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(options.length - 1, activeIndex + 1);
      setActiveIndex(next);
      listRef.current?.querySelector<HTMLButtonElement>(`[data-opt="${next}"]`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, activeIndex - 1);
      setActiveIndex(prev);
      listRef.current?.querySelector<HTMLButtonElement>(`[data-opt="${prev}"]`)?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectAt(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={
          variant === "underline"
            ? "w-full h-12 px-0 bg-transparent border-b border-black/20 text-left flex items-center justify-between gap-3 hover:border-black/35 transition-colors"
            : variant === "compact"
              ? "w-full h-7 px-0 bg-transparent border-0 text-left flex items-center justify-between gap-2 hover:opacity-90 transition-opacity"
            : "w-full h-12 px-4 rounded-xl bg-brand-surface border border-black/15 text-left flex items-center justify-between gap-3 hover:border-black/25 transition-colors"
        }
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
      >
        <span className={`font-body text-sm ${value ? "text-brand-dark" : "text-brand-muted"}`}>
          {label}
        </span>
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
        className={`absolute left-0 right-0 mt-2 z-[80] origin-top rounded-lg bg-white border border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)] overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        role="presentation"
      >
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label="Destination country"
          onKeyDown={onOptionKeyDown}
          className="max-h-64 overflow-auto py-1"
        >
          {options.map((country, idx) => {
            const isSelected = value === country;
            const isActive = idx === activeIndex;
            return (
              <li key={country} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  data-opt={idx}
                  className={`w-full px-4 py-3 text-left font-body text-sm transition-colors ${
                    isSelected
                      ? "bg-black/5 text-brand-dark"
                      : "text-brand-dark/90 hover:bg-black/4 active:bg-black/6"
                  } ${isActive ? "outline-none ring-2 ring-black/10" : ""}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => selectAt(idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span>{country}</span>
                    {isSelected && (
                      <span className="text-brand-accent" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

