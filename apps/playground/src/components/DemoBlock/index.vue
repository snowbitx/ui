<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoBlock',
})

const props = defineProps<{
  /** 案例标题 */
  title: string
  /** 通过 vite 的 ?raw 导入进来的示例源码字符串（TS 版） */
  code: string
  /** JS 版源码，不传则切换组里没有 JS 项 */
  jsCode?: string
}>()

// 'demo' 显示效果；'ts' / 'js' 显示对应版本源码
const activeKey = ref<'demo' | 'ts' | 'js'>('demo')

const tabs = [
  { key: 'demo' as const, label: '效果' },
  { key: 'ts' as const, label: 'TS' },
  { key: 'js' as const, label: 'JS' },
]
</script>

<template>
  <!-- 纯 HTML tab：DemoBlock 是文档站基础设施，不依赖任何 UI 库 -->
  <section class="demo-block">
    <header class="demo-block-header">
      <h3>{{ props.title }}</h3>
      <div class="demo-block-tabs">
        <button
          v-for="t in (props.jsCode ? tabs : tabs.filter((x) => x.key !== 'js'))"
          :key="t.key"
          class="demo-block-tab"
          :class="{ active: activeKey === t.key }"
          :title="t.label"
          @click="activeKey = t.key"
        >
          <span v-if="t.key === 'demo'" class="demo-block-icon" aria-label="效果">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
            </svg>
          </span>
          <template v-else>{{ t.label }}</template>
        </button>
      </div>
    </header>

    <div class="demo-block-body">
      <div v-show="activeKey === 'demo'" class="demo-block-demo">
        <slot></slot>
      </div>
      <pre v-show="activeKey !== 'demo'" class="demo-block-code"><code>{{
        (activeKey === 'js' && props.jsCode ? props.jsCode : props.code).trim()
      }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.demo-block {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 32px;
  overflow: hidden;
}
.demo-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.demo-block-header h3 {
  margin: 0;
  font-size: 15px;
}
.demo-block-tabs {
  display: flex;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}
.demo-block-tab {
  border: none;
  background: transparent;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
  color: #666;
  display: inline-flex;
  align-items: center;
}
.demo-block-tab + .demo-block-tab {
  border-left: 1px solid #d9d9d9;
}
.demo-block-tab.active {
  background: #1677ff;
  color: #fff;
}
.demo-block-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  vertical-align: -2px;
}
.demo-block-body {
  padding: 24px;
  background: #fff;
}
.demo-block-code {
  margin: 0;
  padding: 0;
  background: #fafafa;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
}
</style>
