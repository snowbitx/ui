import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
import { generatePageSfc, generatePagesIndex } from "./generate.ts";

const projectRoot = resolve(fileURLToPath(import.meta.url), "../../../..");

async function writeFormatted(file, code) {
  const parser = file.endsWith(".vue") ? "vue" : "typescript";
  const formatted = await format(code, { parser, semi: false, singleQuote: true, printWidth: 100 });
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, formatted, "utf-8");
}

/**
 * 把每个 schema 写成 src/pages/<Name>.vue，再写一个 index.ts 路由注册表
 */
export async function writePages(schemas, outDir) {
  const pagesDir = resolve(projectRoot, outDir);
  const outputs = [];

  for (const schema of schemas) {
    const file = resolve(pagesDir, `${schema.name}.vue`);
    await writeFormatted(file, generatePageSfc(schema));
    outputs.push(file);
  }

  const indexFile = resolve(pagesDir, "index.ts");
  await writeFormatted(indexFile, generatePagesIndex(schemas));
  outputs.push(indexFile);

  return outputs;
}
