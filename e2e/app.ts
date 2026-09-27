import { readFileSync } from 'node:fs';
import { expect, type Locator, type Page } from '@playwright/test';

/** The app version under test. */
export const APP_VERSION: string = JSON.parse(readFileSync('package.json', 'utf8')).version;

export const sphere = (page: Page) => page.locator('canvas#sphere');
export const necklace = (page: Page) => page.locator('canvas#necklace');
export const gui = (page: Page) => page.locator('#gui');

/**
 * Opens the app and collects page errors and console errors. WebGL driver
 * messages are console warnings, not errors, so they are not collected.
 */
export async function openApp(page: Page): Promise<string[]> {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            errors.push(message.text());
        }
    });
    await page.goto('./');
    await expect(sphere(page)).toBeVisible();
    await expect(page.locator('#version-info')).toHaveText(`v${APP_VERSION}`);
    return errors;
}

/** Opens the lil-gui settings with the gear button; it reacts after its click animation. */
export async function openSettings(page: Page): Promise<void> {
    await page.locator('.toggle-div.settings').click();
    await expect(gui(page)).toBeVisible();
}

/** A lil-gui controller by its label. */
export function control(page: Page, name: string | RegExp): Locator {
    return gui(page).locator('.controller', { has: page.locator('.name', { hasText: name }) });
}

/** Opens a lil-gui folder by (the start of) its title, if it is closed. */
export async function openFolder(page: Page, title: string | RegExp): Promise<void> {
    const folder = gui(page).locator('.lil-gui', { has: page.locator(':scope > .title', { hasText: title }) }).first();
    if (await folder.evaluate((element) => element.classList.contains('closed'))) {
        await folder.locator(':scope > .title').click();
    }
    await expect(folder).not.toHaveClass(/\bclosed\b/);
}

/**
 * The pixels of a canvas as shown on the page. The settings panel and the icon
 * buttons lie on top of the sphere; they are hidden, so that only the canvas counts.
 */
export async function pixels(canvas: Locator): Promise<Buffer> {
    return canvas.screenshot({ animations: 'disabled', style: '#gui, .toggle-div { visibility: hidden !important; }' });
}

/** Waits until the canvas looks different from `before`. */
export async function expectChanged(canvas: Locator, before: Buffer): Promise<void> {
    await expect.poll(async () => (await pixels(canvas)).equals(before), { timeout: 10_000 }).toBe(false);
}
