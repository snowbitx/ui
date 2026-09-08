/**
 * 模式切换：cookie（smoke-ui=antd|element|shadcn）+ 整页重载。
 * 与 playground 不同的是这里没有代理层——冒烟站的每一页
 * 直接 import 指定实现包，只有 URL 能证明"产物真的能跑"。
 */
export type UiMode = 'antd' | 'element' | 'shadcn'

export const UI_MODES: UiMode[] = ['antd', 'element', 'shadcn']

export function currentUiMode(): UiMode {
  if (typeof document === 'undefined') return 'antd'
  const match = document.cookie.match(/(?:^|;\s*)smoke-ui=(antd|element|shadcn)(?:;|$)/)
  return (match?.[1] as UiMode) || 'antd'
}

export function switchUiMode(mode: UiMode) {
  document.cookie = `smoke-ui=${mode}; path=/; max-age=31536000`
  window.location.reload()
}
