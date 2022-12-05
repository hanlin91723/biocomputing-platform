<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">舆情动态 {{ publicSentimentTotal }}</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">舆论类型</h3>
          <v-chart class="chartContent" :option="investPie"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">舆情发生变化趋势</h3>
          <v-chart class="chartContent" :option="trendChange"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="publicSentimentData"
         style="width: 100%"
         border
         :default-expand-all="true"
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <span class="titleText">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
         prop="time"
         label="舆情日期"
         width="169"
         :filters="filterDateData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
         prop="classify"
         label="舆情分类"
         width="169"
         :filters="filterTypeData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="keyword" label="关键词"></el-table-column>
        <el-table-column prop="source" label="信息来源" width="169"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="publicSentimentTotal > 10"
       layout="total, prev, pager, next"
       :page-size="publicSentimentPageSize"
       :total="publicSentimentTotal" 
       :current-page="publicSentimentCurrentPage"
       class="pagination"
       @current-change="publicSentimentCurrentChangee">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { investPie,trendChange } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        publicSentimentData:[],
        personInvestData:[],
        mapAndBarData:[],
        // 企业投资分页
        publicSentimentCurrentPage:1,
        publicSentimentPageSize:10,
        publicSentimentTotal:0,
        filterDateData:[
          {
            text: "2022",
            value: "2022",
          },
          {
            text: "2021",
            value: "2021",
          },
        ],
        filterTypeData:[
          {
            text: "积极",
            value: "积极",
          },
          {
            text: "中立",
            value: "中立",
          },
          {
            text: "消极",
            value: "消极",
          },
        ],
      };
    },
    computed:{
      investPie(){
        return investPie();
      },
      trendChange(){
        return trendChange();
      },
    },
    created(){
      this.getmapData();
      this.getPublicSentimentData();
    },
    methods:{
      getmapData(){
        // this.$aixos.get('/aa').then(({data})=>{
        //   console.log(data);
        // });
        this.mapAndBarData = [
          {
            name: "北京市",
            value: 13,
          },
          {
            name: "广东省",
            value: 8,
          },
          {
            name: "浙江省",
            value: 6,
          },
          {
            name: "重庆市",
            value: 5,
          },
          {
            name: "天津市",
            value: 2,
          },
        ];
      },
      // 企业投资表格数据
      getPublicSentimentData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.publicSentimentTotal = 5;
          this.publicSentimentData = [
          {
            title: "金融“活水”涌流 激发市场主体活力",
            time: "2022-10-09",
            classify: "积极",
            keyword: "长光卫星技术有限公司，华润",
            source: "新华网",
          },
          {
            title: "前瞻全球产业头条：诺贝尔奖明起揭晓，国庆档新片总票房突破5亿，尼日利亚考虑购买中国C919大型客机",
            time: "2022-10-03",
            classify: "中立",
            keyword: "苹果研发（北京）有限公司，红土创新基金管理有限公司，中国进出口银行，浙江见识创业投资管理有限公司，特变电工股份有限公司，瑞达基金管理有限公司，宝盈基金管理有限公司，富荣基金管理有限公司，北信瑞丰基金管理有限公司，上海携程商务有限公司",
            source: "搜狐财经",
          },
          {
            title: "【中国财富报道】市值300亿的公司，近2个月宣布将砸1000多亿，全部'锁定'这一材料",
            time: "2022-10-02",
            classify: "积极",
            keyword: "特变电工股份有限公司，新特能源股份有限公司，双良节能系统股份有限公司",
            source: "新浪",
          },
          {
            title: "金融“活水”涌流 激发市场主体活力",
            time: "2022-10-09",
            classify: "积极",
            keyword: "长光卫星技术有限公司，华润",
            source: "新华网",
          },
          {
            title: "前瞻全球产业头条：诺贝尔奖明起揭晓，国庆档新片总票房突破5亿，尼日利亚考虑购买中国C919大型客机",
            time: "2022-10-03",
            classify: "中立",
            keyword: "苹果研发（北京）有限公司，红土创新基金管理有限公司，中国进出口银行，浙江见识创业投资管理有限公司，特变电工股份有限公司，瑞达基金管理有限公司，宝盈基金管理有限公司，富荣基金管理有限公司，北信瑞丰基金管理有限公司，上海携程商务有限公司",
            source: "搜狐财经",
          },
        ];
      },
      // 企业投资分页
      publicSentimentCurrentChangee(val){
      this.publicSentimentCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
    },
  };
</script>

<style lang="less" scoped>
.outInvest{
  .title{
      font-size: 16px;
      margin-bottom: 12px;
    }
  .titleText{
    color:rgba(55, 87, 255, 1);
  }
  .enterpriseInvest{
    margin-bottom: 30px;
  .chart{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .mapChart,.pieChart{
      width: 49%;
      text-align: center;
      .chartContent{
      width: 569px;
      height: 263px;
      // border: 1px solid #cfcfcf;
    }
    }
    .chartTitle{
      font-size: 16px;
      margin-bottom: 8px;
    }

  }
.pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  }
}
</style>