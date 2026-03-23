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

  const triggerClass =
    variant === "underline"
      ? "hotel2-destination-trigger hotel2-destination-trigger--underline"
      : variant === "compact"
        ? "hotel2-destination-trigger hotel2-destination-trigger--compact"
        : "hotel2-destination-trigger hotel2-destination-trigger--boxed";

  return (
    <div className="relative hotel2-destination">
      <button
        ref={buttonRef}
        type="button"
        className={`${triggerClass}${open ? " hotel2-destination-trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
      >
        <span
          className={`hotel2-destination-value font-body ${value ? "text-foreground" : "text-muted-foreground"}`}
        >
          {label}
        </span>
        <span
          className={`hotel2-destination-chevron shrink-0 ${open ? "is-open" : ""}`}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="hotel2-destination-chevronSvg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        ref={panelRef}
        className={`hotel2-destination-panel ${
          open ? "is-open" : "is-closed"
        }`}
        role="presentation"
      >
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label="Destination country"
          onKeyDown={onOptionKeyDown}
          className="hotel2-destination-list"
        >
          {options.map((country, idx) => {
            const isSelected = value === country;
            const isActive = idx === activeIndex;
            return (
              <li key={country} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  data-opt={idx}
                  className={`hotel2-destination-option font-body${isSelected ? " hotel2-destination-option--selected" : ""}${isActive ? " hotel2-destination-option--active" : ""}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => selectAt(idx)}
                >
                  <span className="hotel2-destination-option-label">{country}</span>
                  {isSelected && (
                    <span className="hotel2-destination-option-check" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

