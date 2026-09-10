<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { openDialog } from "../../utils/openDialog";
import ProTableForm from "./ProTableForm.vue";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Loader } from "../ui/loader";
import ProConfirmButton from "../ProConfirmButton/index.vue";
import { uiMessage } from "../../utils/uiMessage";
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

const allSelected = computed(
  () => dataSource.value.length > 0 && dataSource.value.every((row) => selectedRowKeys.value.includes(row[key])),
);

function onSelectAll(checked: boolean | "indeterminate") {
  if (checked === true) {
    selectedRowKeys.value = dataSource.value.map((row) => row[key]);
  } else {
    selectedRowKeys.value = [];
  }
}

function onSelectRow(row: Record<string, any>, checked: boolean | "indeterminate") {
  if (checked === true) {
    selectedRowKeys.value = [...selectedRowKeys.value, row[key]];
  } else {
    selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== row[key]);
  }
  // 与 antd / element 版对齐：selection 变化即更新 selectedRow
  selectedRow.value = dataSource.value.find((row) => row[key] === selectedRowKeys.value[0]);
}

function onSelectChange(row: Record<string, any>) {
  const rowKey = row[key];
  const checked = !selectedRowKeys.value.includes(rowKey);
  onSelectRow(row, checked);
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
  remove(selectedRowKeys.value)
    .then(loadData)
    .catch(() => {
      uiMessage.error("删除失败");
    });
}

defineExpose({
  refresh: loadData,
});
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center gap-3 mb-5">
      <Button variant="default" @click="handleCreate">新增</Button>
      <Button variant="default" :disabled="!selectedRowKeys.length || undefined" @click="handleUpdate">修改</Button>
      <ProConfirmButton danger title="确定删除吗？" :disabled="!selectedRowKeys.length" :on-confirm="handleRemove">
        删除
      </ProConfirmButton>
      <slot name="search"></slot>
      <div class="flex items-center gap-2 flex-1 max-w-70">
        <Input
          v-model="queryParams.keyword"
          placeholder="搜索关键词"
          @keydown.enter="loadData"
        />
        <Button variant="outline" @click="loadData">搜索</Button>
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableCell class="w-10">
              <Checkbox :model-value="allSelected" @update:model-value="onSelectAll" aria-label="全选" />
            </TableCell>
            <TableHead v-for="col in columns" :key="col.dataIndex">{{ col.title }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="!isLoading">
            <TableRow
              v-for="row in dataSource"
              :key="row[key]"
              :class="{ 'bg-muted/50': selectedRowKeys.includes(row[key]) }"
              class="cursor-pointer"
              @click="onSelectChange(row)"
            >
              <TableCell @click.stop>
                <Checkbox
                  :model-value="selectedRowKeys.includes(row[key])"
                  @update:model-value="(v: any) => onSelectRow(row, v)"
                  :aria-label="`选择 ${row[key]}`"
                />
              </TableCell>
              <TableCell v-for="col in columns" :key="col.dataIndex">{{ row[col.dataIndex] }}</TableCell>
            </TableRow>
            <TableRow v-if="!dataSource.length" class="hover:bg-transparent">
              <TableCell class="h-24 text-center text-muted-foreground" :colspan="columns.length + 1">
                暂无数据
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else class="hover:bg-transparent">
            <TableCell class="h-24" :colspan="columns.length + 1">
              <div class="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader />
                加载中...
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
