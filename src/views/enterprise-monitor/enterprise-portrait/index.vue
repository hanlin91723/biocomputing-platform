<template>
  <div class="portrait" ref="portrait">
    <el-card>
      <div class="card">
        <!-- <img :src="headerInfo.cname" alt="" class="img" v-if="headerInfo.cname"> -->
        <div class="img default">{{ headerInfo.cname }}</div>
        <div class="companyInfo">
          <h2 class="title">{{ headerInfo.entName || "--" }}</h2>
          <div class="tag">
            <span class="tagItem">{{ headerInfo.entStatus || "--" }}</span>
          </div>
          <el-descriptions class="info">
            <el-descriptions-item label="注册资本"
              >{{ headerInfo.registeredCapital || "--"
              }}{{ headerInfo.registeredCapitalUnit }}</el-descriptions-item
            >
            <el-descriptions-item label="法定代表人">{{
              headerInfo.legalPerson || "--"
            }}</el-descriptions-item>
            <el-descriptions-item label="注册日期">{{
              headerInfo.incorporationDate || "--"
            }}</el-descriptions-item>
            <el-descriptions-item label="专利数量"
              >{{ headerInfo.patentNum || "--" }}件</el-descriptions-item
            >
            <el-descriptions-item label="从业人数"
              >{{ headerInfo.employNum || "--" }}人</el-descriptions-item
            >
            <el-descriptions-item label="利税总额"
              >{{ headerInfo.taxNum || "--" }}万元</el-descriptions-item
            >
          </el-descriptions>
        </div>
        <div class="card-right">
          <div class="index">
            <div class="num">{{ headerInfo.riskScore || "--" }}</div>
            <div class="indexName">综合风险指数</div>
          </div>
          <div class="endUpdateTime">
            最后更新时间：{{ headerInfo.updateTime?.split(" ")[0] || "--" }}
          </div>
        </div>
      </div>
    </el-card>
    <!-- tab切换 -->
    <ul class="replaceTabs" v-show="isTabShow">
      <li
        :class="{ tabItem: true, active: activeName === item }"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="tabChange(item)"
      >
        {{ item }}
      </li>
    </ul>
    <div ref="tabs"></div>
    <el-tabs v-model="activeName" type="border-card" class="tabs" stretch>
      <!-- 基本信息 -->
      <el-tab-pane name="基本信息">
        <el-dropdown slot="label" @command="anchorScroll($event, '基本信息')">
          <span class="el-dropdown-link"> 基本信息 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="RegisterInfo">工商信息</el-dropdown-item>
            <el-dropdown-item command="Shareholder">股东信息</el-dropdown-item>
            <el-dropdown-item command="KeyPersonnel">主要人员</el-dropdown-item>
            <el-dropdown-item command="OutInvest">对外投资</el-dropdown-item>
            <el-dropdown-item command="ChangeRecord">变更记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '基本信息'">
          <RegisterInfo class="margin" ref="RegisterInfo"></RegisterInfo>
          <Shareholder class="margin" ref="Shareholder"></Shareholder>
          <EquityChart class="margin" ref="EquityChart"></EquityChart>
          <KeyPersonnel class="margin" ref="KeyPersonnel"></KeyPersonnel>
          <OutInvest class="margin" ref="OutInvest"></OutInvest>
          <ChangeRecord class="margin" ref="ChangeRecord"></ChangeRecord>
        </div>
      </el-tab-pane>
      <!-- 司法风险 -->
      <el-tab-pane name="司法风险">
        <el-dropdown slot="label" @command="anchorScroll($event, '司法风险')">
          <span class="el-dropdown-link"> 司法风险 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Executee">被执行人</el-dropdown-item>
            <el-dropdown-item command="LimitConsume"
              >限制高消费</el-dropdown-item
            >
            <el-dropdown-item command="FinalCase">终本案件</el-dropdown-item>
            <el-dropdown-item command="Document">裁判文书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '司法风险'">
          <Executee class="margin" ref="Executee"></Executee>
          <LimitConsume class="margin" ref="LimitConsume"></LimitConsume>
          <FinalCase class="margin" ref="FinalCase"></FinalCase>
          <Document class="margin" ref="Document"></Document>
        </div>
      </el-tab-pane>
      <!-- 经营风险 -->
      <el-tab-pane name="经营风险">
        <el-dropdown slot="label" @command="anchorScroll($event, '经营风险')">
          <span class="el-dropdown-link"> 经营风险 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="BusinessUnusual"
              >经营异常</el-dropdown-item
            >
            <el-dropdown-item command="SeriousIllegal"
              >严重违法</el-dropdown-item
            >
            <el-dropdown-item command="EquityPledge">股权质押</el-dropdown-item>
            <el-dropdown-item command="AdministrationPunish"
              >行政处罚</el-dropdown-item
            >
            <el-dropdown-item command="TaxRecord">欠税公告</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '经营风险'">
          <BusinessUnusual
            class="margin"
            ref="BusinessUnusual"
          ></BusinessUnusual>
          <SeriousIllegal class="margin" ref="SeriousIllegal"></SeriousIllegal>
          <EquityPledge class="margin" ref="EquityPledge"></EquityPledge>
          <AdministrationPunish
            class="margin"
            ref="AdministrationPunish"
          ></AdministrationPunish>
          <TaxRecord class="margin" ref="TaxRecord"></TaxRecord>
        </div>
      </el-tab-pane>
      <!-- 经营信息 -->
      <el-tab-pane name="经营信息">
        <el-dropdown slot="label" @command="anchorScroll($event, '经营信息')">
          <span class="el-dropdown-link"> 经营信息 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Administration"
              >行政许可</el-dropdown-item
            >
            <el-dropdown-item command="Credit">信用评价</el-dropdown-item>
            <el-dropdown-item command="Recruitment">招聘</el-dropdown-item>
            <el-dropdown-item command="SocialSecurity"
              >社保信息</el-dropdown-item
            >
            <el-dropdown-item command="LandInfo">土地信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '经营信息'">
          <Administration class="margin" ref="Administration"></Administration>
          <Credit class="margin" ref="Credit"></Credit>
          <Recruitment class="margin" ref="Recruitment"></Recruitment>
          <SocialSecurity class="margin" ref="SocialSecurity"></SocialSecurity>
          <LandInfo class="margin" ref="LandInfo"></LandInfo>
        </div>
      </el-tab-pane>
      <!-- 企业发展 -->
      <el-tab-pane name="企业发展">
        <el-dropdown slot="label" @command="anchorScroll($event, '企业发展')">
          <span class="el-dropdown-link"> 企业发展 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Contributor"
              >企业年报股东出资</el-dropdown-item
            >
            <el-dropdown-item command="PublicSentiment"
              >新闻舆情</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '企业发展'">
          <Contributor class="margin" ref="Contributor"></Contributor>
          <PublicSentiment
            class="margin"
            ref="PublicSentiment"
          ></PublicSentiment>
        </div>
      </el-tab-pane>
      <!-- 知识产权 -->
      <el-tab-pane name="知识产权">
        <el-dropdown slot="label" @command="anchorScroll($event, '知识产权')">
          <span class="el-dropdown-link"> 知识产权 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="PatentInfo">专利信息</el-dropdown-item>
            <el-dropdown-item command="BrandInfo">商标信息</el-dropdown-item>
            <el-dropdown-item command="SoftwareRight"
              >软件著作权</el-dropdown-item
            >
            <el-dropdown-item command="Copyright">作品著作权</el-dropdown-item>
            <el-dropdown-item command="WebsiteFiling"
              >网站备案</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '知识产权'">
          <PatentInfo class="margin" ref="PatentInfo"></PatentInfo>
          <BrandInfo class="margin" ref="BrandInfo"></BrandInfo>
          <SoftwareRight class="margin" ref="SoftwareRight"></SoftwareRight>
          <Copyright class="margin" ref="Copyright"></Copyright>
          <WebsiteFiling class="margin" ref="WebsiteFiling"></WebsiteFiling>
        </div>
      </el-tab-pane>
      <!-- 其他信息 -->
      <el-tab-pane name="其他信息">
        <el-dropdown slot="label" @command="anchorScroll($event, '其他信息')">
          <span class="el-dropdown-link"> 其他信息 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="MandatoryProducts"
              >强制性产品认证</el-dropdown-item
            >
            <el-dropdown-item command="FarmProduce"
              >食品农产品认证</el-dropdown-item
            >
            <el-dropdown-item command="VoluntaryProducts"
              >自愿性工业产品认证</el-dropdown-item
            >
            <el-dropdown-item command="BTwoBInfo">B2B信息</el-dropdown-item>
            <el-dropdown-item command="Encyclopedias"
              >百科介绍</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="activeName == '其他信息'">
          <MandatoryProducts
            class="margin"
            ref="MandatoryProducts"
          ></MandatoryProducts>
          <FarmProduce class="margin" ref="FarmProduce"></FarmProduce>
          <VoluntaryProducts
            class="margin"
            ref="VoluntaryProducts"
          ></VoluntaryProducts>
          <BTwoBInfo class="margin" ref="BTwoBInfo"></BTwoBInfo>
          <Encyclopedias class="margin" ref="Encyclopedias"></Encyclopedias>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="backtop" v-show="isShowBacktop" @click="backtop">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>

