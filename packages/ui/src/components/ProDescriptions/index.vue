<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "ProDescriptions",
  inheritAttrs: false,
});

export interface DescriptionItem {
  /** 标签 */
  label: string;
  /** 字段名 */
  key: string;
  /** 自定义渲染，返回字符串或 vnode */
  render?: (value: any, record: Record<string, any>) => any;
}

const props = defineProps<{
  /** 描述项配置 */
  items: DescriptionItem[];
  /** 数据对象 */
  data: Record<string, any>;
  /** 空值占位符 */
  emptyText?: string;
}>();

const rows = computed(() =>
  props.items.map((item) => ({
    label: item.label,
    value: renderValue(item),
  })),
);

function renderValue(item: DescriptionItem) {
  const value = props.data?.[item.key];
  if (item.render) return item.render(value, props.data);
  if (value === undefined || value === null || value === "") return props.emptyText ?? "-";
  return value;
}
</script>

<template>
  <a-descriptions v-bind="$attrs">
    <a-descriptions-item v-for="row in rows" :key="row.label" :label="row.label">
      <slot name="value" :label="row.label" :value="row.value">
        {{ row.value }}
      </slot>
    </a-descriptions-item>
  </a-descriptions>
</template>
