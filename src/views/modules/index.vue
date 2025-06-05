<template>
  <div class="modules">
    <el-card>
      <div class="desc-wrap">
        <img class="ico" :src="$urlPrev + info.image_path" />
        <div class="desc-right">
          <div class="name">{{ info.name }}</div>
          <div class="desc">{{ info.desc }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="card">
      <component :is="currentTabComponent"></component>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {
    computingModule0: () => import("./components/computingModule0.vue"),
    computingModule1: () => import("./components/computingModule1.vue"),
    computingModule2: () => import("./components/computingModule2.vue"),
    computingModule3: () => import("./components/computingModule3.vue"),
    computingModule4: () => import("./components/computingModule4.vue"),
    computingModule5: () => import("./components/computingModule5.vue"),
    computingModule6: () => import("./components/computingModule6.vue"),
  },
  data() {
    return {
      info: {},
      id: this.$route.params.id,
    };
  },
  computed: {
    currentTabComponent() {
      return "computingModule" + this.$route.params.id;
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.getMarketRiskData();
  },
  methods: {
    getMarketRiskData() {
      this.$axios
        .get("/algo/list", { algonum: this.$route.params.id })
        .then((data) => {
          this.info = data.data_list[0];
        });
    },
  },
};
</script>

<style lang="less" scoped>
.modules {
  .desc-wrap {
    display: flex;
    align-items: flex-start;
    .ico {
      width: 80px;
      height: 80px;
      margin-right: 30px;
      border: 1px solid #e4e7ed;
    }
    .desc-right {
      flex: 1;
      .name {
        font-size: 24px;
        font-weight: 700;
      }
      .desc {
        margin-top: 20px;
        line-height: 1.5;
      }
    }
  }
  .card {
    margin-top: 20px;
  }
}
</style>
