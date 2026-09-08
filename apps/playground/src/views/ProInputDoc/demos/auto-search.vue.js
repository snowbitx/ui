<script setup>
import { ref } from 'vue';
defineOptions({
    name: 'ProInputSearchDemo',
});
const keyword = ref('');
const result = ref('还没搜索');
// 停止输入后自动触发一次搜索
function doSearch() {
    result.value = `搜索「${keyword.value}」的结果`;
}
</script>

<template>
  <div>
    <DemoSpace class="vertical" style="width: 320px">
      <ProInput
        v-model="keyword"
        style="width: 100%"
        :debounce="400"
        placeholder="输入后停 400ms 自动搜索"
        @keyup.enter="doSearch"
      />
      <ProButton type="primary" @click="doSearch">立即搜索</ProButton>
    </DemoSpace>
    <p>{{ result }}</p>
  </div>
</template>
