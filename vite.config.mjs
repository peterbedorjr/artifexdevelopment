import { ViteFaviconsPlugin } from 'vite-plugin-favicon';
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
    build: {
        assetsInlineLimit: 0,
    },
    plugins: [
        ViteFaviconsPlugin('./src/images/artifex-logo-PINK.png'),
    ],
});