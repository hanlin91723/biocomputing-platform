<template>
  <div class="enterprise-retrieval-wrap">
    <h2 class="title">企业全量数据检索</h2>
    <el-autocomplete
      class="search-input"
      v-model="searchVal"
      :trigger-on-focus="false"
      select-when-unmatched
      placeholder="请输入企业名称、法人代表、注册地址、经营范围关键字"
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
          id: 1,
        },
        {
          name: "独角兽企业",
          id: 2,
        },
        {
          name: "瞪羚企业",
          id: 3,
        },
        {
          name: "上市企业",
          id: 4,
        },
        {
          name: "专精特新企业",
          id: 5,
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
          tag: item.id,
        },
      });
    },
    querySearchAsync(queryString, cb) {
      this.$axios
        .get("/construction/projectManager", {
          enterpriseName: queryString,
        })
        .then(() => {
          const searchResultList = [
            { value: "三全鲜食（北新泾店）", name: "长宁区新渔路144号", },
            {
              value: "Hot honey 首尔炸鸡（仙霞路）",
              name: "上海市长宁区淞虹路661号",
            },
            {
              value: "新旺角茶餐厅",
              name: "上海市普陀区真北路988号创邑金沙谷6号楼113",
            },
            { value: "泷千家(天山西路店)", name: "天山西路438号", },
            {
              value: "胖仙女纸杯蛋糕（上海凌空店）",
              name: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
            },
            {
              value: "浮生若茶（凌空soho店）",
              name: "上海长宁区金钟路968号9号楼地下一层",
            },
            { value: "枪会山", name: "上海市普陀区棕榈路", },
            { value: "纵食", name: "元丰天山花园(东门) 双流路267号", },
            { value: "钱记", name: "上海市长宁区天山西路", },
            { value: "壹杯加", name: "上海市长宁区通协路", },
            {
              value: "唦哇嘀咖",
              name: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元",
            },
          ];
          cb(searchResultList);
        });
    },
    handleSelect(item) {
      console.log(item);
      this.$router.push({
        name: "EnterpriseList",
        params: {
          enterpriseName: item.value,
        },
      });
    },
    handleSearch() {
      this.$router.push({
        name: "EnterpriseList",
        params: {
          enterpriseName: this.searchVal,
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
