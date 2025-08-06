import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import mdx from '@astrojs/mdx';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: isDev ? 'http://localhost:4321' : 'https://ryanshafer.com',
  integrations: [compress(), mdx()],
  content: {
    schema: {
      collections: async () => (await import('./src/content/config.ts')).collections
    }
  }
});