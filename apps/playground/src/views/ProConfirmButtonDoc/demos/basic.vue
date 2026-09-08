<script setup lang="ts">
import { ref } from 'vue'
import { ProConfirmButton, uiMessage } from '@/ui'
import DemoSpace from '@/components/DemoSpace/index.vue'

defineOptions({
  name: 'ProConfirmButtonDemo',
})

const count = ref(3)

function removeItem() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count.value -= 1
      uiMessage.success(`删除成功，剩余 ${count.value} 项`)
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <DemoSpace>
    <ProConfirmButton type="primary" danger title="确定删除该项吗？" :on-confirm="removeItem">
      删除（还剩 {{ count }} 项）
    </ProConfirmButton>
    <ProConfirmButton :on-confirm="() => uiMessage.info('同步操作也支持')">同步确认</ProConfirmButton>
  </DemoSpace>
</template>
