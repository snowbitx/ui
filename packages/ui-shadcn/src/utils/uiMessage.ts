import { createApp, h } from "vue";
import { Toaster, toast } from "vue-sonner";

/**
 * 全局提示的统一抽象：与 ui-antd / ui-element 导出同名方法，调用方无需关心底层 UI 库。
 * shadcn 版基于 vue-sonner（shadcn 官方 toast 方案）。
 *
 * vue-sonner 的 toast 需要页面里存在 <Toaster />；为保证开箱即用，
 * 首次调用时自动在 body 上挂一个（与 antd 的 message 全局可用行为对齐）。
 */
let toasterMounted = false;

function ensureToaster() {
  if (toasterMounted || typeof document === "undefined") return;
  toasterMounted = true;
  if (document.querySelector("[data-cynnie-sonner-toaster]")) return;
  const container = document.createElement("div");
  container.setAttribute("data-cynnie-sonner-toaster", "");
  document.body.appendChild(container);
  const app = createApp({ render: () => h(Toaster, { position: "top-center", richColors: true }) });
  app.mount(container);
}

function withToaster<T extends any[]>(call: (...args: T) => any) {
  return (...args: T) => {
    ensureToaster();
    return call(...args);
  };
}

export const uiMessage = {
  success: withToaster((content: string) => toast.success(content)),
  info: withToaster((content: string) => toast.info(content)),
  error: withToaster((content: string) => toast.error(content)),
  warning: withToaster((content: string) => toast.warning(content)),
};

export { Toaster, toast };
