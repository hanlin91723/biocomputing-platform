<template>
  <div class="enterprise-retrieval-wrap">
    <h2 class="title">企业全量数据检索</h2>
    <el-autocomplete
      class="search-input"
      v-model="searchVal"
      :trigger-on-focus="false"
      select-when-unmatched
      placeholder="请输入企业名称"
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
    >
      <div slot="append" class="search-btn" @click="handleSearch">高级检索</div>
    </el-autocomplete>
    <div class="tag-wrap">
      <h4 class="tag-title">企业标签：</h4>
      <ul class="tag-list">
        <li v-for="item in tagList" :key="item.id" class="tag-item">
          <el-button type="text" @click="handleTag(item)">{{
            item.name
          }}</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      tagList: [
        {
          name: "高新技术企业",
          id: "高新技术企业",
        },
        {
          name: "独角兽企业",
          id: "独角兽企业",
        },
        {
          name: "瞪羚企业",
          id: "瞪羚企业",
        },
        {
          name: "上市企业",
          id: "上市企业",
        },
        {
          name: "专精特新企业",
          id: "专精特新企业",
        },
      ],
    };
  },
  methods: {
    handleTag(item) {
      console.log(item);
      this.$router.push({
        name: "EnterpriseList",
        params: {
          highTechEnt: item.id,
        },
      });
    },
    querySearchAsync(queryString, cb) {
      this.$axios
        .get("/riskManager/entInfo/infoName", {
          entName: queryString,
        })
        .then(({ data }) => {
          const searchResultList = data.map((item) => ({
            name: item.entId,
            value: item.entName,
          }));
          cb(searchResultList);
        });
    },
    handleSelect(item) {
      this.$router.push({
        name: "EnterpriseList",
        params: {
          entName: item.value,
        },
      });
    },
    handleSearch() {
      this.$router.push({
        name: "EnterpriseList",
        params: {
          entName: this.searchVal,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.enterprise-retrieval-wrap {
  width: 800px;
  margin: 200px auto 0;
  .title {
    padding-bottom: 20px;
    text-align: center;
    letter-spacing: 20px;
    color: #409eff;
  }
  .search-input {
    display: block;
    margin-top: 15px;
    /deep/ .el-input-group__append {
      padding: 0;
      border: none;
      .search-btn {
        display: block;
        padding: 0 20px;
        line-height: 40px;
        background: #409eff;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .tag-wrap {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .tag-title {
      padding-right: 10px;
      font-size: 14px;
    }
    .tag-list {
      display: flex;
      justify-content: space-between;
      width: 450px;
    }
  }
}
</style>
