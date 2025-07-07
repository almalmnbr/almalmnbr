import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Add other plugins here if needed, conditionally for development
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // إضافة ملف index-BQBqcQvy.js كـ external لمنع Vite من معالجته
      external: ['/dist/assets/index-BQBqcQvy.js'], // تعديل المسار هنا ليعكس المسار الصحيح بعد البناء
    },
  },
  publicDir: path.resolve(__dirname, 'public'),  // تعيين مجلد public إذا كان لديك ملفات ثابتة 
}));
