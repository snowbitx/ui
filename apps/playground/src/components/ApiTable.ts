export interface ApiColumn {
  /** 参数名 */
  name: string
  /** 说明 */
  description: string
  /** 类型 */
  type: string
  /** 默认值 */
  default: string
}

export interface ApiTable {
  /** 表格标题，如 Props / Events / Slots */
  title: string
  columns: ApiColumn[]
}
