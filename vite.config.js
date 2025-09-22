import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from 'buffer';
import crypto from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto;
}

export default defineConfig({
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});

