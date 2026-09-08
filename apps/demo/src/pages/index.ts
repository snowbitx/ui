// 由 gen:pages 脚本自动生成，请勿手工修改
import UsersPage from './UsersPage.vue'
import GoodsPage from './GoodsPage.vue'

export interface GeneratedRoute {
  path: string
  name: string
  title: string
  component: any
}

export const generatedRoutes: GeneratedRoute[] = [
  {
    path: '/users',
    name: 'UsersPage',
    title: '用户管理',
    component: UsersPage,
  },
  {
    path: '/goods',
    name: 'GoodsPage',
    title: '商品管理',
    component: GoodsPage,
  },
]
