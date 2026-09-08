<script setup lang="ts">
import { ProModal } from '@snowbitx/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import basicSource from './demos/basic.vue?raw'
import basicSourceJs from './demos/basic.vue.js?raw'

defineOptions({
  name: 'ProModalDoc',
})

const propsColumns: ApiColumn[] = [
  { name: 'v-model:open', description: '弹窗显示状态', type: 'boolean', default: 'false' },
  {
    name: 'beforeOk',
    description: '点确定时先执行：返回 false 或 reject 则拦截关闭；执行期间确定按钮自动 loading',
    type: '() => Promise<any> | any',
    default: '-',
  },
  {
    name: '（其余）',
    description: 'title / width / footer 等，全部透传给 a-modal',
    type: 'ModalProps',
    default: '-',
  },
]

const eventsColumns: ApiColumn[] = [
  {
    name: 'ok',
    description: '确认成功关闭后触发（被拦截时不触发）',
    type: '(e) => void',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProModal 弹窗</h1>
    <p>
      在 a-modal 基础上提供 beforeOk 异步拦截：校验或保存失败时弹窗不关闭，期间确定按钮自动
      loading。不需要再手写 confirmLoading 和 open 状态机。
    </p>

    <DemoBlock title="beforeOk 拦截 + 自动 loading" :code="basicSource" :js-code="basicSourceJs">
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

    <h3>Events</h3>
    <a-table
      :data-source="eventsColumns"
      :columns="[
        { title: '事件', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
      ]"
      :pagination="false"
      size="small"
    />
  </div>
</template>
