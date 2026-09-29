import { expect, test, type Page } from '@playwright/test';
import { field, morphed, openApp, openSection, openSettings, shapeButton, sphere } from './app';

// The sphere is drawn only when something changes (#needsRender in Sphere.ts).
// These tests count WebGL draw calls to see whether it is drawn.

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        const counted = window as unknown as { drawCalls: number };
        counted.drawCalls = 0;
        for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
            for (const name of ['drawArrays', 'drawElements'] as const) {
                const original = proto[name] as (...args: unknown[]) => void;
                (proto as unknown as Record<string, unknown>)[name] = function (this: unknown, ...args: unknown[]) {
                    counted.drawCalls++;
                    return original.apply(this, args);
                };
            }
        }
    });
});

const drawCalls = (page: Page) => page.evaluate(() => (window as unknown as { drawCalls: number }).drawCalls);

/** Draw calls during `ms` milliseconds, after `action`. */
async function drawCallsDuring(page: Page, ms: number, action: () => Promise<void> = async () => { }): Promise<number> {
    const before = await drawCalls(page);
    await action();
    await page.waitForTimeout(ms);
    return (await drawCalls(page)) - before;
}

/**
 * Waits until the view has stopped drawing. A fixed wait is not enough: a slow
 * machine (GitHub's, with software WebGL) may still be drawing earlier frames.
 */
async function settled(page: Page): Promise<void> {
    await expect.poll(() => drawCallsDuring(page, 300), { timeout: 10000 }).toBe(0);
}

test('the resting view is not drawn again', async ({ page }) => {
    await openApp(page);
    await settled(page);
    expect(await drawCallsDuring(page, 1000)).toBe(0);
});

test('pointer moves, dragging and theme changes draw the view', async ({ page }) => {
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    await page.waitForTimeout(500);
    expect(await drawCallsDuring(page, 300, () => page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.4))).toBeGreaterThan(0);
    expect(await drawCallsDuring(page, 300, async () => {
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.5, { steps: 5 });
        await page.mouse.up();
    })).toBeGreaterThan(0);
    expect(await drawCallsDuring(page, 800, () => page.locator('.toggle-div.themes').click())).toBeGreaterThan(0);
    // And it rests again.
    await settled(page);
    expect(await drawCallsDuring(page, 1000)).toBe(0);
});

test('the rotation animation draws every frame, and stops drawing when it stops', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await openSection(page, 'Animation');
    await field(page, 'Rotate').check();
    // At the default speed of 0 the sphere does not turn, but the animation still runs.
    expect(await drawCallsDuring(page, 1000)).toBeGreaterThan(10);
    await field(page, 'Rotate').uncheck();
    await settled(page);
    expect(await drawCallsDuring(page, 1000)).toBe(0);
});

test('the morph draws while it runs, and rests afterwards', async ({ page }) => {
    await openApp(page);
    await page.waitForTimeout(500);
    expect(await drawCallsDuring(page, 500, () => shapeButton(page).click())).toBeGreaterThan(10);
    await morphed(page);
    // It comes to rest, and stays so.
    await settled(page);
    expect(await drawCallsDuring(page, 1000)).toBe(0);
});
