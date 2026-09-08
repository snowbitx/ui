<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'UserForm',
})

const props = defineProps<{
  formData: Record<string, any>
  requestApi: (data: Record<string, any>) => Promise<any>
}>()

const data = ref({ ...props.formData })

// openDialog 点确定时会调用这里；抛错则弹窗不关闭
defineExpose({
  async submit() {
    if (!data.value.name) {
      return Promise.reject(new Error('名称必填'))
    }
    return props.requestApi(data.value)
  },
})
</script>

<template>
  <a-form layout="vertical">
    <a-form-item label="商品名称" required>
      <a-input v-model:value="data.name" placeholder="请输入商品名称" />
    </a-form-item>
    <a-form-item label="价格">
      <a-input-number v-model:value="data.price" style="width: 100%" :min="0" />
    </a-form-item>
  </a-form>
</template>
