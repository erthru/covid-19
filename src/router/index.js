import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/index/Index'),
    children: [
      {
        path: '/',
        component: () => import('../components/index/HomeIndex'),
      },
      {
        path: '/about',
        component: () => import('../components/index/AboutIndex'),
      },
      {
        path: '/faq',
        component: () => import('../components/index/FaqIndex'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
