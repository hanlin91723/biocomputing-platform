<template>
  <!-- 最外层 -->
  <div class="home">
    <div class="home-header flex">
      <div class="time-wrap">
        <div>{{ nowDay }}</div>
        <div>{{ nowTime }}</div>
      </div>
      <ul class="nav-wrap flex">
        <li
          :class="{
            'nav-item': true,
            active: item.id === 1,
            second: index === 1,
          }"
          v-for="(item, index) in navList"
          :key="item.id"
          @click="handleNav(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="weather-wrap">
        <div class="weather">{{ weather }}</div>
        <div class="temperature">{{ temperature }}</div>
      </div>
    </div>
    <div class="home-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      nowDay: "",
      nowTime: "",
      weather: "",
      temperature: "",
    };
  },
  computed: {
    navList() {
      return [
        {
          id: 1,
          name: "智慧工地",
          path: "/intelligent-site",
        },
        {
          id: 2,
          name: "房地产",
          path: "/real-estate",
        },
        {
          id: 3,
          name: "住房保障",
          path: "/housing-security",
        },
        {
          id: 4,
          name: "物业管理",
          path: "/estate-management",
        },
      ];
    },
  },
  created() {
    setInterval(() => {
      this.nowDay = this.$dayjs().format("YYYY-MM-DD");
      this.nowTime = this.$dayjs().format("HH:mm:ss");
    }, 1000);
    // this.getWeather();
  },
  methods: {
    getWeather() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.weather = "多云转晴";
        this.temperature = "23~30℃";
      });
    },
    handleNav(item) {
      if (this.$route.path === item.path) {
        return;
      }
      this.$router.push({
        path: item.path,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  z-index: 3;
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // .home-header {
  //   z-index: 2;
  //   height: 106px;
  //   padding: 0 40px;
  //   background: url("@/assets/images/title.png") no-repeat top center / cover;
  //   .time-wrap,
  //   .weather-wrap {
  //     width: 120px;
  //     min-height: 42px;
  //     margin-top: -30px;
  //     font-size: 16px;
  //     text-align: right;
  //     color: @txtColor;
  //   }
  //   .time-wrap {
  //     font-family: "Altinn-DIN";
  //     font-size: 20px;
  //     text-align: left;
  //   }
  //   .nav-wrap {
  //     width: 1400px;
  //     margin-top: -25px;
  //     .nav-item {
  //       width: 160px;
  //       line-height: 80px;
  //       font-size: 24px;
  //       color: @txtColor;
  //       cursor: pointer;
  //       &.second {
  //         margin-right: 600px;
  //       }
  //       &:hover {
  //         // font-weight: 700;
  //         // color: @activeTxtColor;
  //         background: url("@/assets/images/titlebtn_hover.png") no-repeat top
  //           center / cover;
  //       }
  //       &.active {
  //         font-weight: 700;
  //         color: @activeTxtColor;
  //         background: url("@/assets/images/titlebtn_sel.png") no-repeat top
  //           center / cover;
  //       }
  //     }
  //   }
  // }
  .home-content {
    position: relative;
    z-index: -1;
  }
}
</style>
