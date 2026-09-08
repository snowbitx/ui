import { createApis } from '@snowbitx/ui'

let dataSource = [
  {
    id: 1,
    name: '张三',
    age: 18,
  },
  {
    id: 2,
    name: '李四',
    age: 20,
  },
]

function promiseTimeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

// 不用 createApis，自己组装符合约定的四个方法（基于内存数组，刷新前有效）
export const customApis = {
  get: async (params: any) => {
    await promiseTimeout(500) // 模拟网络延迟
    const data = dataSource.filter((item) => {
      return item.name.includes(params?.keyword || '')
    })
    return { data }
  },
  create: async (data: any) => {
    await promiseTimeout(500) // 模拟网络延迟
    data.id = dataSource.length + 1
    dataSource.push(data)
    return { data }
  },
  update: async (data: any) => {
    await promiseTimeout(500) // 模拟网络延迟
    const index = dataSource.findIndex((item: any) => item.id === data.id)
    dataSource[index] = data
    return { data }
  },
  remove: async (ids: number[]) => {
    await promiseTimeout(500) // 模拟网络延迟
    dataSource = dataSource.filter((item: any) => !ids.includes(item.id))
    return { data: [] }
  },
}

// 保持 createApis 的导入被使用（示例演示两种方式可互换）
export const fallbackApis = createApis('/api/custom')
