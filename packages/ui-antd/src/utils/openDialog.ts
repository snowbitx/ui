import { type Component, h, createApp, reactive, ref } from "vue";
import { type ModalProps, Modal } from "ant-design-vue";
import Antd from "ant-design-vue";
import ProFormBuilder from "../components/ProFormBuilder/index.vue";
import type { DialogHandle } from "@cynnie/ui-core";

// 避免每次调用都创建新空对象
const EMPTY_OBJ = Object.freeze({});

export function openDialog(
  component: Component,
  props: Record<string, any> = EMPTY_OBJ,
  modelProps: ModalProps = EMPTY_OBJ,
): DialogHandle {
  // 调用方可通过 props 传 methodKey / onSubmit 自定义确定按钮的行为：
  // - methodKey：内容组件暴露的方法名，默认 'submit'
  // - onSubmit：直接传函数（拿到内容组件实例），优先级高于 methodKey
  const { methodKey = "submit", onSubmit, ...restProps } = props;
  const open = ref(true);
  const instance = ref<Record<string, any>>();
  const container = document.createElement("div");
  const loading = ref(false);
  document.body.appendChild(container);

  // reactive 包一层：外部传 ref 的 title 等配置可动态响应
  const reactiveModalProps = reactive(modelProps);
  const dialog = () => {
    const title =
      typeof reactiveModalProps.title === "function" ? (reactiveModalProps.title as any)() : reactiveModalProps.title;
    return h(
      Modal,
      {
        ...reactiveModalProps,
        title,
        confirmLoading: loading.value,
        open: open.value,
        async onOk(e) {
          loading.value = true;
          try {
            let result: any;
            if (onSubmit) {
              result = await onSubmit(instance.value);
            } else if (instance.value?.[methodKey]) {
              result = await instance.value[methodKey]();
            }
            open.value = false;
            // 内容组件提交方法（或 onSubmit）的返回值交给 onOk；
            // 普通组件没写提交方法时 result 为 undefined，onOk 退回拿 Modal 事件
            reactiveModalProps.onOk?.(result ?? e);
          } finally {
            loading.value = false;
          }
        },
        afterClose: () => {
          unmount();
        },
        onCancel: (e?: any) => {
          open.value = false;
          reactiveModalProps.onCancel?.(e);
        },
      },
      () => {
        return h(component, { ...restProps, ref: instance });
      },
    );
  };
  function unmount() {
    app.unmount();
    document.body.removeChild(container);
  }
  const app = createApp(dialog);
  app.use(Antd);
  app.mount(container);

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
 * @param modelProps a-modal 的配置（title / width / onOk 等）
 * @returns { close } 关闭弹窗
 *
 * @example
 * const { close } = renderDialogForm(
 *   { formItems: [{ label: '姓名', key: 'name' }], rules: { name: [{ required: true }] } },
 *   { title: '新增用户', onOk: (data) => console.log('提交', data) },
 * );
 */
export function renderDialogForm(formProps: Record<string, any>, modelProps: ModalProps = EMPTY_OBJ): DialogHandle {
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
