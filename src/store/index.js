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
      enterprisePortraitHasPermission: false, //企业监测模块权限(主要用于判断企业画像按钮是否可点)
      permissionList: [],
      hasPermissionRoutes: [],
      entId: sessionStorage.getItem("ENTID") || "",
      entName: sessionStorage.getItem("ENTNAME") || "",
    };
  },
  actions: {
    getPermissionList() {
      return http.get("/getRouters").then(({
        data,
      }) => {
        this.permissionList = data;
        this.enterprisePortraitHasPermission = data.includes("2-1");
      });
    },
    getHasPermissionRoutes(routes, permissions) {
      this.hasPermissionRoutes = filterAsyncRoutes(routes, permissions);
    },
    saveEntId(entId, entName) {
      this.entId = entId;
      this.entName = entName;
      sessionStorage.setItem("ENTID", entId);
      sessionStorage.setItem("ENTNAME", entName);
    },
  },
});

//企业风险详情-风险预警
export const enterpriseRiskStore = defineStore("enterpriseRisk", {
  state: () => {
    return {
      riskWarningNum: "",
    };
  },
  actions: {
    updateRiskWarningNum(num) {
      this.riskWarningNum = num;
    },
  },
});

//企业风险详情-司法风险
export const judicialRiskStore = defineStore("judicialRisk", {
  state: () => {
    return {
      judicialRiskNum: "",
    };
  },
  actions: {
    updateJudicialRiskNum(num) {
      this.judicialRiskNum = num;
    },
  },
});

//企业风险详情-经营风险
export const managementRiskStore = defineStore("managementRisk", {
  state: () => {
    return {
      managementRiskNum: "",
    };
  },
  actions: {
    updateManagementRiskNum(num) {
      this.managementRiskNum = num;
    },
  },
});

//企业风险详情-关联风险
export const relatedRiskStore = defineStore("relatedRisk", {
  state: () => {
    return {
      relatedRiskNum: "",
    };
  },
  actions: {
    updateRelatedRiskNum(num) {
      this.relatedRiskNum = num;
    },
  },
});