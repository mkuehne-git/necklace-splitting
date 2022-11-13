import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
const isProduction = process.env['NODE_ENV'] === 'production';
const base = isProduction ? '/necklace-splitting/' : '/';
export default defineConfig({
    base,
    plugins: [
        glsl()
    ]
});