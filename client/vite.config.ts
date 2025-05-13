import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: mode === 'development' ? {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // or your backend dev server
          changeOrigin: true,
        },
      },
    } : undefined,
  }
})
