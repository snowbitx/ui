<script setup lang="ts">
import { openDialog, createApis } from '@/ui'
import UserForm from './UserForm.vue'

defineOptions({
  name: 'OpenDialogBasicDemo',
})

const apis = createApis('/api/goods')

function openCreate() {
  openDialog(
    UserForm,
    {
      // 新增：空表单；修改：把整行数据传进去
      formData: { name: '', price: 0 },
      requestApi: apis.create,
    },
    {
      title: '新增商品',
      onOk: () => {
        console.log('保存成功，这里可以刷新列表')
      },
    },
  )
}

defineExpose({ openCreate })
</script>

<template>
  <a-button type="primary" @click="openCreate">新增商品（命令式弹窗）</a-button>
</template>
