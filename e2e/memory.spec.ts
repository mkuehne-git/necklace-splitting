import { expect, test, type Page } from '@playwright/test';
import { control, openApp, openFolder, openSettings } from './app';

// Rebuilding the sphere or its material must free the old WebGL resources:
// otherwise every settings change uses more graphics memory. The tests count the
// buffers and shader programs that are alive.

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        const live = { buffers: 0, programs: 0 };
        (window as unknown as { live: typeof live }).live = live;
        for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
            const wrap = (name: string, change: () => void) => {
                const original = (proto as unknown as Record<string, (...args: unknown[]) => unknown>)[name];
                (proto as unknown as Record<string, unknown>)[name] = function (this: unknown, ...args: unknown[]) {
                    change();
                    return original.apply(this, args);
                };
            };
            wrap('createBuffer', () => live.buffers++);
            wrap('deleteBuffer', () => live.buffers--);
            wrap('createProgram', () => live.programs++);
            wrap('deleteProgram', () => live.programs--);
        }
    });
});

const live = (page: Page) => page.evaluate(() => ({ ...(window as unknown as { live: { buffers: number, programs: number } }).live }));

/** Waits until the view has been drawn with the latest change. */
const settle = (page: Page) => page.waitForTimeout(300);

test('switching showcases does not keep old buffers or programs', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await openFolder(page, /^Showcase:/);
    const showcases = [/^Shader Lamp$/, /^Space Colors$/, /^Sinusoid$/, /^Stolen Necklace$/];
    // One round first: each showcase compiles its program once.
    for (const name of showcases) {
        await openFolder(page, /^Showcase:/);
        await control(page, name).locator('input').check();
        await settle(page);
    }
    const before = await live(page);
    for (let round = 0; round < 3; round++) {
        for (const name of showcases) {
            await openFolder(page, /^Showcase:/);
            await control(page, name).locator('input').check();
            await settle(page);
        }
    }
    expect(await live(page)).toEqual(before);
});

test('changing the number of jewels does not keep old buffers or programs', async ({ page }) => {
    // The number of jewels is compiled into the shader (MAX_JEWELS): each count
    // needs its own program, and the one for the old count must be freed.
    await openApp(page);
    await openSettings(page);
    await openFolder(page, /^Necklace$/);
    const input = control(page, /^Jewels$/).locator('input');
    await input.fill('24');
    await input.press('Enter');
    await settle(page);
    const before = await live(page);
    for (const jewels of ['8', '16', '32', '24']) {
        await input.fill(jewels);
        await input.press('Enter');
        await settle(page);
    }
    expect(await live(page)).toEqual(before);
});
