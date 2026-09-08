<script setup lang="ts">
/**
 * 文档站专用的纯 HTML 按钮组（替代 a-space）：demo 布局不依赖任何 UI 库。
 */
defineOptions({
  name: 'DemoSpace',
  inheritAttrs: false,
})
</script>

<template>
  <div class="demo-space" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style scoped>
.demo-space {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.demo-space.vertical,
.demo-space[vertical] {
  flex-direction: column;
  align-items: stretch;
}
</style>
