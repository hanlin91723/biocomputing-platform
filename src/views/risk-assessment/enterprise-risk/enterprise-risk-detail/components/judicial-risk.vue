<template>
  <div class="judicial-risk">
    <div class="filter-wrap flex">
      <h5 class="title">风险类型：</h5>
      <el-checkbox
        class="check-all-btn"
        :indeterminate="riskTypeIsIndeterminate"
        v-model="checkAllRiskType"
        @change="handleCheckAllRiskTypes"
        >全部类型</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedRiskTypes"
        @change="handleCheckedRiskType"
      >
        <el-checkbox
          v-for="item in riskTypeList"
          :label="item.value"
          :key="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div class="filter-wrap flex">
      <h5 class="title">风险等级：</h5>
      <el-checkbox
        class="check-all-btn"
        :indeterminate="riskLevelIsIndeterminate"
        v-model="checkAllRiskLevel"
        @change="handleCheckAllRiskLevels"
        >全部等级</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedRiskLevels"
        @change="handleCheckedRiskLevel"
      >
        <el-checkbox
          v-for="item in riskLevelList"
          :label="item.value"
          :key="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div class="tip">共{{ total }}条符合条件的司法风险</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAllRiskType: false,
      checkedRiskTypes: [],
      riskTypeList: [],
      riskTypeIsIndeterminate: false,
      checkAllRiskLevel: false,
      checkedRiskLevels: [],
      riskLevelList: [],
      riskLevelIsIndeterminate: false,
      total: "",
      obj: {
        total: 223,
        list: [
          {
            id: 1,
            name: "被执行人",
            level: "高风险",
            list: [
              {
                name: "该公司带带弟弟",
                aaa: "/aaa",
                num: 5,
                id: 1,
              },
              {
                name: "范德萨发阿斯顿",
                aaa: "/aaa",
                num: 25,
                id: 2,
              },
            ],
          },
        ],
      },
      responseObj: {
        tableHeaderData: [
          {
            tableHeaderName: "立案日期1",
            tableHeaderProp: "date1",
            clickFlag: true,
            tagFlag: true,
          },
          {
            tableHeaderName: "立案日期2",
            tableHeaderProp: "date2",
            clickFlag: false,
            tagFlag: true,
          },
          {
            tableHeaderName: "立案日期3",
            tableHeaderProp: "date3",
            clickFlag: false,
            tagFlag: true,
          },
        ],
        tableData: [
          {
            date1: "123",
            date2: "456",
            date3: "789",
          },
        ],
        code: "0",
      },
    };
  },
  created() {
    this.getRiskTypeList();
    this.getRiskLevelList();
  },
  methods: {
    getRiskTypeList() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.riskTypeList = [
          {
            label: "被执行人",
            value: 1,
          },
          {
            label: "失信信息",
            value: 2,
          },
          {
            label: "限制高消费",
            value: 3,
          },
          {
            label: "限制出境",
            value: 4,
          },
          {
            label: "终本案件",
            value: 5,
          },
          {
            label: "ddd",
            value: 6,
          },
        ];
      });
    },
    getRiskLevelList() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.riskLevelList = [
          {
            label: "高风险",
            value: 1,
          },
          {
            label: "中风险",
            value: 2,
          },
          {
            label: "警示",
            value: 3,
          },
        ];
      });
    },
    handleCheckAllRiskTypes(val) {
      this.checkedRiskTypes = val
        ? this.riskTypeList.map((item) => item.value)
        : [];
      this.riskTypeIsIndeterminate = false;
    },
    handleCheckedRiskType(value) {
      let checkedCount = value.length;
      this.checkAllRiskType = checkedCount === this.riskTypeList.length;
      this.riskTypeIsIndeterminate =
        checkedCount > 0 && checkedCount < this.riskTypeList.length;
    },
    handleCheckAllRiskLevels(val) {
      this.checkedRiskLevels = val
        ? this.riskLevelList.map((item) => item.value)
        : [];
      this.riskLevelIsIndeterminate = false;
    },
    handleCheckedRiskLevel(value) {
      let checkedCount = value.length;
      this.checkAllRiskLevel = checkedCount === this.riskLevelList.length;
      this.riskLevelIsIndeterminate =
        checkedCount > 0 && checkedCount < this.riskLevelList.length;
    },
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.judicial-risk {
  .filter-wrap {
    padding: 10px 20px;
    .title {
      margin-right: 30px;
    }
    .check-all-btn {
      margin-right: 30px;
    }
  }
}
</style>
