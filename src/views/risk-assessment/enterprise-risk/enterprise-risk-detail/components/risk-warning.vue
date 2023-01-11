<template>
  <div class="risk-warning">
    <el-table :data="tableData" stripe header-cell-class-name="header-row">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="riskLevel" label="预警等级">
        <template slot-scope="{ row }">
          <span :class="{ [riskColor(row.riskLevel)]: true }">{{
            row.riskLevel
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="预警分类"></el-table-column>
      <el-table-column prop="subType" label="预警指标"></el-table-column>
      <el-table-column prop="warningDesc" label="预警描述"></el-table-column>
      <el-table-column prop="warningTime" label="预警时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { enterpriseRiskStore } from "@/store/index.js";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      const params = {
        entId: this.$route.params.id,
      };
      this.$axios.get("/entRisk/riskWarning", params).then(({ data }) => {
        this.tableData = data;
        const enterpriseRisk = enterpriseRiskStore();
        enterpriseRisk.updateRiskWarningNum(data.length);
      });
    },
    // 预警等级
    riskColor(val) {
      switch (val) {
        case "高风险":
          return "riskColor1";
        case "中风险":
          return "riskColor2";
        case "警示":
          return "riskColor3";
        case "无风险":
          return "riskColor4";
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.risk-warning {
  .riskColor1 {
    color: rgb(217, 0, 27);
  }
  .riskColor2 {
    color: rgb(245, 154, 42);
  }
  .riskColor3 {
    color: rgb(182, 200, 76);
  }
  .riskColor4 {
    color: rgba(93, 209, 140, 1);
  }
}
</style>
