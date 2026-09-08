<script setup>
import { ref } from 'vue';
defineOptions({
    name: 'UserForm',
});
const props = defineProps();
const data = ref({ ...props.formData });
const formItems = [
    { label: '商品名称', key: 'name', type: 'input', props: { placeholder: '请输入商品名称' } },
    { label: '价格', key: 'price', type: 'number' },
];
const rules = {
    name: [{ required: true, message: '请输入商品名称' }],
};
const formRef = ref();
// openDialog 点确定时会调用这里；校验抛错则弹窗不关闭
defineExpose({
    async submit() {
        await formRef.value?.validate();
        return props.requestApi(data.value);
    },
});
</script>

<template>
  <ProFormBuilder ref="formRef" v-model="data" :form-items="formItems" :rules="rules" />
</template>
