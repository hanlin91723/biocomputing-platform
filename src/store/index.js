import http from "@/server/axios.js";
import {
  defineStore
} from "pinia";

const hasPermission = (permissions, route) => {
  if (route.meta && route.meta.permission) {
    return permissions.some(item => route.meta.permission.includes(item));
  } else {
    return true; //不需要权限的路由直接返回
  }
};
const filterAsyncRoutes = (routes, permissions) => {
  let res = [];
  routes.forEach(item => {
    let tmp = {
      ...item,
    };
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions);
      }
      res.push(tmp);
    }
  });
  return res;
};
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      permissionList: [],
      hasPermissionRoutes: [],
    };
  },
  actions: {
    getPermissionList() {
      const params = {
        userId: sessionStorage.getItem("userId"),
        riskLevel: "全部",
        riskType: "全部",
      };
      return http.get("marketRisk/byCondition", params).then(() => {
        this.permissionList = ["1-1", "1-2", "2-1", "3-1", "3-2", "4-1", "4-2", ];
      });
    },
    getHasPermissionRoutes(routes, permissions) {
      this.hasPermissionRoutes = filterAsyncRoutes(routes, permissions);
    },
  },
});