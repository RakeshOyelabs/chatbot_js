import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'embed.js'),
      name: 'ChatbotWidget',
      fileName: (format) => `embed.${format}.js`,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        globals: {
          'chatbot-widget': 'ChatbotWidget',
        },
      },
    },
    minify: 'terser',
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: '/chatbot-widget.html',
  },
});