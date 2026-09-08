<script setup lang="ts">
import { ProButton, ProTable, createApis, uiMessage } from '@snowbitx/ui-antd'
import Case from '../components/Case.vue'
import { makeApis, tableColumns, tableFormItems, tableRules } from '../datasource'

defineOptions({
  name: 'AntdTablePage',
})

// createApis 默认基于 fetch（真实项目指向后端接口），这里用 makeApis 内联数据
void createApis('/inline')
const inlineApis = makeApis()
</script>

<template>
  <h1>@snowbitx/ui-antd ProTable</h1>
  <p class="hint">createApis + ProTable 组合；数据内联（PageApis 形状），不依赖 mock-server</p>

  <Case title="ProTable 增删改查一体">
    <ProTable :apis="inlineApis" :columns="tableColumns" :form-items="tableFormItems" :rules="tableRules" />
  </Case>

  <Case title="uiMessage">
    <ProButton @click="() => uiMessage.success('消息 OK')">消息提示</ProButton>
  </Case>
</template>

