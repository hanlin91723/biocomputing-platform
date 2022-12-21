<template>
  <div class="statistical-analysis-wrap">
    <div class="flex">
      <div class="left flex">
        <el-card class="market-risk-wrap">
          <v-chart
            class="market-risk-chart"
            :option="marketRiskOption"
          ></v-chart>
        </el-card>
        <el-card class="market-statistic">
          <h3 class="title">市场主体统计</h3>
          <div class="info-wrap top">
            <h5 class="info-title">企业总数</h5>
            <div>
              <span class="info-value">{{ marketStatistics.entNum }}</span>
              <span>家</span>
            </div>
          </div>
          <div class="info-wrap left">
            <h5 class="info-title">本月新增</h5>
            <div>
              <span class="info-value">{{ marketStatistics.newAddNum }}</span>
              <span>家</span>
            </div>
          </div>
          <div class="info-wrap right">
            <h5 class="info-title">同比上升</h5>
            <div>
              <span class="info-value">{{ marketStatistics.prop }}</span>
              <span>%</span>
            </div>
          </div>
          <div class="info-wrap bottom">
            <h5 class="info-title">规上企业</h5>
            <div>
              <span class="info-value">{{ marketStatistics.aboveEntNum }}</span>
              <span>家</span>
            </div>
          </div>
        </el-card>
      </div>
      <el-card class="right">
        <v-chart
          class="risk-index-analysis-chart"
          :option="riskIndexAnalysisOption"
        ></v-chart>
      </el-card>
    </div>
    <div class="margin flex">
      <el-card class="left">
        <h3 class="title">高风险企业舆情</h3>
        <public-sentiment :list="publicSentimentList" />
      </el-card>
      <el-card class="right">
        <h3 class="title">高/中风险企业数量统计</h3>
        <risk-enterprise-total />
      </el-card>
    </div>
    <div class="flex">
      <el-card class="left word-cloud-wrap">
        <v-chart class="word-cloud-chart" :option="wordCloudOption"></v-chart>
      </el-card>
      <el-card class="right chart-wrap">
        <v-chart class="ranking-chart" :option="rankingOption"></v-chart>
        <v-chart
          class="distribution-chart"
          :option="distributionOption"
        ></v-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  marketRisk,
  riskIndexAnalysis,
  wordCloud,
  ranking,
  distribution,
} from "./options/echarts-options.js";
export default {
  components: {
    PublicSentiment: () => import("./components/public-sentiment.vue"),
    RiskEnterpriseTotal: () => import("./components/risk-enterprise-total.vue"),
  },
  data() {
    return {
      marketRiskData: [],
      marketStatistics: {},
      riskIndexAnalysisData: [],
      publicSentimentList: [],
      wordCloudData: [],
      rankingData: [],
      distributionData: [],
    };
  },
  computed: {
    marketRiskOption() {
      return marketRisk(this.marketRiskData);
    },
    riskIndexAnalysisOption() {
      return riskIndexAnalysis(this.riskIndexAnalysisData);
    },
    wordCloudOption() {
      return wordCloud(this.wordCloudData);
    },
    rankingOption() {
      return ranking(this.rankingData);
    },
    distributionOption() {
      return distribution(this.distributionData);
    },
  },
  created() {
    this.getMarketRiskData();
    this.getMarketStatisticsData();
    this.getRiskIndexAnalysisData();
    this.getPublicSentimentList();
    this.getWordCloudData();
    this.getRankingData();
    this.getDistributionData();
  },
  methods: {
    //市场风险概况
    getMarketRiskData() {
      this.$axios.get("/statistics/marketRiskProp").then(({ data }) => {
        this.marketRiskData = data;
      });
    },
    //市场主体统计
    getMarketStatisticsData() {
      this.$axios.get("/statistics/marketMain").then(({ data }) => {
        this.marketStatistics = data;
      });
    },
    //企业综合风险指数分析
    getRiskIndexAnalysisData() {
      // this.$axios.get("/statistics/marketMain").then(() => {
      //   this.riskIndexAnalysisData = [
      //     [0, 0],
      //     [5, 40],
      //     [10, 100],
      //     [15, 20],
      //     [20, 40],
      //     [25, 100],
      //     [30, 20],
      //     [35, 40],
      //     [40, 100],
      //     [45, 20],
      //     [50, 40],
      //     [55, 100],
      //     [60, 20],
      //     [65, 40],
      //     [70, 100],
      //     [75, 20],
      //     [80, 40],
      //     [85, 100],
      //     [90, 20],
      //     [95, 60],
      //     [100, 30],
      //   ];
      // });
      this.$axios.get("/statistics/comprehensive").then(({ data }) => {
        this.riskIndexAnalysisData = data.map((item) => [
          item.name,
          item.value,
        ]);
      });
    },
    //高风险企业舆情
    getPublicSentimentList() {
      this.$axios.get("/statistics/highLevelEnt").then(({ data }) => {
        this.publicSentimentList = data;
      });
    },
    //风险指标云图
    getWordCloudData() {
      this.$axios.get("/statistics/wordCount").then(({ data }) => {
        this.wordCloudData = data;
      });
    },
    //高风险企业十大行业排名
    getRankingData() {
      this.$axios
        .get("/statistics/highRiskIndustryRanking")
        .then(({ data }) => {
          this.rankingData = data.reverse();
        });
    },
    //高风险企业规模分布
    getDistributionData() {
      this.$axios
        .get("/statistics/highRiskRegisteredCapital")
        .then(({ data }) => {
          this.distributionData = data;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.statistical-analysis-wrap {
  .left,
  .right {
    width: 49%;
  }
  .market-risk-wrap {
    width: 48%;
    .market-risk-chart {
      width: 100%;
      height: 400px;
    }
  }
  .market-statistic {
    position: relative;
    width: 48%;
    .info-wrap {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 200px;
      height: 160px;
      font-size: 12px;
      text-align: center;
      &::before,
      &::after {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        z-index: -1;
        content: "";
        width: 0;
        height: 0;
        border-right: 70px solid transparent;
        border-left: 70px solid transparent;
      }
      &::before {
        top: 0;
        border-bottom: 80px solid #f2f2f2;
      }
      &::after {
        bottom: 0;
        border-top: 80px solid #f2f2f2;
      }
      &.top,
      &.bottom {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
      }
      &.top {
        top: 50px;
      }
      &.bottom {
        bottom: 50px;
      }
      &.left,
      &.right {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &.left {
        left: 3%;
      }
      &.right {
        right: 3%;
      }
      .info-title {
        font-size: 14px;
        line-height: 2;
      }
    }
  }

  .risk-index-analysis-chart {
    width: 100%;
    height: 400px;
  }
  .word-cloud-wrap {
    width: 35%;
    .word-cloud-chart {
      width: 100%;
      height: 400px;
    }
  }
  .chart-wrap {
    width: 63%;
    /deep/ .el-card__body {
      display: flex;
      justify-content: space-around;
      .ranking-chart {
        width: 60%;
        height: 400px;
      }
      .distribution-chart {
        width: 30%;
        height: 400px;
      }
    }
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  &.margin {
    margin: 20px auto;
  }
}
.title {
  font-size: 18px;
  text-align: center;
}
</style>
