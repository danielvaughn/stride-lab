import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'

const experiments = [
  'keychords',
  'tree',
  'zoom',
  'web-components',
  'automerge',
]

const input: {[key:string]: string} = {
  main: resolve(__dirname, 'index.html')
}

for (const experiment of experiments) {
  input[experiment] = resolve(__dirname, `experiments/${experiment}/index.html`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm(), react()],
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
