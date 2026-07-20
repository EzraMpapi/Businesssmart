import { defineConfig } from 'vite'
import react            from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir:    'dist',
    sourcemap: false,
    minify:    'esbuild',
    target:    'es2020',
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts':       ['recharts'],
          'icons':        ['lucide-react'],
          'xlsx':         ['xlsx'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'lucide-react', 'xlsx'],
  },

  server:  { port: 5173, host: '0.0.0.0' },
  preview: { port: 4173, host: '0.0.0.0' },
})
