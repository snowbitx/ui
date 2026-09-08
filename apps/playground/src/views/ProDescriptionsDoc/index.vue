<script setup lang="ts">
import { ProDescriptions } from '@snowbitx/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import basicSource from './demos/basic.vue?raw'
import basicSourceJs from './demos/basic.vue.js?raw'

defineOptions({
  name: 'ProDescriptionsDoc',
})

const itemPropsColumns: ApiColumn[] = [
  { name: 'label', description: '标签', type: 'string', default: '-' },
  { name: 'key', description: '字段名，取 data[key]', type: 'string', default: '-' },
  {
    name: 'render',
    description: '自定义渲染，常用于字典翻译',
    type: '(value, record) => any',
    default: '-',
  },
]

const propsColumns: ApiColumn[] = [
  { name: 'items', description: '描述项配置', type: 'DescriptionItem[]', default: '-' },
  { name: 'data', description: '数据对象', type: 'Record<string, any>', default: '-' },
  { name: 'emptyText', description: '空值占位符', type: 'string', default: "'-'" },
  {
    name: '（其余）',
    description: 'bordered / column / size 等，透传给 a-descriptions',
    type: 'DescriptionsProps',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProDescriptions 详情描述</h1>
    <p>
      配置驱动的详情列表：items 声明字段，render 做字典翻译，空值自动显示占位符。常与 ProTable
      配合做「行详情」。
    </p>

    <DemoBlock title="基础用法" :code="basicSource" :js-code="basicSourceJs">
      <BasicDemo />
    </DemoBlock>

    <h2>API</h2>
    <h3>Props</h3>
    <a-table
      :data-source="propsColumns"
      :columns="[
        { title: '参数', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
      ]"
      :pagination="false"
      size="small"
    />

    <h3>items 每一项</h3>
    <a-table
      :data-source="itemPropsColumns"
      :columns="[
        { title: '字段', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
      ]"
      :pagination="false"
      size="small"
    />
  </div>
</template>
