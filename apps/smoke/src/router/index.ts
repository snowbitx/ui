import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 三种 UI 模式 × 四组冒烟用例：
 * - barrel：主入口（包根导出）
 * - deep：每个深路径导出（exports 里的子路径）
 * - dialog：openDialog / renderDialogForm 命令式 API
 * - table：ProTable + createApis（内联数据，不依赖 mock-server）
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/antd/barrel' },
    {
      path: '/antd/barrel',
      component: () => import('../pages/AntdBarrelPage.vue'),
      meta: { menu: true, title: 'antd · 主入口' },
    },
    {
      path: '/antd/deep',
      component: () => import('../pages/AntdDeepPage.vue'),
      meta: { menu: true, title: 'antd · 深路径' },
    },
    {
      path: '/antd/dialog',
      component: () => import('../pages/AntdDialogPage.vue'),
      meta: { menu: true, title: 'antd · 弹窗' },
    },
    {
      path: '/antd/table',
      component: () => import('../pages/AntdTablePage.vue'),
      meta: { menu: true, title: 'antd · ProTable' },
    },
    {
      path: '/element/barrel',
      component: () => import('../pages/ElementBarrelPage.vue'),
      meta: { menu: true, title: 'element · 主入口' },
    },
    {
      path: '/element/deep',
      component: () => import('../pages/ElementDeepPage.vue'),
      meta: { menu: true, title: 'element · 深路径' },
    },
    {
      path: '/element/dialog',
      component: () => import('../pages/ElementDialogPage.vue'),
      meta: { menu: true, title: 'element · 弹窗' },
    },
    {
      path: '/element/table',
      component: () => import('../pages/ElementTablePage.vue'),
      meta: { menu: true, title: 'element · ProTable' },
    },
    {
      path: '/shadcn/barrel',
      component: () => import('../pages/ShadcnBarrelPage.vue'),
      meta: { menu: true, title: 'shadcn · 主入口' },
    },
    {
      path: '/shadcn/deep',
      component: () => import('../pages/ShadcnDeepPage.vue'),
      meta: { menu: true, title: 'shadcn · 深路径' },
    },
    {
      path: '/shadcn/dialog',
      component: () => import('../pages/ShadcnDialogPage.vue'),
      meta: { menu: true, title: 'shadcn · 弹窗' },
    },
    {
      path: '/shadcn/table',
      component: () => import('../pages/ShadcnTablePage.vue'),
      meta: { menu: true, title: 'shadcn · ProTable' },
    },
  ],
})
