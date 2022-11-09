<template>
  <div class="wrap">
    <div class="header">
      <el-card class="header-left" shadow="hover">
        <el-descriptions :column="1">
          <el-descriptions-item label="风险指标">
            <span class="red">财务预警</span>
          </el-descriptions-item>
          <el-descriptions-item label="风险分类">市场活力</el-descriptions-item>
          <el-descriptions-item label="风险描述"
            >财务预警风险企业占比超过32%且数量同比上升17%</el-descriptions-item
          >
          <el-descriptions-item label="风险等级">
            <risk-level :level="30"></risk-level>
          </el-descriptions-item>
        </el-descriptions>
        <div class="enterprise-count">
          <div class="left">
            <h3 class="title">风险企业总数</h3>
            <div>
              <span class="value">{{ formatter(24961) }}</span>
              <span class="unit">家</span>
            </div>
          </div>
          <div class="right">
            <div>
              同比
              <span class="value">+17</span>
              <span class="unit">%</span>
            </div>
            <div>
              占比
              <span class="value blue">32</span>
              <span class="unit blue">%</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="header-right" shadow="hover">
        <div class="content">
          <div class="content-left">
            <h3>风险企业十大行业排名</h3>
            <v-chart
              class="chart1"
              ref="rankingBarOption"
              :option="rankingBarOption"
            ></v-chart>
          </div>
          <div class="content-right">
            <h3>风险企业注册规模分布</h3>
            <v-chart :option="option"></v-chart>
          </div>
        </div>
      </el-card>
    </div>
    <el-divider></el-divider>
    <risk-table></risk-table>
  </div>
</template>

<script>
import RiskLevel from "@/views/risk-assessment/market-risk/components/riskLevel.vue";
import riskTable from "@/views/risk-assessment/market-risk/components/riskTable.vue";
import { rankingBar } from "@/views/risk-assessment/market-risk/market-risk-detail/options/echarts-options.js";
import { formatter } from "@/util/util";
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      },
    };
  },
  components: {
    RiskLevel,
    riskTable,
  },
  computed: {
    rankingBarOption() {
      return rankingBar();
    },
  },
  methods: {
    // 千分位分隔
    formatter(val) {
      return formatter(val);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  // width: 1900px;
  // height: 1000px;
  .header {
    display: flex;
    justify-content: space-between;
    width: 1280px;
    height: 400px;
    .header-left {
      width: 500px;
      padding: 10px;
      .red {
        color: red;
        font-weight: 700;
      }
      .enterprise-count {
        display: flex;
        width: 420px;
        height: 160px;
        padding: 32px;
        background: #fafbfd;
        border: 1px solid #eaecef;
        border-radius: 4px;
        margin-top: 20px;
        .left {
          width: 202px;
          border-right: 2px solid #eaecef;
          .title {
            font-size: 20px;
            color: #1e293b;
            margin-bottom: 10px;
          }
          .value {
            font-family: "Altinn-DIN";
            font-weight: 700;
            font-size: 48px;
            color: #5d77ff;
          }
          .unit {
            font-size: 20px;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 154px;
          padding-left: 32px;
          padding-top: 8px;
          padding-bottom: 8px;
          font-size: 20px;
          .value,
          .unit {
            font-family: "Altinn-DIN";
            font-weight: 700;
            color: #f57272;
          }
          .value {
            font-size: 24px;
          }
          .unit {
            font-size: 16px;
          }
          .blue {
            color: #5d77ff;
          }
        }
      }
    }
    .header-right {
      width: 750px;
      .content {
        display: flex;
        text-align: center;
        .content-left {
          width: 450px;
          font-size: 20px;
          .chart1 {
            width: 300px;
            height: 200px;
          }
        }
        .content-right {
          width: 300px;
          height: 200px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
