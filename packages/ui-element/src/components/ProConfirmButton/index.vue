<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

defineOptions({
  name: "ProConfirmButton",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 确认框标题 */
    title?: string;
    /** 确认执行函数：返回 Promise 时确认按钮自动进入 loading */
    onConfirm?: () => Promise<any> | any;
  }>(),
  {
    title: "确定执行此操作吗？",
  },
);

const isLoading = ref(false);

async function handleClick() {
  try {
    await ElMessageBox.confirm(props.title, "提示", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
  } catch {
    return; // 用户取消
  }
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
  <el-button v-bind="$attrs" :loading="isLoading || undefined" @click="handleClick">
    <slot></slot>
  </el-button>
</template>
