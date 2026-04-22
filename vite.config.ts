import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import preloadPlugin from './vite-plugin-preload.js'

export default defineConfig({
  plugins: [react(), preloadPlugin()],
  build: {
    // Reducir el tamaño del bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    },
    // Inyectar CSS en HTML para eliminar una solicitud de red crítica
    cssCodeSplit: false,
    // Estrategia de chunking mejorada
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor packages en chunks separados
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor'
            }
            return 'vendor'
          }
        }
      }
    },
    // Mejorar performance de build
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
  },
  // Optimizaciones de pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})
