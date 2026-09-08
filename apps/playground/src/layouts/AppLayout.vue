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

function go(path: string) {
  if (path !== route.path) router.push(path)
}
</script>

<template>
  <!-- 外壳用纯 HTML/CSS：文档站框架不依赖任何 UI 库，两种模式下都稳定可用 -->
  <div class="pg-shell">
    <aside class="pg-sider">
      <div class="pg-logo">
        <div class="pg-logo-inner">
          <strong>SnowUI</strong>
          <span>组件演示</span>
        </div>
      </div>
      <nav class="pg-menu">
        <a
          v-for="item in menus"
          :key="item.path"
          class="pg-menu-item"
          :class="{ active: route.path === item.path }"
          @click="go(item.path)"
        >
          {{ item.title }}
        </a>
      </nav>
    </aside>
    <main class="pg-content">
      <router-view></router-view>
    </main>
  </div>
  <div class="pg-ui-switch">
    <button :class="{ active: uiMode === 'antd' }" @click="switchUi('antd')">antd 版</button>
    <button :class="{ active: uiMode === 'element' }" @click="switchUi('element')">Element 版</button>
  </div>
</template>

<style scoped>
.pg-shell {
  display: flex;
  min-height: 100vh;
}
.pg-sider {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #f0f0f0;
  background: #fff;
}
.pg-logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
}
.pg-logo-inner {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.pg-logo strong {
  font-size: 18px;
}
.pg-logo span {
  color: #999;
  font-size: 12px;
}
.pg-menu {
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 2px;
}
.pg-menu-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  text-decoration: none;
}
.pg-menu-item:hover {
  background: #f5f5f5;
}
.pg-menu-item.active {
  background: #e6f4ff;
  color: #1677ff;
}
.pg-content {
  flex: 1;
  padding: 24px 48px;
  max-width: 1100px;
  box-sizing: border-box;
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
.pg-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 24px;
  font-size: 13px;
}
.pg-content :deep(th),
.pg-content :deep(td) {
  border: 1px solid #f0f0f0;
  padding: 8px 12px;
  text-align: left;
}
.pg-content :deep(th) {
  background: #fafafa;
  font-weight: 500;
}

/* 右上角模式切换开关 */
.pg-ui-switch {
  position: fixed;
  top: 12px;
  right: 16px;
  z-index: 1000;
  display: flex;
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
</style>