<script>
// 基础信息
const RegisterInfo = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/registerInfo.vue"
  );
const Shareholder = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/shareholder.vue"
  );
const EquityChart = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/equityChart.vue"
  );
const KeyPersonnel = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/keyPersonnel.vue"
  );
const OutInvest = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/outInvest.vue"
  );
const ChangeRecord = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/changeRecord.vue"
  );
// 司法风险
const Executee = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/executee.vue"
  );
const LimitConsume = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/limitConsume.vue"
  );
const FinalCase = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/finalCase.vue"
  );
const Document = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/document.vue"
  );
// 经营风险
const BusinessUnusual = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/businessUnusual.vue"
  );
const SeriousIllegal = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/seriousIllegal.vue"
  );
const EquityPledge = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/equityPledge.vue"
  );
const AdministrationPunish = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/administrationPunish.vue"
  );
const TaxRecord = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/taxRecord.vue"
  );
// 其他信息
const MandatoryProducts = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/mandatoryProducts.vue"
  );
const FarmProduce = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/farmProduce.vue"
  );
const VoluntaryProducts = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/voluntaryProducts.vue"
  );
const BTwoBInfo = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/BTwoBInfo.vue"
  );
const Encyclopedias = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/encyclopedias.vue"
  );
// 企业发展
const Contributor = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/enterprise-development/contributor.vue"
  );
