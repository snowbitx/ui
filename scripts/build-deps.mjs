/**
 * 构建 playground 依赖的 workspace 包（ui-core → ui-antd / ui-element / ui-shadcn）。
 *
 * 仓库根 `pnpm build`（vercel.json 的构建命令）会先跑 `pnpm -r build` 递归构建
 * 全部包，这个脚本管不到；它服务于另一种部署配置——Vercel 项目把 Root Directory
 * 指到 apps/playground（或单独执行 pnpm --filter playground build）。此时只触发
 * playground 自己的 build，而三个实现包的入口都指向尚未构建的 dist/，会报
 * "Rolldown failed to resolve import @snowbitx/ui-element"。prebuild 钩子在这里
 * 补齐依赖包构建：全部包必须相对仓库根解析路径，脚本从任何 cwd 调用都成立。
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const marker = join(repoRoot, "packages", "ui-antd", "dist", "index.js");

// dist 已存在就跳过（本地反复 build 时不用每次重建依赖包）
if (existsSync(marker)) {
  console.log("[build-deps] workspace 包已有 dist，跳过构建");
} else {
  console.log("[build-deps] 构建 workspace 依赖包（ui-core + ui-antd/ui-element/ui-shadcn）...");
  const pkgs = ["@snowbitx/ui-core", "@snowbitx/ui-antd", "@snowbitx/ui-element", "@snowbitx/ui-shadcn"];
  for (const pkg of pkgs) {
    const r = spawnSync("pnpm", ["--filter", pkg, "build"], { stdio: "inherit", cwd: repoRoot, shell: process.platform === "win32" });
    if (r.status !== 0) {
      console.error(`[build-deps] ${pkg} 构建失败`);
      process.exit(r.status ?? 1);
    }
  }
}
