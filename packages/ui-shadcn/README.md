# @snowbitx/ui-shadcn

基于 [shadcn-vue](https://www.shadcn-vue.com/)（reka-ui + Tailwind CSS v4）的 SnowUI 二次封装组件库，API 与 `@snowbitx/ui-antd` / `@snowbitx/ui-element` 完全对齐：

- **ProTable** — 搜索表单 + 表格 + 分页一体化
- **ProFormBuilder** — JSON 配置化表单
- **ProButton / ProCountdownButton / ProConfirmButton** — 带防抖 / 倒计时 / 二次确认的按钮
- **ProInput** — 自动搜索防抖输入框
- **ProSelect / ProCheckboxGroup / ProRadioGroup** — 字典驱动的选择组件
- **ProModal** — 受控/命令式弹窗
- **ProDescriptions** — 描述列表
- **openDialog** — 命令式打开弹窗的工具函数

## 安装

```sh
pnpm add @snowbitx/ui-shadcn
```

peer 依赖：`vue ^3.5`、`tailwindcss ^4.3`。

## 样式

组件样式由使用方的 Tailwind 编译，二选一：

```ts
// 开箱即用：引入完整样式入口（Tailwind v4 CSS-first）
import "@snowbitx/ui-shadcn/style.css";
```

```css
/* 或在你的 Tailwind 入口里只引入设计令牌 */
@import "@snowbitx/ui-shadcn/tailwind.preset.css";
```

## 使用

```vue
<script setup lang="ts">
import { ProTable } from "@snowbitx/ui-shadcn";
// 或按需深路径引入：import ProTable from "@snowbitx/ui-shadcn/components/ProTable";
</script>
```

同系列还有 [@snowbitx/ui-antd](https://www.npmjs.com/package/@snowbitx/ui-antd)（ant-design-vue 版）与 [@snowbitx/ui-element](https://www.npmjs.com/package/@snowbitx/ui-element)（element-plus 版），API 完全对齐，可按 UI 库切换。

## License

MIT
