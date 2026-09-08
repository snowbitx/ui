<script setup lang="ts">
import { ref } from 'vue'
import { ProModal, ProInput, ProButton } from '@/ui'

defineOptions({
  name: 'ProModalBasicDemo',
})

const open = ref(false)
const name = ref('')

// beforeOk 里做校验/保存：返回 false 或抛错就拦截关闭
function beforeOk() {
  if (!name.value) {
    return Promise.reject(new Error('名称必填'))
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('保存：', name.value)
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <div>
    <ProButton type="primary" @click="open = true">打开弹窗</ProButton>
    <ProModal v-model:open="open" title="编辑名称" :before-ok="beforeOk">
      <ProInput v-model="name" placeholder="名称（留空点确定试试拦截）" />
    </ProModal>
  </div>
</template>
