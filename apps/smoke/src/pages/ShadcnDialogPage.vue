<script setup lang="ts">
import { ProButton, openDialog, renderDialogForm, uiMessage } from '@snowbitx/ui-shadcn'
import Case from '../components/Case.vue'
import ShadcnUserForm from '../components/ShadcnUserForm.vue'
import { tableFormItems, tableRules } from '../datasource'

defineOptions({
  name: 'ShadcnDialogPage',
})

function openFormDialog() {
  openDialog(
    ShadcnUserForm,
    { formData: { name: '', age: 0 } },
    {
      title: '命令式弹窗（openDialog + submit 契约）',
      onOk: (data: any) => uiMessage.success(`提交：${JSON.stringify(data)}`),
    },
  )
}

function openRenderDialogForm() {
  renderDialogForm(
    {
      formItems: tableFormItems,
      rules: tableRules,
      modelValue: { name: '张三', age: 18, type: '管理员' },
    },
    {
      title: '表单弹窗（renderDialogForm）',
      onOk: (data: any) => uiMessage.success(`校验通过：${JSON.stringify(data)}`),
    },
  )
}
</script>

<template>
  <h1>@snowbitx/ui-shadcn 命令式弹窗</h1>
  <p class="hint">openDialog / renderDialogForm 内部走独立 createApp，最容易在产物形态下出问题，单独验证</p>

  <Case title="openDialog + 自定义内容组件">
    <ProButton type="primary" @click="openFormDialog">弹表单（确定时调 submit()）</ProButton>
  </Case>

  <Case title="renderDialogForm 一行弹表单">
    <ProButton @click="openRenderDialogForm">弹表单（确定时自动校验）</ProButton>
  </Case>
</template>
