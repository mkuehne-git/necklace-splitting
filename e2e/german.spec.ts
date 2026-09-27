import { expect, test, type Page } from '@playwright/test';
import { APP_VERSION, openSection, panel } from './app';

// A browser set to German, with this version's news already seen.
test.use({ locale: 'de-DE' });

const languageSelect = (page: Page) => page.locator('#settings-language');

async function openGerman(page: Page): Promise<string[]> {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    // Seeded once per page: a reload must see what the app stored (the chosen language).
    await page.addInitScript((value) => {
        if (sessionStorage.getItem('seeded') === null) {
            sessionStorage.setItem('seeded', '1');
            localStorage.setItem('necklace-splitting.state', value);
        }
    }, JSON.stringify({ version: 1, lastSeenVersion: APP_VERSION }));
    await page.goto('./');
    await expect(page.locator('canvas#sphere')).toBeVisible();
    return errors;
}

async function openSettingsGerman(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Einstellungen öffnen' }).click();
    await expect(panel(page)).toBeVisible();
}

test('a German browser gets the app in German', async ({ page }) => {
    const errors = await openGerman(page);
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('de');
    await expect(page.getByRole('button', { name: 'Zum dunklen Design wechseln' }).or(page.getByRole('button', { name: 'Zum hellen Design wechseln' }))).toBeVisible();
    await expect(page.locator('#version-info')).toHaveAttribute('title', 'Änderungen anzeigen');

    await openSettingsGerman(page);
    await expect(panel(page).getByRole('heading', { name: 'Einstellungen' })).toBeVisible();
    await expect(panel(page).locator('summary', { hasText: 'Halskette' })).toBeVisible();
    await expect(panel(page).getByLabel('Lösungsband', { exact: true })).toBeChecked();
    await expect(panel(page).getByRole('button', { name: 'Standardwerte wiederherstellen' })).toBeVisible();
    // German numbers: a decimal comma.
    await expect(panel(page).locator('output', { hasText: '0,010' })).toBeVisible();
    await expect(languageSelect(page)).toHaveValue('auto');
    await expect(panel(page).getByLabel('Sprache')).toBeVisible();
    expect(errors).toEqual([]);
});

test('the explanation is German and names settings that exist', async ({ page }) => {
    await openGerman(page);
    await page.getByRole('button', { name: 'Über diese App' }).click();
    const info = page.locator('.overlay-page.info');
    await expect(info.locator('h2').first()).toHaveText('Die Kugel');
    const references = await info.locator('em', { hasText: '›' }).allTextContents();
    expect(references.length).toBeGreaterThan(3);
    await page.keyboard.press('Escape');
    await openSettingsGerman(page);
    for (const reference of references) {
        const [section, label] = reference.split(' › ');
        await openSection(page, section);
        const details = panel(page).locator('details', { has: page.locator(':scope > summary', { hasText: section }) });
        await expect(details.getByLabel(label, { exact: true }), reference).toHaveCount(1);
    }
});

test('the changelog says its entries are English', async ({ page }) => {
    await openGerman(page);
    await page.locator('#version-info').click();
    const changelog = page.locator('.overlay-page.changelog');
    await expect(changelog.locator('h1')).toHaveText('Änderungen');
    await expect(changelog.locator('.changelog-note')).toHaveText('Die Einträge gibt es nur auf Englisch.');
});

test('the Language setting switches to English and back to automatic', async ({ page }) => {
    await openGerman(page);
    await openSettingsGerman(page);
    await languageSelect(page).selectOption('en');
    await page.waitForEvent('load');
    await expect(page.locator('canvas#sphere')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('en');
    await page.getByRole('button', { name: 'Open settings' }).click();
    await expect(languageSelect(page)).toHaveValue('en');

    await languageSelect(page).selectOption('auto');
    await page.waitForEvent('load');
    await expect(page.locator('canvas#sphere')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('de');
});
