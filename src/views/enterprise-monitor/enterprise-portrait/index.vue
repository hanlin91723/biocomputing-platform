<template>
  <div class="portrait" ref="portrait">
    <el-card>
      <div class="card">
        <img src="https://img5.tianyancha.com/logo/lll/ef99052a87d2249f6559cd98b34f2606.png@!f_200x200" alt="" class="img">
        <div class="companyInfo">
          <h2 class="title">乐视网信息技术（北京）股份有限公司</h2>
          <div class="tag">
            <span class="tagItem">存续</span>
            <span class="tagItem">上市企业</span>
            <span class="tagItem">高新技术企业</span>
          </div>
          <el-descriptions class="info">
            <el-descriptions-item label="注册资本">5000万元</el-descriptions-item>
            <el-descriptions-item label="法定代表人">周建</el-descriptions-item>
            <el-descriptions-item label="注册日期">1997-12-10</el-descriptions-item>
            <el-descriptions-item label="专利数量">32件</el-descriptions-item>
            <el-descriptions-item label="从业人数">1028人</el-descriptions-item>
            <el-descriptions-item label="利税总额">5000万元</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="card-right">
          <div class="index">
            <div class="num">87</div>
            <div class="indexName">综合风险指数</div>
          </div>
          <div class="endUpdateTime">最后更新时间：2022-10-31</div>
        </div>
      </div>
    </el-card>
    <!-- tab切换 -->
    <ul class="replaceTabs" v-show="isTabShow">
      <li
       :class="{tabItem:true,active:activeName === item}"
       v-for="(item,index) in tabsList"
      :key="index"
      @click="tabChange(item)"
      >{{item}}</li>
    </ul>
    <div ref="tabs"></div>
    <el-tabs v-model="activeName" type="border-card" class="tabs" stretch>
      <!-- 基本信息 -->
      <el-tab-pane name="基本信息">
        <el-dropdown slot="label" @command="anchorScroll($event,'基本信息')">
          <span class="el-dropdown-link">
            基本信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="RegisterInfo">工商信息</el-dropdown-item>
            <el-dropdown-item command="Shareholder">股东信息</el-dropdown-item>
            <el-dropdown-item command="KeyPersonnel">主要人员</el-dropdown-item>
            <el-dropdown-item command="OutInvest">对外投资</el-dropdown-item>
            <el-dropdown-item command="ChangeRecord">变更记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <RegisterInfo class="margin" ref="RegisterInfo"></RegisterInfo>
        <Shareholder class="margin" ref="Shareholder"></Shareholder>
        <EquityChart class="margin" ref="EquityChart"></EquityChart>
        <KeyPersonnel class="margin" ref="KeyPersonnel"></KeyPersonnel>
        <OutInvest class="margin" ref="OutInvest"></OutInvest>
        <ChangeRecord class="margin" ref="ChangeRecord"></ChangeRecord>
      </el-tab-pane>
      <!-- 司法风险 -->
      <el-tab-pane name="司法风险">
        <el-dropdown slot="label" @command="anchorScroll($event,'司法风险')">
          <span class="el-dropdown-link">
            司法风险
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Executee">被执行人</el-dropdown-item>
            <el-dropdown-item command="LimitConsume">限制高消费</el-dropdown-item>
            <el-dropdown-item command="RestrictedExit">限制出境</el-dropdown-item>
            <el-dropdown-item command="FinalCase">终本案件</el-dropdown-item>
            <el-dropdown-item command="Document">裁判文书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <Executee class="margin" ref="Executee"></Executee>
        <LimitConsume class="margin" ref="LimitConsume"></LimitConsume>
        <RestrictedExit class="margin" ref="RestrictedExit"></RestrictedExit>
        <FinalCase class="margin" ref="FinalCase"></FinalCase>
        <Document class="margin" ref="Document"></Document>
      </el-tab-pane>
      <!-- 经营风险 -->
      <el-tab-pane name="经营风险">
        <el-dropdown slot="label" @command="anchorScroll($event,'经营风险')">
          <span class="el-dropdown-link">
            经营风险
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="BusinessUnusual">经营异常</el-dropdown-item>
            <el-dropdown-item command="SeriousIllegal">严重违法</el-dropdown-item>
            <el-dropdown-item command="EquityPledge">股权质押</el-dropdown-item>
            <el-dropdown-item command="AdministrationPunish">行政处罚</el-dropdown-item>
            <el-dropdown-item command="TaxRecord">欠税公告</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <BusinessUnusual class="margin" ref="BusinessUnusual"></BusinessUnusual>
        <SeriousIllegal class="margin" ref="SeriousIllegal"></SeriousIllegal>
        <EquityPledge class="margin" ref="EquityPledge"></EquityPledge>
        <AdministrationPunish class="margin" ref="AdministrationPunish"></AdministrationPunish>
        <TaxRecord class="margin" ref="TaxRecord"></TaxRecord>
      </el-tab-pane>
      <!-- 经营信息 -->
      <el-tab-pane name="经营信息">
        <el-dropdown slot="label" @command="anchorScroll($event,'经营信息')">
          <span class="el-dropdown-link">
            经营信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Administration">行政许可</el-dropdown-item>
            <el-dropdown-item command="Credit">信用评价</el-dropdown-item>
            <el-dropdown-item command="Recruitment">招聘</el-dropdown-item>
            <el-dropdown-item command="SocialSecurity">社保信息</el-dropdown-item>
            <el-dropdown-item command="LandInfo">土地信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <Administration class="margin" ref="Administration"></Administration>
        <Credit class="margin" ref="Credit"></Credit>
        <Recruitment class="margin" ref="Recruitment"></Recruitment>
        <SocialSecurity class="margin" ref="SocialSecurity"></SocialSecurity>
        <LandInfo class="margin" ref="LandInfo"></LandInfo>
      </el-tab-pane>
      <!-- 企业发展 -->
      <el-tab-pane name="企业发展">
        <el-dropdown slot="label" @command="anchorScroll($event,'企业发展')">
          <span class="el-dropdown-link">
            企业发展
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Contributor">企业年报股东出资</el-dropdown-item>
            <el-dropdown-item command="PublicSentiment">新闻舆情</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <Contributor class="margin" ref="Contributor"></Contributor>
        <PublicSentiment class="margin" ref="PublicSentiment"></PublicSentiment>
      </el-tab-pane>
      <!-- 知识产权 -->
      <el-tab-pane name="知识产权">
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            知识产权
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>专利信息</el-dropdown-item>
            <el-dropdown-item>商标信息</el-dropdown-item>
            <el-dropdown-item>软件著作权</el-dropdown-item>
            <el-dropdown-item>作品著作权</el-dropdown-item>
            <el-dropdown-item>科技成果</el-dropdown-item>
            <el-dropdown-item>网站备案</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        知识产权
      </el-tab-pane>
      <!-- 其他信息 -->
      <el-tab-pane name="其他信息">
        <el-dropdown slot="label" @command="anchorScroll($event,'其他信息')">
          <span class="el-dropdown-link">
            其他信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="MandatoryProducts">强制性产品认证</el-dropdown-item>
            <el-dropdown-item command="FarmProduce">食品农产品认证</el-dropdown-item>
            <el-dropdown-item command="VoluntaryProducts">自愿性工业产品认证</el-dropdown-item>
            <el-dropdown-item command="BTwoBInfo">B2B信息</el-dropdown-item>
            <el-dropdown-item command="Encyclopedias">百科介绍</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <MandatoryProducts class="margin" ref="MandatoryProducts"></MandatoryProducts>
        <FarmProduce class="margin" ref="FarmProduce"></FarmProduce>
        <VoluntaryProducts class="margin" ref="VoluntaryProducts"></VoluntaryProducts>
        <BTwoBInfo class="margin" ref="BTwoBInfo"></BTwoBInfo>
        <Encyclopedias class="margin" ref="Encyclopedias"></Encyclopedias>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
