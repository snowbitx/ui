import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { setupUi } from './ui-setup'
import { currentUiMode } from './ui'

// 支持 URL 带 ?ui=antd|element|shadcn 分享/书签：写入 cookie 供 src/ui 与 ui-setup 读取
const match = window.location.search.match(/[?&]ui=(antd|element|shadcn)(?:&|$)/)
if (match && match[1] !== currentUiMode()) {
  document.cookie = `cynnie-ui=${match[1]}; path=/; max-age=31536000`
  window.location.reload()
}

const app = createApp(App)
// 安装当前 UI 库的全局组件（a-* / el-*）与样式后再挂载
setupUi(app).then(() => {
  app.use(router)
  app.mount('#app')
})
