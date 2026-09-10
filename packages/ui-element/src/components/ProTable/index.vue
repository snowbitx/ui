<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { openDialog } from "../../utils/openDialog";
import ProTableForm from "./ProTableForm.vue";
import type { PageApis, TableColumn, FormItem, FormRules } from "@cynnie/ui-core";

defineOptions({
  name: "ProTable",
});

const props = defineProps<{
  apis: PageApis;
  rowKey?: string;
  beforeCreate?: () => Promise<Record<string, any>>;
  columns: TableColumn[];
  formItems: FormItem[];
  rules?: FormRules;
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
function onSelectChange(rows: any[]) {
  // el-table 的选择模型是行数组，转成「keys + 单行」与 antd 版对齐
  selectedRowKeys.value = rows.map((row) => row[key]);
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
  ElMessageBox.confirm("确定删除吗？", "提示", { type: "warning" })
    .then(() => {
      remove(selectedRowKeys.value)
        .then(loadData)
        .catch(() => {
          ElMessage.error("删除失败");
        });
    })
    .catch(() => {});
}

defineExpose({
  refresh: loadData,
});
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-space wrap>
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="primary" @click="handleUpdate">修改</el-button>
        <el-button type="danger" :disabled="!selectedRowKeys.length" @click="handleRemove">删除</el-button>
        <slot name="search"></slot>
        <el-input v-model="queryParams.keyword" style="width: 220px" @change="loadData"></el-input>
      </el-space>
    </div>

    <el-table
      v-loading="isLoading"
      :data="dataSource"
      @selection-change="onSelectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="col in columns"
        :key="col.dataIndex"
        :prop="col.dataIndex"
        :label="col.title"
      />
    </el-table>
  </div>
</template>
