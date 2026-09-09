# demo

「通过一份 JSON 渲染页面」的演示应用：页面代码**不由人手写**，
由 `packages/page-generator` 从 mock-server 登记的页面 JSON 生成（`src/pages/` 下）。

演示核心链路：

1. `pnpm mock` —— 启动模拟后端（页面登记文档 + CRUD 数据，端口 4173）
2. `pnpm gen:pages` —— 拉取 JSON → 拼 vue 文件字符串 → 写入 `src/pages/`
3. `pnpm demo` —— 路由与左侧菜单按生成结果自动变化

demo 固定使用 `@snowbitx/ui-antd`（页面生成模板写死 antd 版组件）。

需要逐个组件看用法/切 UI 库，去 playground（`pnpm dev`）；
需要验证发包形态，去 smoke（`pnpm smoke`）。
