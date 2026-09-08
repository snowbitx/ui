<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { menus } from '@/router'
import { uiMode, type UiMode } from '@/ui-setup'
import { switchUiMode } from '@/ui'

defineOptions({
  name: 'AppLayout',
})

const route = useRoute()
const router = useRouter()

// 切换 UI 适配层：写 cookie 后整页重载，src/ui 代理层按新 cookie 加载对应实现
function switchUi(mode: UiMode) {
  switchUiMode(mode)
}
</script>

<template>
  <div class="pg-ui-switch">
    <button :class="{ active: uiMode === 'antd' }" @click="switchUi('antd')">antd 版</button>
    <button :class="{ active: uiMode === 'element' }" @click="switchUi('element')">Element 版</button>
  </div>
  <a-layout class="pg-layout">
    <a-layout-sider theme="light" width="220">
      <div class="pg-logo">
        <strong>SnowUI</strong>
        <span>组件演示</span>
      </div>
      <a-menu mode="inline" :selected-keys="[route.path]">
        <a-menu-item v-for="item in menus" :key="item.path" @click="router.push(item.path)">
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="pg-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.pg-ui-switch {
  position: fixed;
  top: 12px;
  right: 16px;
  z-index: 1000;
  display: flex;
  gap: 0;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.pg-ui-switch button {
  border: none;
  background: transparent;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: #666;
}
.pg-ui-switch button.active {
  background: #1677ff;
  color: #fff;
}
.pg-layout {
  min-height: 100vh;
}
.pg-logo {
  height: 56px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  padding-top: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}
.pg-logo strong {
  font-size: 18px;
}
.pg-logo span {
  color: #999;
  font-size: 12px;
}
.pg-content {
  padding: 24px 48px;
  max-width: 1100px;
}

/* 文档页排版：内容区里的标题 / 段落 / 表格统一间距 */
.pg-content :deep(h1) {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 16px;
}
.pg-content :deep(h2) {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  margin: 40px 0 16px;
}
.pg-content :deep(h3) {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin: 24px 0 12px;
}
.pg-content :deep(p) {
  font-size: 14px;
  line-height: 1.8;
  margin: 0 0 16px;
  color: rgba(0, 0, 0, 0.65);
}
.pg-content :deep(.ant-table-wrapper) {
  margin-bottom: 24px;
}
</style>
