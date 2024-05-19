import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

const experiments = [
  'keychords',
  'tree',
  'zoom',
  'web-components',
  'automerge',
  'yjs',
  'image-blob',
  'fs',
  'css',
  'yrs',
  'loro',
  'yjs-adc',
  'fsm',
]

const input: {[key:string]: string} = {
  main: resolve(__dirname, 'index.html')
}

for (const experiment of experiments) {
  input[experiment] = resolve(__dirname, `lab/${experiment}/index.html`)
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
  }
})
