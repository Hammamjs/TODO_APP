import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/TodoApp.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue'),
  },
  {
    path: '/verify-code',
    name: 'VerifyCode',
    component: () => import('@/views/VerifyCode.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
