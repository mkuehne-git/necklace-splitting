import { expect, test, type Page } from '@playwright/test';
import { APP_VERSION, expectChanged, field, morphBackButton, morphPauseButton, morphPlayButton, morphSlider, morphed, necklace, openApp, openSection, openSettings, panel, panelButton, pixels, pointButton, shapeButton, sphere, withStoredState } from './app';

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

test('the pointer over the settings panel does not move the cut on the sphere behind it', async ({ page }) => {
    // Close enough that the sphere reaches behind the panel on the right.
    await withStoredState(page, { camera: { position: [0, 0, 22], target: [0, 0, 0], up: [0, 1, 0] } });
    await openApp(page);
    await openSettings(page);
    const box = (await panel(page).boundingBox())!;
    await page.mouse.move(box.x - 60, box.y + box.height * 0.45);
    // The cut there is applied with the next frame.
    await page.waitForTimeout(300);
    const before = await pixels(necklace(page));
    // Straight into the panel, then only within it.
    await page.mouse.move(box.x + 60, box.y + box.height * 0.55);
    await page.mouse.move(box.x + 120, box.y + box.height * 0.6, { steps: 5 });
    await page.waitForTimeout(300);
    expect(await pixels(necklace(page))).toEqual(before);
});

test('hovering the Borsuk-Ulam shape marks the point there', async ({ page }) => {
    // The shape is the octants' morph target, so the raycaster hits the shape, not the sphere.
    // The necklace is hidden with the shape; the pointer still sets the cut.
    await withStoredState(page, { settings: { 'sphere.show_borsuk_ulam_proof_shape': true } });
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + 5, box.y + 5);
    await expect(sphere(page)).toHaveCSS('cursor', 'auto');
    await page.mouse.move(box.x + box.width * 0.48, box.y + box.height * 0.48);
    await expect(sphere(page)).toHaveCSS('cursor', 'none');
});

test('the Borsuk-Ulam button morphs the sphere into the shape, hides the necklace, and is remembered', async ({ page }) => {
    await openApp(page);
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(morphSlider(page)).toBeHidden();
    const sphereBefore = await pixels(sphere(page));
    const necklaceBefore = await pixels(necklace(page));
    await shapeButton(page).click();
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(morphSlider(page)).toBeVisible();
    await morphed(page);
    await expect(morphSlider(page)).toHaveValue('1');
    await expectChanged(sphere(page), sphereBefore);
    await expectChanged(necklace(page), necklaceBefore);
    const hidden = await pixels(necklace(page));
    await page.reload();
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(morphSlider(page)).toHaveValue('1');
    // Another scene restores the sphere at once: the necklace shows again.
    await pointButton(page).click();
    await expect(pointButton(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(morphSlider(page)).toBeHidden();
    await expectChanged(necklace(page), hidden);
});

// The morph runs on animation frames and performance.now(): these tests stop the
// clock (install alone keeps it running in real time) and move it by hand, so that
// a slow machine cannot finish the morph before the test pauses it.

/**
 * Stops the page's clock: from now on only page.clock.runFor moves it. The
 * tests using it are slow: runFor plays every animation frame, and each one
 * draws the morphing sphere (on GitHub, runFor(1100) takes about 10 s).
 */
async function stopClock(page: Page): Promise<void> {
    // pauseAt needs a moment still ahead; on a slow machine the page's time can
    // pass it before the call arrives, so try again a little further ahead.
    for (let margin = 50; ; margin *= 4) {
        try {
            await page.clock.pauseAt(await page.evaluate(() => Date.now()) + margin);
            return;
        } catch (error) {
            if (margin > 5000 || !String(error).includes('past')) {
                throw error;
            }
        }
    }
}

test('the player buttons play the morph either way, pause it and go on', async ({ page }) => {
    test.slow();
    await page.clock.install();
    await withStoredState(page, { settings: { 'sphere.show_borsuk_ulam_proof_shape': true } });
    await openApp(page);
    await page.clock.runFor(1100);
    await stopClock(page);
    // At the shape: only the way back plays.
    await expect(morphPlayButton(page)).toBeDisabled();
    await expect(morphBackButton(page)).toBeEnabled();
    await morphBackButton(page).click();
    await page.clock.runFor(400);
    await morphPauseButton(page).click();
    const paused = Number(await morphSlider(page).inputValue());
    expect(paused).toBeGreaterThan(0);
    expect(paused).toBeLessThan(1);
    await page.clock.runFor(500);
    expect(Number(await morphSlider(page).inputValue())).toBe(paused);
    // Both ways play from the middle; the way back goes on to the sphere.
    await expect(morphPlayButton(page)).toBeEnabled();
    await morphBackButton(page).click();
    await page.clock.runFor(1100);
    await expect(morphSlider(page)).toHaveValue('0');
    await expect(morphBackButton(page)).toBeDisabled();
    // Still in the scene, at the sphere: play into the shape again.
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'true');
    await morphPlayButton(page).click();
    await page.clock.runFor(1100);
    await expect(morphSlider(page)).toHaveValue('1');
    await expect(morphPlayButton(page)).toBeDisabled();
});

test('entering the Borsuk-Ulam scene plays the morph, which can be paused', async ({ page }) => {
    test.slow();
    await page.clock.install();
    await openApp(page);
    await stopClock(page);
    await shapeButton(page).click();
    await page.clock.runFor(300);
    await morphPauseButton(page).click();
    const paused = Number(await morphSlider(page).inputValue());
    expect(paused).toBeGreaterThan(0);
    expect(paused).toBeLessThan(1);
    await expect(morphPlayButton(page)).toBeEnabled();
    await morphPlayButton(page).click();
    await page.clock.runFor(1100);
    await expect(morphSlider(page)).toHaveValue('1');
});

test('the morph slider moves between sphere and shape', async ({ page }) => {
    await withStoredState(page, { settings: { 'sphere.show_borsuk_ulam_proof_shape': true } });
    await openApp(page);
    const shape = await pixels(sphere(page));
    await morphSlider(page).fill('0.5');
    await expectChanged(sphere(page), shape);
});

test('a text too long for the necklace is cut short, and the sphere is still drawn', async ({ page }) => {
    // Every jewel is a uniform of the shader: 700 characters (4900 jewels) broke it, even after a reload.
    await withStoredState(page, { necklaceSource: 'string', settings: { 'necklace.string': 'x'.repeat(700) } });
    const errors = await openApp(page);
    await openSettings(page);
    await expect(panel(page).getByText('Only the first 27 characters fit on the necklace.')).toBeVisible();
    // The sphere is there: hovering it marks a cut on the necklace.
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + 5, box.y + 5);
    const before = await pixels(necklace(page));
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.45);
    await expectChanged(necklace(page), before);
    expect(errors).toEqual([]);
    // A short text needs no note.
    await field(page, 'Text').fill('Hi');
    await field(page, 'Text').press('Enter');
    await expect(panel(page).getByText('characters fit on the necklace')).toBeHidden();
});

