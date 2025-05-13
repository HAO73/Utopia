import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  publicDir: 'public',
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    fs: {
      allow: ['..']
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000'
    },
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
      clientPort: 5173
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
