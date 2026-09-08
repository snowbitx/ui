/**
 * 远端文档接口的响应格式：
 * {
 *   "version": "2026-09-08",
 *   "pages": [ { ...PageSchema } ]
 * }
 */

function assertSchema(page) {
  for (const field of ["route", "name", "title", "api", "columns", "formItems"]) {
    if (page[field] === undefined) {
      throw new Error(`页面配置缺少字段 ${field}: ${JSON.stringify(page).slice(0, 120)}`);
    }
  }
}

/**
 * 请求公开文档接口，返回页面 schema 列表
 */
export async function loadPageSchemas(registryUrl) {
  const res = await fetch(registryUrl);
  if (!res.ok) {
    throw new Error(`拉取页面配置失败: ${res.status} ${res.statusText} (${registryUrl})`);
  }
  const doc = await res.json();
  const pages = doc.pages || [];
  pages.forEach(assertSchema);
  return pages;
}
