// @vitest-environment happy-dom
// The model listens for its configuration events on window.
import { beforeEach, describe, expect, it } from "vitest";
import { Vector2, Vector3 } from "three";

import { Events } from "../src/Enums";
import { NecklaceModel, necklaceFromText } from "../src/necklace/NecklaceModel";
import { MAX_NECKLACE_JEWELS, SETTINGS } from "../src/settings/settingsValues";

/** Configures the model the way the settings panel does: by number, lowest bit first. */
function fromNumber(configuration: number, numberOfJewels: number): NecklaceModel {
  const model = new NecklaceModel();
  SETTINGS.necklace.configuration = configuration;
  SETTINGS.necklace.number_of_jewels = numberOfJewels;
  Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
  return model;
}

function fromString(text: string): NecklaceModel {
  const model = new NecklaceModel();
  SETTINGS.necklace.string = text;
  Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_STRING);
  return model;
}

/**
 * The point on the unit sphere whose segment lengths (x², y², z²), scaled to the
 * necklace, are the given lengths; the signs choose the thief of each segment.
 */
function pointFor(lengths: [number, number, number], signs: [number, number, number]): Vector3 {
  const total = lengths[0] + lengths[1] + lengths[2];
  return new Vector3(
    signs[0] * Math.sqrt(lengths[0] / total),
    signs[1] * Math.sqrt(lengths[1] / total),
    signs[2] * Math.sqrt(lengths[2] / total)
  );
}

/** A deterministic pseudo-random generator, so failures can be reproduced. */
function random(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
}

/** Random points on the unit sphere, with no coordinate close to 0. */
function randomPoints(count: number, seed = 1): Vector3[] {
  const next = random(seed);
  const points: Vector3[] = [];
  while (points.length < count) {
    const p = new Vector3(next() * 2 - 1, next() * 2 - 1, next() * 2 - 1);
    if (p.length() > 0.1 && Math.min(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)) > 0.05) {
      points.push(p.normalize());
    }
  }
  return points;
}

const defaults = structuredClone({ ...SETTINGS.necklace });

beforeEach(() => {
  Object.assign(SETTINGS.necklace, defaults);
});

describe("configuration by number", () => {
  it("reads the lowest bit as the first jewel (regression for v0.3.1)", () => {
    // Before 9ca5be0 the binary digits were read from the highest bit, so 4
    // (binary 100) gave [1, 0, 0, 0] instead of [0, 0, 1, 0].
    expect(fromNumber(4, 4).necklace).toEqual([0, 0, 1, 0]);
    expect(fromNumber(6, 4).necklace).toEqual([0, 1, 1, 0]);
    expect(fromNumber(1, 4).necklace).toEqual([1, 0, 0, 0]);
  });

  it("fills the necklace up to the number of jewels", () => {
    const model = fromNumber(0, 5);
    expect(model.necklace).toEqual([0, 0, 0, 0, 0]);
    expect(model.cnt).toEqual(new Vector2(5, 0));
  });

  it("counts the jewels per type", () => {
    const model = fromNumber(0b1011, 6);
    expect(model.necklace).toEqual([1, 1, 0, 1, 0, 0]);
    expect(model.count_0).toBe(3);
    expect(model.count_1).toBe(3);
    expect(model.size).toBe(6);
  });

  it("builds the default configuration", () => {
    const model = fromNumber(defaults.configuration, defaults.number_of_jewels);
    const ones = defaults.configuration.toString(2).split("").filter((c) => c === "1").length;
    expect(model.size).toBe(defaults.number_of_jewels);
    expect(model.count_1).toBe(ones);
  });
});

describe("configuration by string", () => {
  it("appends the binary digits of each character", () => {
    // "A" is 65, binary 1000001; "B" is 66, binary 1000010.
    expect(fromString("A").necklace).toEqual([1, 0, 0, 0, 0, 0, 1]);
    expect(fromString("AB").necklace).toEqual([1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0]);
    expect(fromString("A").cnt).toEqual(new Vector2(5, 2));
  });

  it("gives an empty necklace for an empty string", () => {
    const model = fromString("");
    expect(model.necklace).toEqual([]);
    expect(model.size).toBe(0);
  });
});

