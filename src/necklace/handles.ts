import { Vector3 } from "three";

/**
 * The cuts as the necklace's handles show them: the two cut positions
 * 0 <= a <= b <= 1 along the necklace, and for each of the three parts which
 * thief gets it (+1 thief A, -1 thief B). The point of the unit sphere for
 * them is (sx·√a, sy·√(b-a), sz·√(1-b)): the parts have the lengths x², y², z².
 */
type Handles = {
  a: number;
  b: number;
  /** The thief of each part, +1 or -1, as the signs of (x, y, z). */
  signs: Vector3;
};

/** The usual split to start from: both thieves get something. (+,+,+) is an undivided octant, hidden by default. */
const DEFAULT_SIGNS = new Vector3(1, -1, 1);

/** Values this close to 0 count as a part of length 0, whose thief is not told by the point. */
const ZERO = 1e-9;

const sign = (value: number, previous: number) => Math.abs(value) < ZERO ? previous : Math.sign(value);

/** The point of the unit sphere for the handles. */
function cutFromHandles({ a, b, signs }: Handles): Vector3 {
  const first = Math.min(Math.max(a, 0), 1);
  const second = Math.min(Math.max(b, first), 1);
  return new Vector3(
    signs.x * Math.sqrt(first),
    signs.y * Math.sqrt(second - first),
    signs.z * Math.sqrt(1 - second),
  );
}

/**
 * The handles for a point of the unit sphere. A part of length 0 keeps its
 * thief from `previous`: the point does not tell it.
 */
function handlesFromCut(cut: Vector3, previous: Vector3 = DEFAULT_SIGNS): Handles {
  const a = cut.x * cut.x;
  const b = Math.min(1, a + cut.y * cut.y);
  return {
    a,
    b,
    signs: new Vector3(sign(cut.x, previous.x), sign(cut.y, previous.y), sign(cut.z, previous.z)),
  };
}

/** A handle's position snapped to the gaps between `jewels` jewels, for Discrete. */
function snap(position: number, jewels: number): number {
  return jewels > 0 ? Math.round(position * jewels) / jewels : position;
}

/** Which part a position along the necklace lies in: 0, 1 or 2 (x, y or z). */
function partAt(position: number, { a, b }: Handles): 0 | 1 | 2 {
  return position < a ? 0 : position < b ? 1 : 2;
}

export { DEFAULT_SIGNS, cutFromHandles, handlesFromCut, partAt, snap };
export type { Handles };
