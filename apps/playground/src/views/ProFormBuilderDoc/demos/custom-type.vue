<script setup lang="ts">
import { ref } from 'vue'
import { ProFormBuilder } from '@/ui'

defineOptions({
  name: 'ProFormBuilderCustomTypeDemo',
})

const formData = ref<Record<string, any>>({
  name: '',
  gender: '男',
  enabled: true,
})

const formItems = [
  { label: '姓名', key: 'name', type: 'input' },
  // select：选项通过 options 透传给内部选择组件
  {
    label: '性别',
    key: 'gender',
    type: 'select',
    options: [
      { value: '男', label: '男' },
      { value: '女', label: '女' },
    ],
  },
  // checkbox：v-model 绑定的是 checked 而不是 value，组件内部已处理
  { label: '启用', key: 'enabled', type: 'checkbox' },
]
</script>

<template>
  <ProFormBuilder v-model="formData" :form-items="formItems" />
  <p>当前数据：{{ JSON.stringify(formData) }}</p>
</template>
