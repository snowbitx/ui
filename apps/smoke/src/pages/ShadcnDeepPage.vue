<script setup lang="ts">
import { ref } from 'vue'
// 深路径导入：验证 package.json exports 的每个子路径都指向有效的 dist 文件
import ProButton from '@snowbitx/ui-shadcn/components/ProButton'
import ProInput from '@snowbitx/ui-shadcn/components/ProInput'
import ProSelect from '@snowbitx/ui-shadcn/components/ProSelect'
import ProCheckboxGroup from '@snowbitx/ui-shadcn/components/ProCheckboxGroup'
import ProRadioGroup from '@snowbitx/ui-shadcn/components/ProRadioGroup'
import ProModal from '@snowbitx/ui-shadcn/components/ProModal'
import ProConfirmButton from '@snowbitx/ui-shadcn/components/ProConfirmButton'
import ProDescriptions from '@snowbitx/ui-shadcn/components/ProDescriptions'
import ProFormBuilder from '@snowbitx/ui-shadcn/components/ProFormBuilder'
import { openDialog } from '@snowbitx/ui-shadcn/utils/openDialog'
import { uiMessage } from '@snowbitx/ui-shadcn'
import Case from '../components/Case.vue'

defineOptions({
  name: 'ShadcnDeepPage',
})

const input = ref('')
const select = ref<string>()
const checkbox = ref<string[]>([])
const radio = ref<string>()
const modalOpen = ref(false)
const form = ref<Record<string, any>>({ name: '张三', age: 18 })

const formItems = [
  { label: '姓名', key: 'name', type: 'input' },
  { label: '年龄', key: 'age', type: 'number' },
]

const descData = { name: '张三', age: 18, type: '管理员' }
const descItems = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  { label: '类型', key: 'type' },
]
</script>

<template>
  <h1>@snowbitx/ui-shadcn 深路径导出</h1>
  <p class="hint">每个 import 单独对应 exports 里的一个子路径（.../components/ProXxx、/utils/openDialog）</p>

  <Case title="components/ProButton + components/ProModal + components/ProConfirmButton">
    <div class="row">
      <ProButton type="primary" @click="uiMessage.success('深路径 OK')">ProButton</ProButton>
      <ProButton @click="modalOpen = true">打开 ProModal</ProButton>
      <ProConfirmButton title="确认操作？" :on-confirm="() => Promise.resolve()">
        ProConfirmButton
      </ProConfirmButton>
    </div>
    <ProModal v-model:open="modalOpen" title="深路径 ProModal" @ok="uiMessage.success('ok')">内容</ProModal>
  </Case>

  <Case title="components/ProInput / ProSelect / ProCheckboxGroup / ProRadioGroup">
    <div class="row">
      <ProInput v-model="input" :debounce="200" style="width: 200px" placeholder="输入" />
      <ProSelect v-model="select" :options="['A', 'B']" style="width: 140px" />
      <ProCheckboxGroup v-model="checkbox" :options="['A', 'B']" />
      <ProRadioGroup v-model="radio" :options="['A', 'B']" />
    </div>
  </Case>

  <Case title="components/ProFormBuilder + components/ProDescriptions">
    <ProFormBuilder v-model="form" :form-items="formItems" />
    <ProDescriptions :items="descItems" :data="descData" />
  </Case>

  <Case title="utils/openDialog">
    <ProButton @click="uiMessage.info('openDialog 来自深路径导入')">已导入（见 dialog 页实际弹窗）</ProButton>
  </Case>
</template>
