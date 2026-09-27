/**
 * Parsing and rendering of CHANGELOG.md for the changelog view. It covers the
 * Markdown the changelog uses - `##`/`###` headings, (nested) bullets,
 * paragraphs, emphasis, code spans and links - not Markdown in general.
 */

export const REPOSITORY_URL = 'https://github.com/mkuehne-git/necklace-splitting';

export type ChangelogEntry = {
    version: string,
    /** Commit date, `YYYY-MM-DD`. */
    date?: string,
    /** Short commit hash. The newest entry has none until the next release (or the build) adds it. */
    hash?: string,
    /** The entry's Markdown lines below its heading. */
    lines: string[],
};

/** `## v0.4.17 · 2026-09-27 · [491bd3c](https://github.com/.../commit/491bd3c)`, date and hash optional (v0.1.0 and v0.2.0 have neither). */
export const HEADING = /^## v(\d+\.\d+\.\d+)(?: · (\d{4}-\d{2}-\d{2}))?(?: · \[([0-9a-f]{7,40})\]\([^)\s]+\))?\s*$/;

export function commitUrl(hash: string): string {
    return `${REPOSITORY_URL}/commit/${hash}`;
}

/** The entries in file order, newest first. Text before the first entry (the title) is skipped. */
export function parseChangelog(markdown: string): ChangelogEntry[] {
    const entries: ChangelogEntry[] = [];
    for (const line of markdown.split(/\r?\n/)) {
        const heading = HEADING.exec(line);
        if (heading) {
            entries.push({ version: heading[1], date: heading[2], hash: heading[3], lines: [] });
        } else if (entries.length > 0) {
            entries[entries.length - 1].lines.push(line);
        }
    }
    return entries;
}

/** Test, docs and refactor-only versions say so; the What's new view leaves them out. */
export function isFunctionalChange(entry: ChangelogEntry): boolean {
    return !entry.lines.some((line) => line.includes('No functional change.'));
}

/** Compares `x.y.z` versions: negative if `a` is older than `b`, 0 if equal, positive if newer. */
export function compareVersions(a: string, b: string): number {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (diff !== 0) {
            return diff;
        }
    }
    return 0;
}

export function renderEntries(entries: ChangelogEntry[]): string {
    return entries.map(renderEntry).join('\n');
}

export function renderEntry(entry: ChangelogEntry): string {
    const meta: string[] = [];
    if (entry.date) {
        meta.push(entry.date);
    }
    if (entry.hash) {
        meta.push(`<a href="${commitUrl(entry.hash)}" target="_blank" rel="noopener">${entry.hash}</a>`);
    }
    const metaHtml = meta.length > 0 ? ` <span class="changelog-meta">${meta.join(' · ')}</span>` : '';
    return `<h2>v${entry.version}${metaHtml}</h2>\n${renderMarkdown(entry.lines)}`;
}

type Block =
    | { type: 'item', level: number, text: string }
    | { type: 'heading', text: string }
    | { type: 'paragraph', text: string };

/** Renders the block Markdown of an entry's body. */
export function renderMarkdown(lines: string[]): string {
    const blocks: Block[] = [];
    let open: Block | undefined;
    for (const line of lines) {
        const item = /^( *)[*-] +(.*)$/.exec(line);
        const heading = /^#{3,6} +(.*)$/.exec(line);
        if (line.trim() === '') {
            open = undefined;
        } else if (item) {
            open = { type: 'item', level: Math.floor(item[1].length / 2), text: item[2] };
            blocks.push(open);
        } else if (heading) {
            blocks.push({ type: 'heading', text: heading[1] });
            open = undefined;
        } else if (open) {
            // A continuation line of a bullet or paragraph.
            open.text += ' ' + line.trim();
        } else {
            open = { type: 'paragraph', text: line.trim() };
            blocks.push(open);
        }
    }

    const html: string[] = [];
    let depth = -1;
    const closeLists = (level: number) => {
        while (depth > level) {
            html.push('</li></ul>');
            depth--;
        }
    };
    for (const block of blocks) {
        if (block.type !== 'item') {
            closeLists(-1);
            html.push(block.type === 'heading' ? `<h3>${renderInline(block.text)}</h3>` : `<p>${renderInline(block.text)}</p>`);
            continue;
        }
        closeLists(block.level);
        if (depth === block.level) {
            html.push('</li>');
        }
        while (depth < block.level) {
            html.push('<ul>');
            depth++;
        }
        html.push(`<li>${renderInline(block.text)}`);
    }
    closeLists(-1);
    return html.join('');
}

function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Renders code spans, links and `*`/`**`/`***` emphasis; everything else is escaped. */
export function renderInline(text: string): string {
    const codeSpans: string[] = [];
    let html = escapeHtml(text).replace(/`([^`]+)`/g, (_, code: string) => {
        codeSpans.push(`<code>${code}</code>`);
        return `\u0000${codeSpans.length - 1}\u0000`;
    });
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, url: string) =>
        /^https?:\/\//.test(url) ? `<a href="${url}" target="_blank" rel="noopener">${label}</a>` : label);
    html = html
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    return html.replace(/\u0000(\d+)\u0000/g, (_, index: string) => codeSpans[Number(index)]);
}

/** The entries newer than `since`, up to `current`, without those marked "No functional change." */
export function whatsNewEntries(entries: ChangelogEntry[], since: string, current: string): ChangelogEntry[] {
    return entries.filter((entry) => compareVersions(entry.version, since) > 0
        && compareVersions(entry.version, current) <= 0
        && isFunctionalChange(entry));
}
