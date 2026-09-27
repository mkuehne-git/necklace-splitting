import { expect, test, type Page } from '@playwright/test';
import { control, expectChanged, gui, necklace, openApp, openFolder, openSettings, pixels, sphere } from './app';

// Settings, theme and camera are remembered in Local Storage (PersistentState.ts).

/** Points at a spot of the sphere, given as fractions of its canvas, so the necklace shows the cut there. */
async function cutAt(page: Page, x: number, y: number): Promise<void> {
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + box.width * x, box.y + box.height * y);
    await page.waitForTimeout(300);
}

/** Waits until the delayed write has happened. */
const saved = (page: Page) => expect.poll(() => page.evaluate(() => localStorage.getItem('necklace-splitting.state'))).not.toBeNull();

test('settings and theme survive a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openApp(page);
    await openSettings(page);
    await openFolder(page, /^Showcase:/);
    await control(page, /^Space Colors$/).locator('input').check();
    await openFolder(page, /^Necklace$/);
    const jewels = control(page, /^Jewels$/).locator('input');
    await jewels.fill('12');
    await jewels.press('Enter');
    await control(page, /^Discrete$/).locator('input').uncheck();
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('body')).toHaveClass(/\bdark\b/);
    await saved(page);

    await page.reload();
    await openApp(page);
    await expect(page.locator('body')).toHaveClass(/\bdark\b/);
    await openSettings(page);
    await expect(gui(page).locator('.title', { hasText: 'Showcase: Space Colors' })).toBeVisible();
    await openFolder(page, /^Necklace$/);
    await expect(control(page, /^Jewels$/).locator('input')).toHaveValue('12');
    await expect(control(page, /^Discrete$/).locator('input')).not.toBeChecked();
});

test('a necklace entered as text is rebuilt from the text after a reload', async ({ page }) => {
    await openApp(page);
    const before = await pixels(necklace(page));
    await openSettings(page);
    await openFolder(page, /^Necklace$/);
    const text = control(page, /^String$/).locator('input');
    await text.fill('AB');
    await text.press('Enter');
    await expectChanged(necklace(page), before);
    await saved(page);
    // The necklace canvas also shows the cut under the pointer: the same spot both times.
    await cutAt(page, 0.4, 0.45);
    const fromText = await pixels(necklace(page));

    await page.reload();
    await openApp(page);
    await cutAt(page, 0.4, 0.45);
    // The same necklace as before the reload, not the one of the configuration number.
    await expect.poll(async () => (await pixels(necklace(page))).equals(fromText)).toBe(true);
});

test('Restore defaults forgets the settings', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await openFolder(page, /^Necklace$/);
    const jewels = control(page, /^Jewels$/).locator('input');
    await jewels.fill('12');
    await jewels.press('Enter');
    await saved(page);

    await control(page, /^Restore defaults$/).locator('button').click();
    await page.waitForEvent('load');
    await openApp(page);
    await openSettings(page);
    await openFolder(page, /^Necklace$/);
    await expect(control(page, /^Jewels$/).locator('input')).toHaveValue('24');
    expect(await page.evaluate(() => localStorage.getItem('necklace-splitting.state'))).toBeNull();
});