const PublicSentiment = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/enterprise-development/publicSentiment.vue"
  );
// 经营信息
const Administration = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/administration.vue"
  );
const Credit = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/credit.vue"
  );
const Recruitment = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/recruitment.vue"
  );
const SocialSecurity = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/socialSecurity.vue"
  );
const LandInfo = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/landInfo.vue"
  );
// 知识产权
const PatentInfo = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/intellectual-property/patentInfo.vue"
  );
const BrandInfo = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/intellectual-property/brandInfo.vue"
  );
const SoftwareRight = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/intellectual-property/softwareRight.vue"
  );
const Copyright = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/intellectual-property/copyright.vue"
  );
const WebsiteFiling = () =>
  import(
    "@/views/enterprise-monitor/enterprise-portrait/modules/intellectual-property/websiteFiling.vue"
  );

export default {
  data() {
    return {
      activeName: "基本信息",
      tabsList: [
        "基本信息",
        "司法风险",
        "经营风险",
        "经营信息",
        "企业发展",
        "知识产权",
        "其他信息",
      ],
      isTabShow: false,
      isShowBacktop: false,
      headerInfo: {},
    };
  },
  components: {
    // 基础信息
    RegisterInfo,
    Shareholder,
    EquityChart,
    KeyPersonnel,
    OutInvest,
    ChangeRecord,
    // 司法风险
    Executee,
    LimitConsume,
    FinalCase,
    Document,
    // 经营风险
    BusinessUnusual,
    SeriousIllegal,
    EquityPledge,
    AdministrationPunish,
    TaxRecord,
    // 其他信息
    MandatoryProducts,
    FarmProduce,
    VoluntaryProducts,
    BTwoBInfo,
    Encyclopedias,
    // 企业发展
    Contributor,
    PublicSentiment,
    // 经营信息
    Administration,
    Credit,
    Recruitment,
    SocialSecurity,
    LandInfo,
    // 知识产权
    PatentInfo,
    BrandInfo,
    SoftwareRight,
    Copyright,
    WebsiteFiling,
  },
  mounted() {
    this.watchScroll();
  },
  created() {
    this.getHeaderInfo();
  },
  methods: {
    // 获取头部信息
    getHeaderInfo() {
      let params = {
        entId: this.$route.params.id,
      };
      this.$axios
        .get("/riskManager/entInfo/portrait", params)
        .then(({ data }) => {
          this.headerInfo = data;
        });
    },
    // 锚点链接功能
    anchorScroll(item, tabName) {
      // 首先做个tab的切换
      if (this.activeName !== tabName) {
        this.activeName = tabName;
      }
      // 滚动,需等待切换完
      this.$nextTick(() => {
        this.$refs.portrait.parentNode.scrollTo({
          top: this.$refs[item].$el.getBoundingClientRect().top - 80,
          behavior: "smooth", // 让滚动丝滑
        });
      });
    },
    // 丝滑回到顶部
    backtop() {
      this.$refs.portrait.parentNode.scrollTo({
        top: 0,
        behavior: "smooth", // 让滚动丝滑
      });
    },
    tabChange(item) {
      this.activeName = item;
      this.$refs.portrait.parentNode.scrollTop = 0;
    },
    // tab固定
    isAttachTop() {
      if (this.$refs.tabs?.getBoundingClientRect()?.top < 47) {
        this.isTabShow = true;
        this.isShowBacktop = true;
      } else {
        this.isTabShow = false;
        this.isShowBacktop = false;
      }
    },
    // 监听滚动
    watchScroll() {
      this.$refs.portrait.parentNode.addEventListener(
        "scroll",
        this.isAttachTop
      );
    },
  },
};
</script>

