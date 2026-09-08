<script setup lang="ts">
import { computed } from "vue";
import { useOptions } from "@snowbitx/ui-core";

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
}>();

const model = defineModel<any>();

const { options: innerOptions, isLoading } = useOptions({
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
</script>

<template>
  <a-select
    v-bind="$attrs"
    v-model:value="model"
    :options="innerOptions.map(toOption)"
    :loading="isLoading || undefined"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </a-select>
</template>
