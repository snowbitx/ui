<script lang="ts" setup>
import { Checkbox, DatePicker, Input, InputNumber, Modal, Select, Textarea } from "ant-design-vue";
import { omit } from "lodash-es";
import { computed, h, ref, type Component } from "vue";
import type { FormInstance } from "ant-design-vue";

defineOptions({
  name: "ProFormBuilder",
});

interface FormItem extends Record<string, any> {
  label?: string;
  key: string;
  /** 内置类型：input / textarea / number / date / select / checkbox / modal；也可直接传组件 */
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

const props = defineProps<{
  formItems: FormItem[];
  rules?: Record<string, any>;
  /** 全局栅格数，单项可用 item.span 覆盖 */
  span?: number;
  /** 透传给 a-form 的其他配置（layout / labelCol / labelWidth 等） */
  formConfig?: Record<string, any>;
}>();

const formData = defineModel<Record<string, any>>({ default: () => ({}) });

const span = computed(() => props.span ?? 24);

// hidden 过滤放 computed：formItems 用 computed 传响应式配置时，联动显隐自动生效
const visibleItems = computed(() => props.formItems.filter((item) => item.hidden !== true));

function transformModelValue(component: Component, key = "value") {
  return {
    setup: (props: any, { slots, emit, attrs }: any) => {
      return () => {
        // v-model => v-model:value / v-model:checked / v-model:open
        const { modelValue, ...rest } = { ...attrs, ...props };
        return h(
          component,
          {
            ...rest,
            [key]: modelValue,
            [`onUpdate:${key}`]: (val: any) => {
              emit(`update:modelValue`, val);
            },
          },
          slots,
        );
      };
    },
  };
}

const map: Record<string, Component> = {
  // v-model:value
  input: transformModelValue(Input),
  textarea: transformModelValue(Textarea),
  number: transformModelValue(InputNumber),
  date: transformModelValue(DatePicker),
  select: transformModelValue(Select),
  // v-model:checked
  checkbox: transformModelValue(Checkbox, "checked"),
  modal: transformModelValue(Modal, "open"),
};

// 传给渲染组件的 props 要剔除表单布局用的字段
const baseFieldReg = /^(label|key|type|span|hidden|slots|props|rules)$/;

function getComponent(item: FormItem): Component {
  // type 直接传组件（函数式组件或有状态组件）
  if (item.type && typeof item.type !== "string") return item.type as Component;
  const key = typeof item.type === "string" ? item.type : "input";
  return map[key] ?? map.input;
}

function getProps(item: FormItem) {
  if (item.props) return item.props;
  return omit(item, baseFieldReg);
}

// select 类默认 placeholder 用"请选择"，其余用"请输入"
const selectType = new Set(["select", "date"]);

const ComponentItem = {
  props: ["item"],
  setup(itemProps: any) {
    const { item } = itemProps;
    return () => {
      const rest = getProps(item);
      if (!("placeholder" in rest)) {
        const text = typeof item.type === "string" && selectType.has(item.type) ? "请选择" : "请输入";
        rest.placeholder = text + (item.label || "");
      }
      return h(
        getComponent(item),
        {
          ...rest,
          modelValue: formData.value[item.key],
          "onUpdate:modelValue": (value: any) => {
            formData.value[item.key] = value;
          },
        },
        // 配置式插槽优先，其次是组件使用者通过 #key 模板插槽自定义的内容（外层已处理）
        item.slots,
      );
    };
  },
};

const formRef = ref<FormInstance>();

function validate() {
  return formRef.value?.validate();
}

defineExpose({ validate });
</script>

<template>
  <a-form ref="formRef" v-bind="formConfig" :rules="rules" :model="formData">
    <a-row :gutter="16">
      <a-col v-for="item in visibleItems" :key="item.key" :span="item.span || span">
        <a-form-item :label="item.label" :name="item.key">
          <!-- 外面传了 #key 插槽时以插槽为准 -->
          <slot :name="item.key">
            <ComponentItem :item="item"></ComponentItem>
          </slot>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
