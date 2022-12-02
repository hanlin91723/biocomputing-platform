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
        <div>523家</div>
        <div>比前日增加25家</div>
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
        <div>523家</div>
        <div>比前日减少55家</div>
      </div>
    </div>
    <div class="right">
      <div class="tab-wrap flex">
        <div
          :class="['tab-btn', dateType === 'month' ? 'active' : '']"
          @click="changeDateType('month')"
        >
          近一月
        </div>
        <div>/</div>
        <div
          :class="['tab-btn', dateType === 'year' ? 'active' : '']"
          @click="changeDateType('year')"
        >
          近一年
        </div>
      </div>
      <v-chart
        class="enterprise-num-chart"
        :option="enterpriseNumOption"
        :update-options="{ notMerge: true }"
      ></v-chart>
    </div>
  </div>
</template>

<script>
import { enterpriseNum } from "../options/echarts-options.js";
export default {
  data() {
    return {
      riskType: "high",
      dateType: "month",
      enterpriseNumData: [],
    };
  },
  computed: {
    enterpriseNumOption() {
      return enterpriseNum(this.enterpriseNumData);
    },
  },
  created() {
    this.getEnterpriseNumData();
  },
  methods: {
    getEnterpriseNumData() {
      const params = {
        riskType: this.riskType,
        dateType: this.dateType,
      };
      this.$axios.get("/construction/projectManager", params).then(() => {
        this.enterpriseNumData = [
          {
            date: "10-3",
            value: 1048,
          },
          {
            date: "10-6",
            value: 1048,
          },
          {
            date: "10-9",
            value: 1048,
          },
          {
            date: "10-12",
            value: 1048,
          },
        ];
      });
    },
    changeRiskType(type) {
      this.riskType = type;
      this.getEnterpriseNumData();
    },
    changeDateType(type) {
      this.dateType = type;
      this.getEnterpriseNumData();
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