describe("cuts, discrete", () => {
  // [0, 1, 1, 0]: two jewels of each type.
  let model: NecklaceModel;
  beforeEach(() => {
    SETTINGS.necklace.discrete_necklace = true;
    model = fromNumber(6, 4);
  });

  it("gives the whole necklace to thief A for a positive single segment", () => {
    model.applyCut(new Vector3(1, 0, 0));
    expect(model.thief_a).toEqual(new Vector2(2, 2));
    expect(model.thief_b).toEqual(new Vector2(0, 0));
  });

  it("gives the whole necklace to thief B for a negative single segment", () => {
    model.applyCut(new Vector3(0, 0, -1));
    expect(model.thief_a).toEqual(new Vector2(0, 0));
    expect(model.thief_b).toEqual(new Vector2(2, 2));
  });

  it("splits by segment lengths x², y², z² and assigns them by sign", () => {
    // Segments of 1.5, 2 and 0.5 jewels: jewels start at 0, 1, 2, 3; the ones
    // starting at 0 and 1 are in x (thief A), 2 and 3 in y (thief B).
    model.applyCut(pointFor([1.5, 2, 0.5], [1, -1, 1]));
    expect(model.thief_a).toEqual(new Vector2(1, 1));
    expect(model.thief_b).toEqual(new Vector2(1, 1));
  });

  it("finds a fair split as a solution: half of each type for each thief", () => {
    model.applyCut(pointFor([1.5, 2, 0.5], [1, -1, 1]));
    expect(model.canonicalThief(model.thief_a)).toEqual(new Vector2(0.5, 0.5));
  });
});

describe("cuts, continuous", () => {
  let model: NecklaceModel;
  beforeEach(() => {
    SETTINGS.necklace.discrete_necklace = false;
    model = fromNumber(6, 4); // [0, 1, 1, 0]
  });

  it("splits a jewel at the cut", () => {
    // Segments of 1.6, 2.4 and 0 jewels: jewel 0 to A, 60 % of jewel 1 to A.
    model.applyCut(pointFor([1.6, 2.4, 0], [1, -1, 1]));
    expect(model.thief_a.x).toBeCloseTo(1);
    expect(model.thief_a.y).toBeCloseTo(0.6);
  });

  it("splits a jewel that contains both cuts into three parts", () => {
    // Segments of 1.2, 0.5 and 2.3 jewels: jewel 1 is 20 % x, 50 % y, 30 % z.
    model.applyCut(pointFor([1.2, 0.5, 2.3], [1, -1, 1]));
    // A gets jewel 0 (type 0), 20 % + 30 % of jewel 1 (type 1), jewels 2 and 3.
    expect(model.thief_a.x).toBeCloseTo(2);
    expect(model.thief_a.y).toBeCloseTo(1.5);
  });

  it("assigns each jewel completely when all segments go to thief A", () => {
    for (const p of randomPoints(50)) {
      const positive = new Vector3(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z));
      model.applyCut(positive);
      expect(model.thief_a.x).toBeCloseTo(2);
      expect(model.thief_a.y).toBeCloseTo(2);
    }
  });
});

describe.each([
  ["discrete", true],
  ["continuous", false],
])("symmetry, %s", (_name, discrete) => {
  it("swaps the thieves at the antipodal point", () => {
    SETTINGS.necklace.discrete_necklace = discrete;
    const model = fromNumber(defaults.configuration, defaults.number_of_jewels);
    for (const p of randomPoints(100, 7)) {
      model.applyCut(p);
      const a = model.thief_a;
      const b = model.thief_b;
      model.applyCut(p.clone().negate());
      expect(model.thief_a.x).toBeCloseTo(b.x);
      expect(model.thief_a.y).toBeCloseTo(b.y);
      expect(model.thief_b.x).toBeCloseTo(a.x);
      expect(model.thief_b.y).toBeCloseTo(a.y);
    }
  });
});

describe.each([
  ["discrete", true],
  ["continuous", false],
])("shares, %s", (_name, discrete) => {
  it("are thief A's canonical shares, without applying the cut", () => {
    SETTINGS.necklace.discrete = discrete;
    SETTINGS.necklace.discrete_necklace = discrete;
    const model = fromNumber(defaults.configuration, defaults.number_of_jewels);
    const applied = new Vector3(0, 0, 1);
    model.applyCut(applied);
    for (const p of randomPoints(50, 3)) {
      const shares = model.shares(p);
      expect(model.cuts).toEqual(applied);
      model.applyCut(p);
      const expected = model.canonicalThief(model.thief_a);
      expect(shares.x).toBeCloseTo(expected.x);
      expect(shares.y).toBeCloseTo(expected.y);
      model.applyCut(applied);
    }
  });
});

