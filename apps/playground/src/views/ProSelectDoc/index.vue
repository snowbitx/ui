<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import { ProSelect } from '@/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import DemoTable from '@/components/DemoTable/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import OptionsDemo from './demos/options.vue'
import CascadeDemo from './demos/cascade.vue'
import optionsSource from './demos/options.vue?raw'
import optionsSourceJs from './demos/options.vue.js?raw'
import cascadeSource from './demos/cascade.vue?raw'
import cascadeSourceJs from './demos/cascade.vue.js?raw'

defineOptions({
  name: 'ProSelectDoc',
})

const propsColumns: ApiColumn[] = [
  { name: 'v-model:value', description: '选中值（多选时为数组）', type: 'any', default: '-' },
  {
    name: 'options',
    description: '选项数据源：静态数组 / 字符串数组 / 返回数组的函数（自动 loading）',
    type: 'any[] | (() => Promise<any[]>)',
    default: '-',
  },
  {
    name: 'labelField / valueField',
    description: '元素不是 { label, value } 结构时的取值字段名',
    type: 'string',
    default: '-',
  },
  {
    name: 'deps',
    description: '远程字典的依赖值，变化时自动重新拉取（级联场景）',
    type: 'any',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProSelect 下拉选择</h1>
    <p>
      在 {{ docTerm('a-select', 'el-select') }} 基础上支持 options
      配置驱动：静态数组、字符串数组、远程字典函数三种数据源，远程字典自动展示 loading；配合 deps
      可以做级联联动。其余用法与 {{ docTerm('a-select', 'el-select') }} 一致。
    </p>

    <DemoBlock title="三种数据源" :code="showImport(optionsSource)" :js-code="showImport(optionsSourceJs)">
      <OptionsDemo />
    </DemoBlock>

    <DemoBlock title="级联：deps 变化自动重拉字典" :code="showImport(cascadeSource)" :js-code="showImport(cascadeSourceJs)">
      <CascadeDemo />
    </DemoBlock>

    <h2>API</h2>
    <h3>Props</h3>
    <DemoTable :data-source="propsColumns" :columns="[
        { title: '参数', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
      ]" />
    <p>ProCheckboxGroup / ProRadioGroup 与 ProSelect 的 options 配置完全一致。</p>
  </div>
</template>
