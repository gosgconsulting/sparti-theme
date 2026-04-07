/** Normalize API money for display (handles integer minor units heuristically). */
export function medusaDisplayAmount(raw: unknown): number {
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? parseFloat(raw) : NaN;
  if (!Number.isFinite(n)) return 0;
  if (Number.isInteger(n) && Math.abs(n) >= 1000) return n / 100;
  return n;
}
