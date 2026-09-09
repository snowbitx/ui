<script lang="ts" setup>
import { ElCheckbox as Checkbox, ElDatePicker as DatePicker, ElInput as Input, ElInputNumber as InputNumber, ElSelect as Select } from "element-plus";
import { omitBy } from "lodash-es";
import { computed, h, ref, type Component } from "vue";
import type { FormItem } from "@snowbitx/ui-core";

defineOptions({
  name: "ProFormBuilder",
});

const props = defineProps<{
  formItems: FormItem[];
  rules?: Record<string, any>;
  /** 全局栅格数，单项可用 item.span 覆盖 */
  span?: number;
  /** 透传给 el-form 的其他配置（label-width / label-position 等） */
  formConfig?: Record<string, any>;
}>();

const formData = defineModel<Record<string, any>>({ default: () => ({}) });

const span = computed(() => props.span ?? 24);

// hidden 过滤放 computed：formItems 用 computed 传响应式配置时，联动显隐自动生效
const visibleItems = computed(() => props.formItems.filter((item) => item.hidden !== true));

function transformModelValue(component: Component, key = "modelValue") {
  return {
    setup: (props: any, { slots, emit, attrs }: any) => {
      return () => {
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
  input: transformModelValue(Input),
  textarea: transformModelValue(Input, "modelValue"),
  number: transformModelValue(InputNumber),
  date: transformModelValue(DatePicker),
  select: transformModelValue(Select),
  checkbox: transformModelValue(Checkbox, "modelValue"),
};

// 传给渲染组件的 props 要剔除表单布局用的字段（omit 只接受属性名，正则需用 omitBy 过滤）
const baseFieldReg = /^(label|key|type|span|hidden|slots|props|rules)$/;

function getComponent(item: FormItem): Component {
  // type 直接传组件（函数式组件或有状态组件）
  if (item.type && typeof item.type !== "string") return item.type as Component;
  const key = typeof item.type === "string" ? item.type : "input";
  return map[key] ?? map.input;
}

function getProps(item: FormItem) {
  if (item.props) return item.props;
  return omitBy(item, (_value, key) => baseFieldReg.test(key ?? ""));
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

const formRef = ref();

function validate() {
  return formRef.value?.validate();
}

defineExpose({ validate });
</script>

<template>
  <el-form ref="formRef" v-bind="formConfig" :rules="rules" :model="formData">
    <el-row :gutter="16">
      <el-col v-for="item in visibleItems" :key="item.key" :span="item.span || span">
        <el-form-item :label="item.label" :prop="item.key">
          <!-- 外面传了 #key 插槽时以插槽为准 -->
          <slot :name="item.key">
            <ComponentItem :item="item"></ComponentItem>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
