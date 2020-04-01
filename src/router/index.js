import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from "nprogress";
import "../../node_modules/nprogress/nprogress.css";

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

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router
