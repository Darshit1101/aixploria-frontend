import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axiosApi: path.resolve(__dirname, 'src/axiosApi') // <-- This matches your folder!
      // Add other aliases if needed
    }
  }
});
