import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({}),
    vue(),
    Components({
      dts: true,
      extensions: ['vue', 'ts'],
      dirs: ['src/components', 'src/components/**/*']
    }),
    AutoImport({
      dts: true,
      imports: ['vue']
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
