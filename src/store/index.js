// import http from "@/server/axios.js";
import { defineStore } from "pinia";

const hasPermission = (permissions, route) => {
  if (route.meta && route.meta.permission) {
    console.log(permissions, route);
    return permissions.some((item) => route.meta.permission.includes(item));
  } else {
    return true; //不需要权限的路由直接返回
  }
};
const filterAsyncRoutes = (routes, permissions) => {
  let res = [];
  routes.forEach((item) => {
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
      this.permissionList = [];
      // return http.get("/algo/list", {
      //   algonum: "all",
      // }).then(() => {
      //   this.permissionList = [];
      // });
    },
    getHasPermissionRoutes(routes, permissions) {
      this.hasPermissionRoutes = filterAsyncRoutes(routes, permissions);
    },
  },
});
