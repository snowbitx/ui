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
