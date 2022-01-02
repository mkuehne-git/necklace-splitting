import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import dynamicImportVars from 'rollup-plugin-dynamic-import-variables';
const isProduction = process.env['NODE_ENV'] === 'production';
const base = isProduction ? '/temp/' : '/';
export default defineConfig({
    base,
    plugins: [
        glsl()
    ],
    build: {
        rollupOptions: {
            plugins :[
                dynamicImportVars()
            ]
        }
    }
});