// 基础信息
import RegisterInfo from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/registerInfo.vue";
import Shareholder from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/shareholder.vue";
import EquityChart from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/equityChart.vue";
import KeyPersonnel from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/keyPersonnel.vue";
import OutInvest from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/outInvest.vue";
import ChangeRecord from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/changeRecord.vue";
// 司法风险
import Executee from "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/executee.vue";
import LimitConsume from "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/limitConsume.vue";
import RestrictedExit from "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/restrictedExit.vue";
import FinalCase from "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/finalCase.vue";
import Document from "@/views/enterprise-monitor/enterprise-portrait/modules/judicial-risk/document.vue";
// 经营风险
import BusinessUnusual from "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/businessUnusual.vue";
import SeriousIllegal from "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/seriousIllegal.vue";
import EquityPledge from "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/equityPledge.vue";
import AdministrationPunish from "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/administrationPunish.vue";
import TaxRecord from "@/views/enterprise-monitor/enterprise-portrait/modules/business-risk/taxRecord.vue";
// 其他信息
import MandatoryProducts from "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/mandatoryProducts.vue";
import FarmProduce from "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/farmProduce.vue";
import VoluntaryProducts from "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/voluntaryProducts.vue";
import BTwoBInfo from "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/BTwoBInfo.vue";
import Encyclopedias from "@/views/enterprise-monitor/enterprise-portrait/modules/other-info/encyclopedias.vue";
// 企业发展
import Contributor from "@/views/enterprise-monitor/enterprise-portrait/modules/enterprise-development/contributor.vue";
import PublicSentiment from "@/views/enterprise-monitor/enterprise-portrait/modules/enterprise-development/publicSentiment.vue";
// 经营信息
import Administration from "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/administration.vue";
import Credit from "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/credit.vue";
import Recruitment from "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/recruitment.vue";
import SocialSecurity from "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/socialSecurity.vue";
import LandInfo from "@/views/enterprise-monitor/enterprise-portrait/modules/business-info/landInfo.vue";


