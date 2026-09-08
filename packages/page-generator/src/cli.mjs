#!/usr/bin/env node
/**
 * 代码生成入口：
 * 1. 通过远端文档的公开接口拉取页面 JSON
 * 2. 把 JSON 组装成 vue 文件内容字符串
 * 3. 写入 demo 的 src/pages 目录，并生成路由注册表
 */
import { loadPageSchemas } from "./fetchSchemas.mjs";
import { writePages } from "./writer.mjs";

const registryUrl = process.env.PAGE_REGISTRY_URL || "http://localhost:4173/api/page-registry";
const outDir = process.env.PAGES_OUT_DIR || "apps/demo/src/pages";

console.log(`[gen-pages] 拉取页面配置: ${registryUrl}`);
const schemas = await loadPageSchemas(registryUrl);

console.log(`[gen-pages] 共 ${schemas.length} 个页面: ${schemas.map((s) => s.name).join(", ")}`);
const outputs = await writePages(schemas, outDir);

for (const file of outputs) {
  console.log(`[gen-pages] 已写入 ${file}`);
}
