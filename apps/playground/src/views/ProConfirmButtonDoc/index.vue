<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import DemoBlock from '@/components/DemoBlock/index.vue'
import DemoTable from '@/components/DemoTable/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import basicSource from './demos/basic.vue?raw'
import basicSourceJs from './demos/basic.vue.js?raw'

defineOptions({
  name: 'ProConfirmButtonDoc',
})

const propsColumns: ApiColumn[] = [
  { name: 'title', description: '气泡确认框标题', type: 'string', default: "'确定执行此操作吗？'" },
  {
    name: 'onConfirm',
    description: '确认后执行；返回 Promise 时确认按钮自动进入 loading',
    type: '() => Promise<any> | any',
    default: '-',
  },
  {
    name: '（其余）',
    description: `type / danger / disabled 等，透传给内部 ${docTerm('a-button', 'el-button')}`,
    type: 'ButtonProps',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProConfirmButton 确认按钮</h1>
    <p>
      气泡确认 + 按钮二合一：替代「点按钮 → Modal.confirm →
      再调接口」的固定套路，确认请求期间按钮自动 loading。
    </p>

    <DemoBlock title="危险操作确认" :code="showImport(basicSource)" :js-code="showImport(basicSourceJs)">
      <BasicDemo />
    </DemoBlock>

    <h2>API</h2>
    <h3>Props</h3>
    <DemoTable :data-source="propsColumns" :columns="[
        { title: '参数', dataIndex: 'name' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
      ]" />
  </div>
</template>
