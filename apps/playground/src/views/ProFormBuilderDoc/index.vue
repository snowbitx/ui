<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import { ref } from 'vue'
import DemoBlock from '@/components/DemoBlock/index.vue'
import DemoTable from '@/components/DemoTable/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import CustomTypeDemo from './demos/custom-type.vue'
import LayoutDemo from './demos/layout.vue'
import demoSource from './demos/basic.vue?raw'
import demoSourceJs from './demos/basic.vue.js?raw'
import customTypeSource from './demos/custom-type.vue?raw'
import customTypeSourceJs from './demos/custom-type.vue.js?raw'
import layoutSource from './demos/layout.vue?raw'

defineOptions({
  name: 'ProFormBuilderDoc',
})

const propsTableColumns = [
  { title: '参数', dataIndex: 'name' },
  { title: '说明', dataIndex: 'description' },
  { title: '类型', dataIndex: 'type' },
  { title: '默认值', dataIndex: 'default' },
]

const propsColumns: ApiColumn[] = [
  {
    name: 'formItems',
    description: '表单项配置数组，每项包含 label / key / type',
    type: 'FormItem[]',
    default: '-',
  },
  {
    name: 'rules',
    description: `校验规则，同 ${docTerm('a-form', 'el-form')} rules，key 对应表单项 key`,
    type: 'any',
    default: '-',
  },
  {
    name: 'v-model (modelValue)',
    description: '表单数据对象',
    type: 'Record<string, any>',
    default: '{}',
  },
]

const itemPropsColumns: ApiColumn[] = [
  { name: 'label', description: '表单项标签', type: 'string', default: '-' },
  { name: 'key', description: '字段名，对应 formData 里的属性', type: 'string', default: '-' },
  {
    name: 'type',
    description: `内置类型：input / textarea / number / date / select / checkbox${docTerm(' / modal', '')}；也可直接传组件`,
    type: "string | Component",
    default: "'input'",
  },
  {
    name: 'span',
    description: '该单项的栅格数（24 栅格），不传用组件的 span',
    type: 'number',
    default: '24',
  },
  {
    name: 'hidden',
    description: '隐藏该项，配合 computed 配置可做联动显隐',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'props',
    description: '直接透传给渲染组件的 props（设置后忽略其余顶层字段）',
    type: 'Record<string, any>',
    default: '-',
  },
  {
    name: 'options / placeholder / ...',
    description: '其余字段会原样透传给渲染的组件（如 options、onChange 等）',
    type: 'any',
    default: '-',
  },
  {
    name: 'slots',
    description: '配置式插槽，传给渲染的组件',
    type: 'Record<string, any>',
    default: '-',
  },
]

const exposeColumns: ApiColumn[] = [
  {
    name: '（表单实例）',
    description: `组件把 ${docTerm('a-form', 'el-form')} 的实例暴露了出来，可直接调用 validate / resetFields 等方法`,
    type: 'FormInstance',
    default: '-',
  },
]

const validateResult = ref('还没校验')

// demo 通过 @validate 传上来的就是 ProFormBuilder 实例（formRef.value）
function onValidate(vm: any) {
  if (!vm || typeof vm.validate !== 'function') {
    validateResult.value = '校验失败 ❌（未拿到表单实例）'
    return
  }
  vm.validate()
    .then(() => {
      validateResult.value = '校验通过 ✅，数据在控制台'
      console.log('表单数据', basicRefData)
    })
    .catch(() => {
      validateResult.value = '校验失败 ❌'
    })
}

let basicRefData: Record<string, any> = {}
function onBind(data: Record<string, any>) {
  basicRefData = data
}
</script>

<template>
  <div>
    <h1>ProFormBuilder 配置式表单</h1>
    <p>
      通过 JSON 数组渲染表单，是 ProTable 弹窗表单的底层。内置类型统一用裸
      <code>v-model</code>（modelValue）读写数据，自动适配
      {{ docTerm('a-input 等 antd 组件的 v-model:value / v-model:checked / v-model:open', 'el-input 等 element 组件的 v-model') }}
      差异。
    </p>

    <DemoBlock title="基础用法（v-model 双向绑定）" :code="showImport(demoSource)" :js-code="showImport(demoSourceJs)">
      <BasicDemo @bind="onBind" @validate="onValidate" />
    </DemoBlock>

    <DemoBlock title="使用内置类型 input / select / checkbox" :code="showImport(customTypeSource)" :js-code="showImport(customTypeSourceJs)">
      <CustomTypeDemo />
    </DemoBlock>

    <DemoBlock title="栅格布局 + hidden 联动显隐（选城市后出现备注）" :code="showImport(layoutSource)">
      <LayoutDemo />
    </DemoBlock>

    <p>当前校验状态：{{ validateResult }}</p>

    <h2>API</h2>
    <h3>Props</h3>
    <DemoTable :data-source="propsColumns" :columns="propsTableColumns" />

    <h3>formItems 每一项</h3>
    <DemoTable :data-source="itemPropsColumns" :columns="[
        { title: '字段', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
      ]" />

    <h3>Expose</h3>
    <DemoTable :data-source="exposeColumns" :columns="[
        { title: '方法', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
      ]" />
  </div>
</template>
