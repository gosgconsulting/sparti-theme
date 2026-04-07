import { describe, expect, it } from "vitest";
import { isMoondkHitPayReturnSearchParams } from "./hitPayReturnParams";

describe("isMoondkHitPayReturnSearchParams", () => {
  it("returns true for explicit storefront flag", () => {
    expect(isMoondkHitPayReturnSearchParams(new URLSearchParams("hitpay_return=1"))).toBe(true);
  });

  it("returns true when HitPay sends reference + status", () => {
    expect(
      isMoondkHitPayReturnSearchParams(
        new URLSearchParams("reference=90f28b43-2cff-4f86-a29e-15697424b3e7&status=completed"),
      ),
    ).toBe(true);
  });

  it("returns false when params are missing", () => {
    expect(isMoondkHitPayReturnSearchParams(new URLSearchParams(""))).toBe(false);
    expect(isMoondkHitPayReturnSearchParams(new URLSearchParams("status=completed"))).toBe(false);
  });
});
