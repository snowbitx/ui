import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/ProTableDoc/index.vue'),
    },
    {
      path: '/pro-form-builder',
      component: () => import('@/views/ProFormBuilderDoc/index.vue'),
    },
    {
      path: '/open-dialog',
      component: () => import('@/views/OpenDialogDoc/index.vue'),
    },
    {
      path: '/pro-button',
      component: () => import('@/views/ProButtonDoc/index.vue'),
    },
    {
      path: '/pro-input',
      component: () => import('@/views/ProInputDoc/index.vue'),
    },
    {
      path: '/pro-select',
      component: () => import('@/views/ProSelectDoc/index.vue'),
    },
    {
      path: '/pro-checkbox-group',
      component: () => import('@/views/ProCheckboxGroupDoc/index.vue'),
    },
    {
      path: '/pro-radio-group',
      component: () => import('@/views/ProRadioGroupDoc/index.vue'),
    },
    {
      path: '/pro-modal',
      component: () => import('@/views/ProModalDoc/index.vue'),
    },
    {
      path: '/pro-confirm-button',
      component: () => import('@/views/ProConfirmButtonDoc/index.vue'),
    },
    {
      path: '/pro-descriptions',
      component: () => import('@/views/ProDescriptionsDoc/index.vue'),
    },
  ],
})

export const menus = [
  { path: '/', title: 'ProTable 表格' },
  { path: '/pro-form-builder', title: 'ProFormBuilder 表单' },
  { path: '/open-dialog', title: 'openDialog 弹窗' },
  { path: '/pro-button', title: 'ProButton 按钮' },
  { path: '/pro-input', title: 'ProInput 输入框' },
  { path: '/pro-select', title: 'ProSelect 下拉选择' },
  { path: '/pro-checkbox-group', title: 'ProCheckboxGroup 多选组' },
  { path: '/pro-radio-group', title: 'ProRadioGroup 单选组' },
  { path: '/pro-modal', title: 'ProModal 弹窗' },
  { path: '/pro-confirm-button', title: 'ProConfirmButton 确认按钮' },
  { path: '/pro-descriptions', title: 'ProDescriptions 详情' },
]
