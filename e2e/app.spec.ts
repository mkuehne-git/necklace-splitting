import { expect, test } from '@playwright/test';
import { control, expectChanged, gui, necklace, openApp, openFolder, openSettings, pixels, sphere } from './app';

test('loads without errors and shows the sphere and the necklace', async ({ page }) => {
    const errors = await openApp(page);
    await expect(necklace(page)).toBeVisible();
    await expect(gui(page)).toBeHidden();
    expect(errors).toEqual([]);
});

test('hovering the sphere cuts the necklace there', async ({ page }) => {
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    // Away from the center, where no cut is shown before the first hover.
    await page.mouse.move(box.x + 5, box.y + 5);
    const before = await pixels(necklace(page));
    await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.4);
    await expectChanged(necklace(page), before);
    // The pointer is hidden over the sphere, the cut marks the position instead.
    await expect(sphere(page)).toHaveCSS('cursor', 'none');
});

test('the theme switcher toggles light and dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openApp(page);
    const body = page.locator('body');
    await expect(body).toHaveClass(/\blight\b/);
    const before = await pixels(necklace(page));
    await page.locator('.toggle-div.themes').click();
    await expect(body).toHaveClass(/\bdark\b/);
    await expectChanged(necklace(page), before);
    await page.locator('.toggle-div.themes').click();
    await expect(body).toHaveClass(/\blight\b/);
});

test('the gear button opens and closes the settings', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await page.locator('.toggle-div.settings').click();
    await expect(gui(page)).toBeHidden();
});

test('a showcase changes the sphere', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    const before = await pixels(sphere(page));
    await openFolder(page, /^Showcase:/);
    await control(page, /^Shader Lamp$/).locator('input').check();
    await expectChanged(sphere(page), before);
    await expect(gui(page).locator('.title', { hasText: 'Showcase: Shader Lamp' })).toBeVisible();
});

test('a new necklace configuration changes necklace and sphere', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    const necklaceBefore = await pixels(necklace(page));
    const sphereBefore = await pixels(sphere(page));
    await openFolder(page, /^Necklace$/);
    const input = control(page, /^Configuration$/).locator('input');
    await input.fill('4095');
    await input.press('Enter');
    await expectChanged(necklace(page), necklaceBefore);
    await expectChanged(sphere(page), sphereBefore);
});

test('the service worker registers', async ({ page }) => {
    await openApp(page);
    const scope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
    expect(scope).toMatch(/\/necklace-splitting\/$/);
});

test('Check for updates reports that there is none', async ({ page }) => {
    await openApp(page);
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await openSettings(page);
    await control(page, /^Check for updates$/).locator('button').click();
    await expect(page.locator('#pwa-status')).toHaveText('No update available.');
    await expect(page.locator('#pwa-update-dialog')).toBeHidden();
});

test('the icon buttons are named for screen readers and work with the keyboard', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openApp(page);
    await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible();
    const settings = page.getByRole('button', { name: 'Open settings' });
    await settings.focus();
    await page.keyboard.press('Enter');
    await expect(gui(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close settings' })).toBeVisible();
});
