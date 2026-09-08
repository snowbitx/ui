import { currentUiMode } from '@/ui'

/**
 * 把 demo 源码里面向文档站的 '@/ui' 导入语句，还原成用户实际项目里
 * 应该写的「真实发包名」——antd 模式显示 @snowbitx/ui-antd，
 * element 模式显示 @snowbitx/ui-element。保证文档展示与实际安装一致。
 */
export function showImport(source: string): string {
  const pkg = currentUiMode() === 'element' ? '@snowbitx/ui-element' : '@snowbitx/ui-antd'
  return source.replace(/from '@\/ui'/g, `from '${pkg}'`).replace(/from "@\/ui"/g, `from '${pkg}'`)
}

/**
 * 文档正文措辞按当前模式返回对应的底层组件名：
 * antd 模式说「同 a-table columns」，element 模式说「同 el-table columns」。
 */
export function docTerm(antdName: string, elementName: string): string {
  return currentUiMode() === 'element' ? elementName : antdName
}
