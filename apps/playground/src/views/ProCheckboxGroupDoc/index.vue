<script setup lang="ts">
import { showImport, docTerm } from '@/utils/showImport'
import DemoBlock from '@/components/DemoBlock/index.vue'
import OptionsDemo from './demos/options.vue'
import optionsSource from './demos/options.vue?raw'
import optionsSourceJs from './demos/options.vue.js?raw'

defineOptions({
  name: 'ProCheckboxGroupDoc',
})
</script>

<template>
  <div>
    <h1>ProCheckboxGroup / ProRadioGroup 选择组</h1>
    <p>
      与 ProSelect 相同的 options 配置驱动：静态数组、字符串数组、远程字典函数。其余用法分别与
      {{ docTerm('a-checkbox-group', 'el-checkbox-group') }} / {{ docTerm('a-radio-group', 'el-radio-group') }} 一致。
    </p>

    <DemoBlock title="options 数据源" :code="showImport(optionsSource)" :js-code="showImport(optionsSourceJs)">
      <OptionsDemo />
    </DemoBlock>
  </div>
</template>
