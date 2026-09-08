<script setup>
import { ref } from 'vue';
defineOptions({
    name: 'ProFormBuilderBasicDemo',
});
const formData = ref({
    name: '张三',
    age: 18,
});
const formItems = [
    { label: '姓名', key: 'name', type: 'input' },
    { label: '年龄', key: 'age' },
];
const rules = {
    name: [{ required: true, message: '请输入姓名' }],
    age: [{ required: true, message: '请输入年龄' }],
};
const emit = defineEmits(['bind', 'validate']);
emit('bind', formData);
</script>

<template>
  <div>
    <ProFormBuilder v-model="formData" :form-items="formItems" :rules="rules" />
    <DemoSpace>
      <ProButton type="primary" @click="emit('validate', $event)">校验（在上方点）</ProButton>
      <ProButton @click="formData = { name: '', age: 0 }">重置数据</ProButton>
    </DemoSpace>
  </div>
</template>
