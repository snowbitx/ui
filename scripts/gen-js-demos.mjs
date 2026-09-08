/**
 * 生成每个 demo 的 JS 版源码（.vue.js），供 DemoBlock 的 TS/JS 切换展示。
 * 原理：用 TypeScript 编译器把 <script setup lang="ts"> 内容整体 transpile 成 JS，
 * 再拼回 vue 文件字符串，保证类型擦除零错误。
 * 运行：node scripts/gen-js-demos.mjs（在仓库根执行）
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const viewsDir = join(root, "apps/playground/src/views");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/demos\/[\w-]+\.vue$/.test(p)) out.push(p);
  }
  return out;
}

const demos = walk(viewsDir);
let updated = 0;
for (const file of demos) {
  const src = readFileSync(file, "utf8");
  const m = src.match(/<script setup lang="ts">([\s\S]*?)<\/script>/);
  if (!m) continue;
  const js = ts.transpileModule(m[1], {
    compilerOptions: { target: ts.ScriptTarget.ES2020, removeComments: false },
    fileName: file,
  }).outputText;
  const out = src.replace(m[0], `<script setup>\n${js.trimEnd()}\n</script>`);
  const outFile = file + ".js";
  if (!existsSync(outFile) || readFileSync(outFile, "utf8") !== out) {
    writeFileSync(outFile, out);
    updated++;
  }
}
console.log(`demos: ${demos.length}, updated: ${updated}`);
