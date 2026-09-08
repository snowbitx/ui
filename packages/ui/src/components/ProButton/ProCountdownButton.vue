<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ProCountdownButton",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 倒计时秒数 */
    seconds?: number;
    /** 倒计时期间按钮文案，{} 会替换为剩余秒数 */
    countingText?: string;
    /** 点击处理函数：返回 Promise 且 resolve 后才开始倒计时（适合发验证码接口） */
    onClick?: (...args: any[]) => any;
  }>(),
  {
    seconds: 60,
    countingText: "{n}s 后重发",
  },
);

const remaining = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
}

async function handleClick(...args: any[]) {
  if (remaining.value > 0) return;

  if (props.onClick) {
    const result = props.onClick(...args);
    if (result instanceof Promise) await result;
  }

  remaining.value = props.seconds;
  timer = setInterval(() => {
    remaining.value -= 1;
    if (remaining.value <= 0) stopTimer();
  }, 1000);
}
</script>

<template>
  <a-button v-bind="$attrs" :disabled="remaining > 0 || undefined" @click="handleClick">
    <template v-if="remaining > 0">{{
      props.countingText.replace("{n}", String(remaining))
    }}</template>
    <slot v-else></slot>
  </a-button>
</template>
