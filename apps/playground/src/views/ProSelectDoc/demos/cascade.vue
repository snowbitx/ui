<script setup lang="ts">
import { ref } from 'vue'
import { ProSelect } from '@/ui'

defineOptions({
  name: 'ProSelectCascadeDemo',
})

const city = ref<string>()
const district = ref<string>()

// 模拟：市 → 区联动字典
const cityDict = {
  北京: ['朝阳区', '海淀区'],
  上海: ['浦东新区', '静安区'],
}

function fetchDistricts(deps: any) {
  const list = cityDict[deps] || []
  return Promise.resolve(list.map((name) => ({ label: name, value: name })))
}

function onCityChange() {
  district.value = undefined
}
</script>

<template>
  <DemoSpace>
    <ProSelect
      v-model:value="city"
      style="width: 160px"
      :options="Object.keys(cityDict).map((name) => ({ label: name, value: name }))"
      placeholder="选择城市"
      @change="onCityChange"
    />
    <ProSelect
      v-model:value="district"
      style="width: 160px"
      :options="fetchDistricts"
      :deps="city"
      placeholder="联动区县"
    />
  </DemoSpace>
  <p>选中：{{ city || '-' }} / {{ district || '-' }}</p>
</template>
