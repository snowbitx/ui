<script setup lang="ts">
import { ProTable, createApis } from '@/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import CustomSearchDemo from './demos/custom-search.vue'
import demoSource from './demos/basic.vue?raw'
import demoSourceJs from './demos/basic.vue.js?raw'
import customSearchSource from './demos/custom-search.vue?raw'
import customSearchSourceJs from './demos/custom-search.vue.js?raw'
import customApisSource from './demos/custom-apis.ts?raw'

defineOptions({
  name: 'ProTableDoc',
})

const apis = createApis('/api/goods')

const columns = [
  { title: '商品名称', dataIndex: 'name' },
  { title: '价格', dataIndex: 'price' },
]

const formItems = [
  { label: '商品名称', key: 'name', type: 'input' },
  { label: '价格', key: 'price' },
]

const propsTableColumns = [
  { title: '参数', dataIndex: 'name' },
  { title: '说明', dataIndex: 'description' },
  { title: '类型', dataIndex: 'type' },
  { title: '默认值', dataIndex: 'default' },
]

const propsColumns: ApiColumn[] = [
  {
    name: 'apis',
    description: '增删改查接口集合，四个方法均返回 Promise',
    type: '{ get, create, update, remove }',
    default: '-',
  },
  { name: 'columns', description: '表格列定义，同 a-table columns', type: 'any[]', default: '-' },
  {
    name: 'formItems',
    description: '表单项定义，透传给 ProFormBuilder',
    type: 'any[]',
    default: '-',
  },
  { name: 'rules', description: '表单校验规则，同 a-form rules', type: 'any', default: '-' },
  { name: 'rowKey', description: '行 key 的字段名', type: 'string', default: "'id'" },
  {
    name: 'beforeCreate',
    description: '新增前钩子',
    type: '() => Promise<Record<string, any>>',
    default: '-',
  },
  {
    name: 'v-model:queryParams',
    description: '查询参数，配合自定义搜索区域使用',
    type: 'Record<string, any>',
    default: '{}',
  },
]

const exposeColumns: ApiColumn[] = [
  { name: 'refresh', description: '刷新列表', type: '() => void', default: '-' },
]

const slotsColumns: ApiColumn[] = [
  {
    name: 'search',
    description: '工具栏自定义搜索区域，配合 v-model:queryParams 使用',
    type: 'slot',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProTable 表格</h1>
    <p>
      表格增删改查一体组件：内置新增/修改/删除按钮、行选择、搜索、弹窗表单。数据接口通过
      <code>apis</code> 注入，可用组件库自带的 <code>createApis</code> 快速创建。
    </p>

    <a-alert
      type="info"
      show-icon
      style="margin-bottom: 24px"
      message="apis 和 createApis 是什么"
      description="apis 是 ProTable 增删改查的数据来源，约定必须有 get / create / update / remove 四个 Promise 方法。createApis 是组件库为这个约定提供的开箱即用实现：传入接口基地址，自动基于 fetch 封装好四个请求。用 axios 或接口风格不一致时，可以传 { request } 自定义请求函数，或者自己实现这四个方法，不依赖 createApis。"
    />

    <a-collapse style="margin-bottom: 24px">
      <a-collapse-panel key="custom-apis" header="不用 createApis：自己手写 apis（点开看完整代码）">
        <p style="margin-top: 0">
          只要提供 <code>get / create / update / remove</code> 四个 Promise 方法，任何数据来源都能接入
          ProTable——下面示例用内存数组 + 模拟延迟实现了一套，可直接复制改成你的真实接口：
        </p>
        <pre class="custom-apis-code"><code>{{ customApisSource.trim() }}</code></pre>
      </a-collapse-panel>
    </a-collapse>

    <DemoBlock title="基础用法" :code="demoSource" :js-code="demoSourceJs">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="自定义搜索（v-model:queryParams + #search 插槽）" :code="customSearchSource" :js-code="customSearchSourceJs">
      <CustomSearchDemo />
    </DemoBlock>

    <h2>直接可用</h2>
    <p>下面就是一个真实的 ProTable，直接操作试试：</p>
    <ProTable :apis="apis" :columns="columns" :form-items="formItems" />

    <h2>API</h2>
    <h3>Props</h3>
    <a-table
      :data-source="propsColumns"
      :columns="propsTableColumns"
      :pagination="false"
      size="small"
    />

    <h3>Expose</h3>
    <a-table
      :data-source="exposeColumns"
      :columns="[
        { title: '方法', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
      ]"
      :pagination="false"
      size="small"
    />

    <h3>Slots</h3>
    <a-table
      :data-source="slotsColumns"
      :columns="[
        { title: '名称', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
      ]"
      :pagination="false"
      size="small"
    />
  </div>
</template>

<style scoped>
.custom-apis-code {
  margin: 0;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
}
</style>
