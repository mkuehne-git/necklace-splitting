/// <reference types="vitest/config" />
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import basicSsl from '@vitejs/plugin-basic-ssl';
import glsl from 'vite-plugin-glsl';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, type Plugin } from 'vite';

/**
 * A commit cannot name its own hash, so the newest CHANGELOG.md entry has a
 * date but no commit until the next release adds it. When that entry is the
 * version committed at HEAD, this adds HEAD's hash to the app's copy of the
 * changelog (`CHANGELOG.md?raw`), so a deployed build always shows it.
 */
function changelogCommit(): Plugin {
    const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return {
        name: 'changelog-commit',
        enforce: 'pre',
        load(id) {
            const [file, query] = id.split('?');
            if (query !== 'raw' || !file.endsWith('/CHANGELOG.md')) {
                return;
            }
            this.addWatchFile(file);
            let text = readFileSync(file, 'utf8');
            try {
                const version = JSON.parse(git('show', 'HEAD:package.json')).version as string;
                const hash = git('rev-parse', '--short=7', 'HEAD');
                const heading = new RegExp(`^## v${version.replace(/\./g, '\\.')} · \\d{4}-\\d{2}-\\d{2}$`, 'm');
                text = text.replace(heading, (line) => `${line} · [${hash}](https://github.com/mkuehne-git/necklace-splitting/commit/${hash})`);
            } catch {
                // No git (or no commit): the entry just shows its date.
            }
            return `export default ${JSON.stringify(text)};`;
        },
    };
}
const isProduction = process.env['NODE_ENV'] === 'production';
const base = isProduction ? '/necklace-splitting/' : '/';
// VITE_HTTPS=false (npm run dev:http) serves plain HTTP when the self-signed certificate is rejected.
const useHttps = process.env['VITE_HTTPS'] !== 'false';
export default defineConfig({
    base,
    plugins: [
        changelogCommit(),
        ...(useHttps ? [basicSsl()] : []),
        glsl(),
        VitePWA({
            manifest: {
                "lang": "en",
                "name": `Necklace Splitting`,
                "short_name": "Necklace Splitting",
                "description": "Visualize Necklace splitting problem in the context of Borsuk-Ulam theorem.",
                "background_color": "#212121",
                "theme_color": "#212121",
                "orientation": "any",
                "display": "standalone",
                "start_url": base,
                "icons": [
                    {
                        "src": "assets/pwa-icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "assets/pwa-icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "assets/pwa-icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "assets/pwa-icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]

            },
            // The app asks before it reloads into a new version (src/ui/PwaUpdate.ts).
            registerType: 'prompt',
            devOptions: {
                enabled: true
            }
        }),
    ],
    build: { assetsInlineLimit: 0 },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    test: {
        // Playwright's end-to-end tests will live in e2e/ and must not be picked up here.
        include: ['test/**/*.test.ts'],
        // Pins English, whatever the machine's locale; tests of other languages switch explicitly.
        setupFiles: ['test/setup.ts'],
    },
});