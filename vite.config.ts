import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Dynamically import lovable-tagger only in development
const getLovableTagger = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { componentTagger } = await import('lovable-tagger');
    return componentTagger();
  }
  return null;
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const taggerPlugin = await getLovableTagger();

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && taggerPlugin,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ['lovable-tagger'], // Exclude from optimization to prevent ESM/CJS conflicts
    },
  };
});
