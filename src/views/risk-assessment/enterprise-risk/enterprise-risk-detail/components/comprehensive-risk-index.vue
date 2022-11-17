<template>
  <div class="comprehensive-risk-index flex">
    <div class="left">
      <v-chart class="chart" :option="comprehensiveRiskOption"></v-chart>
      <div class="comprehensive-risk-score">
        综合风险指数：<span class="score">{{ comprehensiveRiskScore }}</span
        >分
      </div>
      <div class="comprehensive-risk-detail">
        该企业风险等级<span class="level">{{ enterpriseRiskLevel }}</span
        >，其中<span class="aspect">{{
          aspectListFormatter(this.aspectList)
        }}</span
        >方面风险较大，需重点关注
      </div>
    </div>
    <div class="right">
      <el-table
        header-row-class-name="table-header"
        class="table"
        :data="tableData"
        :span-method="objectSpanMethod"
        :row-class-name="rowClassName"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        border
      >
        <el-table-column prop="type" label="分类" width="180"></el-table-column>
        <el-table-column prop="total" label="分类评价得分"></el-table-column>
        <el-table-column prop="subType" label="评价指标"></el-table-column>
        <el-table-column prop="level" label="预警等级"></el-table-column>
        <el-table-column prop="score" label="指标评价得分"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { comprehensiveRisk } from "../options/echarts-options.js";
export default {
  data() {
    return {
      comprehensiveRiskScore: "",
      enterpriseRiskLevel: "",
      aspectList: [],
      tableData: [],
      cellIndex: -1,
    };
  },
  computed: {
    comprehensiveRiskOption() {
      return comprehensiveRisk();
    },
  },
  created() {
    this.comprehensiveRiskScore = 76;
    this.enterpriseRiskLevel = "较高";
    this.aspectList = ["财务状况", "司法诉讼", "企业经营"];
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.tableData = [
          {
            type: "财务预警（20）",
            total: 12,
            rowspan: 4, //用于合并行
            order: 1, //用于鼠标hover
            subType: "营收利润",
            level: "警示",
            score: 1,
          },
          {
            order: 1,
            subType: "资产负债",
            level: "高风险",
            score: 4,
          },
          {
            order: 1,
            subType: "现金流量",
            level: "高风险",
            score: 5,
          },
          {
            order: 1,
            subType: "股指风险",
            level: "中风险",
            score: 2,
          },

          {
            type: "用工预警（10）",
            total: 3,
            rowspan: 4,
            order: 2,
            subType: "从业人数",
            level: "警示",
            score: 1,
          },
          {
            order: 2,
            subType: "招聘数量",
            level: "警示",
            score: 1,
          },
          {
            order: 2,
            subType: "招聘平均薪资",
            level: "/",
            score: 0,
          },
          {
            order: 2,
            subType: "社保",
            level: "警示",
            score: 1,
          },

          {
            type: "信用预警（10）",
            total: 2,
            rowspan: 1,
            order: 3,
            subType: "纳税信用",
            level: "中风险",
            score: 2,
          },

          {
            type: "舆情预警（10）",
            total: 5,
            rowspan: 1,
            order: 4,
            subType: "舆情",
            level: "高风险",
            score: 5,
          },

          {
            type: "舆情预警（10）",
            total: 4,
            rowspan: 2,
            order: 5,
            subType: "股东风险",
            level: "高风险",
            score: 2,
          },
          {
            order: 5,
            subType: "高管风险",
            level: "高风险",
            score: 2,
          },

          {
            type: "司法风险（20）",
            total: 12,
            rowspan: 6,
            order: 6,
            subType: "被执行人",
            level: "警示",
            score: 1,
          },
          {
            order: 6,
            subType: "失信信息",
            level: "高风险",
            score: 4,
          },
          {
            order: 6,
            subType: "限制高消费",
            level: "高风险",
            score: 5,
          },
          {
            order: 6,
            subType: "限制出境",
            level: "中风险",
            score: 2,
          },
          {
            order: 6,
            subType: "终本案件",
            level: "高风险",
            score: 5,
          },
          {
            order: 6,
            subType: "裁判文书",
            level: "中风险",
            score: 2,
          },

          {
            type: "经营风险（10）",
            total: 12,
            rowspan: 5,
            order: 7,
            subType: "经营异常",
            level: "警示",
            score: 1,
          },
          {
            order: 7,
            subType: "严重违法",
            level: "高风险",
            score: 4,
          },
          {
            order: 7,
            subType: "股权质押",
            level: "高风险",
            score: 5,
          },
          {
            order: 7,
            subType: "行政处罚",
            level: "中风险",
            score: 2,
          },
          {
            order: 7,
            subType: "欠税公告",
            level: "高风险",
            score: 5,
          },

          {
            type: "关联风险（10）",
            total: 3,
            rowspan: 1,
            order: 8,
            subType: "关联风险",
            level: "警示",
            score: 1,
          },
        ];
      });
    },
    objectSpanMethod({ row, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        return {
          rowspan: row.type ? row.rowspan : 0,
          colspan: row.type ? 1 : 0,
        };
      }
    },

    aspectListFormatter(aspectList) {
      let aspectStr = "";
      aspectList.forEach((item, index) => {
        aspectStr += index === 0 ? item : `、${item}`;
      });
      return aspectStr;
    },
    handleCellMouseEnter(row) {
      this.cellIndex = row.order;
    },
    handleCellMouseLeave() {
      this.cellIndex = -1;
    },
    rowClassName({ row }) {
      return this.cellIndex === row.order ? "hover-row" : "";
    },
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}
.comprehensive-risk-index {
  align-items: stretch;
  margin-top: 20px;
  .left {
    width: 25%;
    .chart {
      width: 100%;
      height: 400px;
    }
    .comprehensive-risk-score {
      margin: 20px auto;
      .score {
        padding: 0 10px;
        font-size: 32px;
        color: rgba(244, 165, 47, 1);
      }
    }
    .comprehensive-risk-detail {
      .level {
        color: rgba(244, 165, 47, 1);
      }
      .aspect {
        color: rgba(93, 119, 255, 1);
      }
    }
  }
  .right {
    width: 75%;
    padding-left: 30px;
    .table {
      /deep/ .table-header {
        th.el-table__cell {
          padding: 12px 0;
          // background: #409eff;
          // color: #fff;
        }
      }
      /deep/ .el-table__cell {
        padding: 0;
      }
    }
  }
  .my-hover-row {
    color: rgba(93, 119, 255, 1);
  }
}
</style>
