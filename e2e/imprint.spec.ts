import { expect, test, type Page } from '@playwright/test';
import { control, openApp, openSettings } from './app';

// Needs the private src/imprint-gen.js; with the stub there is no imprint to show.

const imprint = (page: Page) => page.locator('.imprint');

async function openImprint(page: Page): Promise<void> {
    await openApp(page);
    await openSettings(page);
    const entry = control(page, /^Imprint$/);
    test.skip(await entry.count() === 0, 'no imprint in this build (src/imprint-gen.js is the stub)');
    await entry.locator('button').click();
    await expect(imprint(page).locator('canvas')).toBeVisible();
}

test('the imprint shows as an image and closes with its button', async ({ page }) => {
    await openImprint(page);
    await expect(imprint(page)).toContainText('impressum-generator.de');
    await page.locator('#hide-imprint').click();
    await expect(imprint(page)).toHaveCount(0);
});

test('Escape closes the imprint while the settings keep the focus (v0.4.25)', async ({ page }) => {
    await openImprint(page);
    // The Imprint button in the settings still has the focus.
    await expect(control(page, /^Imprint$/).locator('button')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(imprint(page)).toHaveCount(0);
});
