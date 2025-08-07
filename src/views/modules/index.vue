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
    // 使用import.meta.glob预加载所有模块
    const modules = import.meta.glob(
      "@/views/modules/components/computingModule*.vue"
    );
    // 创建moduleMap对象
    const moduleMap = {};
    Object.keys(modules).forEach((path) => {
      // 从路径中提取模块编号
      const match = path.match(/computingModule(\d+)\.vue$/);
      if (match && match[1]) {
        const moduleId = parseInt(match[1]);
        moduleMap[moduleId] = modules[path]; // 直接使用Vite提供的动态导入函数
      }
    });
    return {
      info: {},
      id: this.$route.params.id,
      moduleMap,
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
