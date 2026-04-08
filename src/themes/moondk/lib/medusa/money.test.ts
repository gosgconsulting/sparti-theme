import { describe, it, expect } from "vitest";
import { medusaDisplayAmount, parseMoondkDisplayPriceForSum } from "./money";

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

describe("parseMoondkDisplayPriceForSum", () => {
  it("parses en-SG style currency strings", () => {
    expect(parseMoondkDisplayPriceForSum("S$32.00")).toBe(32);
    expect(parseMoondkDisplayPriceForSum("US$1,234.50")).toBe(1234.5);
  });

  it("handles simple $ prices and em dash", () => {
    expect(parseMoondkDisplayPriceForSum("$37")).toBe(37);
    expect(parseMoondkDisplayPriceForSum("—")).toBe(0);
  });
});
