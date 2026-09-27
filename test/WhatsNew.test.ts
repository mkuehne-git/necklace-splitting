// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../CHANGELOG.md?raw', () => ({
    default: [
        '# Changelog',
        '## v0.9.0 · 2026-10-02', '* What\'s new.',
        '## v0.8.1 · 2026-10-01 · [bbbbbbb](https://github.com/x/y/commit/bbbbbbb)', '* Tests. No functional change.',
        '## v0.8.0 · 2026-09-30 · [aaaaaaa](https://github.com/x/y/commit/aaaaaaa)', '* Changelog view.',
        '## v0.4.13 · 2026-09-26 · [133fc63](https://github.com/x/y/commit/133fc63)', '* Trackball.',
    ].join('\n'),
}));

import { Changelog } from '../src/changelog/Changelog';
import { PersistentState, STORAGE_KEY } from '../src/settings/PersistentState';
import { showWhatsNewOnce, versionSeenBefore, visitedBefore } from '../src/changelog/WhatsNew';

const changelog = new Changelog();
const overlay = () => document.querySelector('.overlay-page.changelog');
const headings = () => [...overlay()!.querySelectorAll('h2')].map((h) => h.textContent!.split(' ')[0]);

function stateWith(stored?: object): PersistentState {
    const map = new Map<string, string>(stored ? [[STORAGE_KEY, JSON.stringify({ version: 1, ...stored })]] : []);
    return new PersistentState({
        get length() { return map.size; },
        key: (index) => [...map.keys()][index] ?? null,
        getItem: (key) => map.get(key) ?? null,
        setItem: (key, value) => { map.set(key, String(value)); },
        removeItem: (key) => { map.delete(key); },
        clear: () => map.clear(),
    });
}

/** Starts showWhatsNewOnce and tells whether it is still waiting for the page to close. */
async function start(state: PersistentState): Promise<{ done: Promise<void>, waiting: () => boolean }> {
    let finished = false;
    const done = showWhatsNewOnce(changelog, state, '0.9.0').then(() => { finished = true; });
    await new Promise((resolve) => setTimeout(resolve, 0));
    return { done, waiting: () => !finished };
}

afterEach(() => changelog.hide());

describe('versionSeenBefore', () => {
    it('is the stored version, the one before What\'s new for earlier users, and nothing for new visitors', () => {
        expect(versionSeenBefore('0.8.0', true)).toBe('0.8.0');
        expect(versionSeenBefore(undefined, true)).toBe('0.4.13');
        expect(versionSeenBefore(undefined, false)).toBeUndefined();
    });
});

describe('visitedBefore', () => {
    afterEach(() => { delete (navigator as unknown as Record<string, unknown>).serviceWorker; });
    const controlledBy = (controller: object | null) =>
        Object.defineProperty(navigator, 'serviceWorker', { configurable: true, value: { controller } });

    it('is true with stored state, or with a service worker already controlling the page', () => {
        expect(visitedBefore(stateWith({ theme: 'dark' }))).toBe(true);
        expect(visitedBefore(stateWith())).toBe(false);
        // Every deployed version installed a service worker; it controls the page on a later visit.
        controlledBy({});
        expect(visitedBefore(stateWith())).toBe(true);
        controlledBy(null);
        expect(visitedBefore(stateWith())).toBe(false);
    });

    it('shows the news since v0.4.13 to a visitor of the old app without stored state', async () => {
        controlledBy({});
        await start(stateWith());
        await vi.waitFor(() => expect(headings()).toEqual(['v0.9.0', 'v0.8.0']));
    });
});

describe('showWhatsNewOnce', () => {
    it('shows the news since the last seen version, without non-functional ones, until closed', async () => {
        const state = stateWith({ lastSeenVersion: '0.4.13' });
        const { done, waiting } = await start(state);
        await vi.waitFor(() => expect(overlay()).not.toBeNull());
        expect(overlay()!.querySelector('h1')!.textContent).toBe("What's new");
        expect(headings()).toEqual(['v0.9.0', 'v0.8.0']);
        expect(waiting()).toBe(true);
        expect(state.state.lastSeenVersion).toBe('0.9.0');
        changelog.hide();
        await done;
    });

    it('shows the news to someone who used the app before What\'s new', async () => {
        await start(stateWith({ theme: 'dark' }));
        await vi.waitFor(() => expect(headings()).toEqual(['v0.9.0', 'v0.8.0']));
    });

    it('shows nothing to a new visitor, but remembers the version', async () => {
        const state = stateWith();
        const { done } = await start(state);
        await done;
        expect(overlay()).toBeNull();
        expect(state.state.lastSeenVersion).toBe('0.9.0');
    });

    it('shows nothing the second time', async () => {
        const { done } = await start(stateWith({ lastSeenVersion: '0.9.0' }));
        await done;
        expect(overlay()).toBeNull();
    });

    it('switches to the full changelog without counting as closed', async () => {
        const { done, waiting } = await start(stateWith({ lastSeenVersion: '0.8.0' }));
        await vi.waitFor(() => expect(overlay()).not.toBeNull());
        overlay()!.querySelector<HTMLElement>('.changelog-full')!.click();
        expect(overlay()!.querySelector('h1')!.textContent).toBe('Changelog');
        expect(headings()).toEqual(['v0.9.0', 'v0.8.1', 'v0.8.0', 'v0.4.13']);
        expect(waiting()).toBe(true);
        overlay()!.querySelector<HTMLElement>('div.overlay-close')!.click();
        await done;
    });
});
