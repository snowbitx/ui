<script lang="ts" setup>
import { Checkbox as ShadCheckbox, Input as ShadInput, Select as ShadSelect, SelectTrigger as ShadSelectTrigger, SelectValue as ShadSelectValue, SelectContent as ShadSelectContent, SelectItem as ShadSelectItem, Textarea as ShadTextarea } from "../ui";
import { omitBy } from "lodash-es";
import { computed, h, ref, type Component } from "vue";
import type { FormItem } from "@snowbitx/ui-core";

defineOptions({
  name: "ProFormBuilder",
});

const props = defineProps<{
  formItems: FormItem[];
  rules?: Record<string, any>;
  /** 全局栅格数（24 分制），单项可用 item.span 覆盖 */
  span?: number;
  /** 兼容参数：shadcn 版暂不消费（保留与其他实现对齐） */
  formConfig?: Record<string, any>;
}>();

const formData = defineModel<Record<string, any>>({ default: () => ({}) });

const span = computed(() => props.span ?? 24);

// hidden 过滤放 computed：formItems 用 computed 传响应式配置时，联动显隐自动生效
const visibleItems = computed(() => props.formItems.filter((item) => item.hidden !== true));

// 传给渲染组件的 props 要剔除表单布局用的字段（omit 只接受属性名，正则需用 omitBy 过滤）
const baseFieldReg = /^(label|key|type|span|hidden|slots|props|rules)$/;

function getProps(item: FormItem) {
  if (item.props) return item.props;
  return omitBy(item, (_value, key) => baseFieldReg.test(key ?? ""));
}

/** 单项渲染出来的统一形态：受控 modelValue + 透传 props */
function renderFormItem(item: FormItem, component: Component, extraProps: Record<string, any> = {}) {
  return h(
    component,
    {
      ...getProps(item),
      ...extraProps,
      modelValue: formData.value[item.key],
      "onUpdate:modelValue": (value: any) => {
        formData.value[item.key] = value;
      },
    },
    // 配置式插槽优先，其次是组件使用者通过 #key 模板插槽自定义的内容（外层已处理）
    item.slots,
  );
}

// select 类默认 placeholder 用"请选择"，其余用"请输入"
const selectType = new Set(["select", "date"]);

/** 单项 → 对应组件 vnode（与 antd / element 版的 ComponentItem 渲染逻辑对齐） */
function renderItemVNode(item: FormItem) {
  // type 直接传组件（函数式组件或有状态组件）
  if (item.type && typeof item.type !== "string") {
    return renderFormItem(item, item.type as Component);
  }
  const type = typeof item.type === "string" ? item.type : "input";
  const label = item.label || "";

  switch (type) {
    case "textarea":
      return renderFormItem(item, ShadTextarea, {
        placeholder: "请输入" + label,
        rows: 3,
      });
    case "number":
      return renderFormItem(item, ShadInput, {
        type: "number",
        placeholder: "请输入" + label,
      });
    case "date":
      return renderFormItem(item, ShadInput, {
        type: "date",
        placeholder: "请选择" + label,
      });
    case "select": {
      const rest = getProps(item);
      const options = (rest.options ?? []).map((opt: any) => {
        if (opt && typeof opt === "object" && "label" in opt) return opt;
        return { label: opt, value: opt };
      });
      const labelField = rest.labelField;
      const valueField = rest.valueField;
      const normalized = options.map((opt: any) => ({
        label: labelField ? opt[labelField] : opt.label,
        value: valueField ? opt[valueField] : opt.value,
      }));
      return h(
        ShadSelect,
        {
          modelValue: formData.value[item.key],
          "onUpdate:modelValue": (value: any) => {
            formData.value[item.key] = value;
          },
        },
        {
          default: () => [
            h(ShadSelectTrigger, { class: "w-full" }, () =>
              h(ShadSelectValue, { placeholder: "请选择" + label }),
            ),
            h(ShadSelectContent, {}, () =>
              normalized.map((opt: any) =>
                h(ShadSelectItem, { key: opt.value, value: opt.value, disabled: opt.disabled }, () => opt.label),
              ),
            ),
          ],
        },
      );
    }
    case "checkbox":
      return h("label", { class: "flex cursor-pointer items-center gap-2 text-sm" }, [
        h(ShadCheckbox, {
          modelValue: formData.value[item.key] === true,
          "onUpdate:modelValue": (value: any) => {
            formData.value[item.key] = value === true;
          },
        }),
        label,
      ]);
    default:
      // input 及未识别类型都走输入框
      return renderFormItem(item, ShadInput, {
        placeholder: "请输入" + label,
      });
  }
}

/** 校验单个字段的规则：返回错误文案或空串 */
function validateField(key: string): string {
  const ruleList = (props.rules as any)?.[key];
  if (!ruleList || !ruleList.length) return "";
  const value = formData.value?.[key];
  for (const rule of ruleList) {
    if (rule.required) {
      const empty = value == null || value === "" || (Array.isArray(value) && !value.length);
      if (empty) return rule.message || `${key} 不能为空`;
    }
    if (rule.min != null && typeof value === "number" && value < rule.min) {
      return rule.message || `不能小于 ${rule.min}`;
    }
    if (rule.max != null && typeof value === "number" && value > rule.max) {
      return rule.message || `不能大于 ${rule.max}`;
    }
    if (rule.pattern && typeof value === "string" && !rule.pattern.test(value)) {
      return rule.message || "格式不正确";
    }
    if (typeof rule.validator === "function") {
      // 同步 validator 返回 false 视为失败；异步 validator 由调用方捕获
      const result = rule.validator(undefined, value);
      if (result instanceof Promise) {
        result.catch(() => {});
      } else if (result === false) {
        return rule.message || "校验不通过";
      }
    }
  }
  return "";
}

const errors = ref<Record<string, string>>({});

const formRef = ref();

/** 校验全部字段：通过 resolve，不通过 reject（与 a-form / el-form 行为对齐） */
function validate() {
  const failed: Record<string, string> = {};
  for (const item of visibleItems.value) {
    const message = validateField(item.key);
    if (message) failed[item.key] = message;
  }
  errors.value = failed;
  if (Object.keys(failed).length) {
    return Promise.reject(new Error("校验失败"));
  }
  return Promise.resolve(true);
}

function clearValidate() {
  errors.value = {};
}

defineExpose({ validate, clearValidate, errors, formRef });
</script>

<template>
  <div ref="formRef">
    <div class="flex flex-wrap -mx-2">
      <div
        v-for="item in visibleItems"
        :key="item.key"
        class="px-2 py-2 box-border"
        :style="{ width: `${((item.span || span) / 24) * 100}%` }"
      >
        <div class="flex items-start gap-2">
          <label
            v-if="item.label"
            class="shrink-0 text-sm font-medium leading-9 h-9 flex items-center"
            :class="errors[item.key] ? 'text-destructive' : ''"
          >
            {{ item.label }}
          </label>
          <div class="min-w-0 flex-1">
            <!-- 外面传了 #key 插槽时以插槽为准 -->
            <slot :name="item.key">
              <component :is="() => renderItemVNode(item)"></component>
            </slot>
          </div>
        </div>
        <div v-if="errors[item.key]" class="mt-1 text-xs text-destructive">{{ errors[item.key] }}</div>
      </div>
    </div>
  </div>
</template>
