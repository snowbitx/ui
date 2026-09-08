/**
 * 内联数据源：ProTable 的 get 只要求返回 { data: rows }（见 ui-core 的 PageApis）。
 * 不依赖 mock-server，冒烟站单独打开即可用。
 */
export const users = [
  { id: 1, name: '张三', age: 18, type: '管理员' },
  { id: 2, name: '李四', age: 20, type: '普通用户' },
  { id: 3, name: '王五', age: 25, type: '普通用户' },
]

export function makeApis() {
  const rows = users.map((row) => ({ ...row }))
  return {
    get: async () => ({ data: rows }),
    create: async (data: Record<string, any>) => {
      data.id = rows.length + 1
      rows.push(data)
      return { data: rows }
    },
    update: async (data: Record<string, any>) => {
      const index = rows.findIndex((row) => row.id === data.id)
      if (index !== -1) rows[index] = data
      return { data: rows }
    },
    remove: async (ids: Array<string | number>) => {
      for (const id of ids) {
        const index = rows.findIndex((row) => row.id === id)
        if (index !== -1) rows.splice(index, 1)
      }
    },
  }
}

export const tableColumns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '类型', dataIndex: 'type' },
]

export const tableFormItems = [
  { label: '姓名', key: 'name', type: 'input' },
  { label: '年龄', key: 'age' },
  { label: '类型', key: 'type' },
]

export const tableRules = {
  name: [{ required: true, message: '请输入姓名' }],
  age: [{ required: true, message: '请输入年龄' }],
}

/** 模拟异步字典，ProSelect / ProCheckboxGroup / ProRadioGroup 用 */
export function fetchTypes() {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
      ])
    }, 300)
  })
}
