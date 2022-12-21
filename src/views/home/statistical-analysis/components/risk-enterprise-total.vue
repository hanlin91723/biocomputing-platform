<template>
  <div class="risk-enterprise-total-wrap flex">
    <div class="left">
      <div
        :class="[
          'risk-enterprise',
          'high-risk-enterprise',
          riskType === 'high' ? 'active' : '',
        ]"
        @click="changeRiskType('high')"
      >
        <div>昨日高风险企业</div>
        <div>
          <span>{{ highEntNum }}</span>
          <span>家</span>
        </div>
      </div>
      <div
        :class="[
          'risk-enterprise',
          'medium-risk-enterprise',
          riskType === 'medium' ? 'active' : '',
        ]"
        @click="changeRiskType('medium')"
      >
        <div>昨日中风险企业</div>
        <div>
          <span>{{ middleEntNum }}</span>
          <span>家</span>
        </div>
      </div>
    </div>
    <v-chart
      class="enterprise-num-chart"
      :option="enterpriseNumOption"
      :update-options="{ notMerge: true }"
    ></v-chart>
  </div>
</template>

<script>
import { enterpriseNum } from "../options/echarts-options.js";
export default {
  data() {
    return {
      riskType: "high",
      enterpriseNumDataObj: {},
      highEntNum: "",
      middleEntNum: "",
    };
  },
  computed: {
    enterpriseNumOption() {
      return enterpriseNum(this.enterpriseNumData);
    },
    enterpriseNumData() {
      let data = [];
      switch (this.riskType) {
        case "high":
          data = this.enterpriseNumDataObj.highList || [];
          break;
        case "medium":
          data = this.enterpriseNumDataObj.middleList || [];
          break;
        default:
      }
      return data;
    },
  },
  created() {
    this.getEnterpriseNumData();
  },
  methods: {
    getEnterpriseNumData() {
      this.$axios.get("/statistics/entNumStatistic").then(({ data }) => {
        this.enterpriseNumDataObj = data;
        this.highEntNum = data.highEntNum;
        this.middleEntNum = data.middleEntNum;
      });
    },
    changeRiskType(type) {
      this.riskType = type;
    },
  },
};
</script>

<style lang="less" scoped>
.risk-enterprise-total-wrap {
  .risk-enterprise {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
    height: 100px;
    text-align: center;
    background: #f5f7fa;
    cursor: pointer;
    &.medium-risk-enterprise {
      margin-top: 20px;
    }
    &.active {
      color: #fff;
      background: #66b1ff;
      &::after {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 20px solid #409eff;
      }
    }
  }
  .enterprise-num-chart {
    width: 520px;
    height: 335px;
  }
  .tab-wrap {
    width: 120px;
    margin: 10px 0 10px auto;
    .tab-btn {
      cursor: pointer;
      &.active {
        color: #409eff;
      }
    }
  }
}
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
