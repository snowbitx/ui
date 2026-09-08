# snowbitx-ui

基于 Vue 3 的表格组件库与「JSON 渲染页面」演示项目。同一套组件 API 提供三个 UI 实现：
`@snowbitx/ui-antd`（ant-design-vue）、`@snowbitx/ui-element`（element-plus）与
`@snowbitx/ui-shadcn`（shadcn-vue / reka-ui + Tailwind CSS v4），按需选用。

## Monorepo 结构

使用 pnpm workspace，目的是演示「组件项目（demo 应用）」和「组件库」分开：

```
apps/demo                    # 演示应用：页面全部由脚本生成，演示「通过一份 JSON 渲染页面」
apps/playground              # 组件演示站：仿 antdv 官网，固定演示二次封装组件的用法
apps/smoke                   # 冒烟站：只 import packages/*/dist（发包形态），验证产物能用
packages/ui-core            # 无 UI 依赖核心层：createApis / hooks / 组件 API 类型契约
packages/ui-antd            # 组件库 antd 实现：ant-design-vue 的二次封装（下述 ProXxx 均在此目录）
  └─ src/components          #   ProTable 表格增删改查一体组件
                            #   ProFormBuilder JSON 配置式表单
                            #   ProButton 防抖 + async 自动 loading（含 ProCountdownButton 倒计时）
                            #   ProInput 输入防抖、ProSelect/ProCheckboxGroup/ProRadioGroup options 驱动
                            #   ProModal beforeOk 拦截、ProConfirmButton 气泡确认、ProDescriptions 详情
  └─ src/utils               #   openDialog 命令式弹窗、renderDialogForm 表单弹窗
packages/ui-element         # 组件库 element-plus 实现：API 与 ui-antd 完全对齐
packages/ui-shadcn          # 组件库 shadcn 实现：API 与 ui-antd 完全对齐（Tailwind v4）
packages/page-generator      # 页面生成器：拉 JSON → 拼 vue 字符串 → 写文件
scripts/mock-server          # 模拟「后端登记页面 JSON 的公开文档接口」+ CRUD 数据
```

三个前端入口的分工：

- **demo**（`pnpm demo`）：页面全部由脚本生成，演示「通过一份 JSON 渲染页面」，固定 antd 版。
- **playground**（`pnpm play`）：手写的固定演示站，每个组件一个文档页（效果 / 代码切换 + API 表格），类似 ant-design-vue 官网。页面右上角可一键切换 antd / Element / shadcn 实现，是组件开发的主战场。
- **smoke**（`pnpm smoke`）：打包产物冒烟站。无代理层、按模式直接 import 各实现包 `dist` 里的主入口与全部深路径导出；`pnpm build` 后跑它，能开就能发。
- **mock-server**（`pnpm mock`）：给上面提供数据的假后端（smoke 除外，它数据内联）。

## 核心流程：通过一份 JSON 渲染页面

1. **后端登记**：后端把页面描述 JSON（路由、标题、接口地址、表格列、表单项、校验规则）登记在一个文档上，文档提供公开接口可以查询。
2. **脚本拉取**：`packages/page-generator` 用 Node 脚本请求该接口，拿到这份数据（`fetchSchemas.mjs`）。
3. **组装字符串**：把 JSON 组装成 vue 文件内容的字符串 —— 页面就是 `ProTable` 换了个壳，配置全部来自 JSON（`generate.ts`）。
4. **写入项目**：把字符串格式化后写入 `apps/demo/src/pages/<Name>.vue`，同时生成 `pages/index.ts` 路由注册表（`writer.mjs`），demo 的路由和左侧菜单自动跟着变。

```bash
pnpm install

# 1. 启动模拟后端（页面登记文档 + CRUD 数据，端口 4173）
pnpm mock

# 2. 拉取 JSON 并生成页面（写入 apps/demo/src/pages）
pnpm gen:pages

# 3. 启动演示应用
pnpm demo

# 或者启动组件演示站（playground）
pnpm play
```

也可以一步到位：`pnpm mock:start`（后台起 mock 服务并执行生成）。

