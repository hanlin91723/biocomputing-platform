<template>
  <div class="wrap">
    <div class="header">
      <el-card class="header-left" shadow="hover">
        <el-descriptions :column="1">
          <el-descriptions-item label="风险指标">
            <span class="red">{{ infoData.indexSmallTypeName }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="风险分类">{{
            infoData.indexLargeTypeName
          }}</el-descriptions-item>
          <el-descriptions-item label="风险描述">{{
            infoData.desc
          }}</el-descriptions-item>
          <el-descriptions-item label="风险等级">
            <riskLevelTwo :level="infoData.riskLevel || 0"></riskLevelTwo>
          </el-descriptions-item>
        </el-descriptions>
        <div class="enterprise-count">
          <div class="left">
            <h3 class="title">风险企业总数</h3>
            <div>
              <span class="value">{{ formatter(infoData.entNum || 0) }}</span>
              <span class="unit">家</span>
            </div>
          </div>
          <div class="right">
            <div>
              同比
              <span class="value">{{
                (infoData.changeValue >= 0 ? "+" : "-") +
                (infoData.changeValue * 100).toFixed(0)
              }}</span>
              <span class="unit">%</span>
            </div>
            <div>
              占比
              <span class="value blue">{{
                (infoData.prop * 100).toFixed(0)
              }}</span>
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
            <v-chart class="chart2" :option="registeredScaleOption"></v-chart>
          </div>
        </div>
      </el-card>
    </div>
    <el-divider></el-divider>
    <risk-table :params="params"></risk-table>
  </div>
</template>

<script>
import riskLevelTwo from "@/views/risk-assessment/market-risk/components/riskLevelTwo.vue";
import riskTable from "@/views/risk-assessment/market-risk/components/riskTable.vue";
import {
  rankingBar,
  registeredScale,
} from "@/views/risk-assessment/market-risk/market-risk-detail/options/echarts-options.js";
import { formatter } from "@/util/util";
export default {
  data() {
    return {
      infoData: {},
      rankingName: [],
      rankingValue: [],
      registeredScaleData: [],
      params: {},
    };
  },
  components: {
    riskLevelTwo,
    riskTable,
  },
  created() {
    this.getInfoData();
  },
  computed: {
    rankingBarOption() {
      return rankingBar(this.rankingName, this.rankingValue);
    },
    registeredScaleOption() {
      return registeredScale(this.registeredScaleData);
    },
  },
  methods: {
    // 获取基本信息
    getInfoData() {
      let params = {
        riskType: "全部",
        riskLevel: "全部",
      };
      this.$axios.get("/marketRisk/byCondition", params).then(({ data }) => {
        this.infoData = data.find(
          (item) => item.id === parseInt(this.$route.query.id)
        );
        this.params = {
          indexLargeTypeCode: this.infoData.indexLargeTypeCode,
          indexSmallTypeCode: this.infoData.indexSmallTypeCode,
        };
        // 获取排行数据
        this.getRankingData();
        // 获取饼图数据
        this.getRegisteredScaleData();
      });
    },
    // 获取排行数据
    getRankingData() {
      this.$axios
        .get("/marketRisk/industryRanking", this.params)
        .then(({ data }) => {
          this.rankingName = data.map((item) => item.name);
          this.rankingValue = data.map((item) => item.value);
        });
    },
    // 获取饼图数据
    getRegisteredScaleData() {
      this.$axios
        .get("/marketRisk/registeredCapital", this.params)
        .then(({ data }) => {
          this.registeredScaleData = data;
        });
    },
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
    // width: 1280px;
    width: 100%;
    height: 400px;
    .header-left {
      width: 34%;
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
      overflow: initial;
      width: 64%;
      .content {
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-size: 20px;
        .content-left {
          width: 60%;
          .chart1 {
            height: 300px;
          }
        }
        .content-right {
          width: 40%;
          .chart2 {
            height: 300px;
          }
        }
      }
    }
  }
}
</style>