export default {
  data() {
    return {
      activeName:"基本信息",
      tabsList:["基本信息","司法风险","经营风险","经营信息","企业发展","知识产权","其他信息",],
      isTabShow:false,
    };
  },
components:{
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
  RestrictedExit,
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
},
mounted(){
  this.watchScroll();
  console.log(1);
},
methods:{
  // 锚点链接功能
  anchorScroll(item,tabName){
    // 首先做个tab的切换
    if(this.activeName !== tabName){
      this.activeName = tabName;
    }
    // 滚动,需等待切换完
    this.$nextTick(()=>{
        this.$refs.portrait.parentNode.scrollTo({
        top: this.$refs[item].$el.getBoundingClientRect().top - 80,
        behavior: "smooth", // 让滚动丝滑
      });
    });
  },
  tabChange(item){
    this.activeName = item;
    this.$refs.portrait.parentNode.scrollTop = 0;
  },
  // tab固定
  isAttachTop(){
    if(this.$refs.tabs?.getBoundingClientRect()?.top < 47){
      this.isTabShow = true;
    }else{
      this.isTabShow = false;
    }
  },
  // 监听滚动
  watchScroll(){
    this.$refs.portrait.parentNode.addEventListener("scroll",this.isAttachTop);
  },
},
};
</script>

<style lang="less" scoped>
.portrait{
  .card{
    display: flex;
    .img{
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin-right: 20px;
  }
    .companyInfo{
      width: 73%;
      .info{
        width: 520px;
      }
      .title{
        margin-bottom: 10px;
      }
      .tag{
        margin-bottom: 8px;
        .tagItem{
          border-radius: 2px;
          font-size: 12px;
          padding: 0 4px;
          margin-right: 8px;
          color: #0084FF;
          background: #EBF5FF;
        }
      }
    }
    .card-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 220px;
      text-align: right;
      .num{
        font-family: 'Altinn-DIN';
        font-weight: 700;
        font-size: 48px;
      }
      .indexName{
        font-family: 'Microsoft YaHei';
        color: #94A1B6;
        font-size: 20px;
      }
      .endUpdateTime{
        font-family: 'Microsoft YaHei';
        font-size: 15px;
      }
    }
  }
  .replaceTabs{
    position: sticky;
    top: -20px;
    left: 0;
    z-index: 999;
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #F5F7FA;
    border: 1px solid #E4E7ED;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    .tabItem{
      flex: 1;
      text-align: center;
      line-height: 40px;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      &.active{
        border-left: 1px solid #DCDFE6;
        border-right: 1px solid #DCDFE6;
        background-color: #fff;
      }
    }
  }
  .tabs{
    margin-top: 10px;
    .margin{
      margin-bottom: 30px;
    }
  }
}
</style>