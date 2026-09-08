<script setup lang="ts">
/**
 * 文档站专用的纯 HTML 表格：展示 Props / Events / Slots 等 API 元数据。
 * 不依赖任何 UI 库，两种模式下样式一致。
 */
export interface DemoColumn {
  title: string
  dataIndex: string
}

defineOptions({
  name: 'DemoTable',
})

const props = defineProps<{
  columns: DemoColumn[]
  dataSource: Record<string, any>[]
}>()
</script>

<template>
  <table class="demo-table">
    <thead>
      <tr>
        <th v-for="col in props.columns" :key="col.dataIndex">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in props.dataSource" :key="i">
        <td v-for="col in props.columns" :key="col.dataIndex">{{ row[col.dataIndex] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.demo-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 24px;
  font-size: 13px;
}
.demo-table th,
.demo-table td {
  border: 1px solid #f0f0f0;
  padding: 8px 12px;
  text-align: left;
}
.demo-table th {
  background: #fafafa;
  font-weight: 500;
}
</style>
