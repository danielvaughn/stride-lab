import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const experiments = [
  'keychords',
  'tree',
  'zoom',
]

const input: {[key:string]: string} = {
  main: resolve(__dirname, 'index.html')
}

for (const experiment of experiments) {
  input[experiment] = resolve(__dirname, `experiments/${experiment}/index.html`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    }
  }
})
