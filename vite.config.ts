import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { labs } from './labs'

const input: {[key:string]: string} = {
  main: resolve(__dirname, 'index.html')
}

for (const lab of labs) {
  input[lab] = resolve(__dirname, `lab/${lab}/index.html`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm(), react(), topLevelAwait()],
  worker: {
    format: 'es',
    plugins: () => [wasm()],
  },
  build: {
    rollupOptions: {
      input,
    }
  },
  server: {
    hmr: false,
  }
})
