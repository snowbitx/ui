<script setup>
import { ref } from 'vue';
defineOptions({
    name: 'GroupOptionsDemo',
});
const checked = ref(['a']);
const radio = ref('user');
function fetchRoles() {
    return Promise.resolve([
        { label: '管理员', value: 'admin' },
        { label: '编辑', value: 'editor' },
        { label: '访客', value: 'guest' },
    ]);
}
</script>

<template>
  <DemoSpace class="vertical" style="width: 100%">
    <div>
      <p>多选（静态 options）：</p>
      <ProCheckboxGroup
        v-model="checked"
        :options="[
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
        ]"
      />
    </div>
    <div>
      <p>多选（远程字典）：</p>
      <ProCheckboxGroup v-model="checked" :options="fetchRoles" />
    </div>
    <div>
      <p>单选（远程字典）：</p>
      <ProRadioGroup v-model="radio" :options="fetchRoles" />
    </div>
  </DemoSpace>
  <p>checkbox：{{ JSON.stringify(checked) }}，radio：{{ radio }}</p>
</template>
