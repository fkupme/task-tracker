import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/styles/globals.scss";`,
				},
			},
			modules: {
				localsConvention: 'camelCase'
			}
		},
  },
})