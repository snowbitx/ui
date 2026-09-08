import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'

// antd / element / shadcn 切换由 src/ui 代理层在浏览器运行时根据 cookie 决定，
// 这里不需要任何构建期配置。命令行想固定模式可以 VITE_UI=element pnpm dev。
// shadcn 模式的 Tailwind 样式由 @tailwindcss/vite 编译
// （src/ui-shadcn.css 里 @source 指向 packages/ui-shadcn 的源码）。
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // workspace 源码包以 @fs 直连加载，其依赖的 vue / reka-ui 必须与页面 app 用同一份实例，
    // 否则 reka-ui 的 provide/inject context 跨实例断裂（下拉、弹窗等交互组件失效）
    dedupe: ['vue', 'reka-ui'],
  },
  optimizeDeps: {
    // 强制 reka-ui 走预构建，保证全站只有一份 vue runtime 实例
    include: ['reka-ui', 'vue-sonner', 'lucide-vue-next'],
  },
  server: {
    proxy: {
      // 演示用的接口转发到 mock-server
      '/api': 'http://localhost:4173',
    },
  },
})
