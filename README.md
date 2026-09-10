# cynnie-ui

基于 Vue 3 的中后台 Pro 组件库，同一套组件 API 提供三个 UI 实现，按需选用：

- [@cynnie/ui-antd](https://www.npmjs.com/package/@cynnie/ui-antd) — 基于 [ant-design-vue](https://antdv.com/)
- [@cynnie/ui-element](https://www.npmjs.com/package/@cynnie/ui-element) — 基于 [element-plus](https://element-plus.org/)
- [@cynnie/ui-shadcn](https://www.npmjs.com/package/@cynnie/ui-shadcn) — 基于 [shadcn-vue](https://www.shadcn-vue.com/)（reka-ui + Tailwind CSS v4）

**[在线文档 & 演示](https://ui-playground-puce.vercel.app/)**（右上角可切换 antd / Element / shadcn 实现）

## 安装

```sh
pnpm add @cynnie/ui-antd ant-design-vue
# 或
pnpm add @cynnie/ui-element element-plus
# 或
pnpm add @cynnie/ui-shadcn
```

peer 依赖 `vue ^3.5` 与对应 UI 库版本见各包 README。

## 使用

```vue
<script setup lang="ts">
import { ProTable, createApis } from "@cynnie/ui-antd";

// 传入接口基地址，返回 ProTable 需要的 get / create / update / remove 四个请求方法（基于 fetch）。
// 也可以用 axios 等自行实现这四个方法，不必经过 createApis。
const apis = createApis("/api/users");
const columns = [{ title: "姓名", dataIndex: "name" }];
const formItems = [{ label: "姓名", key: "name", type: "input" }];
</script>

<template>
  <ProTable :apis="apis" :columns="columns" :form-items="formItems" />
</template>
```

## 组件总览

| 组件 | 说明 |
| --- | --- |
| `ProTable` | 表格增删改查一体：按钮、行选择、搜索、弹窗表单 |
| `ProButton` | 防抖点击；onClick 返回 Promise 时自动 loading |
| `ProCountdownButton` | 倒计时按钮，适合发送验证码（接口 resolve 后才开始计时） |
| `ProInput` | 输入防抖，停止输入 delay 毫秒后才同步 v-model |
| `ProSelect` / `ProCheckboxGroup` / `ProRadioGroup` | options 配置驱动：静态数组 / 字符串数组 / 远程字典函数（自动 loading），deps 变化自动重拉做级联 |
| `ProModal` | beforeOk 异步拦截：返回 false 或 reject 不关闭，期间确定按钮自动 loading |
| `ProConfirmButton` | 气泡确认 + 按钮合一，确认请求期间自动 loading |
| `ProDescriptions` | 配置驱动详情列表，render 做字典翻译，空值显示占位符 |
| `ProFormBuilder` | JSON 数组渲染表单，自动处理不同 UI 库的 v-model 差异 |
| `openDialog` | 命令式弹窗，点确定自动调组件的 submit() 并管理 loading/销毁 |

每个组件的完整交互演示和 API 表格见[在线文档](https://ui-playground-puce.vercel.app/)。

## License

MIT
