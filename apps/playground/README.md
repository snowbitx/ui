# playground

组件演示站（文档站）：每个二次封装组件一个文档页（效果 / 代码切换 + API 表格），仿 ant-design-vue 官网。

页面全部**手写**，通过 `src/ui` 代理层导入组件——代理层按 cookie（`snowui-ui`）在
`@snowbitx/ui-antd` / `@snowbitx/ui-element` / `@snowbitx/ui-shadcn` 之间切换，
右上角开关或 URL 带 `?ui=element` 即可换实现，供三种 UI 版本对照开发。

与 smoke 站的区别：playground 走代理层（单页内切三种 UI），聚焦「组件怎么用」；
smoke 站无代理层，按模式直接 import 指定实现包的 **dist 产物**，聚焦「发包能不能用」。

```bash
pnpm dev        # 开发调试组件用这个
pnpm build       # 需要验证打包产物时构建全部包
pnpm smoke       # 然后开冒烟站
```
