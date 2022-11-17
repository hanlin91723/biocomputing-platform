<template>
  <div class="enterprise-risk-detail">
    <div class="header-wrap flex">
      <img class="enterprise-logo" :src="enterpriseLogoSrc" alt="LOGO" />
      <div class="enterprise-info-wrap">
        <h3 class="enterprise-name">{{ enterpriseInfo.name }}</h3>
        <ul class="enterprise-list flex">
          <li class="enterprise-item enterprise-legal-person flex">
            <span class="name">法人代表：</span>
            <span class="value">{{ enterpriseInfo.person }}</span>
          </li>
          <li class="enterprise-item enterprise-code flex">
            <span class="name">统一社会信用代码：</span>
            <span class="value">{{ enterpriseInfo.code }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">注册资本：</span>
            <span class="value">{{ enterpriseInfo.money }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">成立日期：</span>
            <span class="value">{{ enterpriseInfo.registerDate }}</span>
          </li>
        </ul>
        <ul class="enterprise-list flex">
          <li class="enterprise-item enterprise-risk-level flex">
            <span class="name">风险等级：</span>
            <risk-level class="value" :level="30"></risk-level>
          </li>
          <li class="enterprise-item flex">
            <span class="name">风险总数：</span>
            <span class="value">{{ enterpriseInfo.total }}</span>
          </li>
          <li class="enterprise-item flex">
            <span class="name">最后评估时间：</span>
            <span class="value">{{ enterpriseInfo.assessDate }}</span>
          </li>
        </ul>
      </div>
      <el-button class="btn" type="primary">风险评估报告</el-button>
    </div>
    <el-tabs class="tab-wrap" v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label">综合风险指数</span>
        <comprehensive-risk-index></comprehensive-risk-index>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">风险预警 {{ 245 }}</span>
        <risk-warning></risk-warning>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">司法风险 {{ 245 }}</span>
        <judicial-risk></judicial-risk>
      </el-tab-pane>
      <el-tab-pane name="fourth">
        <span slot="label">经营风险 {{ 245 }}</span>
        定时任务补偿</el-tab-pane
      >
      <el-tab-pane name="five">
        <span slot="label">关联风险 {{ 135 }}</span>
        <related-risk></related-risk>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import enterpriseLogoSrc from "@/assets/images/enterprise_logo.jpg";
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
  },
  data() {
    return {
      enterpriseLogoSrc: "",
      enterpriseInfo: {},
      activeName: "first",
    };
  },
  created() {
    console.log(this.$route.params);
    const params = {
      enterpriseId: this.$route.params.id,
    };
    this.$axios.get("/construction/projectManager", params).then(() => {
      this.enterpriseLogoSrc = enterpriseLogoSrc;
      this.enterpriseInfo = {
        name: "江苏商务集团有限公司",
        person: "张强",
        code: "9132092314052XXXXX",
        money: "398944.0192万人民币",
        registerDate: "2004-11-10",
        level: 30,
        total: 13458,
        assessDate: "2022-11-02",
      };
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
    .enterprise-logo {
      width: 120px;
      height: 120px;
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
            color: @abc;
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
