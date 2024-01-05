import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import { outDir } from "./src/utils/vars"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  outDir: outDir,
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