test('an ⓘ button behind a setting explains it in a call-out', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    const about = panel(page).getByRole('button', { name: 'About Discrete' });
    const callout = panel(page).getByText('Cuts fall only between jewels.');
    await expect(callout).toBeHidden();
    await about.click();
    await expect(callout).toBeVisible();
    await expect(about).toHaveAttribute('aria-expanded', 'true');
    // Another one closes it.
    await panel(page).getByRole('button', { name: 'About Epsilon' }).click();
    await expect(callout).toBeHidden();
    await expect(panel(page).getByText('How far from exactly half')).toBeVisible();
});

test('the solution band shows for a necklace of one kind of jewel too', async ({ page }) => {
    // Configuration 0: every jewel of the first kind. The band is about lengths, so it is still there.
    await withStoredState(page, { settings: { 'necklace.configuration': 0 } });
    await openApp(page);
    await openSettings(page);
    await openSection(page, 'Necklace');
    const withBand = await pixels(sphere(page));
    await field(page, 'Solution band').uncheck();
    await expectChanged(sphere(page), withBand);
});

test('the sphere comes back after the browser took the GPU away', async ({ page }) => {
    await openApp(page);
    const before = await pixels(sphere(page));
    // What a phone short of memory does: the WebGL context is lost, and later restored.
    await sphere(page).evaluate((canvas: HTMLCanvasElement) => {
        (window as unknown as { loseContext: WEBGL_lose_context }).loseContext = canvas.getContext('webgl2')!.getExtension('WEBGL_lose_context')!;
        (window as unknown as { loseContext: WEBGL_lose_context }).loseContext.loseContext();
    });
    await expect(page.locator('#pwa-status')).toHaveText('The 3D view was interrupted. It returns as soon as the browser allows.');
    await page.evaluate(() => (window as unknown as { loseContext: WEBGL_lose_context }).loseContext.restoreContext());
    // Drawn again without anything else happening, and the message is gone.
    await expect(page.locator('#pwa-status')).toHaveCount(0);
    await expect.poll(() => pixels(sphere(page))).toEqual(before);
});

test('Lighting shades the sphere with Always, and only the shape by default', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await openSection(page, 'View');
    await expect(panelButton(page, 'Shape')).toHaveAttribute('aria-pressed', 'true');
    const unlit = await pixels(sphere(page));
    await panelButton(page, 'Always').click();
    await expectChanged(sphere(page), unlit);
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

test('the theme follows the system until one is chosen', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openApp(page);
    const body = page.locator('body');
    await expect(body).toHaveClass(/\blight\b/);
    // The sphere's background follows from the start (a corner of its canvas, where the sphere is not).
    const corner = () => sphere(page).evaluate((canvas: HTMLCanvasElement) => {
        const copy = document.createElement('canvas');
        copy.width = canvas.width;
        copy.height = canvas.height;
        const context = copy.getContext('2d')!;
        context.drawImage(canvas, 0, 0);
        return [...context.getImageData(2, canvas.height - 3, 1, 1).data.slice(0, 3)];
    });
    await expect.poll(corner).toEqual([255, 255, 255]);
    // The system changes while the app runs: the app follows.
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(body).toHaveClass(/\bdark\b/);
    await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
    // Chosen with the button: from now on the choice counts.
    await page.locator('.toggle-div.themes').click();
    await expect(body).toHaveClass(/\blight\b/);
    await page.emulateMedia({ colorScheme: 'light' });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(300);
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
