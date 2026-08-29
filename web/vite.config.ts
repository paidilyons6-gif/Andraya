import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/Andraya/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
  },
})
