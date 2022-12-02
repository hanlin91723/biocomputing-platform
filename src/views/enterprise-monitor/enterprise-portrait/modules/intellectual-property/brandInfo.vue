<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">商标信息 {{brandInfoTotal}}</h3>
      <div class="subtitle">已注册商标 23 个</div>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">商标申请趋势</h3>
          <v-chart class="chartContent" :option="recruit"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">商标类型</h3>
          <v-chart class="chartContent" :option="basicPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="brandInfoData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="applyDate" label="申请日" width="170"></el-table-column>
        <el-table-column prop="brand" label="商标" width="170">
          <template slot-scope="scope">
            <el-image 
            style="width: 50px; height: 50px" 
            :src="scope.row.brand" 
            fit="fill">
          </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="商标名称" width="176">
          <template slot-scope="scope">
            <span class="brandName">{{scope.row.brandName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerNum" label="注册号" width="170"></el-table-column>
        <el-table-column prop="classify" label="国际分类" width="170"></el-table-column>
        <el-table-column prop="brandStatus" label="商标状态" width="170"></el-table-column>
        <el-table-column prop="registerDate" label="注册公告日期" width="170"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="brandInfoTotal > 10"
       layout="total, prev, pager, next"
       :page-size="brandInfoPageSize"
       :total="brandInfoTotal" 
       :current-page="brandInfoCurrentPage"
       class="pagination"
       @current-change="brandInfoCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { recruit,basicPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        brandInfoData:[],
        // 企业投资分页
        brandInfoCurrentPage:1,
        brandInfoPageSize:10,
        brandInfoTotal:0,
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
      this.getBrandInfoData();
    },
    methods:{
      // 裁判文书表格数据
      getBrandInfoData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.brandInfoTotal = 2;
          this.brandInfoData = [
          {
            applyDate: "2021-07-01",
            brand: "https://img5.tianyancha.com/logo/lll/ef99052a87d2249f6559cd98b34f2606.png@!f_200x200",
            brandName: "TB·ECLOUD",
            registerNum: "57349917",
            classify: "09类-科学仪器",
            brandStatus: "初审公告",
            registerDate: "2021-12-10",
          },
          {
            applyDate: "2021-03-02",
            brand: "https://img5.tianyancha.com/logo/lll/ef99052a87d2249f6559cd98b34f2606.png@!f_200x200",
            brandName: "TB·ECLOUD",
            registerNum: "53956830",
            classify: "37类-建筑修理",
            brandStatus: "商标已注册",
            registerDate: "2021-12-28",
          },
        ];
      },
      // 裁判文书分页
      brandInfoCurrentChange(val){
      this.brandInfoCurrentPage = val;
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
    .subtitle{
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