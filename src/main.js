import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/assets/css/common.less"; // 引入自定义通用样式
import * as echarts from "echarts";
import china from "@/assets/json/china.json";
echarts.registerMap("china", china);
import VueECharts from "vue-echarts";
import VueBMap from "vue-bmap-gl";
import "vue-bmap-gl/dist/style.css";
import VueMapvgl from "vue-mapvgl";
import http from "./server/axios";
import day from "dayjs";
import "dayjs/locale/zh-cn";
import "echarts-wordcloud";

import {
  createPinia,
  PiniaVuePlugin
} from "pinia";
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueBMap);
Vue.use(VueMapvgl);
VueBMap.initBMapApiLoader({
  ak: "UKHEh5F64q0mVl2KQ0B5Qt1SiIGOYYrc",
  // 默认百度 sdk 版本为 1.0
  v: "1.0",
});
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