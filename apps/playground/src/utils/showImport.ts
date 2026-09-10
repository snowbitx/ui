import { currentUiMode } from '@/ui'

/**
 * 把 demo 源码里面向文档站的 '@/ui' 导入语句，还原成用户实际项目里
 * 应该写的「真实发包名」——antd 模式显示 @cynnie/ui-antd，
 * element 模式显示 @cynnie/ui-element，shadcn 模式显示 @cynnie/ui-shadcn。
 * 保证文档展示与实际安装一致。
 */
const PKG_BY_MODE: Record<string, string> = {
  antd: '@cynnie/ui-antd',
  element: '@cynnie/ui-element',
  shadcn: '@cynnie/ui-shadcn',
}

export function showImport(source: string): string {
  const pkg = PKG_BY_MODE[currentUiMode()] ?? '@cynnie/ui-antd'
  return source.replace(/from '@\/ui'/g, `from '${pkg}'`).replace(/from "@\/ui"/g, `from '${pkg}'`)
}

/**
 * 文档正文措辞按当前模式返回对应的底层组件名：
 * antd 模式说「同 a-table columns」，element 模式说「同 el-table columns」，
 * shadcn 模式说「cynnie-ui shadcn 组件的 columns」（shadcn 版是自定义封装，没有原生标签可对应）。
 */
export function docTerm(antdName: string, elementName: string, shadcnName?: string): string {
  const mode = currentUiMode()
  if (mode === 'element') return elementName
  if (mode === 'shadcn') return shadcnName ?? antdName
  return antdName
}
