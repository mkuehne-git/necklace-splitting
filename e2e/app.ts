import { readFileSync } from 'node:fs';
import { expect, type Locator, type Page } from '@playwright/test';
import { isFunctionalChange, parseChangelog } from '../src/changelog/changelogFormat';

/** The app version under test. */
export const APP_VERSION: string = JSON.parse(readFileSync('package.json', 'utf8')).version;

/**
 * The newest version What's new shows: versions marked "No functional change."
 * are left out, so it can be older than {@link APP_VERSION}.
 */
export const NEWEST_NEWS_VERSION: string = parseChangelog(readFileSync('CHANGELOG.md', 'utf8')).find(isFunctionalChange)!.version;

export const sphere = (page: Page) => page.locator('canvas#sphere');
export const necklace = (page: Page) => page.locator('canvas#necklace');
export const panel = (page: Page) => page.locator('#settings-panel');

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

/** Opens the settings panel with the gear button; it reacts after its click animation. */
export async function openSettings(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Open settings' }).click();
    await expect(panel(page)).toBeVisible();
}

/** Opens a section of the settings panel, if it is closed. */
export async function openSection(page: Page, name: string): Promise<void> {
    const details = panel(page).locator('details.settings-section', { has: page.locator(':scope > summary', { hasText: name }) }).first();
    if (!(await details.evaluate((element) => (element as HTMLDetailsElement).open))) {
        await details.locator(':scope > summary').click();
    }
    await expect(details).toHaveAttribute('open', '');
}

/** A control of the settings panel by its label, e.g. a checkbox or a slider. */
export function field(page: Page, label: string): Locator {
    return panel(page).getByLabel(label, { exact: true });
}

/** A button of the settings panel by its name: a showcase, a capture target, a footer button. */
export function panelButton(page: Page, name: string): Locator {
    return panel(page).getByRole('button', { name, exact: true });
}

/**
 * The pixels of a canvas as shown on the page. The settings panel and the icon
 * buttons lie on top of the sphere; they are hidden, so that only the canvas counts.
 */
export async function pixels(canvas: Locator): Promise<Buffer> {
    return canvas.screenshot({ animations: 'disabled', style: '#settings-panel, .toggle-div { visibility: hidden !important; }' });
}

/** Waits until the canvas looks different from `before`. */
export async function expectChanged(canvas: Locator, before: Buffer): Promise<void> {
    await expect.poll(async () => (await pixels(canvas)).equals(before), { timeout: 10_000 }).toBe(false);
}
