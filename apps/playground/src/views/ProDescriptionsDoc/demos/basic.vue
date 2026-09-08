<script setup lang="ts">
import { ref } from 'vue'
import { ProDescriptions, ProButton } from '@/ui'

defineOptions({
  name: 'ProDescriptionsDemo',
})

const data = ref<Record<string, any>>({
  name: '张三',
  age: 18,
  type: 'admin',
  remark: '',
})

const items = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  {
    label: '类型',
    key: 'type',
    render: (value: string) => (value === 'admin' ? '管理员' : '普通用户'),
  },
  { label: '备注', key: 'remark' },
]
</script>

<template>
  <div>
    <ProDescriptions :items="items" :data="data" bordered column="2" />
    <ProButton style="margin-top: 16px" @click="data = { name: '李四' }">换一条空数据（看空值占位）</ProButton>
  </div>
</template>
