import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://RyotaroIchihara.github.io',
  base: '/nomaone-web/',      // ← リポジトリ名に合わせる
  trailingSlash: 'always',     // 階層リンクの相対解決が安定
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