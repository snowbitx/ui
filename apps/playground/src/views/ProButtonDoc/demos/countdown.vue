<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ProCountdownButton } from '@snowbitx/ui'

defineOptions({
  name: 'ProButtonCountdownDemo',
})

// 模拟发送验证码
function sendCode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success('验证码已发送')
      resolve(true)
    }, 800)
  })
}
</script>

<template>
  <a-space>
    <ProCountdownButton type="primary" :seconds="10" :on-click="sendCode">发送验证码</ProCountdownButton>
    <ProCountdownButton :seconds="5" counting-text="剩余 {n} 秒" :on-click="sendCode"
      >自定义倒计时文案</ProCountdownButton
    >
  </a-space>
</template>
