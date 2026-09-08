<script setup lang="ts">
import { ref } from 'vue'
import { ProButton, ProFormBuilder } from '@/ui'
import DemoSpace from '@/components/DemoSpace/index.vue'

defineOptions({
  name: 'ProFormBuilderBasicDemo',
})

const formData = ref<Record<string, any>>({
  name: '张三',
  age: 18,
})

const formItems = [
  { label: '姓名', key: 'name', type: 'input' },
  { label: '年龄', key: 'age' },
]

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  age: [{ required: true, message: '请输入年龄' }],
}

const emit = defineEmits(['bind', 'validate'])

const formRef = ref()

emit('bind', formData)

// 把表单实例传给文档页，页面上的"当前校验状态"由 ProFormBuilder.validate 的结果驱动
function onValidateClick() {
  emit('validate', formRef.value)
}
</script>

<template>
  <div>
    <ProFormBuilder ref="formRef" v-model="formData" :form-items="formItems" :rules="rules" />
    <DemoSpace>
      <ProButton type="primary" @click="onValidateClick">校验（在上方点）</ProButton>
      <ProButton @click="formData = { name: '', age: 0 }">重置数据</ProButton>
    </DemoSpace>
  </div>
</template>
