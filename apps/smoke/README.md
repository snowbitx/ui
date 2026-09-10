# smoke

**打包产物冒烟站**：用最小依赖从 `packages/*/dist`（`package.json` exports 指向的文件）导入全部公开 API 并跑起来。

和 playground 的区别：playground 也走 `@cynnie/*`，但那是开发主战场，样式外壳、代理层都是为「好用」服务；smoke 刻意保持最小（一个壳 + 12 页），**只验证一件事——发包形态能不能被正常 import 并运行**。

## 验证什么

- **主入口（barrel）**：`import { ProButton, ... } from '@cynnie/ui-xxx'`
- **深路径**：`@cynnie/ui-xxx/components/ProTable` 等 exports 里的每个子路径
- **命令式弹窗**：`openDialog` / `renderDialogForm` 内部走独立 `createApp`，产物形态下最容易出问题
- **ProTable + createApis**：数据内联（不依赖 mock-server），单开就能用

三种 UI 实现 × 上述四组用例 = 左侧 12 页。右上角切换 antd / element / shadcn（cookie `smoke-ui`）。

## 运行

```bash
pnpm build   # 先构建全部包（exports 指向 dist，没构建会直接报错——这正是冒烟的目的）
pnpm smoke
```
