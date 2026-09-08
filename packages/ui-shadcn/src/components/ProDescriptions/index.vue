<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

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
  /** 是否带边框（对齐 antd 的 bordered） */
  bordered?: boolean;
  /** 每行列数 */
  column?: string | number;
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
  <div v-bind="{ ...$attrs, class: undefined, style: undefined }" :class="cn('grid gap-x-8 gap-y-0 text-sm', ($attrs.class as any))" :style="($attrs.style as any)">
    <template v-for="row in rows" :key="row.label">
      <div
        class="py-3 text-muted-foreground text-sm"
        :class="bordered ? 'border-b px-4 bg-muted/40' : 'border-b'"
      >
        {{ row.label }}
      </div>
      <div class="py-3 border-b" :class="bordered ? 'px-4' : ''">
        <slot name="value" :label="row.label" :value="row.value">
          {{ row.value }}
        </slot>
      </div>
    </template>
  </div>
</template>
