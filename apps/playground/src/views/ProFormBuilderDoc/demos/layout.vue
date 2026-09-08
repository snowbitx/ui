<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProFormBuilder } from '@snowbitx/ui'

defineOptions({
  name: 'ProFormBuilderLayoutDemo',
})

const formData = ref<Record<string, any>>({
  name: '',
  age: undefined,
  birthday: '',
  city: undefined,
  extra: '',
})

// options 也可以从远程拿，用 computed 包住实现响应式
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
]

// 联动：选了城市才显示"备注"，否则自动隐藏
const formItems = computed(() => [
  { label: '姓名', key: 'name', type: 'input', span: 12 },
  { label: '年龄', key: 'age', type: 'number', span: 12 },
  { label: '出生日期', key: 'birthday', type: 'date', span: 12 },
  { label: '城市', key: 'city', type: 'select', span: 12, options: cityOptions },
  { label: '备注', key: 'extra', type: 'textarea', hidden: !formData.value.city },
])

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  city: [{ required: true, message: '请选择城市' }],
}
</script>

<template>
  <div>
    <ProFormBuilder v-model="formData" :form-items="formItems" :rules="rules" />
    <p>当前数据：{{ JSON.stringify(formData) }}</p>
  </div>
</template>
