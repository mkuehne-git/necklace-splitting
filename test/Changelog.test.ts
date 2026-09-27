// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../CHANGELOG.md?raw', () => ({
    default: '# Changelog\n\n## v1.0.0 · 2026-10-01\n\n* New.\n\n## v0.9.0 · 2026-09-01 · [abc1234](https://github.com/x/y/commit/abc1234)\n\n* Old.\n',
}));

import { Changelog } from '../src/changelog/Changelog';
import { Events } from '../src/Enums';

const changelog = new Changelog();
const overlay = () => document.querySelector('.overlay-page.changelog');
const closeButton = () => document.querySelector<HTMLElement>('.changelog div.overlay-close');

afterEach(() => changelog.hide());

describe('Changelog', () => {
    it('shows every entry with its date and commit', async () => {
        await changelog.show();
        expect(overlay()!.querySelectorAll('h2')).toHaveLength(2);
        expect(overlay()!.textContent).toContain('v0.9.0 2026-09-01 · abc1234');
        expect(overlay()!.querySelector('a[href$="/commit/abc1234"]')).not.toBeNull();
    });

    it('closes on the close button click', async () => {
        await changelog.show();
        closeButton()!.click();
        expect(overlay()).toBeNull();
    });

    it('closes with Escape', async () => {
        await changelog.show();
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(overlay()).toBeNull();
    });

    it('opens and closes through the application events', async () => {
        Events.dispatchEvent(Events.SHOW_CHANGELOG);
        await vi.waitFor(() => expect(overlay()).not.toBeNull());
        Events.dispatchEvent(Events.HIDE_CHANGELOG);
        expect(overlay()).toBeNull();
    });

    it('opens only once when shown twice', async () => {
        await Promise.all([changelog.show(), changelog.show()]);
        expect(document.querySelectorAll('.changelog')).toHaveLength(1);
    });
});
