<script setup lang="ts">
import { ref } from 'vue'
import {
  ProButton,
  ProCountdownButton,
  ProInput,
  ProSelect,
  ProCheckboxGroup,
  ProRadioGroup,
  ProModal,
  ProConfirmButton,
  ProDescriptions,
  uiMessage,
} from '@snowbitx/ui-shadcn'
import Case from '../components/Case.vue'
import { fetchTypes } from '../datasource'

defineOptions({
  name: 'ShadcnBarrelPage',
})

const input = ref('')
const select = ref<string>()
const checkbox = ref<string[]>([])
const radio = ref<string>()
const modalOpen = ref(false)

const descData = { name: '张三', age: 18, type: '管理员' }
const descItems = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  { label: '类型', key: 'type' },
]

function save() {
  return new Promise((resolve) => {
    setTimeout(() => {
      uiMessage.success('保存成功')
      resolve(true)
    }, 500)
  })
}
</script>

<template>
  <h1>@snowbitx/ui-shadcn 主入口</h1>
  <p class="hint">import ... from '@snowbitx/ui-shadcn'（包根 barrel 导出，来自 dist；样式为 Tailwind 编译产物）</p>

  <Case title="ProButton / ProCountdownButton / uiMessage">
    <div class="row">
      <ProButton type="primary" :debounce="500" :on-click="save">防抖 + 自动 loading</ProButton>
      <ProCountdownButton :seconds="5" :on-click="save">发送验证码</ProCountdownButton>
      <ProConfirmButton
        title="确定删除吗？"
        :on-confirm="() => new Promise((r) => setTimeout(r, 500))"
        @click="() => uiMessage.info('已确认')"
        >气泡确认</ProConfirmButton
      >
    </div>
  </Case>

  <Case title="ProInput / ProSelect / ProCheckboxGroup / ProRadioGroup">
    <div class="row">
      <ProInput v-model="input" :debounce="200" style="width: 200px" placeholder="防抖输入" />
      <ProSelect v-model="select" :options="fetchTypes" style="width: 160px" placeholder="异步字典" />
      <ProCheckboxGroup v-model="checkbox" :options="fetchTypes" />
      <ProRadioGroup v-model="radio" :options="fetchTypes" />
    </div>
    <p class="hint">input={{ JSON.stringify(input) }} select={{ select }} checkbox={{ JSON.stringify(checkbox) }} radio={{ radio }}</p>
  </Case>

  <Case title="ProModal / ProDescriptions">
    <div class="row">
      <ProButton @click="modalOpen = true">打开 ProModal</ProButton>
      <ProModal v-model:open="modalOpen" title="beforeOk 拦截" :before-ok="save">modal 内容</ProModal>
    </div>
    <ProDescriptions :items="descItems" :data="descData" />
  </Case>
</template>
