<template>
  <div class="comprehensive-risk-index flex">
    <div class="left">
      <v-chart class="chart" :option="comprehensiveRiskOption"></v-chart>
      <div class="comprehensive-risk-score">
        综合风险指数：<span
          :class="{
            score: true,
            [riskIndexFormatter(entRiskScore).className]: true,
          }"
          >{{ entRiskScore }}</span
        >分
      </div>
      <div class="comprehensive-risk-detail">
        该企业风险等级<span
          :class="{
            level: true,
            [riskIndexFormatter(entRiskScore).className]: true,
          }"
          >{{ riskIndexFormatter(entRiskScore).name }}</span
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
        <el-table-column prop="type" label="分类" width="180">
          <template slot-scope="{ row }"
            >{{ row.type }}（{{ row.sum }}）</template
          >
        </el-table-column>
        <el-table-column prop="total" label="分类评价得分"></el-table-column>
        <el-table-column prop="subType" label="评价指标"></el-table-column>
        <el-table-column prop="level" label="预警等级">
          <template slot-scope="{ row }">
            <span :class="{ [levelFormatter(row.level).className]: true }">{{
              levelFormatter(row.level).name
            }}</span>
          </template>
        </el-table-column>
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
      comprehensiveRiskRadarData: [],
      aspectList: [],
      tableData: [],
      cellIndex: -1,
    };
  },
  props: {
    entRiskScore: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    comprehensiveRiskOption() {
      return comprehensiveRisk(this.comprehensiveRiskRadarData);
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      const params = {
        entId: this.$route.params.id,
      };
      this.$axios
        .get("/riskManager/entRisk/comprehensiveRisk", params)
        .then(({ data }) => {
          this.tableData = data;
          const arr = data.filter((item) => item.rowspan);
          this.comprehensiveRiskRadarData = arr.map((item) => item.total);
          //r=得分与权重之比，列举r≥0.6的分类，没有则列举r最大的分类
          const arrTemp = arr.filter((item) => item.total / item.sum >= 0.6);
          this.aspectList =
            arrTemp.length > 0
              ? arrTemp.map((item) => item.type)
              : [
                  arr.reduce((pre, cur) =>
                    pre.total / pre.sum >= cur.total / cur.sum ? pre : cur
                  ).type,
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
    //风险指数等级
    riskIndexFormatter(entRiskScore) {
      switch (true) {
        case entRiskScore >= 0 && entRiskScore <= 25:
          return {
            className: "riskColor4",
            name: "低",
          };
        case entRiskScore > 25 && entRiskScore <= 50:
          return {
            className: "riskColor3",
            name: "中",
          };
        case entRiskScore > 50 && entRiskScore <= 75:
          return {
            className: "riskColor2",
            name: "较高",
          };
        case entRiskScore > 75 && entRiskScore <= 100:
          return {
            className: "riskColor1",
            name: "高",
          };
        default:
          break;
      }
    },
    // 预警等级
    levelFormatter(val) {
      const obj = {
        0: {
          name: "无风险",
          className: "riskColor4",
        },
        1: {
          name: "高风险",
          className: "riskColor1",
        },
        2: {
          name: "中风险",
          className: "riskColor2",
        },
        3: {
          name: "警示",
          className: "riskColor3",
        },
      };
      return val === null
        ? {
            name: "/",
            className: "",
          }
        : obj[val];
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
        // color: rgba(244, 165, 47, 1);
      }
    }
    .comprehensive-risk-detail {
      .level {
        // color: rgba(244, 165, 47, 1);
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
