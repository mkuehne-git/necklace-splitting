import { en } from './en';

/**
 * The user-visible text of the app. Strings come from a message catalog per
 * language, numbers are formatted for the language here, so no module builds
 * them itself. New UI text goes into the catalogs, not into the modules.
 */

export type MessageKey = keyof typeof en.messages;

/** A language: every message of the English catalog, translated. */
export type Catalog = {
    locale: string,
    messages: Record<MessageKey, string>,
};

type Params = Record<string, string | number>;

export const LANGUAGES = ['en'] as const;
export type Language = typeof LANGUAGES[number];

const CATALOGS: Record<Language, Catalog> = { en };

let current: Language = 'en';
let catalog: Catalog = en;

/** Switches the text to `language`. */
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

/** The message `key`, with its `{name}` parameters filled in. */
export function t(key: MessageKey, params: Params = {}): string {
    return catalog.messages[key].replace(/\{(\w+)\}/g, (match, name: string) => name in params ? String(params[name]) : match);
}

/** A number with a fixed number of decimals, e.g. "0.25" in English. */
export function formatNumber(value: number, decimals = 0): string {
    return new Intl.NumberFormat(catalog.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
