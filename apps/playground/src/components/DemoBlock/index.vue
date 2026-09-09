<script setup lang="ts">
import { computed, ref } from 'vue'

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

// 仿 element 官网文档：效果常驻上方，代码区在下方通过眼睛图标展开/收起，二者同屏可见；
// TS / JS 只决定展开后展示哪份源码。点语言时顺手展开，避免选了没反馈。
const codeVisible = ref(false)
const lang = ref<'ts' | 'js'>('ts')

function pickLang(next: 'ts' | 'js') {
  lang.value = next
  codeVisible.value = true
}

const shownCode = computed(() => (lang.value === 'js' && props.jsCode ? props.jsCode : props.code).trim())
</script>

<template>
  <!-- 纯 HTML + 内联 SVG：DemoBlock 是文档站基础设施，不依赖任何 UI 库 -->
  <section class="demo-block">
    <header class="demo-block-header">
      <h3>{{ props.title }}</h3>
      <div class="demo-block-actions">
        <div class="demo-block-langs" role="group" aria-label="代码语言">
          <button
            class="demo-block-lang"
            :class="{ active: lang === 'ts' }"
            type="button"
            @click="pickLang('ts')"
          >
            TS
          </button>
          <button
            v-if="props.jsCode"
            class="demo-block-lang"
            :class="{ active: lang === 'js' }"
            type="button"
            @click="pickLang('js')"
          >
            JS
          </button>
        </div>
        <button
          class="demo-block-eye"
          type="button"
          :aria-pressed="codeVisible"
          :title="codeVisible ? '隐藏代码' : '显示代码'"
          @click="codeVisible = !codeVisible"
        >
          <span class="demo-block-icon" aria-hidden="true">
            <svg
              v-if="codeVisible"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </span>
        </button>
      </div>
    </header>

    <div class="demo-block-demo">
      <slot></slot>
    </div>
    <div v-show="codeVisible" class="demo-block-code">
      <pre><code>{{ shownCode }}</code></pre>
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
.demo-block-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-block-langs {
  display: flex;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}
.demo-block-lang {
  border: none;
  background: transparent;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
  color: #666;
}
.demo-block-lang + .demo-block-lang {
  border-left: 1px solid #d9d9d9;
}
.demo-block-lang.active {
  background: #1677ff;
  color: #fff;
}
.demo-block-eye {
  border: 1px solid #d9d9d9;
  background: transparent;
  border-radius: 6px;
  width: 26px;
  height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
}
.demo-block-eye:hover {
  color: #1677ff;
  border-color: #1677ff;
}
.demo-block-icon {
  display: inline-flex;
  align-items: center;
}
.demo-block-demo {
  padding: 24px;
  background: #fff;
}
.demo-block-code {
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
.demo-block-code pre {
  margin: 0;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
}
</style>
