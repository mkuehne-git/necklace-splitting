#include uniform;
#include varying;

/** The point on the unit sphere this vertex stands for: the cuts. */
attribute vec3 cut;

void main() {
    // Each octant is its own mesh: Spread octants moves it with its model matrix.
    // With the Borsuk-Ulam shape, the geometry already holds (g(x), z).
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_pos = cut;
}
