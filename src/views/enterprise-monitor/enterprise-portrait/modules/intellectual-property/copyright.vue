<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">作品著作权 {{copyrightTotal}}</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">作品著作权申请趋势</h3>
          <v-chart class="chartContent" :option="recruit"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">作品类型</h3>
          <v-chart class="chartContent" :option="basicPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="copyrightData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="workName" label="作品名称" width="199"></el-table-column>
        <el-table-column prop="registerNum" label="登记号" width="201"></el-table-column>
        <el-table-column prop="workCategory" label="作品类别" width="199"></el-table-column>
        <el-table-column prop="finishDate" label="创作完成日期" width="199"></el-table-column>
        <el-table-column prop="registerDate" label="登记日期" width="199"></el-table-column>
        <el-table-column prop="firstPublishDate" label="首次发表日期" width="199"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="copyrightTotal > 10"
       layout="total, prev, pager, next"
       :page-size="copyrightPageSize"
       :total="copyrightTotal" 
       :current-page="copyrightCurrentPage"
       class="pagination"
       @current-change="copyrightCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { recruit,basicPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        copyrightData:[],
        // 企业投资分页
        copyrightCurrentPage:1,
        copyrightPageSize:10,
        copyrightTotal:0,
      };
    },
    computed:{
      recruit(){
        return recruit();
      },
      basicPie(){
        return basicPie();
      },
    },
    created(){
      this.getCopyrightData();
    },
    methods:{
      // 裁判文书表格数据
      getCopyrightData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.copyrightTotal = 2;
          this.copyrightData = [
          {
            workName: "长光LOGO",
            registerNum: "国作登字-2019-F-00813310",
            workCategory: "美术作品",
            finishDate: "2018-09-01",
            registerDate: "2019-06-21",
            firstPublishDate: "2018-09-01",
          },
          {
            workName: "风车电缆组合",
            registerNum: "新作登字-2014-G-00000404",
            workCategory: "摄影",
            finishDate: "2013-03-15",
            registerDate: "2014-03-14",
            firstPublishDate: "2018-09-01",
          },
        ];
      },
      // 裁判文书分页
      copyrightCurrentChange(val){
      this.copyrightCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
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
  .enterpriseInvest{
    margin-bottom: 30px;
    .brandName{
    color:rgba(55, 87, 255, 1);
  }
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