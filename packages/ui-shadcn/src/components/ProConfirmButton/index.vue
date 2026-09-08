<script lang="ts">
import { CircleAlertIcon } from "lucide-vue-next";
export default { components: { CircleAlertIcon } };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader } from "../ui/loader";

defineOptions({
  name: "ProConfirmButton",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 气泡确认框标题 */
    title?: string;
    /** 确认执行函数：返回 Promise 时确认按钮自动进入 loading */
    onConfirm?: () => Promise<any> | any;
    /** 按钮风格，对齐 antd 的 type */
    type?: "primary" | "default" | "dashed" | "text" | "link";
    /** 危险按钮（红色） */
    danger?: boolean;
    /** 确认按钮文案 */
    okText?: string;
    /** 取消按钮文案 */
    cancelText?: string;
  }>(),
  {
    title: "确定执行此操作吗？",
    type: "default",
    danger: false,
    okText: "确 定",
    cancelText: "取 消",
  },
);

const isLoading = ref(false);
const popOpen = ref(false);

const variant = props.danger ? "destructive" : props.type === "primary" ? "default" : "outline";

async function handleConfirm() {
  if (!props.onConfirm) {
    popOpen.value = false;
    return;
  }
  const result = props.onConfirm();
  if (result instanceof Promise) {
    isLoading.value = true;
    try {
      await result;
    } finally {
      isLoading.value = false;
      popOpen.value = false;
    }
  } else {
    popOpen.value = false;
  }
}
</script>

<template>
  <Popover v-model:open="popOpen">
    <PopoverTrigger as-child>
      <Button :variant="variant" v-bind="{ ...$attrs, class: undefined }" :class="($attrs.class as any)">
        <slot></slot>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto max-w-[280px] p-4">
      <div class="flex items-start gap-2">
        <CircleAlertIcon class="mt-0.5 size-4 text-amber-500 shrink-0" />
        <div class="text-sm">{{ title }}</div>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <Button size="sm" variant="outline" @click="popOpen = false">{{ cancelText }}</Button>
        <Button size="sm" :variant="danger ? 'destructive' : 'default'" :disabled="isLoading || undefined" @click="handleConfirm">
          <Loader v-if="isLoading" class="text-current" />
          {{ okText }}
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
