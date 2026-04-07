import { describe, expect, it } from "vitest";
import { labelMedusaPaymentProviderId, pickDefaultMedusaPaymentProviderId } from "./paymentProviderDefaults";

describe("pickDefaultMedusaPaymentProviderId", () => {
  it("prefers env when present in list", () => {
    expect(
      pickDefaultMedusaPaymentProviderId(["pp_system_default", "pp_hitpay_hitpay"], "pp_hitpay_hitpay"),
    ).toBe("pp_hitpay_hitpay");
  });

  it("prefers HitPay when env missing or invalid", () => {
    expect(pickDefaultMedusaPaymentProviderId(["pp_system_default", "pp_hitpay_hitpay"], null)).toBe(
      "pp_hitpay_hitpay",
    );
    expect(pickDefaultMedusaPaymentProviderId(["pp_system_default", "pp_hitpay_hitpay"], "pp_missing")).toBe(
      "pp_hitpay_hitpay",
    );
  });

  it("falls back to first id", () => {
    expect(pickDefaultMedusaPaymentProviderId(["pp_system_default", "pp_stripe_stripe"], null)).toBe(
      "pp_system_default",
    );
  });
});

describe("labelMedusaPaymentProviderId", () => {
  it("labels HitPay", () => {
    expect(labelMedusaPaymentProviderId("pp_hitpay_hitpay")).toBe("HitPay");
  });
});
