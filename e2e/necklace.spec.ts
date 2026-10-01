import { expect, test, type Page } from '@playwright/test';
import { expectChanged, field, necklace, openApp, openSection, openSettings, pixels, shapeButton, sphere, withStoredState } from './app';

// The necklace's handles set the cuts in the view switcher's necklace mode
// (necklace/Necklace.ts). The canvas draws them; hidden sliders and buttons
// operate them from the keyboard and tell their state to screen readers.

const inputButton = (page: Page, name: 'Point at the sphere' | 'Cut the necklace') => page.getByRole('button', { name });
const cutSlider = (page: Page, name: 'First cut' | 'Second cut') => page.getByRole('slider', { name });

/** A slider's value as a number: browsers write it with differing digits. */
async function expectValue(page: Page, name: 'First cut' | 'Second cut', value: number): Promise<void> {
    await expect.poll(async () => Number(await cutSlider(page, name).inputValue())).toBeCloseTo(value, 9);
}

/** A point of the necklace canvas: x as a share of its width, y in px from its top. */
async function necklacePoint(page: Page, share: number, y: number): Promise<{ x: number, y: number }> {
    const box = (await necklace(page).boundingBox())!;
    return { x: box.x + box.width * share, y: box.y + y };
}

test('the necklace mode starts with handles at a third and two thirds, and is remembered', async ({ page }) => {
    await openApp(page);
    await expect(inputButton(page, 'Point at the sphere')).toHaveAttribute('aria-pressed', 'true');
    await expect(cutSlider(page, 'First cut')).toBeHidden();
    await inputButton(page, 'Cut the necklace').click();
    await expect(inputButton(page, 'Cut the necklace')).toHaveAttribute('aria-pressed', 'true');
    // The default necklace has 24 jewels; Discrete snaps the handles to the gaps between them.
    await expectValue(page, 'First cut', 8 / 24);
    await expectValue(page, 'Second cut', 16 / 24);
    await page.reload();
    await expect(inputButton(page, 'Cut the necklace')).toHaveAttribute('aria-pressed', 'true');
});

test('dragging a handle moves the cut on the necklace and on the sphere', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    await expectValue(page, 'First cut', 8 / 24);
    const necklaceBefore = await pixels(necklace(page));
    const sphereBefore = await pixels(sphere(page));
    const from = await necklacePoint(page, 1 / 3, 20);
    const to = await necklacePoint(page, 0.5, 20);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 8 });
    await page.mouse.up();
    await expectValue(page, 'First cut', 0.5);
    await expectChanged(necklace(page), necklaceBefore);
    await expectChanged(sphere(page), sphereBefore);
});

test('a handle dragged past the other takes its place', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    const from = await necklacePoint(page, 1 / 3, 20);
    const to = await necklacePoint(page, 0.875, 20);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 10 });
    await page.mouse.up();
    await expectValue(page, 'First cut', 16 / 24);
    await expectValue(page, 'Second cut', 0.875);
});

test('tapping a part gives it to the other thief', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    await expect(page.getByRole('button', { name: 'Part 1 goes to thief A' })).toBeAttached();
    const before = await pixels(necklace(page));
    const part = await necklacePoint(page, 0.1, 5);
    await page.mouse.click(part.x, part.y);
    await expect(page.getByRole('button', { name: 'Part 1 goes to thief B' })).toBeAttached();
    await expectChanged(necklace(page), before);
});

test('the keyboard moves the handles and gives parts away', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    await cutSlider(page, 'Second cut').focus();
    await page.keyboard.press('ArrowRight');
    await expectValue(page, 'Second cut', 17 / 24);
    // The first cut cannot pass the second one.
    await cutSlider(page, 'First cut').focus();
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press('ArrowRight');
    }
    await expectValue(page, 'First cut', 17 / 24);
    await page.getByRole('button', { name: 'Part 3 goes to thief A' }).press('Enter');
    await expect(page.getByRole('button', { name: 'Part 3 goes to thief B' })).toBeAttached();
});

