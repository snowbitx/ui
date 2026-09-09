<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generatedRoutes } from './pages'

const route = useRoute()
const router = useRouter()

const menus = computed(() => generatedRoutes)

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-sider theme="light" width="200">
      <div class="app-logo">SnowUI Demo</div>
      <a-menu mode="inline" :selected-keys="[route.path]">
        <a-menu-item
          v-for="item in menus"
          :key="item.path"
          :class="{ 'is-active': isActive(item.path) }"
          @click="router.push(item.path)"
        >
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="app-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<style>
body {
  margin: 0;
}
/* 布局锁定视口高度：侧边栏固定，滚动只发生在中间内容区内部 */
.app-layout {
  height: 100vh;
  overflow: hidden;
}
.app-logo {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.app-content {
  padding: 24px;
  overflow-y: auto;
}
.is-active {
  color: #1677ff;
}
</style>
