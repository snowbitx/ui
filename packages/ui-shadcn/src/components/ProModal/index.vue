<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";

defineOptions({
  name: "ProModal",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 点确定时先执行：返回 false 或 reject 则不关闭（适合放校验/保存逻辑） */
    beforeOk?: () => Promise<any> | any;
    /** 标题 */
    title?: string;
    /** 弹窗宽度，对齐 antd 的 width（数字按 px，字符串原样） */
    width?: string | number;
    /** 确定按钮文案 */
    okText?: string;
    /** 取消按钮文案 */
    cancelText?: string;
  }>(),
  {
    title: "",
    okText: "确 定",
    cancelText: "取 消",
  },
);

const emit = defineEmits(["ok", "cancel"]);

const open = defineModel<boolean>("open", { default: false });

const isLoading = ref(false);

watch(open, (value) => {
  // 每次打开时复位 loading
  if (value) isLoading.value = false;
});

const widthStyle = computed(() => {
  if (!props.width) return undefined;
  return { width: typeof props.width === "number" ? `${props.width}px` : props.width, maxWidth: "calc(100% - 2rem)" };
});

// DialogContent 默认有关闭按钮和 gap-4 布局；footer 通过插槽透传由本组件组装
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

function handleCancel() {
  open.value = false;
  emit("cancel");
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent :style="widthStyle" v-bind="{ ...$attrs, class: undefined, style: undefined, title: undefined }">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>

      <div class="py-1">
        <slot></slot>
      </div>

      <DialogFooter v-if="!$slots.footer" class="gap-2">
        <Button variant="outline" @click="handleCancel">{{ cancelText }}</Button>
        <Button :disabled="isLoading || undefined" @click="handleOk">
          <Loader v-if="isLoading" class="text-current" />
          {{ okText }}
        </Button>
      </DialogFooter>
      <slot v-else name="footer"></slot>
    </DialogContent>
  </Dialog>
</template>
