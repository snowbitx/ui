import { message as AntdMessage } from "ant-design-vue";

/**
 * 全局提示的统一抽象：两套实现包导出同名方法，调用方无需关心底层 UI 库。
 */
export const uiMessage = {
  success: (content: string) => AntdMessage.success(content),
  info: (content: string) => AntdMessage.info(content),
  error: (content: string) => AntdMessage.error(content),
  warning: (content: string) => AntdMessage.warning(content),
};
