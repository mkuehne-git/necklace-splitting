import basicSsl from '@vitejs/plugin-basic-ssl';
import glsl from 'vite-plugin-glsl';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
const isProduction = process.env['NODE_ENV'] === 'production';
const base = isProduction ? '/necklace-splitting/' : '/';
export default defineConfig({
    base,
    plugins: [
        basicSsl(),
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
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            }
        }),
    ],
    build: { assetsInlineLimit: 0 },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});