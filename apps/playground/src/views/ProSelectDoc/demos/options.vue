<script setup lang="ts">
import { ref } from 'vue'
import DemoSpace from '@/components/DemoSpace/index.vue'
import { ProSelect } from '@/ui'

defineOptions({
  name: 'ProSelectOptionsDemo',
})

const value = ref('a')
const value2 = ref<string[]>([])

// 模拟远程字典接口
function fetchTypes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
      ])
    }, 800)
  })
}
</script>

<template>
  <DemoSpace class="vertical" style="gap: 16px">
    <div style="width: 320px">
      <p>静态 options：</p>
      <ProSelect
        v-model="value"
        style="width: 100%"
        :options="[
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
        ]"
      />
    </div>
    <div style="width: 320px">
      <p>字符串数组（labelField/valueField 同值）：</p>
      <ProSelect
        v-model="value2"
        multiple
        style="width: 100%"
        :options="['苹果', '香蕉', '橘子']"
        placeholder="多选"
      />
    </div>
    <div style="width: 320px">
      <p>远程字典（自动 loading）：</p>
      <ProSelect v-model="value" style="width: 100%" :options="fetchTypes" placeholder="远程字典" />
    </div>
  </DemoSpace>
</template>
