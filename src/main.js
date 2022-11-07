import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/assets/css/common.less"; // 引入自定义通用样式
import VueECharts from "vue-echarts";
import http from "./server/axios";
import day from "dayjs";
import "dayjs/locale/zh-cn";

import {
  createPinia,
  PiniaVuePlugin
} from "pinia";
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;
Vue.use(ElementUI);
NProgress.inc(0.2);
NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
});
Vue.component("v-chart", VueECharts);
Vue.prototype.$axios = http;
day.locale("zh-cn");
Vue.prototype.$dayjs = day;
Vue.prototype.$userInfo = {}; //全局变量用户信息

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");