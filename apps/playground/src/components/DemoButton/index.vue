<script setup lang="ts">
/**
 * 文档站专用的通用按钮（替代 a-button / el-button 的直接使用）。
 * demo 里按钮只是触发交互的载体，用纯 HTML 实现保证两种模式下都能用；
 * 演示 ProButton 的案例请直接用 ProButton。
 */
defineOptions({
  name: 'DemoButton',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'default' | 'dashed'
    danger?: boolean
  }>(),
  { type: 'default', danger: false },
)
</script>

<template>
  <button class="demo-btn" :class="[props.type, { danger: props.danger }]" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.demo-btn {
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #333;
  border-radius: 6px;
  padding: 5px 16px;
  font-size: 14px;
  cursor: pointer;
  line-height: 1.5;
}
.demo-btn:hover {
  border-color: #1677ff;
  color: #1677ff;
}
.demo-btn.primary {
  background: #1677ff;
  border-color: #1677ff;
  color: #fff;
}
.demo-btn.primary:hover {
  background: #4096ff;
}
.demo-btn.dashed {
  border-style: dashed;
}
.demo-btn.danger:not(.primary) {
  border-color: #ff4d4f;
  color: #ff4d4f;
}
.demo-btn.danger.primary {
  background: #ff4d4f;
  border-color: #ff4d4f;
}
</style>
