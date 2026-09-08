<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { Button, type ButtonVariants } from "../ui/button";
import { Loader } from "../ui/loader";
import { cn } from "../../lib/utils";

defineOptions({
  name: "ProButton",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 按钮风格，对齐 antd 的 type + danger 组合：primary / default / dashed / text / link */
    type?: "primary" | "default" | "dashed" | "text" | "link";
    /** 危险按钮（红色） */
    danger?: boolean;
    /** 点击后 delay 毫秒内再次点击不生效（防抖） */
    debounce?: number;
    /** 点击处理函数：返回 Promise 时按钮自动进入 loading 直到结束 */
    onClick?: (...args: any[]) => any;
  }>(),
  {
    type: "default",
    danger: false,
    debounce: 0,
  },
);

// antd 的 type/danger 映射到 shadcn 的 variant
const variant = computed<ButtonVariants["variant"]>(() => {
  if (props.danger) return "destructive";
  switch (props.type) {
    case "primary":
      return "default";
    case "dashed":
      return "outline";
    case "text":
      return "ghost";
    case "link":
      return "link";
    default:
      return "outline";
  }
});

const isLoading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

const isLoadingOrDebouncing = computed(() => {
  if (isLoading.value) return true;
  // 防抖期间给视觉反馈，避免用户误以为没点上
  return props.debounce > 0 && timer !== undefined;
});

async function handleClick(...args: any[]) {
  if (props.debounce > 0) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = undefined;
    }, props.debounce);
  }

  if (!props.onClick) return;
  const result = props.onClick(...args);
  if (result instanceof Promise) {
    isLoading.value = true;
    try {
      await result;
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <Button
    :variant="variant"
    :disabled="isLoadingOrDebouncing || undefined"
    :class="cn($attrs.class)"
    :style="$attrs.style as any"
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    @click="handleClick"
  >
    <Loader v-if="isLoadingOrDebouncing" class="text-current" />
    <slot></slot>
  </Button>
</template>
