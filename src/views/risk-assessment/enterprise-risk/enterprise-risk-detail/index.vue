<template>
  <div class="enterprise-risk-detail">
    <div class="header-wrap flex">
      <div class="enterprise-logo-wrap">
        <div class="enterprise-logo-name">{{ enterpriseInfo.cname }}</div>
      </div>
      <div class="enterprise-info-wrap">
        <h3 class="enterprise-name">{{ enterpriseInfo.entName }}</h3>
        <ul class="enterprise-list flex">
          <li class="enterprise-item enterprise-legal-person flex">
            <span class="name">法人代表：</span>
            <span class="value">{{ enterpriseInfo.legalPerson }}</span>
          </li>
          <li class="enterprise-item enterprise-code flex">
            <span class="name">统一社会信用代码：</span>
            <span class="value">{{ enterpriseInfo.creditCode }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">注册资本：</span>
            <span class="value">{{
              enterpriseInfo.registeredCapital +
              enterpriseInfo.registeredCapitalUnit
            }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">成立日期：</span>
            <span class="value">{{ enterpriseInfo.incorporationDate }}</span>
          </li>
        </ul>
        <ul class="enterprise-list flex">
          <li class="enterprise-item enterprise-risk-level flex">
            <span class="name">风险等级：</span>
            <risk-level
              class="value"
              :level="enterpriseInfo.entRiskScore"
            ></risk-level>
          </li>
          <li class="enterprise-item flex">
            <span class="name">风险总数：</span>
            <span class="value">{{
              enterpriseRisk.riskWarningNum +
              judicialRisk.judicialRiskNum +
              managementRisk.managementRiskNum +
              relatedRisk.relatedRiskNum
            }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">最后评估时间：</span>
            <span class="value">{{ enterpriseInfo.estimateTime }}</span>
          </li>
        </ul>
      </div>
      <el-button class="btn" type="primary">风险评估报告</el-button>
    </div>
    <el-tabs class="tab-wrap" v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label">综合风险指数</span>
        <comprehensive-risk-index
          :entRiskScore="enterpriseInfo.entRiskScore"
        ></comprehensive-risk-index>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">风险预警 {{ enterpriseRisk.riskWarningNum }}</span>
        <risk-warning></risk-warning>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">司法风险 {{ judicialRisk.judicialRiskNum }}</span>
        <judicial-risk></judicial-risk>
      </el-tab-pane>
      <el-tab-pane name="fourth">
        <span slot="label"
          >经营风险 {{ managementRisk.managementRiskNum }}</span
        >
        <management-risk></management-risk>
      </el-tab-pane>
      <el-tab-pane name="five">
        <span slot="label">关联风险 {{ relatedRisk.relatedRiskNum }}</span>
        <related-risk></related-risk>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  enterpriseRiskStore,
  judicialRiskStore,
  managementRiskStore,
  relatedRiskStore,
} from "@/store/index.js";
export default {
  name: "EnterpriseRiskDetail",
  components: {
    "risk-level": () =>
      import("@/views/risk-assessment/market-risk/components/riskLevel.vue"),
    "comprehensive-risk-index": () =>
      import("./components/comprehensive-risk-index.vue"),
    "risk-warning": () => import("./components/risk-warning.vue"),
    "related-risk": () => import("./components/related-risk.vue"),
    "judicial-risk": () => import("./components/judicial-risk.vue"),
    "management-risk": () => import("./components/management-risk.vue"),
  },
  data() {
    return {
      enterpriseInfo: {},
      activeName: "first",
      enterpriseRisk: enterpriseRiskStore(),
      judicialRisk: judicialRiskStore(),
      managementRisk: managementRiskStore(),
      relatedRisk: relatedRiskStore(),
    };
  },
  watch: {
    "$route.params.id"() {
      this.$router.go(0);
    },
  },
  created() {
    const params = {
      entId: this.$route.params.id,
    };
    this.$axios.get("/entRisk/riskInfoByEntId", params).then(({ data }) => {
      this.enterpriseInfo = data;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}
.enterprise-risk-detail {
  .header-wrap {
    padding-bottom: 20px;
    .enterprise-logo-wrap {
      position: relative;
      width: 88px;
      height: 88px;
      .enterprise-logo-name {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        user-select: none;
        font-size: 30px;
        line-height: 1em;
        background-color: #7db3d9;
        color: #fff;
        border-radius: 4px;
      }
    }
    .enterprise-info-wrap {
      padding-left: 20px;
      line-height: 2;
      .enterprise-name {
      }
      .enterprise-list {
        .enterprise-item {
          width: 320px;
          &.enterprise-legal-person {
            width: 180px;
            // color: @abc;
          }
          &.enterprise-code {
            width: 380px;
          }
          &.enterprise-risk-level {
            width: 560px;
          }
        }
      }
    }
  }
  .tab-wrap {
    // margin-top: 20px;
  }
}
</style>
