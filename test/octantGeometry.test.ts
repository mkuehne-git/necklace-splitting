import { describe, expect, it } from "vitest";
import { BufferAttribute, Vector2, Vector3 } from "three";

import { createOctantGeometry, type Shares } from "../src/sphere/octantGeometry";

const radius = 15;
const signs = [1, -1].flatMap((x) => [1, -1].flatMap((y) => [1, -1].map((z) => new Vector3(x, y, z))));

/** Some f with f(-x) != 1 - f(x), to see that the shape takes f of both points. */
const shares: Shares = (p) => new Vector2(p.x * p.x, Math.max(0, p.y));

function points(attribute: BufferAttribute): Vector3[] {
  return Array.from({ length: attribute.count }, (_, i) => new Vector3().fromBufferAttribute(attribute, i));
}

describe("octant geometry", () => {
  it.each(signs.map((s) => [s.toArray().join(" "), s] as const))("lies in its octant (%s)", (_name, s) => {
    const geometry = createOctantGeometry(s, radius, 32);
    for (const p of points(geometry.getAttribute("position") as BufferAttribute)) {
      expect(p.x * s.x).toBeGreaterThanOrEqual(-1e-4);
      expect(p.y * s.y).toBeGreaterThanOrEqual(-1e-4);
      expect(p.z * s.z).toBeGreaterThanOrEqual(-1e-4);
    }
  });

  it("keeps the cuts on the unit sphere, as the sphere's points divided by the radius", () => {
    const geometry = createOctantGeometry(signs[0], radius, 32);
    const position = points(geometry.getAttribute("position") as BufferAttribute);
    const cut = points(geometry.getAttribute("cut") as BufferAttribute);
    expect(cut).toHaveLength(position.length);
    cut.forEach((c, i) => {
      expect(c.length()).toBeCloseTo(1);
      expect(c.distanceTo(position[i].clone().divideScalar(radius))).toBeLessThan(1e-5);
    });
  });

  it("moves each point to the Borsuk-Ulam shape (g(x), z), with the cuts unchanged", () => {
    for (const s of signs) {
      const geometry = createOctantGeometry(s, radius, 32, shares);
      const position = points(geometry.getAttribute("position") as BufferAttribute);
      points(geometry.getAttribute("cut") as BufferAttribute).forEach((c, i) => {
        expect(c.length()).toBeCloseTo(1);
        const g = shares(c).sub(shares(c.clone().negate()));
        expect(position[i].distanceTo(new Vector3(g.x, g.y, c.z).multiplyScalar(radius))).toBeLessThan(1e-4);
      });
      // The raycaster culls by the bounding sphere: it must fit the shape, not the sphere.
      expect(geometry.boundingSphere).not.toBeNull();
      for (const p of position) {
        expect(geometry.boundingSphere!.containsPoint(p)).toBe(true);
      }
    }
  });
});
