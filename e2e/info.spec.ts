import { expect, test, type Page } from '@playwright/test';
import { openApp, openSettings, panel } from './app';

const overlay = (page: Page) => page.locator('.overlay-page.info');
const infoButton = (page: Page) => page.getByRole('button', { name: 'About this app' });

for (const [name, viewport] of [['desktop', { width: 1280, height: 800 }], ['phone', { width: 390, height: 780 }]] as const) {
    test(`the info button opens the explanation, the X closes it (${name})`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const errors = await openApp(page);
        await infoButton(page).click();
        await expect(overlay(page).locator('h1')).toHaveText('Necklace Splitting');
        await expect(overlay(page).locator('h2')).toHaveText(['The sphere', 'Solutions', 'Octants', 'Why a solution always exists']);
        await overlay(page).getByRole('button', { name: 'Close' }).click();
        await expect(overlay(page)).toHaveCount(0);
        expect(errors).toEqual([]);
    });
}

test('Escape closes the explanation', async ({ page }) => {
    await openApp(page);
    await infoButton(page).click();
    await expect(overlay(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(overlay(page)).toHaveCount(0);
});

test('the info button stays usable while the settings are open', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await infoButton(page).click();
    await expect(overlay(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel(page)).toBeVisible();
});

test('the explanation names settings that exist', async ({ page }) => {
    // It refers to settings as "Section › Label"; each must be in the panel.
    await openApp(page);
    await infoButton(page).click();
    await expect(overlay(page).locator('h1')).toBeVisible();
    const references = await overlay(page).locator('em', { hasText: '›' }).allTextContents();
    expect(references.length).toBeGreaterThan(3);
    await page.keyboard.press('Escape');
    await openSettings(page);
    for (const reference of references) {
        const [section, label] = reference.split(' › ');
        const details = panel(page).locator('details', { has: page.locator(':scope > summary', { hasText: section }) });
        await expect(details.getByLabel(label, { exact: true }), reference).toHaveCount(1);
    }
});
