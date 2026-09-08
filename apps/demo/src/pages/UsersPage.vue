<script setup lang="ts">
import { ProTable, createApis } from '@snowbitx/ui-antd'
import type { PageSchema } from '@snowbitx/page-generator'

defineOptions({
  name: 'UsersPage',
})

// 本页配置来自远端 JSON 文档，由 gen:pages 脚本生成
const schema: Pick<PageSchema, 'name' | 'title' | 'route' | 'api'> = {
  name: 'UsersPage',
  title: '用户管理',
  route: '/users',
  api: '/api/users',
}

const apis = createApis(schema.api)

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
]

const formItems = [
  {
    label: '姓名',
    key: 'name',
    type: 'input',
  },
  {
    label: '年龄',
    key: 'age',
  },
  {
    label: '类型',
    key: 'type',
  },
]

const rules = {
  name: [
    {
      required: true,
      message: '请输入姓名',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
    },
  ],
}
</script>

<template>
  <div class="page-container">
    <h2>用户管理</h2>
    <ProTable :apis="apis" :columns="columns" :form-items="formItems" :rules="rules" />
  </div>
</template>
