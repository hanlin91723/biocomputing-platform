<template>
  <div class="module-wrap">
    <!-- <li class="item" @click="handleClick({ num: 0 })">
        <div class="name">3D模型demo</div>
      </li> -->
    <!-- <ul class="list">
      <li
        class="item"
        v-for="item in list"
        :key="item.num"
        @click="handleClick(item)"
      >
        <div>{{ item.module }}</div>
        <img class="ico" :src="$urlPrev + item.image_path" />
        <div class="name">{{ item.name }}</div>
      </li>
    </ul> -->
    <el-card v-for="item in list" :key="item.moduleName" class="card">
      <template #header>
        <div class="card-header">
          <span>{{ item.moduleName }}</span>
        </div>
      </template>
      <ul class="list">
        <li
          class="item"
          v-for="item in item.list"
          :key="item.num"
          @click="handleClick(item)"
        >
          <img class="ico" :src="$urlPrev + item.image_path" />
          <div class="name">{{ item.name }}</div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getMarketRiskData();
  },
  methods: {
    getMarketRiskData() {
      this.$axios.get("/algo/list", { algonum: "all" }).then((data) => {
        const moduleMap = data.data_list.reduce((pre, cur) => {
          const moduleName = cur.module;
          if (!pre[moduleName]) {
            pre[moduleName] = [];
          }
          pre[moduleName].push(cur);
          return pre;
        }, {});
        // 转换为数组形式
        const result = Object.keys(moduleMap).map((moduleName) => ({
          moduleName,
          list: moduleMap[moduleName],
        }));
        this.list = result;
        console.log(result);
      });
    },
    handleClick(item) {
      console.log(item);
      this.$router.push({
        path: `/modules/${item.num}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.module-wrap {
  .card + .card {
    margin-top: 20px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    .item {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      width: 160px;
      // height: 120px;
      margin-right: 40px;
      margin-bottom: 40px;
      padding: 20px;
      text-align: center;
      border: 1px solid #f2f2f2;
      border-radius: 6px;
      cursor: pointer;
      .ico {
        width: 80px;
        height: 80px;
        border: 1px solid #e4e7ed;
        transition: 0.1s;
      }
      .name {
        margin-top: 10px;
      }
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .ico {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
