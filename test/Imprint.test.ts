// @vitest-environment happy-dom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// The real imprint text is private (and gitignored); html2canvas needs a real browser.
vi.mock('../src/imprint-gen', () => ({ decryptedAES: () => '<h1>Impressum</h1>' }));
const html2canvas = vi.hoisted(() => vi.fn());
vi.mock('html2canvas', () => ({ default: html2canvas }));

import { Imprint } from '../src/imprint/Imprint';
import { Events } from '../src/Enums';

let imprint: Imprint;
/** Resolves the pending html2canvas render(s), as if rendering finished. */
let finishRendering: () => void;

beforeAll(async () => {
    imprint = new Imprint();
    await imprint.isAvailable();
});

beforeEach(() => {
    const pending: ((canvas: HTMLCanvasElement) => void)[] = [];
    html2canvas.mockReset();
    html2canvas.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    finishRendering = () => pending.splice(0).forEach((resolve) => resolve(document.createElement('canvas')));
});

afterEach(() => {
    imprint.hide();
    vi.useRealTimers();
});

const overlay = () => document.querySelector('.imprint');
const closeButton = () => document.querySelector<HTMLElement>('.imprint div.overlay-close');

describe('Imprint', () => {
    it('shows the close button right away, before rendering finishes (v0.5.1)', async () => {
        imprint.show();
        expect(overlay()).not.toBeNull();
        expect(closeButton()).not.toBeNull();
        // html2canvas is loaded on first use.
        await vi.dynamicImportSettled();
        expect(html2canvas).toHaveBeenCalledOnce();
        expect(closeButton()).not.toBeNull();
    });

    it('keeps the close button once rendered, next to the canvas and trailer', async () => {
        imprint.show();
        await vi.dynamicImportSettled();
        finishRendering();
        await vi.waitFor(() => expect(overlay()!.querySelector('canvas')).not.toBeNull());
        expect(closeButton()).not.toBeNull();
        expect(overlay()!.textContent).toContain('impressum-generator.de');
    });

    it('keeps the close button when rendering fails', async () => {
        html2canvas.mockImplementation(() => Promise.reject(new Error('no canvas')));
        imprint.show();
        await vi.waitFor(() => expect(overlay()!.textContent).toContain('impressum-generator.de'));
        expect(overlay()!.textContent).toContain('Impressum');
        expect(closeButton()).not.toBeNull();
    });

    it('closes on the close button click itself, without waiting for its animation', () => {
        imprint.show();
        closeButton()!.click();
        expect(overlay()).toBeNull();
    });

    it('stays closed when closed while a resize redraw is pending', async () => {
        vi.useFakeTimers();
        imprint.show();
        await vi.dynamicImportSettled();
        window.dispatchEvent(new Event('resize'));
        closeButton()!.click();
        vi.advanceTimersByTime(250);
        await vi.dynamicImportSettled();
        expect(overlay()).toBeNull();
        expect(html2canvas).toHaveBeenCalledOnce();
    });

    it('ignores other keys', () => {
        imprint.show();
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(overlay()).not.toBeNull();
    });

    it('closes with Escape', () => {
        imprint.show();
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(overlay()).toBeNull();
    });

    it('closes with Escape while the settings panel has the focus (v0.4.25)', () => {
        // lil-gui stops key events inside its panel from bubbling, and its Imprint
        // button keeps the focus after opening the imprint.
        imprint.show();
        const gui = document.createElement('div');
        gui.addEventListener('keydown', (event) => event.stopPropagation());
        const button = document.createElement('button');
        gui.appendChild(button);
        document.body.appendChild(gui);
        button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(overlay()).toBeNull();
        gui.remove();
    });

    it('opens and closes through the application events', () => {
        Events.dispatchEvent(Events.SHOW_IMPRINT);
        expect(overlay()).not.toBeNull();
        Events.dispatchEvent(Events.HIDE_IMPRINT);
        expect(overlay()).toBeNull();
    });

    it('redraws once after a burst of resize events (v0.5.1)', async () => {
        vi.useFakeTimers();
        imprint.show();
        await vi.dynamicImportSettled();
        for (let i = 0; i < 10; i++) {
            window.dispatchEvent(new Event('resize'));
            vi.advanceTimersByTime(30);
        }
        expect(html2canvas).toHaveBeenCalledOnce();
        vi.advanceTimersByTime(250);
        await vi.dynamicImportSettled();
        expect(html2canvas).toHaveBeenCalledTimes(2);
        expect(document.querySelectorAll('.imprint')).toHaveLength(1);
        expect(closeButton()).not.toBeNull();
    });

    it('does not redraw on resize while closed', () => {
        vi.useFakeTimers();
        window.dispatchEvent(new Event('resize'));
        vi.advanceTimersByTime(250);
        expect(html2canvas).not.toHaveBeenCalled();
        expect(overlay()).toBeNull();
    });
});
