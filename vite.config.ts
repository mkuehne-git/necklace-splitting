import basicSsl from '@vitejs/plugin-basic-ssl';
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
const isProduction = process.env['NODE_ENV'] === 'production';
const base = isProduction ? '/necklace-splitting/' : '/';
export default defineConfig({
    base,
    plugins: [
        basicSsl(),
        glsl()
    ],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});