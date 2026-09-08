import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// antd / element 切换由 src/ui 代理层在浏览器运行时根据 cookie 决定，
// 这里不需要任何构建期配置。命令行想固定模式可以 VITE_UI=element pnpm dev。
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 演示用的接口转发到 mock-server
      '/api': 'http://localhost:4173',
    },
  },
})
