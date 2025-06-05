import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import {
  PiniaVuePlugin
} from "pinia";
Vue.use(PiniaVuePlugin);

import {
  useUserStore
} from "@/store/index.js";

Vue.use(VueRouter);

const constantRouterMap = [{
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/notFound/index.vue"),
  },
];

const asyncRouterMap = [{
    path: "/container",
    name: "Container",
    component: () => import("@/views/container/index.vue"),
    redirect: "/module-list",
    children: [{
        path: "/module-list",
        name: "ModuleList",
        component: () => import("@/views/module-list/index.vue"),
        meta: {
          title: "计算模块",
        },
      },
      {
        path: "/modules/:id",
        name: "Modules",
        component: () => import("@/views/modules/index.vue"),
      },
      {
        path: "/result-list",
        name: "ResultList",
        component: () => import("@/views/result-list/index.vue"),
        meta: {
          title: "数据中心",
        },
      },
      {
        path: "/user",
        name: "UserManagement",
        component: () => import("@/views/system-management/user-management/index.vue"),
        meta: {
          title: "用户管理",
        },
      },
      // {
      //   path: "/permission",
      //   name: "PermissionManagement",
      //   component: () => import("@/views/system-management/permission-management/index.vue"),
      //   meta: {
      //     title: "权限管理",
      //   },
      // },
    ],
  },
  {
    path: "*",
    redirect: "/404",
  },
];
const createRouter = () => new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL, //部署应用时的基本URL
  routes: constantRouterMap,
});
const router = createRouter();
const whiteList = constantRouterMap.map(item => item.path); //定义白名单
// 路由守卫功能,可以控制当用户没有登陆的时候自动跳转回登录页
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  //判断是否有token
  if (sessionStorage.getItem("token")) {
    const userInfo = useUserStore();
    console.log(userInfo.hasPermissionRoutes);
    // 路由添加进去了没有及时更新,需要重新进去一次拦截
    if (userInfo.hasPermissionRoutes.value?.length === 0 || userInfo.hasPermissionRoutes.length === 0) {
      // 获取处理好的路由
      await userInfo.getPermissionList();
      userInfo.getHasPermissionRoutes(asyncRouterMap, userInfo.permissionList);
      userInfo.hasPermissionRoutes.forEach(item => {
        router.addRoute(item);//添加路由, vue-router4.0新方法
      });
      next({
        ...to,
        replace: true,
      }); // 这里相当于push到一个页面,不在进入路由拦截
    } else {
      next(); // 如果不传参数就会重新执行路由拦截,重新进到这里
    }
  } else {
    // 白名单(不需要登录就可以访问的名单)
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
router.onError((error, to) => {
  if (error.message.includes("Failed to fetch dynamically imported module")) {
    window.location = to.fullPath;
  }
});

//重置路由,切换用户或者退出时,清除动态加载的路由
export const resetRouter = () => {
  // hasRoles = true;
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 新路由实例matcher赋值给旧路由实例的matcher(相当于replaceRouter)
};

export default router;