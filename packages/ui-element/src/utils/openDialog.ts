import { type Component, h, createApp, reactive, ref } from "vue";
import { ElButton, ElCol, ElDialog, ElForm, ElFormItem, ElRow } from "element-plus";
import ProFormBuilder from "../components/ProFormBuilder/index.vue";
import type { DialogHandle } from "@cynnie/ui-core";

// 避免每次调用都创建新空对象
const EMPTY_OBJ = Object.freeze({});

interface ElDialogProps extends Record<string, any> {
  title?: any;
  width?: string | number;
  onOk?: (result?: any) => any;
  onCancel?: (e?: any) => any;
}

export function openDialog(
  component: Component,
  props: Record<string, any> = EMPTY_OBJ,
  modelProps: ElDialogProps = EMPTY_OBJ,
): DialogHandle {
  // 与 antd 版契约一致：
  // - methodKey：内容组件暴露的方法名，默认 'submit'
  // - onSubmit：直接传函数（拿到内容组件实例），优先级高于 methodKey
  const { methodKey = "submit", onSubmit, ...restProps } = props;
  const open = ref(true);
  const instance = ref<Record<string, any>>();
  const container = document.createElement("div");
  const loading = ref(false);
  document.body.appendChild(container);

  // reactive 包一层：外部传 ref 的 title 等配置可动态响应
  const reactiveModelProps = reactive(modelProps);
  const dialog = () => {
    const title =
      typeof reactiveModelProps.title === "function" ? (reactiveModelProps.title as any)() : reactiveModelProps.title;
    return h(
      ElDialog,
      {
        ...reactiveModelProps,
        title,
        modelValue: open.value,
        "onUpdate:modelValue": (value: boolean) => {
          open.value = value;
        },
        beforeClose: (done: () => void) => {
          // 点 X / ESC 走这里，与 onCancel 对齐；确定按钮不经过 beforeClose
          open.value = false;
          reactiveModelProps.onCancel?.();
          done();
        },
      },
      {
        // ElDialog 的 footer 是插槽而不是 prop
        default: () => h(component, { ...restProps, ref: instance }),
        footer: () =>
          h("div", null, [
            h(ElButton, { onClick: () => (open.value = false) }, () => "取消"),
            h(ElButton, { type: "primary", loading: loading.value, onClick: handleOk }, () => "确定"),
          ]),
      },
    );
  };

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

  const app = createApp(dialog);
  // 命令式 createApp 的独立实例没有全局注册的 el-* 组件，内容组件模板里的
  // el-form/el-row/el-col/el-form-item 需要在这里补注册
  app.component("ElForm", ElForm);
  app.component("ElRow", ElRow);
  app.component("ElCol", ElCol);
  app.component("ElFormItem", ElFormItem);
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
 * @param modelProps 弹窗的配置（title / width / onOk 等）
 * @returns { close } 关闭弹窗
 *
 * @example
 * const { close } = renderDialogForm(
 *   { formItems: [{ label: '姓名', key: 'name' }], rules: { name: [{ required: true }] } },
 *   { title: '新增用户', onOk: (data) => console.log('提交', data) },
 * );
 */
export function renderDialogForm(formProps: Record<string, any>, modelProps: ElDialogProps = EMPTY_OBJ): DialogHandle {
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
