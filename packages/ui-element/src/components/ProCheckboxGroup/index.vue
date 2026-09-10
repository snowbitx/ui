<script setup lang="ts">
import { computed } from "vue";
import { useOptions } from "@cynnie/ui-core";

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
</script>

<template>
  <el-checkbox-group v-bind="$attrs" v-model="model">
    <el-checkbox v-for="opt in innerOptions.map(toOption)" :key="opt.value" :label="opt.label" :value="opt.value" />
  </el-checkbox-group>
</template>
