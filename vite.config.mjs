import { ViteFaviconsPlugin } from 'vite-plugin-favicon2';
import { defineConfig } from 'vite'
import { resolve, join } from 'path';

export default defineConfig({
    build: {
        outDir: join(__dirname, 'new_dist'),
        assetsInlineLimit: 0,
    },
    plugins: [
        ViteFaviconsPlugin({
            logo: resolve(__dirname, 'src', 'images', 'artifex-logo-PINK.png'),
        }),
    ],
});