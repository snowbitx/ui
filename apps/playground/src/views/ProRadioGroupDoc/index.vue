<script setup lang="ts">
import { ProRadioGroup } from '@snowbitx/ui'
import DemoBlock from '@/components/DemoBlock/index.vue'
import OptionsDemo from '@/views/ProCheckboxGroupDoc/demos/options.vue'
import optionsSource from '@/views/ProCheckboxGroupDoc/demos/options.vue?raw'
import optionsSourceJs from '@/views/ProCheckboxGroupDoc/demos/options.vue.js?raw'

defineOptions({
  name: 'ProRadioGroupDoc',
})
</script>

<template>
  <div>
    <h1>ProRadioGroup 单选组</h1>
    <p>与 ProCheckboxGroup 同源的 options 配置驱动，支持静态数组与远程字典。</p>

    <DemoBlock title="options 数据源" :code="optionsSource" :js-code="optionsSourceJs">
      <OptionsDemo />
    </DemoBlock>
  </div>
</template>
