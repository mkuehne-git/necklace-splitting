import { expect, test, type Page } from '@playwright/test';
import { field, openApp, openSection, openSettings, sphere, withStoredState } from '../e2e/app';

// The README screenshots, see playwright.screenshots.config.ts.
const DESKTOP = { width: 1366, height: 632 };
const PHONE = { width: 390, height: 844 };
const IMAGES = 'docs/images';

/** Looks at the octants 010 and 101 from (1, -1, 1), where the solutions of the default necklace are. */
function solutionsCamera(distance: number) {
    const d = distance / Math.sqrt(3);
    return { position: [d, -d, d], target: [0, 0, 0], up: [0, 1, 0] };
}

async function shoot(page: Page, name: string): Promise<void> {
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${IMAGES}/${name}.png` });
}

/**
 * Points at a solution of the necklace: the leftmost blue marker, found in the
 * sphere's canvas (which keeps its drawing buffer for screen captures).
 */
async function pointAtSolution(page: Page): Promise<void> {
    await page.mouse.move(1, 1);
    await page.waitForTimeout(800);
    const spot = await sphere(page).evaluate((canvas: HTMLCanvasElement) => {
        const copy = document.createElement('canvas');
        copy.width = canvas.width;
        copy.height = canvas.height;
        const context = copy.getContext('2d')!;
        context.drawImage(canvas, 0, 0);
        const { data } = context.getImageData(0, 0, copy.width, copy.height);
        const blue: [number, number][] = [];
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 2] > 180 && data[i] < 90 && data[i + 1] < 90) {
                blue.push([(i / 4) % copy.width, Math.floor(i / 4 / copy.width)]);
            }
        }
        // Only the marker around the leftmost blue pixel: the centre of all of them could lie between two solutions.
        const [left] = [...blue].sort((a, b) => a[0] - b[0]);
        const marker = left ? blue.filter(([x, y]) => Math.hypot(x - left[0], y - left[1]) < 30) : [];
        const count = marker.length;
        const sumX = marker.reduce((sum, [x]) => sum + x, 0);
        const sumY = marker.reduce((sum, [, y]) => sum + y, 0);
        const scale = canvas.getBoundingClientRect().width / canvas.width;
        return count === 0 ? undefined : { x: (sumX / count) * scale, y: (sumY / count) * scale };
    });
    expect(spot, 'a solution marker on the sphere').toBeDefined();
    const box = (await sphere(page).boundingBox())!;
    await page.mouse.move(box.x + spot!.x, box.y + spot!.y, { steps: 5 });
}

test('the sphere with the cut at a solution', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await withStoredState(page, { camera: solutionsCamera(32) });
    await openApp(page);
    await pointAtSolution(page);
    await shoot(page, 'necklace');
});

test('the solutions and the Necklace settings', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await withStoredState(page, { camera: solutionsCamera(32) });
    await openApp(page);
    await openSettings(page);
    await pointAtSolution(page);
    await shoot(page, 'necklace-with-solution');
});

test('the octants pulled apart', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await withStoredState(page, {
        camera: { position: [32, -10, 34], target: [0, 0, 0], up: [0, 1, 0] },
        settings: { 'sphere.offset_octant': 1.6, 'view.show_single_thiefs_region': false },
    });
    await openApp(page);
    await openSettings(page);
    await page.locator('#settings-panel summary', { hasText: 'Necklace' }).click();
    await openSection(page, 'View');
    await expect(field(page, 'Undivided octants')).not.toBeChecked();
    await page.mouse.move(1, 1);
    await shoot(page, 'necklace-octants');
});

test('the app and its settings on a phone', async ({ page }) => {
    await page.setViewportSize(PHONE);
    // The default distance: a phone is narrow, closer would crop the sphere.
    await withStoredState(page, { camera: solutionsCamera(50) });
    await openApp(page);
    await pointAtSolution(page);
    await shoot(page, 'necklace-phone');
    await openSettings(page);
    await shoot(page, 'necklace-phone-settings');
});
