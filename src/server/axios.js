import {
  ElMessage
} from "element-plus";
import axios from "axios";
import router from "../router/index";

const env =
  import.meta.env.MODE; //应用运行的模式
const devUrl = "/api/api"; //开发环境
const proUrl = "/api"; //生产环境
const baseUrl = env === "production" ? proUrl : devUrl;

//基础配置
const service = axios.create({
  timeout: 10000,
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

//请求拦截
service.interceptors.request.use(
  config => {
    //默认往所有接口headers传入token校验
    if (sessionStorage.getItem("token")) {
      config.headers["Userid"] = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  result => {
    if (result.config.responseType === "blob") {
      return result;
    }
    if (result.data.code === 20000) {
      return result.config.responseType === "arraybuffer" ||
        result.config.responseType === "blob" ?
        result :
        result.data;
    } else if (result.data.code === "401") {
      //长时间未操作,登录信息过期
      sessionStorage.getItem("token") &&
        ElMessage.error("登录信息过期，请重新登录");
      setTimeout(() => {
        router.push({
          path: "/login",
        });
      }, 500);
      sessionStorage.clear();
      return;
    } else {
      ElMessage.error(result.data.message);
      return Promise.reject(result);
    }
  },
  error => {
    if (error.response) {
      ElMessage.error(error.response.data.message);
    } else {
      //请求超时状态
      if (error.message.includes("timeout")) {
        ElMessage.error("网络请求超时，请稍后再试");
      } else if (error.message.includes("canceled")) {
        // 取消请求
      } else {
        //可以展示断网组件
        ElMessage.error("网络请求异常，请稍后再试");
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 封装 请求
 */
function request(method, url, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    const config = Object.assign({
        url,
        method,
        [method === "get" || method === "delete" ? "params" : "data"]: params,
      },
      options
    );
    service
      .request(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const http = {
  get: request.bind(null, "get"),
  post: request.bind(null, "post"),
  put: request.bind(null, "put"),
  patch: request.bind(null, "patch"),
  delete: request.bind(null, "delete"),
};

export default http;