<style lang="less" scoped>
.portrait {
  .card {
    display: flex;
    justify-content: space-around;
    .img {
      width: 88px;
      height: 88px;
      &.default {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        user-select: none;
        font-size: 30px;
        line-height: 1em;
        background-color: #7db3d9;
        color: #fff;
        border-radius: 4px;
      }
    }
    .companyInfo {
      width: 73%;
      .title {
        margin-bottom: 10px;
      }
      .tag {
        margin-bottom: 8px;
        .tagItem {
          border-radius: 2px;
          font-size: 12px;
          padding: 0 4px;
          margin-right: 8px;
          color: #0084ff;
          background: #ebf5ff;
        }
      }
    }
    .card-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 220px;
      text-align: right;
      .num {
        font-family: "Altinn-DIN";
        font-weight: 700;
        font-size: 48px;
      }
      .indexName {
        font-family: "Microsoft YaHei";
        color: #94a1b6;
        font-size: 20px;
      }
      .endUpdateTime {
        font-family: "Microsoft YaHei";
        font-size: 15px;
      }
    }
  }
  .replaceTabs {
    position: sticky;
    top: -20px;
    left: 0;
    z-index: 999;
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    .tabItem {
      flex: 1;
      text-align: center;
      line-height: 40px;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      &.active {
        border-left: 1px solid #dcdfe6;
        border-right: 1px solid #dcdfe6;
        background-color: #fff;
      }
    }
  }
  .tabs {
    margin-top: 10px;
    .margin {
      margin-bottom: 30px;
    }
  }
  .backtop {
    position: fixed;
    right: 50px;
    bottom: 100px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    cursor: pointer;
    z-index: 5;
    &:hover {
      background-color: #f2f6fc;
    }
  }
}
</style>
