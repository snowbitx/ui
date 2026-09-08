<script setup lang="ts">
/**
 * 文档站专用的纯 HTML 提示条，不依赖任何 UI 库。
 */
defineOptions({
  name: 'DemoAlert',
})

const props = withDefaults(
  defineProps<{
    /** info / warning */
    type?: 'info' | 'warning'
  }>(),
  { type: 'info' },
)
</script>

<template>
  <div class="demo-alert" :class="props.type">
    <slot></slot>
  </div>
</template>

<style scoped>
.demo-alert {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 16px;
}
.demo-alert.info {
  background: #e6f4ff;
  border: 1px solid #91caff;
  color: #0958d9;
}
.demo-alert.warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  color: #d48806;
}
</style>
