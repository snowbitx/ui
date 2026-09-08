import { ElMessage } from "element-plus";

/**
 * 全局提示的统一抽象：两套实现包导出同名方法，调用方无需关心底层 UI 库。
 */
export const uiMessage = {
  success: (content: string) => ElMessage.success(content),
  info: (content: string) => ElMessage.info(content),
  error: (content: string) => ElMessage.error(content),
  warning: (content: string) => ElMessage.warning(content),
};
