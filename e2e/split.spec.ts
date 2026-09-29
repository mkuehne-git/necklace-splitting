import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { Vector3 } from 'three';
import type { NecklaceModel as Model } from '../src/necklace/NecklaceModel';

// The split exists twice: in the model (NecklaceModel.ts, which the necklace
// view and the fairness meter use) and in the shader (functions.glsl, which
// colors the sphere). This test runs both for the same necklaces and points:
// the model here in Node, the shader's functions in a small WebGL2 program in
// the browser, and compares thief A's jewels per type.

const shader = (name: string) => readFileSync(`src/sphere/shaders/${name}`, 'utf8');

/** Points per draw: one pixel each. */
const POINTS = 200;

/** The model outside the app: it listens on window and dispatches on document.body. */
async function loadModel(): Promise<{ NecklaceModel: typeof Model, configure: (configuration: number, jewels: number) => Model, fromText: (text: string) => Model }> {
    const scope = globalThis as unknown as Record<string, unknown>;
    scope.window ??= new EventTarget();
    scope.document ??= { body: new EventTarget() };
    const { NecklaceModel } = await import('../src/necklace/NecklaceModel');
    const { SETTINGS } = await import('../src/settings/settingsValues');
    const { Events } = await import('../src/Enums');
    const dispatch = (event: string) => (scope.window as EventTarget).dispatchEvent(new Event(event));
    return {
        NecklaceModel,
        configure: (configuration, jewels) => {
            const model = new NecklaceModel();
            SETTINGS.necklace.configuration = configuration;
            SETTINGS.necklace.number_of_jewels = jewels;
            dispatch(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
            return model;
        },
        fromText: (text) => {
            const model = new NecklaceModel();
            SETTINGS.necklace.string = text;
            dispatch(Events.SET_NECKLACE_CONFIGURATION_BY_STRING);
            return model;
        },
    };
}

/** A deterministic pseudo-random generator, so failures can be reproduced. */
function random(seed: number): () => number {
    return () => {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        return seed / 2147483648;
    };
}

/**
 * Random points on the unit sphere. Discrete splits jump where a cut meets the
 * start of a jewel; points close to that are left out, since float precision on
 * the GPU may put them on the other side.
 */
function points(size: number, seed: number): Vector3[] {
    const next = random(seed);
    const result: Vector3[] = [];
    const nearWhole = (value: number) => Math.abs(value - Math.round(value)) < 1e-3;
    while (result.length < POINTS) {
        const p = new Vector3(next() * 2 - 1, next() * 2 - 1, next() * 2 - 1);
        if (p.length() < 0.1) {
            continue;
        }
        p.normalize();
        const x = p.x * p.x * size;
        const y = p.y * p.y * size;
        if (!nearWhole(x) && !nearWhole(x + y)) {
            result.push(p);
        }
    }
    return result;
}

/**
 * Thief A's jewels per type from the shader's calculate_stolen_necklace_*, for
 * each point. The whole part and the fraction of each count go into their own
 * color channel, so the 8 bits per channel keep them to 1/255 of a jewel.
 */
async function shaderSplit(page: Page, necklace: number[], points: Vector3[], discrete: boolean): Promise<[number, number][]> {
    const source = {
        uniforms: shader('uniform.glsl'),
        functions: shader('functions.glsl'),
    };
    return page.evaluate(({ source, necklace, points, discrete }) => {
        const count = points.length / 3;
        const canvas = document.createElement('canvas');
        canvas.width = count;
        canvas.height = 1;
        const gl = canvas.getContext('webgl2')!;
        const compile = (type: number, text: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, text);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(shader) ?? 'compile error');
            }
            return shader;
        };
        const program = gl.createProgram()!;
        gl.attachShader(program, compile(gl.VERTEX_SHADER, `#version 300 es
            in vec2 corner;
            void main() { gl_Position = vec4(corner, 0.0, 1.0); }`));
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `#version 300 es
            precision highp float;
            precision highp int;
            #define MAX_JEWELS ${Math.max(1, necklace.length)}
            ${source.uniforms}
            ${source.functions}
            uniform vec3 u_points[${count}];
            out vec4 color;
            void main() {
                vec3 p = u_points[int(gl_FragCoord.x)];
                vec2 thief = u_necklace_discrete ? calculate_stolen_necklace_discrete(p) : calculate_stolen_necklace_continous(p);
                vec2 whole = floor(thief + 1e-4);
                color = vec4(whole.x / 255.0, thief.x - whole.x, whole.y / 255.0, thief.y - whole.y);
            }`));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) ?? 'link error');
        }
        gl.useProgram(program);

        const ones = necklace.filter((jewel) => jewel === 1).length;
        gl.uniform1i(gl.getUniformLocation(program, 'u_count_0'), necklace.length - ones);
        gl.uniform1i(gl.getUniformLocation(program, 'u_count_1'), ones);
        gl.uniform1iv(gl.getUniformLocation(program, 'u_input'), necklace.length > 0 ? necklace : [0]);
        gl.uniform1i(gl.getUniformLocation(program, 'u_necklace_discrete'), discrete ? 1 : 0);
        gl.uniform3fv(gl.getUniformLocation(program, 'u_points'), points);

        // Into a texture of its own: the canvas would premultiply the alpha channel.
        const target = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, target);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, count, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
        gl.viewport(0, 0, count, 1);

        const corners = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, corners);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const corner = gl.getAttribLocation(program, 'corner');
        gl.enableVertexAttribArray(corner);
        gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        const pixels = new Uint8Array(count * 4);
        gl.readPixels(0, 0, count, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return Array.from({ length: count }, (_, i) => [
            pixels[4 * i] + pixels[4 * i + 1] / 255,
            pixels[4 * i + 2] + pixels[4 * i + 3] / 255,
        ] as [number, number]);
    }, { source, necklace, points: points.flatMap((p) => p.toArray()), discrete });
}

