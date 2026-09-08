<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import ProFormBuilder from "../ProFormBuilder/index.vue";
import type { FormInstance } from "element-plus";
import type { FormItem, FormRules } from "@snowbitx/ui-core";

defineOptions({
  name: "ProTableForm",
});

const props = defineProps<{
  formItems: FormItem[];
  rules?: FormRules;
  formData: Record<string, any>;
  requestApi: (data: Record<string, any>) => Promise<any>;
}>();

const data = ref<Record<string, any>>({ ...props.formData });
const formRef = useTemplateRef<FormInstance>("formRef");

defineExpose({
  async submit() {
    await formRef.value.validate();
    return props.requestApi({
      ...data.value,
    });
  },
});
</script>

<template>
  <ProFormBuilder ref="formRef" :modelValue="data" :form-items="formItems" :rules="rules" />
</template>
