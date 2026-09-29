import { expect, test } from '@playwright/test';
import { APP_VERSION, expectChanged, field, necklace, openApp, openSection, openSettings, panel, panelButton, pixels, sphere, withStoredState } from './app';

test('loads without errors and shows the sphere and the necklace', async ({ page }) => {
    const errors = await openApp(page);
    await expect(necklace(page)).toBeVisible();
    await expect(panel(page)).toBeHidden();
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

test('hovering the Borsuk-Ulam shape cuts the necklace there', async ({ page }) => {
    // The shape is the octants' geometry, so the raycaster hits the shape, not the sphere.
    await withStoredState(page, { settings: { 'sphere.show_borsuk_ulam_proof_shape': true } });
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + 5, box.y + 5);
    const before = await pixels(necklace(page));
    await page.mouse.move(box.x + box.width * 0.48, box.y + box.height * 0.48);
    await expectChanged(necklace(page), before);
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

test('the mesh shows on the light theme (v1.2.0)', async ({ page }) => {
    // The wireframe was white, its default, and vanished on the light background.
    await page.emulateMedia({ colorScheme: 'light' });
    await withStoredState(page, { settings: { 'view.faces_visible': false, 'view.axes_visible': false, 'view.mesh_visible': false } });
    await openApp(page);
    await expect(page.locator('body')).toHaveClass(/\blight\b/);
    await openSettings(page);
    await openSection(page, 'Advanced');
    const before = await pixels(sphere(page));
    await field(page, 'Mesh').check();
    await expectChanged(sphere(page), before);
});

test('the gear button opens and closes the settings', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await page.getByRole('button', { name: 'Close settings' }).click();
    await expect(panel(page)).toBeHidden();
});

test('h opens and closes the settings, but not while typing; Escape closes them', async ({ page }) => {
    await openApp(page);
    // The first h works too: it used to do nothing after loading.
    await page.keyboard.press('h');
    await expect(panel(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close settings' })).toBeVisible();
    const text = field(page, 'Text');
    await text.click();
    await page.keyboard.type('hh');
    await expect(panel(page)).toBeVisible();
    await expect(text).toHaveValue('hh');
    await text.blur();
    await page.keyboard.press('h');
    await expect(panel(page)).toBeHidden();
    await page.keyboard.press('h');
    await page.keyboard.press('Escape');
    await expect(panel(page)).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open settings' })).toBeVisible();
});

test('a new necklace configuration changes necklace and sphere', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    const necklaceBefore = await pixels(necklace(page));
    const sphereBefore = await pixels(sphere(page));
    const input = field(page, 'Configuration');
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
    await panelButton(page, 'Check for updates').click();
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
    await expect(panel(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close settings' })).toBeVisible();
});

test('fewer jewels clamp the configuration, and it cannot exceed them', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await field(page, 'Jewels').fill('4');
    await expect(field(page, 'Configuration')).toHaveValue('15');
    await field(page, 'Configuration').fill('99');
    await field(page, 'Configuration').press('Enter');
    await expect(field(page, 'Configuration')).toHaveValue('15');
});

test('the footer offers Imprint, Check for updates, Restore defaults and the changelog, in this order', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    const names = await panel(page).locator('.settings-footer button:visible').allTextContents();
    // Without the private imprint (the stub) there is no Imprint button.
    expect(names.filter((name) => name !== 'Imprint')).toEqual(['Check for updates', 'Restore defaults', `v${APP_VERSION} · Changelog`]);
    if (names.includes('Imprint')) {
        expect(names[0]).toBe('Imprint');
    }
});

test('the settings panel fits a phone without scrolling sideways', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await openApp(page);
    await openSettings(page);
    for (const name of ['View', 'Animation', 'Screen capture', 'Advanced']) {
        await openSection(page, name);
    }
    const body = panel(page).locator('.settings-body');
    expect(await body.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('controls the browser draws follow the app theme, not the system (v0.8.1)', async ({ page }) => {
    // A dark system with the app switched to light: checkboxes, number fields and
    // scrollbars must be light.
    await page.emulateMedia({ colorScheme: 'dark' });
    await openApp(page);
    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(page.locator('body')).toHaveClass(/\blight\b/);
    await openSettings(page);
    await expect(field(page, 'Configuration')).toHaveCSS('color-scheme', 'light');
    await expect(field(page, 'Discrete')).toHaveCSS('background-color', 'rgb(46, 46, 46)');
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(field(page, 'Configuration')).toHaveCSS('color-scheme', 'dark');
});
