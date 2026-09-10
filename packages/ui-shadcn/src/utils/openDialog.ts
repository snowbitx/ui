import { type Component, h, createApp, reactive, ref, defineComponent } from "vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Button, Loader } from "../components/ui/index.js";
import ProFormBuilder from "../components/ProFormBuilder/index.vue";
import type { DialogHandle } from "@cynnie/ui-core";

// 避免每次调用都创建新空对象
const EMPTY_OBJ = Object.freeze({});

/** openDialog 的弹窗配置：与 antd / element 版的公共字段对齐（title / width / onOk / onCancel 等） */
interface ShadcnDialogProps extends Record<string, any> {
  title?: any;
  width?: string | number;
  onOk?: (result?: any) => any;
  onCancel?: (e?: any) => any;
}

export function openDialog(
  component: Component,
  props: Record<string, any> = EMPTY_OBJ,
  modelProps: ShadcnDialogProps = EMPTY_OBJ,
): DialogHandle {
  // 调用方可通过 props 传 methodKey / onSubmit 自定义确定按钮的行为：
  // - methodKey：内容组件暴露的方法名，默认 'submit'
  // - onSubmit：直接传函数（拿到内容组件实例），优先级高于 methodKey
  const { methodKey = "submit", onSubmit, ...restProps } = props;
  const open = ref(true);
  const instance = ref<Record<string, any>>();
  const container = document.createElement("div");
  container.setAttribute("data-cynnie-dialog-container", "");
  const loading = ref(false);
  document.body.appendChild(container);

  // reactive 包一层：外部传 ref 的 title 等配置可动态响应
  const reactiveModelProps = reactive(modelProps);

  async function handleOk() {
    loading.value = true;
    try {
      let result: any;
      if (onSubmit) {
        result = await onSubmit(instance.value);
      } else if (instance.value?.[methodKey]) {
        result = await instance.value[methodKey]();
      }
      open.value = false;
      // 内容组件提交方法（或 onSubmit）的返回值交给 onOk
      reactiveModelProps.onOk?.(result);
    } catch {
      // 提交失败（校验不通过 / 请求报错）保持弹窗打开
    } finally {
      loading.value = false;
    }
  }

  function unmount() {
    app.unmount();
    document.body.removeChild(container);
  }

  // 关闭动画结束后再卸载
  function watchClose() {
    const stop = setInterval(() => {
      if (!open.value) {
        clearInterval(stop);
        setTimeout(unmount, 250);
      }
    }, 100);
  }

  const DialogWithFooter = defineComponent({
    setup() {
      return () => {
        const title =
          typeof reactiveModelProps.title === "function"
            ? (reactiveModelProps.title as any)()
            : reactiveModelProps.title;
        const widthStyle =
          reactiveModelProps.width != null
            ? {
                width:
                  typeof reactiveModelProps.width === "number"
                    ? `${reactiveModelProps.width}px`
                    : reactiveModelProps.width,
                maxWidth: "calc(100% - 2rem)",
              }
            : undefined;
        return h(
          Dialog,
          { open: open.value, "onUpdate:open": (value: boolean) => (open.value = value) },
          {
            default: () =>
              h(
                DialogContent,
                {
                  style: widthStyle,
                  onEscapeKeyDown: (event: any) => {
                    // ESC / 点遮罩关闭都走 onCancel，与 antd / element 版对齐
                    reactiveModelProps.onCancel?.(event);
                  },
                  onInteractOutside: (event: any) => {
                    reactiveModelProps.onCancel?.(event);
                  },
                },
                {
                  default: () => [
                    h(DialogHeader, {}, () => h(DialogTitle, {}, { default: () => title })),
                    h("div", { class: "py-1" }, [h(component, { ...restProps, ref: instance })]),
                    h(
                      DialogFooter,
                      { class: "gap-2" },
                      () => [
                        h(Button, { variant: "outline", onClick: () => (open.value = false) }, () => "取 消"),
                        loading.value
                          ? h(Button, { disabled: true }, () => [h(Loader, { class: "text-current" }), "确 定"])
                          : h(Button, { onClick: handleOk }, () => "确 定"),
                      ],
                    ),
                  ],
                },
              ),
          },
        );
      };
    },
  });

  const app = createApp(DialogWithFooter);
  app.mount(container);
  watchClose();

  // 返回 close 方法，调用方可编程式关闭弹窗
  function close() {
    open.value = false;
  }
  return { close };
}

/**
 * 命令式弹窗表单：一行代码弹出一个「确定时自动校验」的表单弹窗。
 *
 * @param formProps  ProFormBuilder 的配置：formItems / rules / modelValue 等
 * @param modelProps 弹窗的配置（title / width / onOk 等）
 * @returns { close } 关闭弹窗
 *
 * @example
 * const { close } = renderDialogForm(
 *   { formItems: [{ label: '姓名', key: 'name' }], rules: { name: [{ required: true }] } },
 *   { title: '新增用户', onOk: (data) => console.log('提交', data) },
 * );
 */
export function renderDialogForm(formProps: Record<string, any>, modelProps: ShadcnDialogProps = EMPTY_OBJ): DialogHandle {
  const reactiveFormProps = reactive(formProps);
  return openDialog(
    {
      setup(_: any, { expose }: any) {
        const formInstance = ref();
        expose({
          // 点确定时先跑表单校验，通过后把表单数据交给 onOk
          async submit() {
            await formInstance.value?.validate?.();
            return reactiveFormProps.modelValue;
          },
        });
        // formProps 是运行时动态对象，断言绕开 h() 对 .vue 组件的严格 props 推断
        const FormComp = ProFormBuilder as unknown as Component;
        return () => h(FormComp, { ...reactiveFormProps, ref: formInstance });
      },
    },
    {},
    modelProps,
  );
}
