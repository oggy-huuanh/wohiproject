import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app from a subfolder
  // (https://<user>.github.io/<repo>/), not from the root of the domain.
  // './' makes the built index.html load its JS and CSS with relative paths,
  // so it works in any folder.
  base: './',
})
