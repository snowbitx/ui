/**
 * 按当前 UI 模式安装对应组件库的全局组件与样式（a-* / el-* 全局标签）。
 * 模式值来自 src/ui/index.ts（cookie 决定）。
 *
 * shadcn 模式没有全局组件标签（组件从 @/ui 导入），只需注入 Tailwind
 * 编译出来的组件库样式（src/ui-shadcn.css → @tailwindcss/vite 编译）。
 */
import { currentUiMode } from './ui/index'

export type { UiMode } from './ui/index'
export const uiMode = currentUiMode()

/** shadcn 模式下动态注入 Tailwind 编译的组件库样式 */
async function injectShadcnStyle() {
  const cssModule: any = await import('./ui-shadcn.css')
  // vite 的 CSS 模块可能把内容放在 default / 无名导出上，兼容两种形态
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
}

export async function setupUi(app: import('vue').App) {
  if (uiMode === 'element') {
    const [{ default: ElementPlus }, css] = await Promise.all([
      import('element-plus'),
      import('element-plus/dist/index.css'),
    ])
    void css
    app.use(ElementPlus)
  } else if (uiMode === 'shadcn') {
    await injectShadcnStyle()
  } else {
    const [{ default: Antd }, css] = await Promise.all([
      import('ant-design-vue'),
      import('ant-design-vue/dist/reset.css'),
    ])
    void css
    app.use(Antd)
  }
}
