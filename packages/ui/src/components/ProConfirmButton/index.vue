<script setup lang="ts">
import { ref } from "vue";

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
  }>(),
  {
    title: "确定执行此操作吗？",
  },
);

const isLoading = ref(false);

async function handleConfirm() {
  if (!props.onConfirm) return;
  const result = props.onConfirm();
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
  <a-popconfirm :title="title" :ok-button-props="{ loading: isLoading }" @confirm="handleConfirm">
    <a-button v-bind="$attrs">
      <slot></slot>
    </a-button>
  </a-popconfirm>
</template>
