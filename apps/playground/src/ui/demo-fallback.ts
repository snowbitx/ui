/**
 * createApis 的线上兜底层（仅文档站使用）：
 * playground 静态部署后没有 mock-server（vite 的 /api 代理只在本地 dev 生效），
 * 直接用 createApis 会导致线上文档的新增 / 删除 / 筛选全部打空。
 * 这里在「请求失败」或「响应不符合 CRUD 约定（缺 data 数组）」时回退到内存数据，
 * 保证文档站离线也能演示完整增删改查；本地代理正常时行为与 createApis 完全一致。
 *
 * 种子数据与 scripts/mock-server/server.mjs 保持一致。
 */

type PageApis = {
  get: (params?: Record<string, any>) => Promise<any>
  create: (data: Record<string, any>) => Promise<any>
  update: (data: Record<string, any>) => Promise<any>
  remove: (ids: Array<string | number>) => Promise<any>
}

type CreateApisFn = (baseUrl: string, options?: any) => PageApis

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const seed: Record<string, any[]> = {
  users: [
    { id: 1, name: '张三', age: 18, type: '管理员' },
    { id: 2, name: '李四', age: 20, type: '普通用户' },
  ],
  goods: [
    { id: 1, name: '键盘', price: 199 },
    { id: 2, name: '鼠标', price: 99 },
  ],
}

/** 内存数据表按 resource 懒初始化，改动只存活在当前页面会话（与 mock-server 重启后重置一致） */
const tables: Record<string, any[]> = {}
const nextIds: Record<string, number> = {}

function rowsOf(resource: string) {
  if (!tables[resource]) {
    tables[resource] = (seed[resource] || []).map((row) => ({ ...row }))
    nextIds[resource] = tables[resource].reduce((max, row) => Math.max(max, row.id || 0), 0)
  }
  return tables[resource]
}

async function mockRequest(resource: string, method: string, payload?: any) {
  await delay(200)
  const rows = rowsOf(resource)
  if (method === 'get') {
    const keyword = String(payload?.keyword ?? '')
    return { data: rows.filter((row) => String(row.name ?? '').includes(keyword)) }
  }
  if (method === 'create') {
    nextIds[resource] = (nextIds[resource] || 0) + 1
    rows.push({ ...payload, id: nextIds[resource] })
    return { data: rows }
  }
  if (method === 'update') {
    const index = rows.findIndex((row) => row.id === payload?.id)
    if (index !== -1) rows[index] = { ...rows[index], ...payload }
    return { data: rows }
  }
  const ids = Array.isArray(payload) ? payload : [payload]
  for (const id of ids) {
    const index = rows.findIndex((row) => row.id === id)
    if (index !== -1) rows.splice(index, 1)
  }
  return { data: rows }
}

/** CRUD 约定：响应必须带 data 数组；不满足视为接口不可达（静态部署 / mock 未启动） */
function looksValid(res: any) {
  return !!res && Array.isArray(res.data)
}

export function withDemoFallback(createApis: CreateApisFn): CreateApisFn {
  return (baseUrl: string, options?: any) => {
    const apis = createApis(baseUrl, options)
    const resource = baseUrl.split('/').filter(Boolean).pop() || 'demo'
    return {
      get: (params?: Record<string, any>) =>
        apis.get(params).then(
          (res) => (looksValid(res) ? res : mockRequest(resource, 'get', params)),
          () => mockRequest(resource, 'get', params),
        ),
      create: (data: Record<string, any>) =>
        apis.create(data).then(
          (res) => (looksValid(res) ? res : mockRequest(resource, 'create', data)),
          () => mockRequest(resource, 'create', data),
        ),
      update: (data: Record<string, any>) =>
        apis.update(data).then(
          (res) => (looksValid(res) ? res : mockRequest(resource, 'update', data)),
          () => mockRequest(resource, 'update', data),
        ),
      remove: (ids: Array<string | number>) =>
        apis.remove(ids).then(
          (res) => (looksValid(res) ? res : mockRequest(resource, 'remove', ids)),
          () => mockRequest(resource, 'remove', ids),
        ),
    }
  }
}
