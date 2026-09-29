#include uniform;
#include varying;
#include functions;

/**
 * The canonical target value for each jewel type is 1/2, except if one jewel type
 * has is zero. In this case the target value is 0.
 * 
 * @returns {vec2} the target vector for each jewel type
 */
vec2 deltaTarget() {
    float x = u_count_0 != 0 ? 0.5 : 0.0;
    float y = u_count_1 != 0 ? 0.5 : 0.0;
    return vec2(x, y);
}
vec3 deltaColor(vec2 thief_a, vec2 thief_b) {
    vec2 target = deltaTarget();
    float dist_thief_a = distance(thief_a, target);
    float dist_thief_b = distance(thief_b, target);
    float blue = dist_thief_a < u_epsilon ? 1.0 - dist_thief_a : 0.0;
    return vec3(dist_thief_a, dist_thief_b, blue);
}

bool isSolutionArea(vec2 thief_a, vec2 thief_b) {
    vec2 target = deltaTarget();
    float dist_thief_a = distance(thief_a, target);
    float dist_thief_b = distance(thief_b, target);
    return dist_thief_a < u_epsilon;
}

vec4 scale_color(vec3 color) {
    return vec4(color * u_scale_color, u_alpha);
}
float inter(float a, float b, float x) {
    return (x - a) / (b - a);
}
vec3 calculateSolutionArea(vec3 colorIn, vec3 cuts) {
    if(!u_show_solution_band) {
        return colorIn;
    }
    float xSq = cuts.x * cuts.x;
    float ySq = cuts.y * cuts.y;
    float zSq = cuts.z * cuts.z;

    vec2 thief_a = vec2(0.0, 0.0);
    if(cuts.x > 0.0) {
        thief_a.x += xSq;
    } else {
        thief_a.y += xSq;
    }
    if(cuts.y > 0.0) {
        thief_a.x += ySq;
    } else {
        thief_a.y += ySq;
    }
    if(cuts.z > 0.0) {
        thief_a.x += zSq;
    } else {
        thief_a.y += zSq;
    }

    // Lengths, not kinds of jewels: each thief gets half the necklace, whatever the
    // jewels. deltaTarget() would drop a kind that does not occur, and the band with it.
    return distance(thief_a, vec2(0.5)) < u_epsilon ? vec3(0.5, 0.0, 0.0) + colorIn : colorIn;
}
/**
 * The headlight's shading: a flat normal from the screen-space derivatives of
 * the position, so each facet and each wall of the shape shows, whatever the
 * vertex normals. Both sides are lit alike, and the colors keep their meaning:
 * the light dims them to 60% at most.
 */
vec3 shade(vec3 color) {
    vec3 normal = normalize(cross(dFdx(v_view), dFdy(v_view)));
    float diffuse = abs(dot(normal, normalize(-v_view)));
    return color * mix(1.0, 0.6 + 0.4 * diffuse, u_light);
}
void fragColorWithIntersect(vec3 colorIn) {
    // Both on the unit sphere: the cuts under the pointer and those of this fragment.
    // A white ring with a dark outline, open in the middle: it reads on the bright
    // yellow and on the dark parts alike, and the color of the point stays visible.
    vec3 color = colorIn;
    float dist = distance(v_pos, u_intersect);
    float hole = 0.025;
    float ring = 0.04;
    float outline = 0.05;
    float edge = 0.055;
    if(dist < hole) {
        color = colorIn;
    } else if(dist < ring) {
        color = vec3(1.0);
    } else if(dist < outline) {
        color = vec3(0.08);
    } else if(dist < edge) {
        color = mix(vec3(0.08), color, inter(outline, edge, dist));
    }
    gl_FragColor = scale_color(color);
}

void main() {
    // Red and green: thief A's share of each kind of jewel.
    vec2 thief_a = calculate_stolen_necklace(v_pos);
    vec2 thief_b = vec2(1.0) - thief_a;
    vec3 color = vec3(thief_a, 0.0);
    if(u_show_solutions && isSolutionArea(thief_a, thief_b)) {
        color = deltaColor(thief_a, thief_b);
    }
    color = calculateSolutionArea(shade(color), v_pos);
    fragColorWithIntersect(color);
}