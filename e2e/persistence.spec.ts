import { expect, test, type Page } from '@playwright/test';
import { expectChanged, field, necklace, openApp, openSettings, panelButton, pixels, sphere } from './app';

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
    await panelButton(page, 'Space Colors').click();
    await field(page, 'Jewels').fill('12');
    await field(page, 'Discrete').uncheck();
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('body')).toHaveClass(/\bdark\b/);
    await saved(page);

    await page.reload();
    await openApp(page);
    await expect(page.locator('body')).toHaveClass(/\bdark\b/);
    await openSettings(page);
    await expect(panelButton(page, 'Space Colors')).toHaveAttribute('aria-pressed', 'true');
    await expect(field(page, 'Jewels')).toHaveValue('12');
    await expect(field(page, 'Discrete')).not.toBeChecked();
});

test('a necklace entered as text is rebuilt from the text after a reload', async ({ page }) => {
    await openApp(page);
    const before = await pixels(necklace(page));
    await openSettings(page);
    const text = field(page, 'Text');
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
    await field(page, 'Jewels').fill('12');
    await saved(page);

    // Restore defaults asks first.
    page.once('dialog', (dialog) => dialog.accept());
    await panelButton(page, 'Restore defaults').click();
    await page.waitForEvent('load');
    await openApp(page);
    await openSettings(page);
    await expect(field(page, 'Jewels')).toHaveValue('24');
    expect(await page.evaluate(() => localStorage.getItem('necklace-splitting.state'))).toBeNull();
});

test('Restore defaults keeps the settings when not confirmed', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await field(page, 'Jewels').fill('12');
    await saved(page);
    page.once('dialog', (dialog) => dialog.dismiss());
    await panelButton(page, 'Restore defaults').click();
    await expect(field(page, 'Jewels')).toHaveValue('12');
    expect(await page.evaluate(() => localStorage.getItem('necklace-splitting.state'))).not.toBeNull();
});
