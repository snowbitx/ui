<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import DemoBlock from '@/components/DemoBlock/index.vue'
import DemoTable from '@/components/DemoTable/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import BasicDemo from './demos/basic.vue'
import CountdownDemo from './demos/countdown.vue'
import demoSource from './demos/basic.vue?raw'
import demoSourceJs from './demos/basic.vue.js?raw'
import countdownSource from './demos/countdown.vue?raw'
import countdownSourceJs from './demos/countdown.vue.js?raw'

defineOptions({
  name: 'ProButtonDoc',
})

const propsTableColumns = [
  { title: '参数', dataIndex: 'name' },
  { title: '说明', dataIndex: 'description' },
  { title: '类型', dataIndex: 'type' },
  { title: '默认值', dataIndex: 'default' },
]

const proButtonProps: ApiColumn[] = [
  {
    name: 'debounce',
    description: '防抖间隔（毫秒），间隔内重复点击只触发一次；防抖期间按钮置灰反馈',
    type: 'number',
    default: '0',
  },
  {
    name: 'onClick',
    description: '点击处理函数；返回 Promise 时自动进入 loading 直到结束',
    type: '(...args) => any',
    default: '-',
  },
]

const countdownProps: ApiColumn[] = [
  { name: 'seconds', description: '倒计时秒数', type: 'number', default: '60' },
  {
    name: 'countingText',
    description: '倒计时期间文案，{n} 会替换为剩余秒数',
    type: 'string',
    default: "'{n}s 后重发'",
  },
  {
    name: 'onClick',
    description: '点击处理函数；返回 Promise 且 resolve 后才开始倒计时',
    type: '(...args) => any',
    default: '-',
  },
]
</script>

<template>
  <div>
    <h1>ProButton 按钮</h1>
    <p>
      在 {{ docTerm('a-button', 'el-button') }} 基础上内置防抖与 async 自动 loading，其余 props / 事件 / 插槽与 {{ docTerm('a-button', 'el-button') }}
      完全一致。
    </p>

    <DemoBlock title="防抖 + 自动 loading" :code="showImport(demoSource)" :js-code="showImport(demoSourceJs)">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="ProCountdownButton 倒计时按钮（验证码场景）" :code="showImport(countdownSource)" :js-code="showImport(countdownSourceJs)">
      <CountdownDemo />
    </DemoBlock>

    <h2>API</h2>
    <h3>ProButton Props</h3>
    <DemoTable :data-source="proButtonProps" :columns="propsTableColumns" />

    <h3>ProCountdownButton Props</h3>
    <DemoTable :data-source="countdownProps" :columns="propsTableColumns" />
  </div>
</template>
