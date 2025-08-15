import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.nomaone.or.jp',
  trailingSlash: 'always',
  build: {
    assets: 'assets',
  },
  integrations: [
    tailwind(),
    sitemap()
  ],
  vite: {
    plugins: []
  }
});