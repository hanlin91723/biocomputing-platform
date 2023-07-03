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
        <h4>高风险企业（昨日）</h4>
        <div class="num">
          <span class="value">{{ highEntNum }}</span>
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
        <h4>中风险企业（昨日）</h4>
        <div class="num">
          <span class="value">{{ middleEntNum }}</span>
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
      this.$axios
        .get("/riskManager/statistics/entNumStatistic")
        .then(({ data }) => {
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
    padding-left: 20px;
    text-align: left;
    color: rgb(30, 41, 59);
    background: rgb(234, 236, 239);
    border-left: 10px solid transparent;
    cursor: pointer;
    &.high-risk-enterprise {
      .value {
        font-size: 36px;
        font-weight: 700;
        color: rgb(245, 114, 114);
      }
    }
    &.high-risk-enterprise.active {
      background: rgb(250, 251, 253);
      border-left: 10px solid rgb(245, 114, 114);
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid rgb(245, 114, 114);
      }
    }
    &.medium-risk-enterprise {
      margin-top: 20px;
      .value {
        font-size: 36px;
        font-weight: 700;
        color: rgb(244, 165, 47);
      }
    }
    &.medium-risk-enterprise.active {
      background: rgb(250, 251, 253);
      border-left: 10px solid rgb(244, 165, 47);
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid rgb(244, 165, 47);
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
