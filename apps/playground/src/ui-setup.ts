/**
 * 按当前 UI 模式安装对应组件库的全局组件与样式（a-* / el-* 全局标签）。
 * 模式值来自 src/ui/index.ts（cookie 决定）。
 */
import { currentUiMode } from './ui/index'

export type { UiMode } from './ui/index'
export const uiMode = currentUiMode()

export async function setupUi(app: import('vue').App) {
  if (uiMode === 'element') {
    const [{ default: ElementPlus }, css] = await Promise.all([
      import('element-plus'),
      import('element-plus/dist/index.css'),
    ])
    void css
    app.use(ElementPlus)
  } else {
    const [{ default: Antd }, css] = await Promise.all([
      import('ant-design-vue'),
      import('ant-design-vue/dist/reset.css'),
    ])
    void css
    app.use(Antd)
  }
}
