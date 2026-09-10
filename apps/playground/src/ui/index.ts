/**
 * UI 适配入口：所有 demo / 文档统一从这里导入，不直接 import 具体实现包。
 *
 * 运行时按 cookie（snowui-ui=antd|element|shadcn）选择实现，异步加载后逐个
 * 填充同名导出（ProTable / openDialog / createApis ...）：
 *   - 默认 antd 版（@cynnie/ui-antd）
 *   - 右上角开关 / ?ui=element 写 cookie 并整页重载，走 @cynnie/ui-element
 *   - 右上角开关 / ?ui=shadcn 写 cookie 并整页重载，走 @cynnie/ui-shadcn
 *     （shadcn 版基于 Tailwind CSS v4，setupUi 时会额外注入组件库的 style.css）
 *
 * demo 里 `import { ProTable } from '@/ui'` 是静态导入，组件在实现包
 * 加载完成前是 undefined，加载完成后变为真实组件——由于所有 demo 都在
 * <Suspense>/异步路由组件之后渲染，实际取值发生在填充完成之后。
 */
import { withDemoFallback } from './demo-fallback'

export type UiMode = 'antd' | 'element' | 'shadcn'

export const UI_MODES: UiMode[] = ['antd', 'element', 'shadcn']

export function currentUiMode(): UiMode {
  if (typeof document === 'undefined') return 'antd'
  const match = document.cookie.match(/(?:^|;\s*)snowui-ui=(antd|element|shadcn)(?:;|$)/)
  return (match?.[1] as UiMode) || 'antd'
}

export function switchUiMode(mode: UiMode) {
  document.cookie = `snowui-ui=${mode}; path=/; max-age=31536000`
  window.location.reload()
}

const impl: Record<string, any> =
  currentUiMode() === 'element'
    ? await import('@cynnie/ui-element')
    : currentUiMode() === 'shadcn'
      ? await import('@cynnie/ui-shadcn')
      : await import('@cynnie/ui-antd')

// 把实现包的全部导出平铺为本模块导出（含类型侧的运行时值）；default 导出无消费方，解构丢弃
const { default: _, ...named } = impl as Record<string, any>
void _;
// 文档站 createApis 包一层兜底：静态部署（如 Vercel）没有 /api 后端，
// 请求失败或响应不符合 CRUD 约定时回退到内存数据，保证线上演示完整增删改查
if (typeof named.createApis === 'function') {
  named.createApis = withDemoFallback(named.createApis)
}
export const {
  ProTable,
  ProTableForm,
  ProFormBuilder,
  ProButton,
  ProCountdownButton,
  ProInput,
  ProSelect,
  ProCheckboxGroup,
  ProRadioGroup,
  ProModal,
  ProConfirmButton,
  ProDescriptions,
  openDialog,
  renderDialogForm,
  createApis,
  uiMessage,
  useOptions,
  useDebounce,
  useThrottle,
  useAsyncLoading,
} = named
