<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">招聘情况 {{recruitmentTotal}}</h3>
      <div class="subtitle">招聘合计 391人次，平均薪资为 7.2k</div>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">招聘时间</h3>
          <v-chart class="chartContent" :option="recruit"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">职位</h3>
          <v-chart class="chartContent" :option="basicPie"></v-chart>
        </el-card>
      </div>
      <div class="chart">
        <el-card class="itemChart" shadow="never">
          <h3 class="chartTitle">学历要求</h3>
          <v-chart class="chartContent" :option="ringPie"></v-chart>
        </el-card>
        <el-card class="itemChart" shadow="never">
          <h3 class="chartTitle">薪酬范围</h3>
          <v-chart class="chartContent" :option="ringPie"></v-chart>
        </el-card>
        <el-card class="itemChart" shadow="never">
          <h3 class="chartTitle">区域分布</h3>
          <v-chart class="chartContent" :option="ringPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="recruitmentData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
        <el-table-column
         prop="recruitTime"
         label="招聘时间"
         width="199"
         :filters="filterDateData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="educationRequire" label="学历要求" width="199"></el-table-column>
        <el-table-column
         prop="workExperience"
         label="工作经验"
         width="199"
         :filters="filterExperienceData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="wages" label="工资" width="199"></el-table-column>
        <el-table-column
         prop="area"
         label="地区"
         :filters="filterAreaData"
         :filter-method="filterHandler">
        </el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="recruitmentTotal > 10"
       layout="total, prev, pager, next"
       :page-size="recruitmentPageSize"
       :total="recruitmentTotal" 
       :current-page="recruitmentCurrentPage"
       class="pagination"
       @current-change="recruitmentCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { recruit,basicPie,ringPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
  export default {
    data() {
      return {
        recruitmentData:[],
        // 企业投资分页
        recruitmentCurrentPage:1,
        recruitmentPageSize:10,
        recruitmentTotal:0,
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
        filterExperienceData:[
          {
            text: "1年经验",
            value: "1年经验",
          },
          {
            text: "2~3年经验",
            value: "2~3年经验",
          },
        ],
        filterAreaData:[
          {
            text: "乌鲁木齐市",
            value: "乌鲁木齐市",
          },
          {
            text: "西安市",
            value: "西安市",
          },
          {
            text: "天津市",
            value: "天津市",
          },
        ],
      };
    },
    computed:{
      recruit(){
        return recruit();
      },
      basicPie(){
        return basicPie();
      },
      ringPie(){
        return ringPie();
      },
    },
    created(){
      this.getRecruitmentData();
    },
    methods:{
      // 裁判文书表格数据
      getRecruitmentData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.recruitmentTotal = 10;
          this.recruitmentData = [
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "天津市",
          },
          {
            position: "科技管理岗",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "西安市",
          },
          {
            position: "经营计划专员",
            recruitTime: "2022-02-05",
            educationRequire: "本科",
            workExperience: "",
            wages: "面议",
            area: "西安市",
          },
          {
            position: "数据分析岗J14495",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "乌鲁木齐市",
          },
          {
            position: "科技管理岗",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "天津市",
          },
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "西安市",
          },
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "天津市",
          },
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "天津市",
          },
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "乌鲁木齐市",
          },
          {
            position: "科研类特聘专家岗位",
            recruitTime: "2022-02-05",
            educationRequire: "博士",
            workExperience: "",
            wages: "面议",
            area: "乌鲁木齐市",
          },
        ];
      },
      // 裁判文书分页
      recruitmentCurrentChange(val){
      this.recruitmentCurrentPage = val;
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
    .subtitle{
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
  .itemChart{
    width: 32%;
    text-align: center;
    .chartContent{
    width: 357px;
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