import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  server: {
    host: true, // This makes the server accessible on the local network
    port: 5173, // Keep the port consistent
    strictPort: true, // Fail if port is already in use
    hmr: {
      clientPort: 5173, // Ensure HMR works on this port
    },
  },
})

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})
 */
