import { createApp, type App } from 'vue'
import SmokeApp from './App.vue'
import { router } from './router'
import { currentUiMode } from './mode'

const mode = currentUiMode()

async function setup(app: App) {
  if (mode === 'element') {
    const [{ default: ElementPlus }, css] = await Promise.all([
      import('element-plus'),
      import('element-plus/dist/index.css'),
    ])
    void css
    app.use(ElementPlus)
  } else if (mode === 'shadcn') {
    // 动态加载 Tailwind 编译出的组件库样式并注入 <style> 标签
    const cssModule: any = await import('./ui-shadcn.css')
    const css: string =
      typeof cssModule?.default === 'string'
        ? cssModule.default
        : typeof cssModule === 'string'
          ? cssModule
          : Object.values(cssModule).find((v) => typeof v === 'string') || ''
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-snowui-shadcn', '')
    styleEl.textContent = css
    document.head.appendChild(styleEl)
  } else {
    const [{ default: Antd }, css] = await Promise.all([
      import('ant-design-vue'),
      import('ant-design-vue/dist/reset.css'),
    ])
    void css
    app.use(Antd)
  }
}

const app = createApp(SmokeApp)
app.use(router)

setup(app).then(() => {
  app.mount('#app')
  console.log(`[smoke] UI mode: ${mode}`)
})
