import { ViteFaviconsPlugin } from 'vite-plugin-favicon2';
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
    build: {
        assetsInlineLimit: 0,
    },
    plugins: [
        ViteFaviconsPlugin({
            logo: resolve(__dirname, 'src', 'images', 'artifex-logo-PINK.png'),
        }),
    ],
});