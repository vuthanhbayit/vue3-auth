import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({ dirs: 'example/pages' }),
    Layouts({ defaultLayout: 'default', layoutsDirs: 'example/layouts' }),
  ],
})
