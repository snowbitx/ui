<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import DemoBlock from '@/components/DemoBlock/index.vue'
import DemoTable from '@/components/DemoTable/index.vue'
import type { ApiColumn } from '@/components/ApiTable'
import DebounceDemo from './demos/debounce.vue'
import AutoSearchDemo from './demos/auto-search.vue'
import debounceSource from './demos/debounce.vue?raw'
import debounceSourceJs from './demos/debounce.vue.js?raw'
import autoSearchSource from './demos/auto-search.vue?raw'
import autoSearchSourceJs from './demos/auto-search.vue.js?raw'

defineOptions({
  name: 'ProInputDoc',
})

const propsColumns: ApiColumn[] = [
  {
    name: 'v-model',
    description: '输入值；设置 debounce 后停止输入 delay 毫秒才同步',
    type: 'string',
    default: '-',
  },
  {
    name: 'debounce',
    description: '防抖间隔（毫秒），0 表示立即同步',
    type: 'number',
    default: '300',
  },
]
</script>

<template>
  <div>
    <h1>ProInput 输入框</h1>
    <p>
      在 {{ docTerm('a-input', 'el-input') }} 基础上内置输入防抖：停止输入一段时间后才同步
      v-model，适合搜索联想、自动保存等场景。其余用法与 {{ docTerm('a-input', 'el-input') }} 一致。
    </p>

    <DemoBlock title="输入防抖" :code="showImport(debounceSource)" :js-code="showImport(debounceSourceJs)">
      <DebounceDemo />
    </DemoBlock>

    <DemoBlock title="防抖 + 回车搜索" :code="showImport(autoSearchSource)" :js-code="showImport(autoSearchSourceJs)">
      <AutoSearchDemo />
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
