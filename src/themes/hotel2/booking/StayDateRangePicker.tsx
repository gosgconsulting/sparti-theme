import React, { useMemo, useState } from "react";
import { addDays, differenceInCalendarDays, isAfter, isSameDay, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  checkIn: string;
  checkOut: string;
  onRangeChange: (next: { checkIn: string; checkOut: string }) => void;
};

type Phase = "checkIn" | "checkOut";

function yyyyMmDd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseYmd(s: string): Date | undefined {
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function formatShortDate(value: string) {
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function nightsBetween(start: string, end: string) {
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 0;
  const ms = e.getTime() - s.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function DateFieldChevron() {
  return (
    <span className="shrink-0 text-muted-foreground pointer-events-none" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function StayDateRangePicker({ checkIn, checkOut, onRangeChange }: Props) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("checkIn");
  const [draftIn, setDraftIn] = useState<Date | undefined>(() => parseYmd(checkIn));
  const [draftOut, setDraftOut] = useState<Date | undefined>(() => parseYmd(checkOut));
  const today = useMemo(() => startOfDay(new Date()), []);

  const syncDraftsFromProps = () => {
    setDraftIn(parseYmd(checkIn));
    setDraftOut(parseYmd(checkOut));
    setPhase("checkIn");
  };

  const handleOpenChange = (next: boolean) => {
    if (next) {
      syncDraftsFromProps();
    }
    setOpen(next);
  };

  const commitRange = (from: Date, to: Date) => {
    const start = startOfDay(from);
    let end = startOfDay(to);
    if (!isAfter(end, start)) {
      end = addDays(start, 1);
    }
    onRangeChange({ checkIn: yyyyMmDd(start), checkOut: yyyyMmDd(end) });
    setOpen(false);
  };

  const handleSingleSelect = (d: Date | undefined) => {
    if (!d) return;
    const day = startOfDay(d);
    if (phase === "checkIn") {
      setDraftIn(day);
      setDraftOut((prev) => {
        if (!prev || !isAfter(prev, day)) {
          return addDays(day, 1);
        }
        return prev;
      });
      setPhase("checkOut");
      return;
    }
    if (!draftIn) {
      setPhase("checkIn");
      return;
    }
    commitRange(startOfDay(draftIn), startOfDay(d));
  };

  const handleClear = () => {
    const d0 = startOfDay(new Date());
    const d1 = addDays(d0, 2);
    setDraftIn(d0);
    setDraftOut(d1);
    onRangeChange({ checkIn: yyyyMmDd(d0), checkOut: yyyyMmDd(d1) });
    setPhase("checkIn");
    setOpen(false);
  };

  const handleToday = () => {
    const d0 = startOfDay(new Date());
    const d1 = addDays(d0, 1);
    setDraftIn(d0);
    setDraftOut(d1);
    onRangeChange({ checkIn: yyyyMmDd(d0), checkOut: yyyyMmDd(d1) });
    setPhase("checkIn");
    setOpen(false);
  };

  const calendarSelected = phase === "checkIn" ? draftIn : draftOut;
  const calendarDisabled =
    phase === "checkOut" && draftIn
      ? { before: startOfDay(draftIn) }
      : { before: today };

  const defaultMonth = (phase === "checkOut" ? draftOut ?? draftIn : draftIn) ?? today;

  /** Always show both ends in the grid; `day_outside` + `day_today` otherwise hide or wash out check-in (e.g. Apr 1 in March pane). */
  const stayModifiers = useMemo(() => {
    if (!draftIn) {
      return {
        stayCheckIn: [] as Date[],
        stayCheckOut: [] as Date[],
        stayBetween: undefined as { after: Date; before: Date } | undefined,
      };
    }
    const start = startOfDay(draftIn);
    const end = draftOut ? startOfDay(draftOut) : start;
    let stayBetween: { after: Date; before: Date } | undefined;
    if (draftOut && isAfter(end, start) && differenceInCalendarDays(end, start) > 1) {
      stayBetween = { after: start, before: end };
    }
    return {
      stayCheckIn: [start],
      stayCheckOut: draftOut && !isSameDay(start, end) ? [end] : [],
      stayBetween,
    };
  }, [draftIn, draftOut]);

  const n = Math.max(1, nightsBetween(checkIn, checkOut));
  const label = `Select stay dates, check-in ${formatShortDate(checkIn)}, check-out ${formatShortDate(checkOut)}, ${n} night${n === 1 ? "" : "s"}`;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="mt-2 w-full rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0 h-12 flex items-center justify-between gap-3 border-b border-border hover:border-foreground/35 transition-colors">
              <span className="font-body text-sm text-foreground truncate">{formatShortDate(checkIn)}</span>
              <DateFieldChevron />
            </div>
            <div className="shrink-0 font-body text-sm text-muted-foreground">–</div>
            <div className="flex-1 min-w-0 h-12 flex items-center justify-between gap-3 border-b border-border hover:border-foreground/35 transition-colors">
              <span className="font-body text-sm text-foreground truncate">{formatShortDate(checkOut)}</span>
              <DateFieldChevron />
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="z-[100] w-auto max-w-[min(100vw-1.5rem,42rem)] p-0 overflow-x-auto border-border bg-card text-card-foreground shadow-xl"
      >
        <div className="flex border-b border-border px-2 pt-2 font-body text-sm">
          <button
            type="button"
            className={cn(
              "flex-1 px-3 py-2.5 rounded-t-md transition-colors",
              phase === "checkIn"
                ? "font-medium text-foreground border-b-2 border-primary -mb-px bg-muted/40"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setPhase("checkIn")}
          >
            Check-in
            {draftIn ? (
              <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                {formatShortDate(yyyyMmDd(draftIn))}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 px-3 py-2.5 rounded-t-md transition-colors",
              phase === "checkOut"
                ? "font-medium text-foreground border-b-2 border-primary -mb-px bg-muted/40"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setPhase("checkOut")}
          >
            Check-out
            {draftOut ? (
              <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                {formatShortDate(yyyyMmDd(draftOut))}
              </span>
            ) : null}
          </button>
        </div>
        <Calendar
          mode="single"
          numberOfMonths={2}
          showOutsideDays={false}
          defaultMonth={defaultMonth}
          selected={calendarSelected}
          onSelect={handleSingleSelect}
          disabled={calendarDisabled}
          initialFocus
          modifiers={{
            stayCheckIn: stayModifiers.stayCheckIn,
            stayCheckOut: stayModifiers.stayCheckOut,
            ...(stayModifiers.stayBetween ? { stayBetween: stayModifiers.stayBetween } : {}),
          }}
          modifiersClassNames={{
            stayCheckIn: cn(
              "!opacity-100 z-[1] rounded-md font-semibold",
              "bg-primary text-primary-foreground shadow-sm",
              "hover:bg-primary hover:text-primary-foreground",
              "focus-visible:bg-primary focus-visible:text-primary-foreground"
            ),
            stayCheckOut: cn(
              "!opacity-100 z-[1] rounded-md font-semibold",
              "bg-primary text-primary-foreground shadow-sm",
              "hover:bg-primary hover:text-primary-foreground",
              "focus-visible:bg-primary focus-visible:text-primary-foreground"
            ),
            stayBetween: cn(
              "!opacity-100 rounded-none bg-primary/20 text-foreground",
              "hover:bg-primary/25 focus-visible:bg-primary/25"
            ),
          }}
          classNames={{
            months: "flex flex-col sm:flex-row gap-6 sm:gap-8",
          }}
        />
        <div className="flex items-center justify-between gap-4 border-t border-border px-3 py-2.5">
          <button
            type="button"
            className="font-body text-sm font-medium text-primary hover:underline underline-offset-2"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="font-body text-sm font-medium text-primary hover:underline underline-offset-2"
            onClick={handleToday}
          >
            Today
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
