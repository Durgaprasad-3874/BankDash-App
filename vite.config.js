import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('recharts') || id.includes('d3-')) return 'charts'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor'
          return 'deps'
        },
      },
    },
  },
})
