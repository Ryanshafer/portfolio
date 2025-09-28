import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import mdx from '@astrojs/mdx';
import rehypeCaseSections from './src/utils/rehype-case-sections.js';

import sitemap from '@astrojs/sitemap';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: isDev ? 'http://localhost:4321' : 'https://ryanshafer.com',
  integrations: [compress(), mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeCaseSections],
  },
  content: {
    schema: {
      collections: async () => (await import('./src/content/config.ts')).collections
    }
  }
});