test('a fair split made with the handles is announced', async ({ page }) => {
    // Four jewels: first kind, second, second, first (6, lowest bit first).
    await withStoredState(page, {
        settings: { 'view.input': 'Necklace', 'necklace.number_of_jewels': 4, 'necklace.configuration': 6 },
    });
    await openApp(page);
    const message = page.getByRole('status');
    await expect(message).toHaveText('');
    // Both cuts in the middle: the first two jewels and the last two, each one of either kind.
    await cutSlider(page, 'First cut').focus();
    await page.keyboard.press('ArrowRight');
    await cutSlider(page, 'Second cut').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(message).toHaveText('');
    // Both halves still go to thief A; giving the second half to thief B makes it fair.
    await page.getByRole('button', { name: 'Part 3 goes to thief A' }).press('Enter');
    await expect(message).toHaveText('Fair split!');
});

test('in the necklace mode the pointer on the sphere sets no cut', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + 5, box.y + 5);
    const before = await cutSlider(page, 'First cut').inputValue();
    await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.4);
    await page.waitForTimeout(300);
    await expect(cutSlider(page, 'First cut')).toHaveValue(before);
    await expect(sphere(page)).not.toHaveCSS('cursor', 'none');
});

test('the scenes are exclusive, and cutting the necklace leaves the Borsuk-Ulam shape at once', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace' } });
    await openApp(page);
    await shapeButton(page).click();
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(inputButton(page, 'Cut the necklace')).toHaveAttribute('aria-pressed', 'false');
    await expect(cutSlider(page, 'First cut')).toBeHidden();
    // Clicking the active scene again changes nothing.
    await shapeButton(page).click();
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'true');
    // Mid-morph, another scene restores the sphere without waiting.
    await inputButton(page, 'Cut the necklace').click();
    await expect(inputButton(page, 'Cut the necklace')).toHaveAttribute('aria-pressed', 'true');
    await expect(shapeButton(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByRole('slider', { name: 'From sphere to shape' })).toBeHidden();
    await expect(cutSlider(page, 'First cut')).toBeAttached();
});

test('the game hides the solutions for itself, without changing the settings', async ({ page }) => {
    await openApp(page);
    await openSettings(page);
    await openSection(page, 'Necklace');
    await expect(field(page, 'Solution band')).toBeChecked();
    await expect(field(page, 'Solutions')).toBeChecked();
    const shown = await pixels(sphere(page));
    await inputButton(page, 'Cut the necklace').click();
    await expect(field(page, 'Solution band')).not.toBeChecked();
    await expect(field(page, 'Solutions')).not.toBeChecked();
    await expectChanged(sphere(page), shown);
    const hidden = await pixels(sphere(page));
    // Shown again on request, for this game only.
    await field(page, 'Solution band').check();
    await expectChanged(sphere(page), hidden);
    // A new game hides them again; the remembered settings still show them.
    await page.reload();
    await openSettings(page);
    await openSection(page, 'Necklace');
    await expect(field(page, 'Solution band')).not.toBeChecked();
    await inputButton(page, 'Point at the sphere').click();
    await expect(field(page, 'Solution band')).toBeChecked();
    await expect(field(page, 'Solutions')).toBeChecked();
});

test('without Discrete, a cut splits the jewel it falls into between the rows', async ({ page }) => {
    await withStoredState(page, { settings: { 'view.input': 'Necklace', 'necklace.discrete': false } });
    await openApp(page);
    // From a third (a gap between jewels) into the middle of the ninth jewel of 24.
    await cutSlider(page, 'First cut').focus();
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
    }
    await expectValue(page, 'First cut', 0.36);
    // Does the jewel's piece on either side of the cut lie in the top row (thief A) or the bottom row (thief B)?
    const rows = await necklace(page).evaluate((canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d')!;
        const cut = 0.36 * canvas.width;
        // The necklace starts 6 px down; a row is 10 px high, the bottom row 30 px below the top one.
        const filled = (x: number, y: number) => context.getImageData(Math.round(x), y, 1, 1).data[3] > 0;
        return {
            before: { top: filled(cut - 3, 11), bottom: filled(cut - 3, 41) },
            after: { top: filled(cut + 3, 11), bottom: filled(cut + 3, 41) },
        };
    });
    // The first part goes to thief A, the second to thief B (the default thieves +, -, +).
    expect(rows).toEqual({ before: { top: true, bottom: false }, after: { top: false, bottom: true } });
});
