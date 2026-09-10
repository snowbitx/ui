# @cynnie/ui-shadcn

基于 [shadcn-vue](https://www.shadcn-vue.com/)（reka-ui + Tailwind CSS v4）的 cynnie-ui 二次封装组件库：

**[在线文档 & 演示](https://ui-playground-puce.vercel.app/?ui=shadcn)**

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
pnpm add @cynnie/ui-shadcn
```

peer 依赖：`vue ^3.5`、`tailwindcss ^4.3`。

## 样式

组件样式由使用方的 Tailwind 编译，二选一：

```ts
// 开箱即用：引入完整样式入口（Tailwind v4 CSS-first）
import "@cynnie/ui-shadcn/style.css";
```

```css
/* 或在你的 Tailwind 入口里只引入设计令牌 */
@import "@cynnie/ui-shadcn/tailwind.preset.css";
```

## 使用

```vue
<script setup lang="ts">
import { ProTable } from "@cynnie/ui-shadcn";
// 或按需深路径引入：import ProTable from "@cynnie/ui-shadcn/components/ProTable";
</script>
```

同系列还有 [@cynnie/ui-antd](https://www.npmjs.com/package/@cynnie/ui-antd)（ant-design-vue 版）与 [@cynnie/ui-element](https://www.npmjs.com/package/@cynnie/ui-element)（element-plus 版），可按 UI 库选用。

## License

MIT
