<script setup lang="ts">
import { h } from 'vue'
import { openDialog, uiMessage, ProButton } from '@/ui'

defineOptions({
  name: 'OpenDialogCustomContentDemo',
})

function openConfirm() {
  // 第二个参数是 props，第三个参数是 a-modal 的配置
  openDialog(
    h('div', { style: 'line-height:2' }, [
      h('p', '自定义内容可以是任意组件或 vnode。'),
      h('p', '点确定时会先执行内容组件的 submit()（如果暴露了）。'),
    ]),
    {},
    {
      title: '确认操作',
      onOk: () => uiMessage.success('已确认'),
    },
  )
}
</script>

<template>
  <ProButton @click="openConfirm">弹出纯内容弹窗</ProButton>
</template>
