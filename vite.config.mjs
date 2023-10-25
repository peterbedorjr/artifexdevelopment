import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
    build: {
        assetsInlineLimit: 0,
    },
    plugins: [
        vitePluginFaviconsInject('./src/images/artifex-logo-PINK.png'),
    ],
});