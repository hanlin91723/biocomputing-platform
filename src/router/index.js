import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import Layout from "@/views/layout/index.vue";

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
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/notFound/index.vue"),
  },
];

const asyncRouterMap = [{
    path: "/container",
    name: "Container",
    component: () => import("@/views/container/index.vue"),
    redirect: "/risk-map",
    children: [{
        path: "/home",
        name: "Home",
        component: Layout,
        redirect: "/risk-map",
        meta: {
          title: "概览",
          ico: "el-icon-monitor",
          permission: ["1-1", "1-2", ],
        },
        children: [{
            path: "/risk-map", //风险地图
            name: "RiskMap",
            component: () => import("@/views/home/risk-map/index.vue"),
            meta: {
              title: "风险地图",
              permission: ["1-1", ],
            },
          },
          {
            path: "/statistical-analysis", //统计分析
            name: "StatisticalAnalysis",
            component: () => import("@/views/home/statistical-analysis/index.vue"),
            meta: {
              title: "统计分析",
              permission: ["1-2", ],
            },
          },
        ],
      },
      {
        path: "/enterprise-monitor",
        name: "EnterpriseMonitor",
        component: Layout,
        redirect: "/enterprise-retrieval",
        meta: {
          title: "企业监测",
          ico: "el-icon-data-line",
          permission: ["2-1", ],
        },
        children: [{
            path: "/enterprise-retrieval", //企业检索
            name: "EnterpriseRetrieval",
            component: () => import("@/views/enterprise-monitor/enterprise-retrieval/index.vue"),
            meta: {
              title: "企业检索",
              permission: ["2-1", ],
            },
          },
          {
            path: "/enterprise-retrieval/enterprise-list", //企业检索列表
            name: "EnterpriseList",
            component: () => import("@/views/enterprise-monitor/enterprise-retrieval/enterprise-list/index.vue"),
            meta: {
              title: "企业检索列表",
              hidden: true,
              permission: ["2-1", ],
            },
          },
          {
            path: "/enterprise-retrieval/enterprise-portrait/:id", //企业画像
            name: "EnterprisePortrait",
            component: () => import("@/views/enterprise-monitor/enterprise-portrait/index.vue"),
            meta: {
              title: "企业画像",
              hidden: true,
              permission: ["2-1", ],
            },
          },
        ],
      },
      {
        path: "/risk-assessment",
        name: "RiskAssessment",
        component: Layout,
        redirect: "/risk-map",
        meta: {
          title: "风险评估",
          ico: "el-icon-notebook-1",
          permission: ["3-1", "3-2", ],
        },
        children: [{
            path: "/enterprise-risk", //企业风险
            name: "EnterpriseRisk",
            component: () => import("@/views/risk-assessment/enterprise-risk/index.vue"),
            meta: {
              title: "企业风险",
              permission: ["3-1", ],
            },
          },
          {
            path: "/enterprise-risk/detail/:id", //企业风险详情
            name: "EnterpriseRiskDetail",
            component: () => import("@/views/risk-assessment/enterprise-risk/enterprise-risk-detail/index.vue"),
            meta: {
              title: "企业风险详情",
              hidden: true,
              permission: ["3-1", ],
            },
          },
          {
            path: "/market-risk", //市场风险
            name: "MarketRisk",
            component: () => import("@/views/risk-assessment/market-risk/index.vue"),
            meta: {
              title: "市场风险",
              permission: ["3-2", ],
            },
          },
          {
            path: "/market-risk/detail", //市场风险详情
            name: "MarketRiskDetail",
            component: () => import("@/views/risk-assessment/market-risk/market-risk-detail/index.vue"),
            meta: {
              title: "市场风险详情",
              hidden: true,
              permission: ["3-2", ],
            },
          },
        ],
      },
      {
        path: "/system-management",
        name: "SystemManagement",
        component: Layout,
        redirect: "/user-management",
        meta: {
          title: "系统管理",
          ico: "el-icon-set-up",
          permission: ["4-1", "4-2", ],
        },
        children: [{
            path: "/user", //用户管理
            name: "UserManagement",
            component: () => import("@/views/system-management/user-management/index.vue"),
            meta: {
              title: "用户管理",
              permission: ["4-1", ],
            },
          },
          {
            path: "/permission", //权限管理
            name: "PermissionManagement",
            component: () => import("@/views/system-management/permission-management/index.vue"),
            meta: {
              title: "权限管理",
              permission: ["4-2", ],
            },
          },
        ],
      },
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
    // 路由添加进去了没有及时更新,需要重新进去一次拦截
    if (userInfo.permissionList.length === 0) {
      // 获取处理好的路由
      await userInfo.getPermissionList();
      userInfo.getHasPermissionRoutes(asyncRouterMap, userInfo.permissionList);
      router.addRoutes(userInfo.hasPermissionRoutes);
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
        query: {
          redirect: to.path,
        },
      });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

//重置路由,切换用户或者退出时,清除动态加载的路由
export const resetRouter = () => {
  // hasRoles = true;
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 新路由实例matcher赋值给旧路由实例的matcher(相当于replaceRouter)
};

export default router;