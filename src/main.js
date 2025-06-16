import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/assets/css/common.less"; // 引入自定义通用样式
import VueECharts from "vue-echarts";
import http from "./server/axios";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { createPinia } from "pinia";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
app
  .component("v-chart", VueECharts)
  .use(ElementPlus, {
    // size: 'small',
    zIndex: 3000,
    locale: zhCn,
  })
  .use(router)
  .use(pinia)
  .mount("#app");

  //全局挂载
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$axios = http;
app.config.globalProperties.$userInfo = {}; //全局变量用户信息
app.config.globalProperties.$urlPrev =
  import.meta.env.PROD ? "" : "http://119.27.172.203:8086"; //图片和下载文件的路径(前半截)

NProgress.inc(0.2);
NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
});