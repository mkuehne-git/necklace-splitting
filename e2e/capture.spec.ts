import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { control, openApp, openFolder, openSettings, sphere } from './app';

/** Captures the chosen element with the settings' capture button and returns the downloaded PNG. */
async function capture(page: Page, what: 'All' | 'Sphere' | 'Necklace'): Promise<Buffer> {
    await openSettings(page);
    await openFolder(page, /^Screen capture$/);
    await control(page, new RegExp(`^${what}$`)).locator('input').check();
    const download = page.waitForEvent('download');
    await control(page, /^Click or press/).locator('button').click();
    return readFileSync(await (await download).path());
}

/** The color of a pixel of a PNG, read in the page. */
async function pixel(page: Page, png: Buffer, x: number, y: number): Promise<number[]> {
    return page.evaluate(async ({ data, x, y }) => {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d')!;
        context.drawImage(image, 0, 0);
        return [...context.getImageData(Math.round(x * image.width), Math.round(y * image.height), 1, 1).data.slice(0, 3)];
    }, { data: png.toString('base64'), x, y });
}

test('a capture of the sphere contains the rendered sphere', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openApp(page);
    const box = (await sphere(page).boundingBox())!;
    // Leave the pointer out of the way, then let the view rest before capturing.
    await page.mouse.move(box.x + 5, box.y + 5);
    await page.waitForTimeout(1000);
    const png = await capture(page, 'Sphere');
    // Up and right of the center: on the sphere, away from the hover marker. It is
    // colored there (yellow in the default view), not the white page background.
    const [r, g, b] = await pixel(page, png, 0.55, 0.45);
    expect(r + g).toBeGreaterThan(300);
    expect(b).toBeLessThan(100);
});
