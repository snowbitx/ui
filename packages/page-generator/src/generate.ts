import type { PageSchema } from "./types";

function indent(depth: number) {
  return "  ".repeat(depth);
}

/**
 * 把任意值序列化为 vue 文件里的字面量，字符串用单引号、其余保持 JSON 形式
 */
function toLiteral(value: any): string {
  if (typeof value === "string") return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
  return JSON.stringify(value, null, 2);
}

/**
 * 序列化为带缩进的字面量（数组/对象），并缩进到指定层级
 */
function toLiteralLines(value: any, depth: number): string {
  const raw = toLiteral(value);
  const [first, ...rest] = raw.split("\n");
  return [first, ...rest.map((line) => indent(depth) + line)].join("\n");
}

/**
 * 核心步骤：把一份页面 schema 组装成 vue 文件的内容字符串。
 * 页面就是 ProTable 换了个壳，配置全部来自 JSON。
 */
export function generatePageSfc(schema: PageSchema): string {
  const { name, title, api, route, columns, formItems, rules } = schema;

  const columnsCode = toLiteralLines(columns, 1);
  const formItemsCode = toLiteralLines(formItems, 1);
  const rulesCode = rules ? toLiteralLines(rules, 1) : undefined;

  return `<script setup lang="ts">
import { ProTable, createApis } from '@snowbitx/ui-antd'
import type { PageSchema } from '@snowbitx/page-generator'

defineOptions({
  name: '${name}',
})

// 本页配置来自远端 JSON 文档，由 gen:pages 脚本生成
const schema: Pick<PageSchema, 'name' | 'title' | 'route' | 'api'> = {
  name: '${name}',
  title: '${title}',
  route: '${route}',
  api: '${api}',
}

const apis = createApis(schema.api)

const columns = ${columnsCode}

const formItems = ${formItemsCode}
${rulesCode ? `\nconst rules = ${rulesCode}\n` : ""}
</script>

<template>
  <div class="page-container">
    <h2>${title}</h2>
    <ProTable
      :apis="apis"
      :columns="columns"
      :form-items="formItems"
      ${rulesCode ? ':rules="rules"' : ""}
    />
  </div>
</template>
`;
}

/**
 * 生成页面路由注册表 src/pages/index.ts 的内容
 */
export function generatePagesIndex(schemas: PageSchema[]): string {
  const imports = schemas.map((s) => `import ${s.name} from './${s.name}.vue'`).join("\n");

  const entries = schemas
    .map(
      (s) =>
        `  {\n    path: '${s.route}',\n    name: '${s.name}',\n    title: '${s.title}',\n    component: ${s.name},\n  },`,
    )
    .join("\n");

  return `// 由 gen:pages 脚本自动生成，请勿手工修改
${imports}

export interface GeneratedRoute {
  path: string
  name: string
  title: string
  component: any
}

export const generatedRoutes: GeneratedRoute[] = [
${entries}
]
`;
}
