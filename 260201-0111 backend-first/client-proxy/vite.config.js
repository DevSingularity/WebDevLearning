import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': "http://localhost:3000",
    }
    //where to proxy requests, to /api, it simulates that the requests are going to the same origin and appends this link to the url
  },
  plugins: [react()],
})
