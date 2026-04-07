import { describe, it, expect } from "vitest";
import { medusaDisplayAmount } from "./money";

describe("medusaDisplayAmount", () => {
  it("passes through decimal amounts", () => {
    expect(medusaDisplayAmount(37.5)).toBe(37.5);
  });

  it("treats large integers as minor units (cents)", () => {
    expect(medusaDisplayAmount(3799)).toBe(37.99);
  });

  it("parses numeric strings", () => {
    expect(medusaDisplayAmount("42.1")).toBe(42.1);
  });

  it("returns 0 for invalid input", () => {
    expect(medusaDisplayAmount(undefined)).toBe(0);
    expect(medusaDisplayAmount("x")).toBe(0);
  });
});
