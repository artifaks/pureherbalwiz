import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd());
  
  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper MIME types for JavaScript modules
    rollupOptions: {
      output: {
        // Ensure proper chunking
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', '@radix-ui/react-icons'],
        },
        // Ensure proper file extensions and formats
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Copy the _headers file to the dist directory
    assetsInlineLimit: 4096,
    sourcemap: true,
    // Ensure compatibility with older browsers if needed
    target: 'es2015',
    // Make environment variables available to the client
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  // Define environment variables to expose to the client
  define: {
    // Expose environment variables to the client
    'window.ENV': {
      VITE_SUPABASE_URL: env.VITE_SUPABASE_URL || '',
      VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || '',
      VITE_STRIPE_PUBLIC_KEY: env.VITE_STRIPE_PUBLIC_KEY || '',
    }
  },
};
});
