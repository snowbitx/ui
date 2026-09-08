<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { ProConfirmButton } from '@/ui'

defineOptions({
  name: 'ProConfirmButtonDemo',
})

const count = ref(3)

function removeItem() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count.value -= 1
      message.success(`删除成功，剩余 ${count.value} 项`)
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <a-space>
    <ProConfirmButton type="primary" danger title="确定删除该项吗？" :on-confirm="removeItem">
      删除（还剩 {{ count }} 项）
    </ProConfirmButton>
    <ProConfirmButton :on-confirm="() => message.info('同步操作也支持')">同步确认</ProConfirmButton>
  </a-space>
</template>
