<script setup>
import { ref } from 'vue';
import { createApis } from '@/ui';
defineOptions({
    name: 'ProTableCustomSearchDemo',
});
const apis = createApis('/api/goods');
const columns = [
    { title: '商品名称', dataIndex: 'name' },
    { title: '价格', dataIndex: 'price' },
];
const formItems = [{ label: '商品名称', key: 'name', type: 'input' }];
const queryParams = ref({
    keyword: '',
    tag: '全部',
});
</script>

<template>
  <ProTable
    :apis="apis"
    :columns="columns"
    :form-items="formItems"
    v-model:queryParams="queryParams"
  >
    <template #search>
      <ProSelect
        v-model="queryParams.tag"
        style="width: 120px"
        :options="['全部', '数码', '外设']"
      />
    </template>
  </ProTable>
</template>
