/**
 * 组件库接口契约：@cynnie/ui-antd 与 @cynnie/ui-element 共同遵守的
 * 公共类型定义。各 UI 适配包的组件 props/events/slots 以此为准，保证
 * 两套实现可以互相替换（demo / 文档共用同一份调用代码）。
 */
import type { Component } from "vue";

export type PromiseFn = (...args: any[]) => Promise<any>;

export interface PageApis {
  get: PromiseFn;
  create: PromiseFn;
  update: PromiseFn;
  remove: PromiseFn;
}

export interface CreateApisOptions {
  /** 自定义请求实现，默认使用 fetch */
  request?: (url: string, init: RequestInit) => Promise<any>;
}

/** ProFormBuilder 的单项配置 */
export interface FormItem extends Record<string, any> {
  label?: string;
  key: string;
  /** 内置类型：input / textarea / number / date / select / checkbox；也可直接传组件 */
  type?: string | Component;
  /** 隐藏该项（配合 computed 可做联动显隐） */
  hidden?: boolean;
  /** 栅格数（24 分制），不传用组件的 span */
  span?: number;
  /** 直接透传给渲染组件的 props（设置后其余顶层字段不再透传） */
  props?: Record<string, any>;
  /** 配置式插槽：{ 默认插槽名或函数 }，传给渲染的组件 */
  slots?: Record<string, any>;
}

/** ProFormBuilder 的规则配置：各 UI 库的原生校验规则结构 */
export type FormRules = Record<string, any>;

/** ProTable 的列配置：各 UI 库的原生表格列结构 */
export type TableColumn = Record<string, any>;

/** 命令式弹窗的配置：title / width / onOk / onCancel 等公共字段 */
export interface DialogOptions {
  title?: any;
  width?: string | number;
  /** 点确定：拿到内容组件实例（或提交结果），返回 false / reject 拦截关闭 */
  onOk?: (result?: any) => any;
  onCancel?: (e?: any) => any;
  [key: string]: any;
}

/** openDialog 的返回值 */
export interface DialogHandle {
  close: () => void;
}
