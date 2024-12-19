import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: mode === 'development' ? {
      '/drive-go/BackEnd/Login/login.php': 'http://localhost'
    } : undefined,
    build: {
      outDir: 'dist',
    },
  }
}))
