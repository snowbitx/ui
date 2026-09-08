<script setup lang="ts">
import { ref, watch } from "vue";

defineOptions({
  name: "ProModal",
});

const props = withDefaults(
  defineProps<{
    /** 点确定时先执行：返回 false 或 reject 则不关闭（适合放校验/保存逻辑） */
    beforeOk?: () => Promise<any> | any;
  }>(),
  {},
);

const emit = defineEmits(["ok"]);

const open = defineModel<boolean>("open", { default: false });
const isLoading = ref(false);

watch(open, (value) => {
  // 每次打开时复位 loading
  if (value) isLoading.value = false;
});

async function handleOk() {
  if (props.beforeOk) {
    isLoading.value = true;
    try {
      const result = await props.beforeOk();
      // 显式返回 false 视为拦截
      if (result === false) return;
    } catch {
      // 抛错同样拦截，不关闭
      return;
    } finally {
      isLoading.value = false;
    }
  }
  open.value = false;
  emit("ok");
}
</script>

<template>
  <a-modal v-bind="$attrs" v-model:open="open" :confirm-loading="isLoading" @ok="handleOk">
    <slot></slot>
  </a-modal>
</template>
