import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Base para GitHub Pages - repositorio de ruiz-jose
  base: '/cicloinstruccion/',
  
  // Configuración de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    
    // Optimización para rendimiento
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    
    // Minificación para producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Preview del build
  preview: {
    port: 4173,
    open: true,
    host: true
  },
  
  // Configuración CSS
  css: {
    devSourcemap: true
  }
})
