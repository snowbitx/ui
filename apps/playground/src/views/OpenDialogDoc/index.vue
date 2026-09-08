<script setup lang="ts">
import { h } from 'vue'
import { openDialog } from '@/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import CustomContentDemo from './demos/custom-content.vue'
import DialogFormDemo from './demos/dialog-form.vue'
import demoSource from './demos/basic.vue?raw'
import demoSourceJs from './demos/basic.vue.js?raw'
import customContentSource from './demos/custom-content.vue?raw'
import customContentSourceJs from './demos/custom-content.vue.js?raw'
import dialogFormSource from './demos/dialog-form.vue?raw'

defineOptions({
  name: 'OpenDialogDoc',
})

const propsColumns: ApiColumn[] = [
  { name: 'component', description: '弹窗内容组件', type: 'Component', default: '-' },
  {
    name: 'props',
    description:
      '传给内容组件的 props；其中 methodKey（默认 submit）指定点确定时调用的方法名，onSubmit 直接传函数（拿到内容组件实例）优先级更高',
    type: 'Record<string, any>',
    default: '{}',
  },
  {
    name: 'modelProps',
    description: 'a-modal 的配置（title / onOk / onCancel 等）；title 支持传函数实现响应式',
    type: 'ModalProps',
    default: '{}',
  },
]

const behaviorColumns: ApiColumn[] = [
  {
    name: '提交',
    description:
      '点击确定时调用内容组件暴露的 submit()，期间确定按钮自动进入 loading；组件无需自己管理弹窗开关',
    type: '行为',
    default: '-',
  },
  {
    name: '关闭',
    description: 'submit() 成功后自动关闭，afterClose 后自动销毁并移除 DOM',
    type: '行为',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>openDialog 命令式弹窗</h1>
    <p>
      不用在模板里预置 a-modal，随时一行代码弹出一个「带提交逻辑」的弹窗。ProTable
      的新增/修改弹窗内部就是用它实现的。
    </p>

    <DemoBlock title="基础用法：弹出表单组件" :code="demoSource" :js-code="demoSourceJs">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="自定义内容：任意组件 + 确定回调" :code="customContentSource" :js-code="customContentSourceJs">
      <CustomContentDemo />
    </DemoBlock>

    <DemoBlock title="renderDialogForm：一行代码弹出表单弹窗（确定自动校验）" :code="dialogFormSource">
      <DialogFormDemo />
    </DemoBlock>

    <h2>API</h2>
    <h3>参数</h3>
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

    <h3>行为约定</h3>
    <a-table
      :data-source="behaviorColumns"
      :columns="[
        { title: '项', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
      ]"
      :pagination="false"
      size="small"
    />

    <h2>函数签名</h2>
    <pre class="signature">
function openDialog(
  component: Component,
  props?: Record&lt;string, any&gt;,   // methodKey / onSubmit 自定义提交
  modelProps?: ModalProps,       // title 支持传函数
): { close: () => void }

function renderDialogForm(
  formProps: Record&lt;string, any&gt;, // ProFormBuilder 配置：formItems / rules / modelValue
  modelProps?: ModalProps,        // onOk(data) 拿到校验后的表单数据
): { close: () => void }</pre
    >
  </div>
</template>

<style scoped>
.signature {
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  font-size: 13px;
}
</style>
