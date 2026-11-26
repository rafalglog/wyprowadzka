// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: process.env.ASTRO_LOCAL_STATIC === '1'
    ? undefined
    : cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' }),
  session: false,
  server: { host: true, port: 4321 },
  vite: {
    plugins: [tailwindcss(), basicSsl({ domains: ['wyprowadzka.orb.local'] })],
    server: { allowedHosts: ['wyprowadzka.orb.local'], strictPort: true },
  },
});
