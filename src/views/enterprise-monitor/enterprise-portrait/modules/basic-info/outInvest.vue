<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">企业对外投资</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">对外投资区域分布图</h3>
          <v-chart class="chartContent" :option="mapAndBar"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">企业对外投资行业分布</h3>
          <v-chart class="chartContent" :option="investPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="enterpriseInvestData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="enterpriseName" label="被投企业名称" width="110"></el-table-column>
        <el-table-column prop="registerState" label="企业登记状态" width="100"></el-table-column>
        <el-table-column prop="legalPerson" label="被投资企业法定代表人" width="96"></el-table-column>
        <el-table-column prop="dutyType" label="责任类型" width="100"></el-table-column>
        <el-table-column prop="mainType" label="主体类型" width="100"></el-table-column>
        <el-table-column prop="contribution" label="出资额" width="100"></el-table-column>
        <el-table-column prop="contributionTime" label="出资日期" width="100"></el-table-column>
        <el-table-column prop="contributionMode" label="出资方式" width="100"></el-table-column>
        <el-table-column prop="contributionScale" label="出资比例" width="90"></el-table-column>
        <el-table-column prop="shouldQuota" label="认缴出资额" width="100"></el-table-column>
        <el-table-column prop="actualQuota" label="实缴出资额" width="100"></el-table-column>
        <el-table-column prop="area" label="地区" width="100"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="enterpriseInvestTotal > 10"
       layout="total, prev, pager, next"
       :page-size="enterpriseInvestPageSize"
       :total="enterpriseInvestTotal" 
       :current-page="enterpriseInvestCurrentPage"
       class="pagination"
       @current-change="enterpriseInvestCurrentChange">
      </el-pagination>
    </div>
    <div>
      <h3 class="title">法定代表人对外投资信息 {{personInvestTotal}}</h3>
      <el-table
       :data="personInvestData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="enterpriseName" label="被投企业名称" width="260"></el-table-column>
        <el-table-column prop="registerState" label="企业登记状态" width="150"></el-table-column>
        <el-table-column prop="legalPerson" label="被投资企业法定代表人" width="96"></el-table-column>
        <el-table-column prop="contribution" label="出资额" width="100"></el-table-column>
        <el-table-column prop="contributionTime" label="出资日期" width="100"></el-table-column>
        <el-table-column prop="contributionMode" label="出资方式" width="100"></el-table-column>
        <el-table-column prop="contributionScale" label="出资比例" width="90"></el-table-column>
        <el-table-column prop="shouldQuota" label="认缴出资额" width="100"></el-table-column>
        <el-table-column prop="actualQuota" label="实缴出资额" width="100"></el-table-column>
        <el-table-column prop="area" label="地区" width="100"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="personInvestTotal > 10"
       layout="total, prev, pager, next"
       :page-size="personInvestPageSize"
       :total="personInvestTotal" 
       :current-page="personInvestCurrentPage"
       class="pagination"
       @current-change="personInvestCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapAndBar, investPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        enterpriseInvestData:[],
        personInvestData:[],
        mapAndBarData:[],
        // 企业投资分页
        enterpriseInvestCurrentPage:1,
        enterpriseInvestPageSize:10,
        enterpriseInvestTotal:0,
        // 企业投资分页
        personInvestCurrentPage:1,
        personInvestPageSize:10,
        personInvestTotal:0,
      };
    },
    computed:{
      mapAndBar(){
        return mapAndBar(this.mapAndBarData);
      },
      investPie(){
        return investPie();
      },
    },
    created(){
      this.getmapData();
      this.getEnterpriseInvestData();
      this.getPersonInvestData();
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
      getEnterpriseInvestData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.enterpriseInvestTotal = 100;
          this.enterpriseInvestData = [
          {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
          {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
          {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
          {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
          {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            dutyType: "",
            mainType: "",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
        ];
      },
      // 企业投资分页
      enterpriseInvestCurrentChange(val){
      this.enterpriseInvestCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 法人投资表格数据
      getPersonInvestData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.personInvestTotal = 2;
          this.personInvestData = [
        {
            enterpriseName: "石河子市欧拓通信软件有限公司",
            registerState: "在营（开业）企业",
            legalPerson: "朱高领",
            contribution: "10000万元人民币",
            contributionTime: "2016-07-28",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "新疆维吾尔自治区",
          },
          {
            enterpriseName: "哲库科技（广东）有限公司",
            registerState: "注销",
            legalPerson: "刘君",
            contribution: "10000万元人民币",
            contributionTime: "2013-10-21",
            contributionMode:"",
            contributionScale:"100%",
            shouldQuota: "",
            actualQuota: "",
            area: "广东",
          },
        ];
      },
      // 法人投资分页
      personInvestCurrentChange(val){
      this.personInvestCurrentPage = val;
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