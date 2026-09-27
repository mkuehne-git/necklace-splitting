import { expect, test, type Page } from '@playwright/test';
import { NEWEST_NEWS_VERSION, openApp } from './app';

const overlay = (page: Page) => page.locator('.overlay-page.changelog');

/** A state as an earlier visit left it. */
async function lastUsed(page: Page, state: object): Promise<void> {
    await page.addInitScript((value) => {
        // Only before the first load: a reload must see what the app stored.
        if (sessionStorage.getItem('seeded') === null) {
            sessionStorage.setItem('seeded', '1');
            localStorage.setItem('necklace-splitting.state', value);
        }
    }, JSON.stringify({ version: 1, ...state }));
}

test('What\'s new shows the news since the last used version, once', async ({ page }) => {
    await lastUsed(page, { lastSeenVersion: '0.8.0' });
    const errors = await openApp(page);
    await expect(overlay(page).locator('h1')).toHaveText("What's new");
    await expect(overlay(page).locator('h2').first()).toContainText(`v${NEWEST_NEWS_VERSION}`);
    await expect(overlay(page).locator('h2', { hasText: 'v0.8.0' })).toHaveCount(0);
    await overlay(page).locator('div.overlay-close').click();
    await expect(overlay(page)).toHaveCount(0);

    await page.reload();
    await openApp(page);
    await page.waitForTimeout(500);
    await expect(overlay(page)).toHaveCount(0);
    expect(errors).toEqual([]);
});

test('What\'s new shows the news since v0.4.13 to users of the versions before it', async ({ page }) => {
    await lastUsed(page, { theme: 'dark' });
    await openApp(page);
    await expect(overlay(page).locator('h1')).toHaveText("What's new");
    await expect(overlay(page).locator('h2', { hasText: 'v0.8.0' })).toHaveCount(1);
    await expect(overlay(page).locator('h2', { hasText: 'v0.4.13' })).toHaveCount(0);
});

test('What\'s new leads to the full changelog and closes with Escape', async ({ page }) => {
    await lastUsed(page, { lastSeenVersion: '0.8.0' });
    await openApp(page);
    await overlay(page).getByRole('button', { name: 'Full changelog' }).click();
    await expect(overlay(page).locator('h1')).toHaveText('Changelog');
    await expect(overlay(page).locator('h2', { hasText: 'v0.1.0' })).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(overlay(page)).toHaveCount(0);
});

test('a new visitor sees no What\'s new', async ({ page }) => {
    await openApp(page);
    await page.waitForTimeout(500);
    await expect(overlay(page)).toHaveCount(0);
});
