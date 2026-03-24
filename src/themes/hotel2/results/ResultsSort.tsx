import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { HOTEL2_SORT_OPTIONS, type Hotel2SortKey } from "./hotel2Sort";

type Props = {
  sort: Hotel2SortKey;
  onChange: (v: Hotel2SortKey) => void;
};

export default function ResultsSort({ sort, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const highlightedRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const triggerId = `${listId}-trigger`;

  const selectedLabel = HOTEL2_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Default Order";

  useEffect(() => {
    highlightedRef.current = highlighted;
  }, [highlighted]);

  useEffect(() => {
    if (!open) return;
    const i = HOTEL2_SORT_OPTIONS.findIndex((o) => o.value === sort);
    setHighlighted(i >= 0 ? i : 0);
  }, [open, sort]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const commit = useCallback(
    (v: Hotel2SortKey) => {
      onChange(v);
      setOpen(false);
    },
    [onChange]
  );

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, HOTEL2_SORT_OPTIONS.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(HOTEL2_SORT_OPTIONS[highlightedRef.current]!.value);
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlighted(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlighted(HOTEL2_SORT_OPTIONS.length - 1);
    }
  };

  return (
    <div className="hotel2-results-sort font-body" ref={rootRef}>
      <span className="hotel2-results-sortLabel" id={`${listId}-label`}>
        Sort By:
      </span>
      <div className="hotel2-results-sortTrigger">
        <button
          type="button"
          className="hotel2-results-sortTriggerBtn"
          aria-label={`Sort results (${selectedLabel})`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          id={triggerId}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="hotel2-results-sortTriggerLabel">{selectedLabel}</span>
          <span className="hotel2-results-sortChevron" aria-hidden="true">
            <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
              <path d="M0 0 L5 6 L10 0 Z" fill="currentColor" />
            </svg>
          </span>
        </button>
        {open && (
          <div
            id={listId}
            role="listbox"
            className="hotel2-results-sortMenu"
            aria-labelledby={triggerId}
            tabIndex={-1}
          >
            {HOTEL2_SORT_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={sort === opt.value}
                className={`hotel2-results-sortOption${sort === opt.value ? " is-selected" : ""}${
                  highlighted === i ? " is-highlighted" : ""
                }`}
                onMouseEnter={() => setHighlighted(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
