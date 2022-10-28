import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/demo',
    children: [{
      path: '/demo',
      name: 'Demo',
      component: () => import('@/views/demo/index.vue'),
    }, ],
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/views/notFound/index.vue'),
  },
  {
    path: '*',
    redirect: {
      path: '/not-found',
    },
  },
];
const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL, //部署应用时的基本URL
  routes,
});
// 路由守卫功能，可以控制当用户没有登陆的时候自动跳转回登录页
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  // if (to.name === "Login") {
  //   next();
  // } else {
  //   if (!sessionStorage.getItem("userInfo")) {
  //     next({
  //       path: "/login"
  //     });
  //   } else {
  //     next();
  //   }
  // }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;