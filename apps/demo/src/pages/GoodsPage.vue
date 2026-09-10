<script setup lang="ts">
import { ProTable, createApis } from '@cynnie/ui-antd'
import type { PageSchema } from '@cynnie/page-generator'

defineOptions({
  name: 'GoodsPage',
})

// 本页配置来自远端 JSON 文档，由 gen:pages 脚本生成
const schema: Pick<PageSchema, 'name' | 'title' | 'route' | 'api'> = {
  name: 'GoodsPage',
  title: '商品管理',
  route: '/goods',
  api: '/api/goods',
}

const apis = createApis(schema.api)

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
]

const formItems = [
  {
    label: '商品名称',
    key: 'name',
    type: 'input',
  },
  {
    label: '价格',
    key: 'price',
  },
]

const rules = {
  name: [
    {
      required: true,
      message: '请输入商品名称',
    },
  ],
}
</script>

<template>
  <div class="page-container">
    <h2>商品管理</h2>
    <ProTable :apis="apis" :columns="columns" :form-items="formItems" :rules="rules" />
  </div>
</template>
