import { describe, expect, it } from "vitest";
import { Vector3 } from "three";

import { DEFAULT_SIGNS, cutFromHandles, handlesFromCut, partAt, snap } from "../src/necklace/handles";

describe("necklace handles", () => {
  it("give a point of the unit sphere whose squares are the parts' lengths", () => {
    const cut = cutFromHandles({ a: 0.25, b: 0.75, signs: new Vector3(1, -1, 1) });
    expect(cut.length()).toBeCloseTo(1);
    expect(cut.x).toBeCloseTo(0.5);
    expect(cut.y).toBeCloseTo(-Math.SQRT1_2);
    expect(cut.z).toBeCloseTo(0.5);
  });

  it("round-trip through the point", () => {
    for (const [a, b] of [[0, 0], [0, 1], [0.3, 0.3], [0.1, 0.9], [1, 1]]) {
      for (const signs of [new Vector3(1, 1, 1), new Vector3(-1, 1, -1), new Vector3(1, -1, -1)]) {
        const handles = handlesFromCut(cutFromHandles({ a, b, signs }), signs);
        expect(handles.a).toBeCloseTo(a);
        expect(handles.b).toBeCloseTo(b);
        expect(handles.signs).toEqual(signs);
      }
    }
  });

  it("keep the thief of a part of length 0 from before", () => {
    // Both cuts at the start: only z has a length, and its sign.
    const handles = handlesFromCut(new Vector3(0, 0, -1), new Vector3(-1, 1, 1));
    expect(handles.signs).toEqual(new Vector3(-1, 1, -1));
    expect(handlesFromCut(new Vector3(0, 0, 1)).signs).toEqual(new Vector3(DEFAULT_SIGNS.x, DEFAULT_SIGNS.y, 1));
  });

  it("clamp crossed or out-of-range positions", () => {
    const cut = cutFromHandles({ a: 0.8, b: 0.2, signs: new Vector3(1, 1, 1) });
    expect(cut.length()).toBeCloseTo(1);
    expect(cut.y).toBeCloseTo(0);
    expect(cutFromHandles({ a: -1, b: 2, signs: new Vector3(1, 1, 1) }).toArray()).toEqual([0, 1, 0]);
  });

  it("snap to the gaps between jewels", () => {
    expect(snap(0.26, 4)).toBe(0.25);
    expect(snap(0.13, 4)).toBe(0.25);
    expect(snap(0.12, 4)).toBe(0);
    expect(snap(0.37, 0)).toBe(0.37);
  });

  it("tell the part at a position", () => {
    const handles = { a: 0.25, b: 0.5, signs: new Vector3(1, 1, 1) };
    expect(partAt(0.1, handles)).toBe(0);
    expect(partAt(0.25, handles)).toBe(1);
    expect(partAt(0.7, handles)).toBe(2);
  });
});
