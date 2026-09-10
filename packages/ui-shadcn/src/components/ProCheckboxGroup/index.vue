<script setup lang="ts">
import { computed } from "vue";
import { useOptions } from "@cynnie/ui-core";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

defineOptions({
  name: "ProCheckboxGroup",
  inheritAttrs: false,
});

const props = defineProps<{
  /** 选项数据源：静态数组 / 字符串数组 / 返回数组的函数（远程字典） */
  options?: any;
  /** options 里 label / value 的字段名 */
  labelField?: string;
  valueField?: string;
  /** 远程字典的依赖值，变化时自动重新拉取 */
  deps?: any;
}>();

const model = defineModel<any[]>();

const { options: innerOptions } = useOptions({
  options: computed(() => props.options),
  deps: computed(() => props.deps),
});

function toOption(item: any) {
  if (item && typeof item === "object" && "label" in item) return item;
  return {
    label: props.labelField ? item[props.labelField] : item,
    value: props.valueField ? item[props.valueField] : item,
  };
}

const normalizedOptions = computed(() => innerOptions.value.map(toOption));

function isChecked(value: any) {
  return Array.isArray(model.value) && model.value.includes(value);
}

function toggle(value: any, checked: boolean | "indeterminate") {
  const list = Array.isArray(model.value) ? [...model.value] : [];
  const index = list.indexOf(value);
  if (checked === true && index === -1) list.push(value);
  if (checked === false && index !== -1) list.splice(index, 1);
  model.value = list;
}
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined, style: undefined }" :class="cn('flex flex-wrap items-center gap-x-6 gap-y-2', ($attrs.class as any))" :style="($attrs.style as any)">
    <label
      v-for="opt in normalizedOptions"
      :key="opt.value"
      class="flex cursor-pointer items-center gap-2 text-sm font-normal has-[[data-state=checked]]:text-primary has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50"
    >
      <Checkbox :model-value="isChecked(opt.value)" :disabled="opt.disabled" @update:model-value="(v: any) => toggle(opt.value, v)" />
      {{ opt.label }}
    </label>
  </div>
</template>
