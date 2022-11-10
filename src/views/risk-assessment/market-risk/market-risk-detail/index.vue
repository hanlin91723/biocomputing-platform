<template>
  <div class="wrap">
    <div class="header">
      <el-card class="header-left" shadow="hover">
        <el-descriptions :column="1">
          <el-descriptions-item label="风险指标">
            <span class="red">财务预警</span>
          </el-descriptions-item>
          <el-descriptions-item label="风险分类">市场活力</el-descriptions-item>
          <el-descriptions-item label="风险描述"
            >财务预警风险企业占比超过32%且数量同比上升17%</el-descriptions-item
          >
          <el-descriptions-item label="风险等级">
            <risk-level :level="30"></risk-level>
          </el-descriptions-item>
        </el-descriptions>
        <div class="enterprise-count">
          <div class="left">
            <h3 class="title">风险企业总数</h3>
            <div>
              <span class="value">{{ formatter(24961) }}</span>
              <span class="unit">家</span>
            </div>
          </div>
          <div class="right">
            <div>
              同比
              <span class="value">+17</span>
              <span class="unit">%</span>
            </div>
            <div>
              占比
              <span class="value blue">32</span>
              <span class="unit blue">%</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="header-right" shadow="hover">
        <div class="content">
          <div class="content-left">
            <h3>风险企业十大行业排名</h3>
            <v-chart
              class="chart1"
              ref="rankingBarOption"
              :option="rankingBarOption"
            ></v-chart>
          </div>
          <div class="content-right">
            <h3>风险企业注册规模分布</h3>
            <v-chart
             class="chart2"
             :option="registeredScaleOption"
             ></v-chart>
          </div>
        </div>
      </el-card>
    </div>
    <el-divider></el-divider>
    <risk-table></risk-table>
  </div>
</template>

<script>
import RiskLevel from "@/views/risk-assessment/market-risk/components/riskLevel.vue";
import riskTable from "@/views/risk-assessment/market-risk/components/riskTable.vue";
import { rankingBar,registeredScale } from "@/views/risk-assessment/market-risk/market-risk-detail/options/echarts-options.js";
import { formatter } from "@/util/util";
export default {
  data() {
    return {
      rankingName:[],
      rankingValue:[],
      registeredScaleData:[],
    };
  },
  components: {
    RiskLevel,
    riskTable,
  },
  created(){
    this.getRankingData();
    this.getRegisteredScaleData();
  },
  computed: {
    rankingBarOption() {
      return rankingBar(this.rankingName,this.rankingValue);
    },
    registeredScaleOption() {
      return registeredScale(this.registeredScaleData);
    },
  },
  methods: {
    // 获取排行数据
    getRankingData(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      let rankingData = [
        {
          name:"批发和零售业",
          value:12532,
        },
        {
          name:"交通运输、仓储和邮政业",
          value:8535,
        },
        {
          name:"住宿和餐饮业",
          value:7452,
        },
        {
          name:"信息传输、软件和信息技术服务业",
          value:6263,
        },
        {
          name:"金融业",
          value:3162,
        },
        {
          name:"房地产业",
          value:1523,
        },
        {
          name:"租赁和商务服务业",
          value:743,
        },
        {
          name:"科学研究和技术服务业",
          value:422,
        },
        {
          name:"水利、环境和公共设施管理业",
          value:245,
        },
        {
          name:"居民服务、修理和其他服务业",
          value:132,
        },
      ];
      this.rankingName = rankingData.map(item=>{
        return item.name;
      });
      this.rankingValue = rankingData.map(item=>{
        return item.value;
      });

    },
    // 获取饼图数据
    getRegisteredScaleData(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      this.registeredScaleData = [
                    {value:35, name:"100万以下",},
                    {value:20, name:"100~200万",},
                    {value:25, name:"200~500万",},
                    {value:25, name:"500~1000万",},
                    {value:20, name:"1000万以上",},
                   ];
    },
    // 千分位分隔
    formatter(val) {
      return formatter(val);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  // width: 1900px;
  // height: 1000px;
  .header {
    display: flex;
    justify-content: space-between;
    width: 1280px;
    height: 400px;
    .header-left {
      width: 500px;
      padding: 10px;
      .red {
        color: red;
        font-weight: 700;
      }
      .enterprise-count {
        display: flex;
        width: 420px;
        height: 160px;
        padding: 32px;
        background: #fafbfd;
        border: 1px solid #eaecef;
        border-radius: 4px;
        margin-top: 20px;
        .left {
          width: 202px;
          border-right: 2px solid #eaecef;
          .title {
            font-size: 20px;
            color: #1e293b;
            margin-bottom: 10px;
          }
          .value {
            font-family: "Altinn-DIN";
            font-weight: 700;
            font-size: 48px;
            color: #5d77ff;
          }
          .unit {
            font-size: 20px;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 154px;
          padding-left: 32px;
          padding-top: 8px;
          padding-bottom: 8px;
          font-size: 20px;
          .value,
          .unit {
            font-family: "Altinn-DIN";
            font-weight: 700;
            color: #f57272;
          }
          .value {
            font-size: 24px;
          }
          .unit {
            font-size: 16px;
          }
          .blue {
            color: #5d77ff;
          }
        }
      }
    }
    .header-right {
      width: 750px;
      .content {
        display: flex;
        text-align: center;
        .content-left {
          width: 450px;
          font-size: 20px;
          .chart1 {
            width: 500px;
            height: 300px;
            margin-left: -15px;
          }
        }
        .content-right {
          width: 300px;
          height: 200px;
          font-size: 20px;
          .chart2 {
            width: 270px;
            height: 300px;
          }
        }
      }
    }
  }
}
</style>
