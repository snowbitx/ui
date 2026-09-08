<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ProButton } from '@/ui'

defineOptions({
  name: 'ProButtonBasicDemo',
})

// 模拟一个异步请求
function save() {
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success('保存成功')
      resolve(true)
    }, 1500)
  })
}
</script>

<template>
  <a-space>
    <ProButton type="primary" :debounce="500" :on-click="save">防抖 + 自动 loading</ProButton>
    <ProButton :debounce="800" :on-click="() => message.info('快速点击只触发一次')"
      >防抖 800ms（连点试试）</ProButton
    >
    <ProButton type="dashed" @click="message.info('不传 onClick 就是普通按钮')">普通按钮</ProButton>
  </a-space>
</template>