describe("necklace splitting theorem", () => {
  /** Tries all pairs of cuts between jewels, with the middle segment to thief B. */
  function findSolution(model: NecklaceModel): Vector3 | undefined {
    const n = model.size;
    for (let first = 0; first <= n; first++) {
      for (let second = first; second <= n; second++) {
        // Half a jewel off the boundaries, so the discrete split is unambiguous.
        const x = Math.max(first - 0.5, 0);
        const y = Math.max(second - 0.5, 0) - x;
        const p = pointFor([x, y, n - x - y], [1, -1, 1]);
        model.applyCut(p);
        // Half of each type; canonicalThief would report 0 for a type that is missing.
        if (model.thief_a.x * 2 === model.count_0 && model.thief_a.y * 2 === model.count_1) {
          return p;
        }
      }
    }
    return undefined;
  }

  it("finds a fair split with two cuts for every necklace with even counts", () => {
    SETTINGS.necklace.discrete_necklace = true;
    const jewels = 8;
    let checked = 0;
    // One model, configured again and again, as in the app: every model listens
    // for the configuration events, so one per configuration would add up.
    const model = fromNumber(0, jewels);
    for (let configuration = 0; configuration < 2 ** jewels; configuration++) {
      SETTINGS.necklace.configuration = configuration;
      Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
      if (model.count_0 % 2 !== 0 || model.count_1 % 2 !== 0) {
        continue;
      }
      expect(findSolution(model), `configuration ${configuration}`).toBeDefined();
      checked++;
    }
    expect(checked).toBe(128);
  });
});

describe("points off the sphere", () => {
  it("are rejected", () => {
    const model = fromNumber(6, 4);
    expect(() => model.applyCut(new Vector3(1, 1, 0))).toThrow(/not close enough to sphere/);
  });
});

describe("necklaceFromText", () => {
  it("takes the binary digits of each character's code, one after another", () => {
    // "A" is 1000001, "B" 1000010.
    expect(necklaceFromText("AB")).toEqual({ jewels: [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0], characters: 2 });
    expect(necklaceFromText("")).toEqual({ jewels: [], characters: 0 });
  });

  it("takes only whole characters that fit into the longest necklace", () => {
    const { jewels, characters } = necklaceFromText("x".repeat(700));
    // "x" is 1111000: seven jewels each.
    expect(characters).toBe(Math.floor(MAX_NECKLACE_JEWELS / 7));
    expect(jewels).toHaveLength(characters * 7);
    expect(jewels.length).toBeLessThanOrEqual(MAX_NECKLACE_JEWELS);
  });
});

describe("a changed necklace or Discrete", () => {
  it("keeps the cut and gives the shares for the new necklace", () => {
    SETTINGS.necklace.discrete_necklace = true;
    // Four jewels, the first two of the second kind (3 = 0011, lowest bit first); thief A gets the first half.
    const model = fromNumber(3, 4);
    // Half a jewel off the gap, so the discrete split is unambiguous.
    const cut = pointFor([1.5, 0, 2.5], [1, -1, -1]);
    model.applyCut(cut);
    expect(model.thief_a).toEqual(new Vector2(0, 2));
    // Now the last two are of the second kind (12 = 1100): thief A's half holds the first kind.
    SETTINGS.necklace.configuration = 12;
    Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
    expect(model.cuts!.distanceTo(cut)).toBeLessThan(1e-9);
    expect(model.thief_a).toEqual(new Vector2(2, 0));
  });

  it("gives the shares for Discrete necklace as it is now", () => {
    SETTINGS.necklace.discrete_necklace = true;
    const model = fromNumber(0, 4);
    // Thief A's piece ends in the middle of the second jewel: Discrete gives it
    // the whole jewel (a jewel goes with the piece it starts in), otherwise half of it.
    model.applyCut(pointFor([1.5, 0, 2.5], [1, -1, -1]));
    expect(model.thief_a.x).toBe(2);
    SETTINGS.necklace.discrete_necklace = false;
    Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
    expect(model.thief_a.x).toBeCloseTo(1.5);
  });
});

describe("the two Discrete switches", () => {
  it("apply to the cut (the necklace's) and to shares (the sphere's) each on their own", () => {
    const model = fromNumber(0, 4);
    // Thief A's piece ends in the middle of the second jewel, as above.
    const cut = pointFor([1.5, 0, 2.5], [1, -1, -1]);
    SETTINGS.necklace.discrete_necklace = false;
    SETTINGS.necklace.discrete = true;
    model.applyCut(cut);
    expect(model.thief_a.x).toBeCloseTo(1.5);
    // Shares are canonical: 2 of 4 jewels of the first kind.
    expect(model.shares(cut).x).toBe(0.5);
    SETTINGS.necklace.discrete_necklace = true;
    SETTINGS.necklace.discrete = false;
    model.applyCut(cut);
    expect(model.thief_a.x).toBe(2);
    expect(model.shares(cut).x).toBeCloseTo(1.5 / 4);
  });
});
