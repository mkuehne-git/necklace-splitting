#include uniform;
#include varying;
#include functions;

/** The Borsuk-Ulam shape: each point x of the sphere moved to g(x) = f(x) - f(-x), keeping its z. */
vec3 borsuk_ulam_proof(vec3 p) {
    if(!u_show_borsuk_ulam_proof_shape) {
        return vec3(p);
    }
    vec3 x = vec3(p);
    vec2 g_x = calculate_stolen_necklace(x) - calculate_stolen_necklace(-x);
    return vec3(g_x, x.z);
}

void main() {
    // Each octant is its own mesh: Spread octants moves it with its model matrix.
    vec3 p = borsuk_ulam_proof(position / u_radius_vector) * u_radius_vector;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);

    // The point on the unit sphere: the cuts it stands for.
    v_pos = position / u_radius_vector;
}
