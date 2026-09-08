<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

defineOptions({
  name: "ProButton",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 点击后 delay 毫秒内再次点击不生效（防抖） */
    debounce?: number;
    /** 点击处理函数：返回 Promise 时按钮自动进入 loading 直到结束 */
    onClick?: (...args: any[]) => any;
  }>(),
  {
    debounce: 0,
  },
);

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
  <a-button v-bind="$attrs" :loading="isLoadingOrDebouncing || undefined" @click="handleClick">
    <slot></slot>
  </a-button>
</template>
