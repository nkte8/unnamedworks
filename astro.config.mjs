import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import swup from '@swup/astro';

// const isProduction = process.env.NODE_ENV === "production"

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  site: 'https://blog.unnamedworks.com',
  server: {
    port: 4321,
    host: true
  },
  integrations: [
    partytown(),
    swup({
      theme: 'false',
      smoothScrolling: false,
      updateBodyClass: true,
      reloadScripts: false,
    })]
});