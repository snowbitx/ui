<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import ProFormBuilder from "../ProFormBuilder/index.vue";

defineOptions({
  name: "ProTableForm",
});

const props = defineProps<{
  formItems: any[];
  rules?: any;
  formData: Record<string, any>;
  requestApi: (data: Record<string, any>) => Promise<any>;
}>();

const data = ref<Record<string, any>>({ ...props.formData });
const formRef = useTemplateRef<any>("formRef");

defineExpose({
  async submit() {
    await formRef.value?.validate();
    return props.requestApi({
      ...data.value,
    });
  },
});
</script>

<template>
  <ProFormBuilder ref="formRef" :modelValue="data" :form-items="formItems" :rules="rules" />
</template>
