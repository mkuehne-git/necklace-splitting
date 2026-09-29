#include uniform;
#include varying;
#include <morphtarget_pars_vertex>

/** The point on the unit sphere this vertex stands for: the cuts. */
attribute vec3 cut;

void main() {
    // Each octant is its own mesh: Spread octants moves it with its model matrix.
    // The Borsuk-Ulam shape (g(x), z) is the geometry's morph target, weighted by the morph.
    #include <begin_vertex>
    #include <morphtarget_vertex>
    vec4 view = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * view;
    v_pos = cut;
    v_view = view.xyz;
}