> 完整链路讲解见 [docs/页面生成链路讲解.md](docs/页面生成链路讲解.md)。

## 页面登记文档的格式

`GET http://localhost:4173/api/page-registry`：

```json
{
  "version": "2026-09-08",
  "pages": [
    {
      "route": "/users",
      "name": "UsersPage",
      "title": "用户管理",
      "api": "/api/users",
      "columns": [{ "title": "姓名", "dataIndex": "name" }],
      "formItems": [{ "label": "姓名", "key": "name", "type": "input" }],
      "rules": { "name": [{ "required": true, "message": "请输入姓名" }] }
    }
  ]
}
```

后端在这个文档上登记新页面后，重新执行 `pnpm gen:pages` 即可，demo 里就会多出一个完整可用的增删改查页面。

## 组件库用法（@snowbitx/ui-antd）

```vue
<script setup lang="ts">
import { ProTable, createApis } from "@snowbitx/ui-antd";

// createApis 是组件库提供的工具函数：传入接口基地址，
// 返回 ProTable 需要的 get / create / update / remove 四个请求方法（基于 fetch）。
// 如果你项目里用 axios 等，也可以自己实现这四个方法，不传 createApis 的结果也行。
const apis = createApis("/api/users");
const columns = [{ title: "姓名", dataIndex: "name" }];
const formItems = [{ label: "姓名", key: "name", type: "input" }];
</script>

<template>
  <ProTable :apis="apis" :columns="columns" :form-items="form-items" />
</template>
```

**`apis` 是什么**：ProTable 的增删改查全靠它，约定必须有 `get / create / update / remove` 四个 Promise 方法（查列表 / 新增 / 修改 / 删除）。**`createApis` 是什么**：组件库为这个约定提供的开箱即用实现——你只给它一个接口地址，它帮你把四个 HTTP 请求封装好；接口路径风格不一致或想换请求库时，传 `{ request }` 自定义请求函数，或者干脆自己写四个方法（见 `createApis` 的类型定义 `PageApis`）。

## 组件总览

| 组件 | 二次封装了什么 |
| --- | --- |
| `ProTable` | 表格增删改查一体：按钮、行选择、搜索、弹窗表单 |
| `ProButton` | 防抖点击；onClick 返回 Promise 时自动 loading |
| `ProCountdownButton` | 倒计时按钮，适合发送验证码（接口 resolve 后才开始计时） |
| `ProInput` | 输入防抖，停止输入 delay 毫秒后才同步 v-model |
| `ProSelect` / `ProCheckboxGroup` / `ProRadioGroup` | options 配置驱动：静态数组 / 字符串数组 / 远程字典函数（自动 loading），deps 变化自动重拉做级联 |
| `ProModal` | beforeOk 异步拦截：返回 false 或 reject 不关闭，期间确定按钮自动 loading |
| `ProConfirmButton` | 气泡确认 + 按钮合一，确认请求期间自动 loading |
| `ProDescriptions` | 配置驱动详情列表，render 做字典翻译，空值显示占位符 |
| `ProFormBuilder` | JSON 数组渲染表单，自动处理 antdv 的 v-model 差异 |
| `openDialog` | 命令式弹窗，点确定自动调组件的 submit() 并管理 loading/销毁 |

所有组件的完整交互演示和 API 表格见 playground：`pnpm play`。

## 常用脚本

| 命令             | 说明                                                          |
| ---------------- | ------------------------------------------------------------- |
| `pnpm play`      | 启动组件演示站（apps/playground，右上角切 antd/element/shadcn） |
| `pnpm demo`      | 启动 demo 应用（apps/demo，页面由 JSON 生成，antd 版）          |
| `pnpm smoke`     | 启动冒烟站（apps/smoke，需先 `pnpm build`）                    |
| `pnpm mock`      | 启动模拟后端（scripts/mock-server，端口 4173）                 |
| `pnpm gen:pages` | 拉取页面登记 JSON，生成 vue 页面文件                           |
| `pnpm build`     | 全 workspace 构建                                              |
| `pnpm type-check` | 全 workspace 类型检查                                         |
| `pnpm format`    | prettier 格式化                                               |
