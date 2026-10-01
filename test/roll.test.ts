import { describe, expect, it } from "vitest";

import { rollConfiguration } from "../src/necklace/roll";

/** A seeded random source in [0, 1) (mulberry32), so that failures repeat. */
function seeded(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ones = (configuration: number) => configuration.toString(2).split("").filter((digit) => digit === "1").length;

describe("the dice", () => {
  it("rolls nothing below two jewels", () => {
    expect(rollConfiguration(0, 0)).toBeUndefined();
    expect(rollConfiguration(1, 1)).toBeUndefined();
  });

  it("rolls both kinds of jewels, a necklace other than the current one", () => {
    const random = seeded(1);
    for (const jewels of [2, 3, 5, 8, 24, 32]) {
      const max = 2 ** jewels - 1;
      let current = 1;
      for (let i = 0; i < 200; i++) {
        const configuration = rollConfiguration(jewels, current, random)!;
        expect(Number.isInteger(configuration)).toBe(true);
        expect(configuration).toBeGreaterThan(0);
        expect(configuration).toBeLessThan(max);
        expect(configuration).not.toBe(current);
        current = configuration;
      }
    }
  });

  it("rolls an even number of each kind when the jewels are even", () => {
    const random = seeded(2);
    for (const jewels of [4, 6, 24, 32]) {
      for (let i = 0; i < 200; i++) {
        expect(ones(rollConfiguration(jewels, 0, random)!) % 2).toBe(0);
      }
    }
  });

  it("takes any mix where no even one exists, and never repeats, whatever the random source", () => {
    // Two jewels: only one of each kind, 1 or 2.
    expect([1, 2]).toContain(rollConfiguration(2, 0, seeded(3)));
    expect(rollConfiguration(2, 1, () => 0)).toBe(2);
    expect(rollConfiguration(2, 2, () => 0.99)).toBe(1);
    expect(rollConfiguration(24, 1, () => 0)).not.toBe(1);
  });
});
