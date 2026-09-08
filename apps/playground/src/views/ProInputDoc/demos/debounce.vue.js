<script setup>
import { ref, watch } from 'vue';
defineOptions({
    name: 'ProInputDebounceDemo',
});
const keyword = ref('');
// keyword 停止输入 500ms 后才会变化
watch(keyword, (value) => {
    console.log('防抖后的值：', value);
});
</script>

<template>
  <div>
    <ProInput
      v-model="keyword"
      :debounce="500"
      placeholder="停止输入 500ms 后才同步（看控制台）"
    />
    <p>当前值：{{ keyword || '（空）' }}</p>
  </div>
</template>
