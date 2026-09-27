import { expect, test, type Page } from '@playwright/test';
import { openApp, openSettings, panel } from './app';

const overlay = (page: Page) => page.locator('.overlay-page.changelog');
const closeButton = (page: Page) => page.locator('.changelog div.overlay-close');

async function openChangelog(page: Page): Promise<void> {
    await page.locator('#version-info').click();
    await expect(overlay(page)).toBeVisible();
}

for (const [name, viewport] of [['desktop', { width: 1280, height: 800 }], ['phone', { width: 390, height: 780 }]] as const) {
    test(`the version label opens the changelog, the X button closes it (${name})`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const errors = await openApp(page);
        const version = (await page.locator('#version-info').textContent())!;
        await openChangelog(page);
        await expect(overlay(page).locator('h2').first()).toContainText(version);
        const box = (await closeButton(page).boundingBox())!;
        const onTop = await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest('.overlay-close'), { x: box.x + box.width / 2, y: box.y + box.height / 2 });
        expect(onTop).toBe(true);
        await closeButton(page).click();
        await expect(overlay(page)).toHaveCount(0);
        await expect(page.locator('#version-info')).toBeVisible();
        expect(errors).toEqual([]);
    });
}

test('the settings footer opens the changelog too', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await panel(page).locator('.settings-link').click();
    await expect(overlay(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(overlay(page)).toHaveCount(0);
    await expect(panel(page)).toBeVisible();
});

test('Escape closes the changelog', async ({ page }) => {
    await openApp(page);
    await openChangelog(page);
    await page.keyboard.press('Escape');
    await expect(overlay(page)).toHaveCount(0);
});

test('older entries link their commit; the oldest have none', async ({ page }) => {
    await openApp(page);
    await openChangelog(page);
    await expect(overlay(page).locator('h2', { hasText: 'v0.4.17' }).locator('a')).toHaveAttribute('href', /\/necklace-splitting\/commit\/491bd3c$/);
    await expect(overlay(page).locator('h2', { hasText: 'v0.1.0' })).toHaveText('v0.1.0');
});
