import { expect, test, type Page } from '@playwright/test';
import { openApp, openSettings, panel, panelButton } from './app';

// Needs the private src/imprint-gen.js; with the stub there is no imprint to show.

const imprint = (page: Page) => page.locator('.imprint');
const closeButton = (page: Page) => page.getByRole('button', { name: 'Close', exact: true });

async function openImprint(page: Page): Promise<void> {
    await openApp(page);
    await openSettings(page);
    const entry = panelButton(page, 'Imprint');
    // The button shows once the imprint has loaded; with the stub it stays hidden.
    await entry.waitFor({ state: 'visible', timeout: 3000 }).catch(() => undefined);
    test.skip(!(await entry.isVisible()), 'no imprint in this build (src/imprint-gen.js is the stub)');
    await entry.click();
    await expect(imprint(page).locator('canvas')).toBeVisible();
}

/** The close button is on top: a click at its center reaches it, not the settings button underneath. */
async function expectCloseButtonOnTop(page: Page): Promise<void> {
    await expect(closeButton(page)).toBeVisible();
    const box = (await closeButton(page).boundingBox())!;
    const onTop = await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest('.overlay-close'), { x: box.x + box.width / 2, y: box.y + box.height / 2 });
    expect(onTop).toBe(true);
}

for (const [name, viewport] of [['desktop', { width: 1280, height: 800 }], ['phone', { width: 390, height: 780 }]] as const) {
    test(`the imprint shows as an image and closes with its X (${name})`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await openImprint(page);
        await expect(imprint(page)).toContainText('impressum-generator.de');
        await expectCloseButtonOnTop(page);
        await closeButton(page).click();
        await expect(imprint(page)).toHaveCount(0);
        // The settings are still open below.
        await expect(panel(page)).toBeVisible();
    });
}

test('the X stays in view while the imprint scrolls', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 400 });
    await openImprint(page);
    await imprint(page).evaluate((element) => element.scrollTo(0, element.scrollHeight));
    await expectCloseButtonOnTop(page);
});

test('Escape closes the imprint, and only the imprint', async ({ page }) => {
    await openImprint(page);
    await page.keyboard.press('Escape');
    await expect(imprint(page)).toHaveCount(0);
    // The settings below stay open; a second Escape closes them.
    await expect(panel(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel(page)).toBeHidden();
});
