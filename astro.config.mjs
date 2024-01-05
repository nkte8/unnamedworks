import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";

// const isProduction = process.env.NODE_ENV === "production"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  site: 'https://unnamedworks.com',
  server: {
    port: 4321,
    host: true
  },
  integrations: [partytown(
    {
      config: {
        forward: ["dataLayer.push"],
      },
    })
    , react()
  ]
});