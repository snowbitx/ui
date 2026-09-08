<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { openDialog } from "../../utils/openDialog";
import ProTableForm from "./ProTableForm.vue";
import { message, Modal } from "ant-design-vue";

defineOptions({
  name: "ProTable",
});

type PromiseFn = (...args: any[]) => Promise<any>;

const props = defineProps<{
  apis: {
    get: PromiseFn;
    create: PromiseFn;
    update: PromiseFn;
    remove: PromiseFn;
  };
  rowKey?: string;
  beforeCreate?: () => Promise<Record<string, any>>;
  columns: any[];
  formItems: any[];
  rules?: any;
}>();

const key = props.rowKey || "id";

const queryParams = defineModel<any>("queryParams", { default: () => ({}) });

const { get, create, update, remove } = props.apis;
const dataSource = ref<any[]>([]);
const isLoading = ref(false);
function loadData() {
  isLoading.value = true;
  get(queryParams.value)
    .then((res) => {
      dataSource.value = res.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const selectedRowKeys = ref<any[]>([]);

const selectedRow = shallowRef<Record<string, any>>();
function onSelectChange(keys: any[], rows: any[]) {
  selectedRowKeys.value = keys;
  selectedRow.value = rows[0];
}

loadData();

function openForm(data: Record<string, any>) {
  openDialog(
    ProTableForm,
    {
      requestApi: data[key] ? update : create,
      formItems: props.formItems,
      rules: props.rules,
      formData: data,
    },
    {
      title: data[key] ? "修改" : "新增",
      onOk: () => {
        loadData();
      },
    },
  );
}

async function handleCreate() {
  openForm({});
}
function handleUpdate() {
  openForm(selectedRow.value);
}
function handleRemove() {
  Modal.confirm({
    title: "确定删除吗？",
    onOk: () => {
      remove(selectedRowKeys.value)
        .then(loadData)
        .catch(() => {
          message.error("删除失败");
        });
    },
  });
}

defineExpose({
  refresh: loadData,
});
</script>

<template>
  <div>
    <a-space style="margin-bottom: 20px">
      <a-button type="primary" @click="handleCreate">新增</a-button>
      <a-button type="primary" @click="handleUpdate">修改</a-button>
      <a-button type="primary" danger :disabled="!selectedRowKeys.length" @click="handleRemove"
        >删除</a-button
      >
      <slot name="search"></slot>
      <a-input-search v-model:value="queryParams.keyword" @search="loadData"></a-input-search>
    </a-space>

    <a-table
      :loading="isLoading"
      row-key="id"
      :dataSource="dataSource"
      :columns="columns"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
    </a-table>
  </div>
</template>
