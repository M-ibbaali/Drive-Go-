import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/drive-go/BackEnd/Login/login.php': 'http://localhost'
    }
  }
})
