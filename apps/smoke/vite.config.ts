import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'

// 冒烟站刻意不做任何 resolve.alias 指向包源码的配置：
// 所有 @cynnie/* 导入都走 package.json exports → packages/*/dist，
// dist 没构建时会直接报错，这正是冒烟站的目的。
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
