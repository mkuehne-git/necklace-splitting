import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
    HEADING, compareVersions, isFunctionalChange, parseChangelog, renderEntry, renderInline, renderMarkdown, whatsNewEntries,
} from '../src/changelog/changelogFormat';

const changelogFile = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const packageVersion = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version as string;

describe('CHANGELOG.md', () => {
    const entries = parseChangelog(changelogFile);

    it('has an entry for every version heading', () => {
        const headings = changelogFile.split('\n').filter((line) => line.startsWith('## '));
        expect(headings.filter((line) => !HEADING.test(line))).toEqual([]);
        expect(entries).toHaveLength(headings.length);
    });

    it('starts with the version in package.json', () => {
        expect(entries[0].version).toBe(packageVersion);
    });

    it('lists the versions newest first, each once', () => {
        for (let i = 1; i < entries.length; i++) {
            expect(compareVersions(entries[i - 1].version, entries[i].version), entries[i].version).toBeGreaterThan(0);
        }
    });

    // v0.1.0 and v0.2.0 predate the repository: no date, no commit.
    const tracked = entries.filter((entry) => !['0.1.0', '0.2.0'].includes(entry.version));

    it('dates every entry, not later than the one above', () => {
        for (const [i, entry] of tracked.entries()) {
            expect(entry.date, entry.version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            if (i > 0) {
                expect(entry.date! <= tracked[i - 1].date!, entry.version).toBe(true);
            }
        }
    });

    it('names the commit of every entry but the newest (a commit cannot name its own hash)', () => {
        expect(tracked.slice(1).filter((entry) => entry.hash === undefined).map((entry) => entry.version)).toEqual([]);
    });
});

describe('parseChangelog', () => {
    it('reads version, date, hash and body; skips the title', () => {
        const entries = parseChangelog([
            '# Changelog', '',
            '## v1.0.0 · 2026-10-01', '', '* New.', '',
            '## v0.9.0 · 2026-09-01 · [abc1234](https://github.com/x/y/commit/abc1234)', '', '* Old.',
        ].join('\n'));
        expect(entries.map(({ version, date, hash }) => ({ version, date, hash }))).toEqual([
            { version: '1.0.0', date: '2026-10-01', hash: undefined },
            { version: '0.9.0', date: '2026-09-01', hash: 'abc1234' },
        ]);
        expect(entries[0].lines).toEqual(['', '* New.', '']);
    });

    it('reads a heading without date', () => {
        expect(parseChangelog('## v0.1.0\n* A')[0]).toEqual({ version: '0.1.0', date: undefined, hash: undefined, lines: ['* A'] });
    });
});

describe('isFunctionalChange', () => {
    it('is false for test, docs and refactor-only versions', () => {
        expect(isFunctionalChange({ version: '0.9.1', lines: ['* Add `TESTING.md`. No functional change.'] })).toBe(false);
        expect(isFunctionalChange({ version: '0.9.0', lines: ['* Add the year range slider.'] })).toBe(true);
    });
});

describe('compareVersions', () => {
    it('compares numerically, not as text', () => {
        expect(compareVersions('0.10.0', '0.9.9')).toBeGreaterThan(0);
        expect(compareVersions('0.9.9', '1.0.0')).toBeLessThan(0);
        expect(compareVersions('0.11.1', '0.11.1')).toBe(0);
    });
});

describe('renderEntry', () => {
    it('links the commit next to the date', () => {
        const html = renderEntry({ version: '0.11.1', date: '2026-09-26', hash: '133fc63', lines: ['* Fix.'] });
        expect(html).toContain('<h2>v0.11.1 <span class="changelog-meta">2026-09-26 · <a href="https://github.com/mkuehne-git/necklace-splitting/commit/133fc63"');
        expect(html).toContain('<li>Fix.</li>');
    });

    it('shows only the date while the commit is unknown', () => {
        expect(renderEntry({ version: '1.0.0', date: '2026-10-01', lines: [] })).toBe('<h2>v1.0.0 <span class="changelog-meta">2026-10-01</span></h2>\n');
    });
});

describe('renderMarkdown', () => {
    it('renders bullets, continuation lines and nested bullets', () => {
        expect(renderMarkdown(['* One', '  more', '  * Nested', '* Two'])).toBe('<ul><li>One more<ul><li>Nested</li></ul></li><li>Two</li></ul>');
    });

    it('renders subheadings and paragraphs', () => {
        expect(renderMarkdown(['### Main Features', '', 'Text', '', '* Item'])).toBe('<h3>Main Features</h3><p>Text</p><ul><li>Item</li></ul>');
    });

    it('renders the whole changelog with balanced lists', () => {
        const html = parseChangelog(changelogFile).map((entry) => renderMarkdown(entry.lines)).join('');
        expect(html.split('<ul>').length).toBe(html.split('</ul>').length);
        expect(html.split('<li>').length).toBe(html.split('</li>').length);
    });
});

describe('renderInline', () => {
    it('renders emphasis, code and links', () => {
        expect(renderInline('***View > Navigation*** and **Loop**, *once*')).toBe('<strong><em>View &gt; Navigation</em></strong> and <strong>Loop</strong>, <em>once</em>');
        expect(renderInline('run `npm test` now')).toBe('run <code>npm test</code> now');
        expect(renderInline('[NASA](https://data.giss.nasa.gov/)')).toBe('<a href="https://data.giss.nasa.gov/" target="_blank" rel="noopener">NASA</a>');
    });

    it('escapes HTML and leaves code spans unformatted', () => {
        expect(renderInline('<b>x</b> `a*b*c`')).toBe('&lt;b&gt;x&lt;/b&gt; <code>a*b*c</code>');
    });

    it('does not link other URL schemes', () => {
        expect(renderInline('[x](javascript:alert(1))')).not.toContain('<a');
    });
});

describe('whatsNewEntries', () => {
    const entry = (version: string, text = 'Change.') => ({ version, lines: [`* ${text}`] });
    const entries = [entry('1.0.1'), entry('1.0.0'), entry('0.13.0', 'Tests. No functional change.'), entry('0.12.0'), entry('0.11.1')];

    it('returns the versions after the one seen, up to the current one, without non-functional ones', () => {
        expect(whatsNewEntries(entries, '0.11.1', '1.0.0').map((e) => e.version)).toEqual(['1.0.0', '0.12.0']);
    });

    it('returns nothing when the current version was seen', () => {
        expect(whatsNewEntries(entries, '1.0.0', '1.0.0')).toEqual([]);
    });
});
