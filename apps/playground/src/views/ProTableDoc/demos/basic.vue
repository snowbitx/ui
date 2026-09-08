<script setup lang="ts">
import { ProTable, createApis } from '@snowbitx/ui'

defineOptions({
  name: 'ProTableBasicDemo',
})

const apis = createApis('/api/users')

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '类型', dataIndex: 'type' },
]

const formItems = [
  { label: '姓名', key: 'name', type: 'input' },
  { label: '年龄', key: 'age' },
  { label: '类型', key: 'type' },
]

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  age: [{ required: true, message: '请输入年龄' }],
}
</script>

<template>
  <ProTable :apis="apis" :columns="columns" :form-items="formItems" :rules="rules" />
</template>
