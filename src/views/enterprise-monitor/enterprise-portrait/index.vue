<template>
  <div class="portrait">
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
    <el-tabs type="border-card" class="tabs" stretch>
      <!-- 基本信息 -->
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            基本信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>工商信息</el-dropdown-item>
            <el-dropdown-item>股东信息</el-dropdown-item>
            <el-dropdown-item>主要人员</el-dropdown-item>
            <el-dropdown-item>对外投资</el-dropdown-item>
            <el-dropdown-item>变更记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <registerInfo class="margin"></registerInfo>
        <shareholder class="margin"></shareholder>
        <equityChart class="margin"></equityChart>
        <keyPersonnel class="margin"></keyPersonnel>
      </el-tab-pane>
      <!-- 司法风险 -->
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            司法风险
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>被执行人</el-dropdown-item>
            <el-dropdown-item>限制高消费</el-dropdown-item>
            <el-dropdown-item>限制出境</el-dropdown-item>
            <el-dropdown-item>终本案件</el-dropdown-item>
            <el-dropdown-item>裁判文书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        司法风险
      </el-tab-pane>
      <!-- 经营风险 -->
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            经营风险
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>经营异常</el-dropdown-item>
            <el-dropdown-item>严重违法</el-dropdown-item>
            <el-dropdown-item>股权质押</el-dropdown-item>
            <el-dropdown-item>行政处罚</el-dropdown-item>
            <el-dropdown-item>欠税公告</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        经营风险
      </el-tab-pane>
      <!-- 经营信息 -->
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            经营信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>行政许可</el-dropdown-item>
            <el-dropdown-item>信用评价</el-dropdown-item>
            <el-dropdown-item>招聘</el-dropdown-item>
            <el-dropdown-item>社保信息</el-dropdown-item>
            <el-dropdown-item>土地信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        经营信息
      </el-tab-pane>
      <!-- 企业发展 -->
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            企业发展
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>企业年报股东出资</el-dropdown-item>
            <el-dropdown-item>新闻舆情</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        企业发展
      </el-tab-pane>
      <!-- 知识产权 -->
      <el-tab-pane>
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
      <el-tab-pane>
        <el-dropdown slot="label">
          <span class="el-dropdown-link">
            其他信息
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>强制性产品认证</el-dropdown-item>
            <el-dropdown-item>食品农产品认证</el-dropdown-item>
            <el-dropdown-item>自愿性工业产品认证</el-dropdown-item>
            <el-dropdown-item>B2B信息</el-dropdown-item>
            <el-dropdown-item>百科介绍</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        其他信息
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import registerInfo from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/registerInfo.vue";
import shareholder from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/shareholder.vue";
import equityChart from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/equityChart.vue";
import keyPersonnel from "@/views/enterprise-monitor/enterprise-portrait/modules/basic-info/keyPersonnel.vue";
export default {
components:{
  registerInfo,
  shareholder,
  equityChart,
  keyPersonnel,
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
  .tabs{
    margin-top: 10px;
    .margin{
      margin-bottom: 30px;
    }
  }
}
</style>