/** Thief A's jewels per type from the model. */
function modelSplit(model: Model, points: Vector3[], discrete: boolean): [number, number][] {
    return points.map((p) => {
        const shares = model.shares(p, discrete);
        return [shares.x * model.count_0, shares.y * model.count_1];
    });
}

const necklaces: { name: string, model: (load: Awaited<ReturnType<typeof loadModel>>) => Model }[] = [
    { name: '10 jewels', model: ({ configure }) => configure(0b1001101001, 10) },
    { name: '8 jewels', model: ({ configure }) => configure(0b10110010, 8) },
    { name: '32 jewels', model: ({ configure }) => configure(0xb5a3c96e, 32) },
    { name: 'one kind of jewel', model: ({ configure }) => configure(0, 6) },
    { name: 'a text', model: ({ fromText }) => fromText('Hi') },
];

for (const discrete of [true, false]) {
    test.describe(discrete ? 'discrete' : 'continuous', () => {
        for (const { name, model: create } of necklaces) {
            test(`shader and model split ${name} alike`, async ({ page }) => {
                const model = create(await loadModel());
                expect(model.necklace.length).toBeGreaterThan(0);
                const cuts = points(model.necklace.length, model.necklace.length * 7 + 1);
                const fromShader = await shaderSplit(page, model.necklace, cuts, discrete);
                const fromModel = modelSplit(model, cuts, discrete);
                fromShader.forEach(([a, b], i) => {
                    const [expectedA, expectedB] = fromModel[i];
                    const at = `at ${cuts[i].toArray().map((v) => v.toFixed(4)).join(', ')}`;
                    expect(Math.abs(a - expectedA), `type 0 ${at}: shader ${a}, model ${expectedA}`).toBeLessThan(0.01);
                    expect(Math.abs(b - expectedB), `type 1 ${at}: shader ${b}, model ${expectedB}`).toBeLessThan(0.01);
                });
            });
        }
    });
}
