<script setup lang="ts">
import { ref } from 'vue'
import { ProTable, createApis } from '@/ui'

defineOptions({
  name: 'ProTableCustomSearchDemo',
})

const apis = createApis('/api/goods')

const columns = [
  { title: '商品名称', dataIndex: 'name' },
  { title: '价格', dataIndex: 'price' },
]

const formItems = [{ label: '商品名称', key: 'name', type: 'input' }]

const queryParams = ref<Record<string, any>>({
  keyword: '',
  tag: '全部',
})
</script>

<template>
  <ProTable
    :apis="apis"
    :columns="columns"
    :form-items="formItems"
    v-model:queryParams="queryParams"
  >
    <template #search>
      <a-select v-model:value="queryParams.tag" style="width: 120px">
        <a-select-option value="全部">全部</a-select-option>
        <a-select-option value="数码">数码</a-select-option>
        <a-select-option value="外设">外设</a-select-option>
      </a-select>
    </template>
  </ProTable>
</template>
