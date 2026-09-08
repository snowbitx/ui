/**
 * 根据接口地址创建 ProTable 需要的 CRUD 接口集合（基于 fetch 的默认实现）。
 * 实际项目里可换成自己的请求库，只要提供 get/create/update/remove 四个 Promise 方法即可。
 */
export type PromiseFn = (...args: any[]) => Promise<any>;

export interface PageApis {
  get: PromiseFn;
  create: PromiseFn;
  update: PromiseFn;
  remove: PromiseFn;
}

export interface CreateApisOptions {
  /** 自定义请求实现，默认使用 fetch */
  request?: (url: string, init: RequestInit) => Promise<any>;
}

export function createApis(baseUrl: string, options: CreateApisOptions = {}): PageApis {
  const request = options.request || ((url, init) => fetch(url, init).then((res) => res.json()));

  return {
    get: (params?: Record<string, any>) =>
      request(`${baseUrl}?${new URLSearchParams(params)}`, { method: "GET" }),
    create: (data: Record<string, any>) =>
      request(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    update: (data: Record<string, any>) =>
      request(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    remove: (ids: Array<string | number>) =>
      request(baseUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ids),
      }),
  };
}
