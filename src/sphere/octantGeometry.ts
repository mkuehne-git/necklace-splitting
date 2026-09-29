import * as THREE from "three";

/** f of the Borsuk-Ulam view: thief A's share of each kind of jewel for the cuts at a point of the unit sphere. */
export type Shares = (point: THREE.Vector3) => THREE.Vector2;

/**
 * The part of the sphere in the octant with the given signs. SphereGeometry
 * places a point at (-cos φ sin θ, cos θ, sin φ sin θ): θ from the top (+y),
 * φ around the y axis. An octant is half of θ's range and a quarter of φ's.
 * The sphere's segments are shared out, so all eight together have as many
 * as the whole sphere had.
 *
 * Each vertex keeps the point of the unit sphere it stands for, the cuts, in
 * the attribute `cut`. With `shares`, the geometry gets the Borsuk-Ulam shape
 * as its morph target: each vertex at (g(x), z) with g(x) = f(x) - f(-x),
 * scaled by the radius. The mesh's morph influence moves between sphere (0)
 * and shape (1); the faces, the wireframe and the raycaster all follow it.
 */
export function createOctantGeometry(
  signs: THREE.Vector3,
  radius: number,
  sphereSegments: number,
  shares?: Shares
): THREE.BufferGeometry {
  const quarter = Math.PI / 2;
  const segments = Math.max(1, Math.round(sphereSegments / 4));
  const thetaStart = signs.y > 0 ? 0 : quarter;
  // x = -cos φ is positive for φ in (π/2, 3π/2), z = sin φ for φ in (0, π).
  const phiStart = signs.x < 0
    ? (signs.z > 0 ? 0 : 3 * quarter)
    : (signs.z > 0 ? quarter : 2 * quarter);
  const geometry = new THREE.SphereGeometry(
    radius,
    segments,
    segments,
    phiStart,
    quarter,
    thetaStart,
    quarter
  );

  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  const cut = new THREE.BufferAttribute(new Float32Array(position.count * 3), 3);
  const shape = shares ? new THREE.BufferAttribute(new Float32Array(position.count * 3), 3) : undefined;
  const point = new THREE.Vector3();
  const opposite = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i).normalize();
    cut.setXYZ(i, point.x, point.y, point.z);
    if (shares && shape) {
      const g = shares(point).sub(shares(opposite.copy(point).negate()));
      shape.setXYZ(i, g.x * radius, g.y * radius, point.z * radius);
    }
  }
  geometry.setAttribute("cut", cut);
  if (shape) {
    geometry.morphAttributes.position = [shape];
    // The raycaster culls by the bounding volumes: they include the morph target.
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
  }
  return geometry;
}
