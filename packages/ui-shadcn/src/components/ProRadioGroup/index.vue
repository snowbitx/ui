<script setup lang="ts">
import { computed } from "vue";
import { useOptions } from "@cynnie/ui-core";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "../../lib/utils";

defineOptions({
  name: "ProRadioGroup",
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
  /** 按钮样式（对齐 antd 的 option-type="button"，shadcn 版渲染为胶囊分段控件） */
  optionType?: string;
}>();

const model = defineModel<any>();

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

function onValueChange(value: any) {
  model.value = value;
}
</script>

<template>
  <!-- button 样式：胶囊分段控件 -->
  <div
    v-if="optionType === 'button'"
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="cn('inline-flex rounded-md border p-0.5 bg-muted/40', ($attrs.class as any))"
    :style="($attrs.style as any)"
  >
    <button
      v-for="opt in normalizedOptions"
      :key="opt.value"
      type="button"
      :disabled="opt.disabled"
      class="rounded-[4px] px-3 py-1 text-sm transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      :class="model === opt.value ? 'bg-background text-foreground shadow-xs font-medium' : 'text-muted-foreground hover:text-foreground'"
      @click="onValueChange(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>

  <!-- 默认圆点样式 -->
  <RadioGroup
    v-else
    :model-value="model"
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="cn('flex flex-wrap items-center gap-x-6 gap-y-2', ($attrs.class as any))"
    :style="($attrs.style as any)"
    @update:model-value="onValueChange"
  >
    <label
      v-for="opt in normalizedOptions"
      :key="opt.value"
      class="flex cursor-pointer items-center gap-2 text-sm font-normal has-[[data-state=checked]]:text-primary has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50"
    >
      <RadioGroupItem :value="opt.value" :disabled="opt.disabled" />
      {{ opt.label }}
    </label>
  </RadioGroup>
</template>
