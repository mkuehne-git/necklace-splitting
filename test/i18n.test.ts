// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { formatNumber, language, resolveLanguage, setLanguage, t } from '../src/i18n';
import { de } from '../src/i18n/de';
import { en } from '../src/i18n/en';

afterEach(() => setLanguage('en'));

const parameters = (message: string) => [...message.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe('catalogs', () => {
    it('German has every English key, and no others', () => {
        expect(Object.keys(de.messages).sort()).toEqual(Object.keys(en.messages).sort());
    });

    it('German uses the same parameters as English', () => {
        for (const [key, message] of Object.entries(en.messages)) {
            expect(parameters(de.messages[key as keyof typeof en.messages]), key).toEqual(parameters(message));
        }
    });

    it('leaves no German text empty, except where English is empty on purpose', () => {
        for (const [key, message] of Object.entries(de.messages)) {
            // The changelog note tells German readers that the entries are English.
            expect(message.trim(), key).not.toBe('');
        }
        expect(en.messages['changelog.note']).toBe('');
    });

    it('writes parameters as {name}, without spaces or other characters', () => {
        for (const [key, message] of Object.entries(en.messages)) {
            expect(message, key).not.toMatch(/\{[^}]*[^\w}][^}]*\}/);
        }
    });
});

describe('t', () => {
    it('shows the message of the current language', () => {
        expect(t('settings.title')).toBe('Settings');
        setLanguage('de');
        expect(language()).toBe('de');
        expect(t('settings.title')).toBe('Einstellungen');
        expect(document.documentElement.lang).toBe('de');
    });
});

describe('resolveLanguage', () => {
    it('prefers the chosen language, then the browser\'s first known one, then English', () => {
        expect(resolveLanguage('en', ['de-DE'])).toBe('en');
        expect(resolveLanguage(undefined, ['de-AT', 'en'])).toBe('de');
        expect(resolveLanguage(undefined, ['fr-FR', 'de'])).toBe('de');
        expect(resolveLanguage(undefined, ['fr-FR'])).toBe('en');
        expect(resolveLanguage(undefined, [])).toBe('en');
    });
});

describe('formatNumber', () => {
    it('uses the language\'s decimal separator', () => {
        expect(formatNumber(0.25, 2)).toBe('0.25');
        setLanguage('de');
        expect(formatNumber(0.25, 2)).toBe('0,25');
        expect(formatNumber(0.1, 3)).toBe('0,100');
    });
});

describe('info pages', () => {
    const page = (name: string) => readFileSync(join(process.cwd(), 'src/i18n/info', name), 'utf8');
    const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0;

    it('have the same structure in English and German', () => {
        const english = page('info.html');
        const german = page('info.de.html');
        for (const pattern of [/<h2>/g, /<p>/g, /<li>/g, /<a /g, /›/g]) {
            expect(count(german, pattern), String(pattern)).toBe(count(english, pattern));
        }
    });
});
