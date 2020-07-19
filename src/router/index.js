import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login', },
  { path: '/login', component: () => import('@/views/users/login'), },
  {
    path: '/home',
    component: BasicLayout,
    redirect:'/welcome',
    children: [
      { path: '/welcome', component: () => import('@/views/welcome') },
      { path: '/users', component: () => import('@/views/user/users') },
      { path: '/rights', component: () => import('@/views/power/power') },
      { path: '/roles', component: () => import('@/views/power/roles') },
      { path: '/categories', component: () => import('@/views/goods/cate') },
      { path: '/params', component: () => import('@/views/goods/params') },
      { path: '/goods', component: () => import('@/views/goods/list') },
      { path: '/orders', component: () => import('@/views/order/order') },
      { path: '/reports', component: () => import('@/views/dashboard/analysis') },
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem("token")
  if (!token) return next('/login')
  next()
})

export default router
