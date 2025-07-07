<template>
  <div class="module-wrap">
    <ul class="list">
      <!-- <li class="item" @click="handleClick({ num: 0 })">
        <div class="name">3D模型demo</div>
      </li> -->
      <li
        class="item"
        v-for="item in list"
        :key="item.num"
        @click="handleClick(item)"
      >
        <img class="ico" :src="$urlPrev + item.image_path" />
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
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
    //市场风险概况
    getMarketRiskData() {
      this.$axios.get("/algo/list", { algonum: "all" }).then((data) => {
        this.list = data.data_list;
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
