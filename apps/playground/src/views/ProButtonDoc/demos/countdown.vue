<script setup lang="ts">
import { ProCountdownButton, uiMessage } from '@/ui'
import DemoSpace from '@/components/DemoSpace/index.vue'

defineOptions({
  name: 'ProButtonCountdownDemo',
})

// 模拟发送验证码
function sendCode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      uiMessage.success('验证码已发送')
      resolve(true)
    }, 800)
  })
}
</script>

<template>
  <DemoSpace>
    <ProCountdownButton type="primary" :seconds="10" :on-click="sendCode">发送验证码</ProCountdownButton>
    <ProCountdownButton :seconds="5" counting-text="剩余 {n} 秒" :on-click="sendCode"
      >自定义倒计时文案</ProCountdownButton
    >
  </DemoSpace>
</template>
