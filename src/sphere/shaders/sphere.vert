#include uniform;
#include varying;
#include functions;
struct SphereData {
    vec3 p;
    float octant;
    bool valid;
};


vec3 borsuk_ulam_proof(vec3 p) {
    if(!u_show_borsuk_ulam_proof_shape) {
        return vec3(p);
    }
    vec3 x = vec3(p);
    vec2 g_x = calculate_stolen_necklace(x) - calculate_stolen_necklace(-x);
    return vec3(g_x, x.z);
}

SphereData displace_octant(vec3 p, float offset) {
    SphereData sd;
    sd.valid = true;
    if(offset == 0.0) {
        sd.p = p;
    } else if(p.x >= 0.0 && p.y >= 0.0 && p.z >= 0.0) {
        // 000
        sd.p = p + vec3(offset, offset, offset);
        sd.octant = 1.0;
    } else if(p.x > 0.0 && p.y > 0.0 && p.z < 0.0) {
        // 001
        sd.p = p + vec3(offset, offset, -offset);
        sd.octant = 1.0;
    } else if(p.x > 0.0 && p.y < 0.0 && p.z > 0.0) {
        // 010
        sd.p = p + vec3(offset, -offset, offset);
        sd.octant = 2.0;
    } else if(p.x > 0.0 && p.y < 0.0 && p.z < 0.0) {
        // 011
        sd.p = p + vec3(offset, -offset, -offset);
        sd.octant = 3.0;
    } else if(p.x < 0.0 && p.y > 0.0 && p.z > 0.0) {
        // 100
        sd.p = p + vec3(-offset, offset, offset);
        sd.octant = 4.0;
    } else if(p.x < 0.0 && p.y > 0.0 && p.z < 0.0) {
        // 101
        sd.p = p + vec3(-offset, offset, -offset);
        sd.octant = 5.0;
    } else if(p.x < 0.0 && p.y < 0.0 && p.z > 0.0) {
        // 110
        sd.p = p + vec3(-offset, -offset, offset);
        sd.octant = 6.0;
    } else if(p.x < 0.0 && p.y < 0.0 && p.z < 0.0) {
        // 111
        sd.p = p + vec3(-offset, -offset, -offset);
        sd.octant = 7.0;
    } else {
        sd.p = p;
        sd.valid = false;
    }
    return sd;
}

void main() {
    // Calculate vertex shader output
    vec3 g_x = borsuk_ulam_proof(position / u_radius_vector) * u_radius_vector;
    SphereData sd_shader = displace_octant(g_x, u_offset_sphere_octant);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(sd_shader.p, 1.0);

    v_pos = position / u_radius_vector;

    // Calculate internal output and add displacement to sphere octants
    SphereData sd_out = displace_octant(v_pos, u_offset_sphere_octant / u_radius_vector.x);
    v_sphereData_p = sd_out.p;
    v_sphereData_octant = sd_out.octant;
    v_sphereData_valid = sd_out.valid ? 1.0 : 0.0;
}