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
      <component
        :is="currentTabComponent"
        v-if="currentTabComponent"
      ></component>
    </el-card>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {
      info: {},
      id: this.$route.params.id,
      moduleMap: {
        0: () => import("./components/computingModule0.vue"),
        1: () => import("./components/computingModule1.vue"),
        2: () => import("./components/computingModule2.vue"),
        3: () => import("./components/computingModule3.vue"),
        4: () => import("./components/computingModule4.vue"),
        5: () => import("./components/computingModule5.vue"),
        6: () => import("./components/computingModule6.vue"),
        7: () => import("./components/computingModule7.vue"),
        8: () => import("./components/computingModule8.vue"),
        9: () => import("./components/computingModule9.vue"),
      },
    };
  },
  computed: {
    currentTabComponent() {
      const loader = this.moduleMap[this.id];
      return loader ? defineAsyncComponent(loader) : null;
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
