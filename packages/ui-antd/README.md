# @cynnie/ui-antd

基于 [ant-design-vue](https://antdv.com/) 的 SnowUI 二次封装组件库，提供开箱即用的中后台组件：

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
pnpm add @cynnie/ui-antd ant-design-vue
```

peer 依赖：`vue ^3.5`、`ant-design-vue ^4.2`。

## 使用

```vue
<script setup lang="ts">
import { ProTable } from "@cynnie/ui-antd";
// 或按需深路径引入：import ProTable from "@cynnie/ui-antd/components/ProTable";
</script>
```

同系列还有 [@cynnie/ui-element](https://www.npmjs.com/package/@cynnie/ui-element)（element-plus 版）与 [@cynnie/ui-shadcn](https://www.npmjs.com/package/@cynnie/ui-shadcn)（shadcn-vue 版），API 完全对齐，可按 UI 库切换。

## License

MIT
