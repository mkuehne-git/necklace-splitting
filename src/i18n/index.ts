import { persistentState } from '../settings/PersistentState';
import { de } from './de';
import { en } from './en';

/**
 * The user-visible text of the app. Strings come from a message catalog per
 * language, numbers are formatted for the language here, so no module builds
 * them itself. New UI text goes into the catalogs, not into the modules. The
 * language is chosen once at startup; the Language setting reloads the app.
 */

export type MessageKey = keyof typeof en.messages;

/** A language: every message of the English catalog, translated. */
export type Catalog = {
    locale: string,
    messages: Record<MessageKey, string>,
};

type Params = Record<string, string | number>;

export const LANGUAGES = ['en', 'de'] as const;
export type Language = typeof LANGUAGES[number];

const CATALOGS: Record<Language, Catalog> = { en, de };

/** Each language's name in that language, for the Language setting. */
export const LANGUAGE_NAMES: Record<Language, string> = { en: 'English', de: 'Deutsch' };

/**
 * The language to show: the chosen one, or else the first of the browser's
 * languages the app has (only the primary tag counts: "de-AT" is German),
 * or else English.
 */
export function resolveLanguage(chosen: Language | undefined, browserLanguages: readonly string[]): Language {
    if (chosen !== undefined) {
        return chosen;
    }
    for (const tag of browserLanguages) {
        const primary = tag.toLowerCase().split('-')[0];
        if ((LANGUAGES as readonly string[]).includes(primary)) {
            return primary as Language;
        }
    }
    return 'en';
}

function browserLanguages(): readonly string[] {
    return typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language];
}

let current: Language = 'en';
let catalog: Catalog = en;

/** Switches the text to `language`; the app only does this at startup (see {@link resolveLanguage}), tests pin English. */
export function setLanguage(language: Language): void {
    current = language;
    catalog = CATALOGS[language];
    if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
    }
}

export function language(): Language {
    return current;
}

setLanguage(resolveLanguage(persistentState.state.language, browserLanguages()));

/** The message `key`, with its `{name}` parameters filled in. */
export function t(key: MessageKey, params: Params = {}): string {
    return catalog.messages[key].replace(/\{(\w+)\}/g, (match, name: string) => name in params ? String(params[name]) : match);
}

/** A number with a fixed number of decimals, e.g. "0.25" in English. */
export function formatNumber(value: number, decimals = 0): string {
    return new Intl.NumberFormat(catalog.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
