<script setup>
import { ref } from 'vue';
import { renderDialogForm, uiMessage } from '@/ui';
defineOptions({
    name: 'RenderDialogFormDemo',
});
const lastSubmit = ref('还没提交');
const formItems = [
    { label: '姓名', key: 'name', span: 12 },
    { label: '年龄', key: 'age', type: 'number', span: 12 },
];
const rules = {
    name: [{ required: true, message: '请输入姓名' }],
};
// 一行代码弹出表单弹窗：点确定自动校验，通过后 onOk 拿到表单数据
function openCreate() {
    const { close } = renderDialogForm({ formItems, rules, modelValue: { name: '', age: undefined } }, {
        title: '新增用户',
        async onOk(data) {
            await new Promise((r) => setTimeout(r, 800)); // 模拟请求
            uiMessage.success('已提交：' + JSON.stringify(data));
            lastSubmit.value = JSON.stringify(data);
            close();
        },
    });
}
// 编辑：modelValue 传已有数据即可
function openEdit() {
    const { close } = renderDialogForm({ formItems, rules, modelValue: { name: '张三', age: 18 } }, {
        title: '编辑用户',
        onOk(data) {
            lastSubmit.value = JSON.stringify(data);
            uiMessage.success('已保存');
            close();
        },
    });
}
</script>

<template>
  <DemoSpace>
    <ProButton type="primary" :on-click="openCreate">新增（命令式表单弹窗）</ProButton>
    <ProButton :on-click="openEdit">编辑（回填数据）</ProButton>
  </DemoSpace>
  <p>最近提交：{{ lastSubmit }}</p>
</template>
