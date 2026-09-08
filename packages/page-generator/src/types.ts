/**
 * 页面 schema 的 TS 类型定义（仅类型，供 demo 侧 import type 使用）
 */
export interface PageSchema {
  /** 路由路径，如 /users */
  route: string;
  /** 路由/页面名称，如 UsersPage */
  name: string;
  /** 菜单标题，如 用户管理 */
  title: string;
  /** 接口基础地址，如 /api/users */
  api: string;
  /** 表格列定义，直接透传给 a-table columns */
  columns: Array<Record<string, any>>;
  /** 表单项定义，直接透传给 ProTable formItems */
  formItems: Array<Record<string, any>>;
  /** 校验规则，透传给 ProTable rules */
  rules?: Record<string, any>;
}
