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
            <div>184,252 家</div>
          </div>
          <div class="info-wrap left">
            <h5 class="info-title">本月新增</h5>
            <div>1252 家</div>
          </div>
          <div class="info-wrap right">
            <h5 class="info-title">同比上升</h5>
            <div>3.5%</div>
          </div>
          <div class="info-wrap bottom">
            <h5 class="info-title">规上企业</h5>
            <div>252 家</div>
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
    this.getRiskIndexAnalysisData();
    this.getPublicSentimentList();
    this.getWordCloudData();
    this.getRankingData();
    this.getDistributionData();
  },
  methods: {
    getMarketRiskData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.marketRiskData = [
          {
            name: "高风险",
            value: 1048,
          },
          {
            name: "中风险",
            value: 1048,
          },
          {
            name: "警示",
            value: 1048,
          },
          {
            name: "正常",
            value: 1048,
          },
        ];
      });
    },
    getRiskIndexAnalysisData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.riskIndexAnalysisData = [
          [5, 40],
          [10, 100],
          [15, 20],
          [20, 40],
          [25, 100],
          [30, 20],
          [35, 40],
          [40, 100],
          [45, 20],
          [50, 40],
          [55, 100],
          [60, 20],
          [65, 40],
          [70, 100],
          [75, 20],
          [80, 40],
          [85, 100],
          [90, 20],
          [95, 60],
          [100, 30],
        ];
      });
    },
    getPublicSentimentList() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.publicSentimentList = [
          {
            news: "浙江吉华集团股份有限管工作函的",
            relatedEnterprise: "汉创智能显示有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有司关露监管工作函的",
            relatedEnterprise: "汉创智能显限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股的",
            relatedEnterprise: "汉创智）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华的",
            relatedEnterprise: "汉创智公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限管工作函的",
            relatedEnterprise: "汉创智能显示有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有司关露监管工作函的",
            relatedEnterprise: "汉创智能显限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股的",
            relatedEnterprise: "汉创智）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
          {
            news: "浙江吉华集团股份有限公司关于上海证券交易所2021年年度报告的信息披露监管工作函的",
            relatedEnterprise: "汉创智能显示技术（江苏）有限公司",
            publicSentimentType: "正面",
            publicSentimentTime: "2022-11-01 13:12:00",
          },
        ];
      });
    },
    getWordCloudData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.wordCloudData = [
          {
            name: "范德萨",
            value: 866,
          },
          {
            name: "范德萨发个请我",
            value: 82,
          },
          {
            name: "去问问热",
            value: 644,
          },
          {
            name: "UK发的剧",
            value: 32,
          },
          {
            name: "没内存瞎操作",
            value: 4654,
          },
          {
            name: "范德萨123",
            value: 866,
          },
          {
            name: "范德萨发个请我532",
            value: 82,
          },
          {
            name: "去问问热4312",
            value: 644,
          },
          {
            name: "UK发的剧4321",
            value: 32,
          },
          {
            name: "没内存",
            value: 1654,
          },
        ];
      });
    },
    getRankingData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.rankingData = [
          {
            industryName: "范德萨",
            enterpriseNum: 866,
          },
          {
            industryName: "范德萨发个请我",
            enterpriseNum: 82,
          },
          {
            industryName: "去问问热",
            enterpriseNum: 644,
          },
          {
            industryName: "UK伦理剧",
            enterpriseNum: 32,
          },
          {
            industryName: "没内存瞎操作",
            enterpriseNum: 1654,
          },
        ];
      });
    },
    getDistributionData() {
      this.$axios.get("/construction/projectManager").then(() => {
        this.distributionData = [
          {
            name: "范德萨",
            value: 866,
          },
          {
            name: "范德萨发个请我",
            value: 82,
          },
          {
            name: "去问问热",
            value: 644,
          },
          {
            name: "UK伦理剧",
            value: 32,
          },
          {
            name: "没内存瞎操作",
            value: 1654,
          },
        ];
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
