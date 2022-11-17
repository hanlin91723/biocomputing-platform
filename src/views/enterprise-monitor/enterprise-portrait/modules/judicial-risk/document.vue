<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">裁判文书 {{documentTotal}}</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">案由</h3>
          <v-chart class="chartContent" :option="investPie"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">类型</h3>
          <v-chart class="chartContent" :option="investPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="documentData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="referenceNum" label="案号" width="133"></el-table-column>
        <el-table-column prop="documentTitle" label="文书标题" width="132"></el-table-column>
        <el-table-column prop="causeAction" label="案由" width="132"></el-table-column>
        <el-table-column prop="type" label="类型" width="132"></el-table-column>
        <el-table-column prop="party" label="当事人" width="139"></el-table-column>
        <el-table-column prop="caseAmount" label="案件金额" width="132"></el-table-column>
        <el-table-column prop="judgmentResult" label="裁判结果" width="132"></el-table-column>
        <el-table-column prop="releaseTime" label="发布日期" width="132"></el-table-column>
        <el-table-column prop="judgmentTime" label="裁判日期" width="132"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="documentTotal > 10"
       layout="total, prev, pager, next"
       :page-size="documentPageSize"
       :total="documentTotal" 
       :current-page="documentCurrentPage"
       class="pagination"
       @current-change="documentCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { investPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        documentData:[],
        // 企业投资分页
        documentCurrentPage:1,
        documentPageSize:10,
        documentTotal:0,
      };
    },
    computed:{
      investPie(){
        return investPie();
      },
    },
    created(){
      this.getDocumentData();
    },
    methods:{
      // 裁判文书表格数据
      getDocumentData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.documentTotal = 2;
          this.documentData = [
          {
            referenceNum: "（2021）粤0307民初30807号",
            documentTitle: "劳动争议民事一审调解书",
            causeAction: "劳动争议",
            type: "民事",
            party: `原告-比亚迪股份有限公司
                    被告-张*
                    原告-诉*`,
            caseAmount: "",
            judgmentResult: "",
            releaseTime:"2021-12-21",
            judgmentTime:"2021-11-25",
          },
          {
            referenceNum: "（2018）京73行初7940号",
            documentTitle: "专利行政管理（专利）行政一审裁定书",
            causeAction: "专利行政管理（专利）",
            type: "民事",
            party: `原告-刘**
                    被告-国家知识产权局
                    第三人-比亚迪股份有限公司`,
            caseAmount: "",
            judgmentResult: "准许原告刘**撤回起诉",
            releaseTime:"2020-12-29",
            judgmentTime:"2020-04-24",
          },
        ];
      },
      // 裁判文书分页
      documentCurrentChange(val){
      this.documentCurrentPage = val;
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