# @snowbitx/ui-core

SnowUI 组件库的无 UI 依赖核心层：`createApis`、通用 hooks（`useOptions` / `useDebounce` / `useThrottle` / `useAsyncLoading`）以及类型契约（`FormItem`、`TableColumn`、`DialogOptions` 等）。

`@snowbitx/ui-antd`、`@snowbitx/ui-element`、`@snowbitx/ui-shadcn` 均依赖本包，一般无需单独安装；如果你的项目只用核心工具函数，可以只装它。

## 安装

```sh
pnpm add @snowbitx/ui-core
```

## 使用

```ts
import { createApis, useOptions, useDebounce } from "@snowbitx/ui-core";
```

peer 依赖 `vue ^3.5`，需在你的项目中自行安装。

## 相关包

- [@snowbitx/ui-antd](https://www.npmjs.com/package/@snowbitx/ui-antd) — 基于 ant-design-vue
- [@snowbitx/ui-element](https://www.npmjs.com/package/@snowbitx/ui-element) — 基于 element-plus
- [@snowbitx/ui-shadcn](https://www.npmjs.com/package/@snowbitx/ui-shadcn) — 基于 shadcn-vue（reka-ui + Tailwind CSS v4）

## License

MIT
