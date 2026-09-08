<script setup lang="ts">
import { computed } from "vue";
import { useOptions } from "@snowbitx/ui-core";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

defineOptions({
  name: "ProSelect",
  inheritAttrs: false,
});

const props = defineProps<{
  /** 选项数据源：静态数组 / 字符串数组 / 返回数组的函数（远程字典） */
  options?: any;
  /** options 里 label / value 的字段名，元素不是 {label, value} 结构时用 */
  labelField?: string;
  valueField?: string;
  /** 远程字典的依赖值，变化时自动重新拉取 */
  deps?: any;
  /** 占位文本 */
  placeholder?: string;
  /** 多选（对齐 antd 的 mode="multiple"；也支持跨库统一的布尔 multiple） */
  mode?: string;
  /** 是否多选（布尔写法，与 ui-antd / ui-element 对齐） */
  multiple?: boolean;
  /** 禁用 */
  disabled?: boolean;
}>();

const emit = defineEmits(["change"]);

const model = defineModel<any>();

const { options: innerOptions, isLoading } = useOptions({
  options: computed(() => props.options),
  deps: computed(() => props.deps),
});

const multiple = computed(() => props.mode === "multiple" || props.multiple === true);

function toOption(item: any) {
  if (item && typeof item === "object" && "label" in item) return item;
  return {
    label: props.labelField ? item[props.labelField] : item,
    value: props.valueField ? item[props.valueField] : item,
  };
}

const normalizedOptions = computed(() => innerOptions.value.map(toOption));

const displayText = computed(() => {
  if (model.value == null || model.value === "" || (Array.isArray(model.value) && !model.value.length)) {
    return "";
  }
  const values = Array.isArray(model.value) ? model.value : [model.value];
  const labels = values.map((v) => normalizedOptions.value.find((o) => o.value === v)?.label ?? v);
  return labels.join("、");
});

function onValueChange(value: any) {
  emit("change", value, value);
}
</script>

<template>
  <Select
    v-model="model"
    :multiple="multiple"
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    @update:model-value="onValueChange"
  >
    <SelectTrigger
      :disabled="disabled || isLoading || undefined"
      :style="($attrs.style as any) || (props as any).style"
      :class="(($attrs.class as any) || (props as any).class) + ' w-full min-w-40'"
    >
      <SelectValue :placeholder="placeholder">{{ displayText }}</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="opt in normalizedOptions" :key="opt.value" :value="opt.value" :disabled="opt.disabled">
        {{ opt.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
