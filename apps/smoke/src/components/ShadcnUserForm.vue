<script setup lang="ts">
import { ref } from 'vue'
import ProFormBuilder from '@snowbitx/ui-shadcn/components/ProFormBuilder'

defineOptions({
  name: 'ShadcnUserForm',
})

const props = defineProps<{
  formData: Record<string, any>
}>()

const data = ref({ ...props.formData })

const formRef = ref()

const formItems = [
  { label: '姓名', key: 'name', type: 'input' },
  { label: '年龄', key: 'age', type: 'number' },
]

defineExpose({
  async submit() {
    await formRef.value?.validate()
    return data.value
  },
})
</script>

<template>
  <ProFormBuilder ref="formRef" v-model="data" :form-items="formItems" />
</template>
