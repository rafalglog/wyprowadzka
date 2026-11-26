// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  server: { host: true, port: 4321 },
  vite: {
    plugins: [tailwindcss(), basicSsl({ domains: ['wyprowadzka.orb.local'] })],
    server: { allowedHosts: ['wyprowadzka.orb.local'], strictPort: true },
  },
});
