import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'embed.js'),
      name: 'ChatbotWidget',
      fileName: (format) => `embed.${format}.js`,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        // Ensure the global variable is accessible
        globals: {
          'chatbot-widget': 'ChatbotWidget',
        },
        // Minify the output
        compact: true,
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
