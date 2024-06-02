import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import legacy from '@vitejs/plugin-legacy'
import yaml from 'vite-plugin-yaml2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), legacy({
    renderModernChunks: false
  }), yaml()],
})
