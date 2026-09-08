<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { currentUiMode, switchUiMode, type UiMode } from './mode'

defineOptions({
  name: 'SmokeApp',
})

const route = useRoute()
const router = useRouter()
const uiMode = currentUiMode()

function go(path: string) {
  if (path !== route.path) router.push(path)
}
</script>

<template>
  <div class="smoke-shell">
    <aside class="smoke-sider">
      <div class="smoke-logo">
        <strong>SnowUI Smoke</strong>
        <span>打包产物冒烟</span>
      </div>
      <nav class="smoke-menu">
        <a
          v-for="item in $router.getRoutes().filter((r) => r.meta?.menu)"
          :key="item.path"
          class="smoke-menu-item"
          :class="{ active: route.path === item.path }"
          @click="go(item.path)"
        >
          {{ item.meta.title }}
        </a>
      </nav>
    </aside>
    <main class="smoke-content">
      <router-view></router-view>
    </main>
  </div>
  <div class="smoke-ui-switch">
    <button :class="{ active: uiMode === 'antd' }" @click="switchUiMode('antd' as UiMode)">antd</button>
    <button :class="{ active: uiMode === 'element' }" @click="switchUiMode('element' as UiMode)">element</button>
    <button :class="{ active: uiMode === 'shadcn' }" @click="switchUiMode('shadcn' as UiMode)">shadcn</button>
  </div>
</template>

<style scoped>
/* 外壳刻意用纯 HTML/CSS：不依赖任何被测组件库 */
.smoke-shell {
  display: flex;
  min-height: 100vh;
  background: #fff;
  color: #333;
  font-family: system-ui, -apple-system, sans-serif;
}
.smoke-sider {
  width: 210px;
  flex-shrink: 0;
  border-right: 1px solid #eee;
}
.smoke-logo {
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-bottom: 1px solid #eee;
}
.smoke-logo strong {
  font-size: 15px;
}
.smoke-logo span {
  color: #999;
  font-size: 11px;
}
.smoke-menu {
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 2px;
}
.smoke-menu-item {
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}
.smoke-menu-item:hover {
  background: #f5f5f5;
}
.smoke-menu-item.active {
  background: #e6f4ff;
  color: #1677ff;
}
.smoke-content {
  flex: 1;
  padding: 20px 32px;
  max-width: 1080px;
  box-sizing: border-box;
}
.smoke-content :deep(h1) {
  font-size: 20px;
  margin: 0 0 8px;
}
.smoke-content :deep(h2) {
  font-size: 15px;
  font-weight: 600;
  margin: 24px 0 10px;
}
.smoke-content :deep(p.hint) {
  font-size: 12px;
  color: #999;
  margin: 0 0 16px;
}
.smoke-content :deep(.row) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
.smoke-ui-switch {
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
.smoke-ui-switch button {
  border: none;
  background: transparent;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: #666;
}
.smoke-ui-switch button.active {
  background: #1677ff;
  color: #fff;
}
</style>
