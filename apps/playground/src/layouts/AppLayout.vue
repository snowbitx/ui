<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { menus } from '@/router'

defineOptions({
  name: 'AppLayout',
})

const route = useRoute()
const router = useRouter()
</script>

<template>
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
.pg-layout {
  min-height: 100vh;
}
.pg-logo {
  height: 56px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
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
