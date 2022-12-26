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
          <v-chart class="chartContent" :option="diplomaPie"></v-chart>
        </el-card>
        <el-card class="itemChart" shadow="never">
          <h3 class="chartTitle">薪酬范围</h3>
          <v-chart class="chartContent" :option="payPie"></v-chart>
        </el-card>
        <el-card class="itemChart" shadow="never">
          <h3 class="chartTitle">区域分布</h3>
          <v-chart class="chartContent" :option="areaPie"></v-chart>
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
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        recruitmentData:[],
        recruitName:[],
        recruitValue:[],
        basicPieData:[],
        diplomaPieData:[],
        payPieData:[],
        areaPieData:[],
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
        return recruit(this.recruitName,this.recruitValue);
      },
      basicPie(){
        return basicPie(this.basicPieData);
      },
      diplomaPie(){
        return ringPie(this.diplomaData);
      },
      payPie(){
        return ringPie(this.payPieData);
      },
      areaPie(){
        return ringPie(this.areaPieData);
      },
    },
    created(){
      this.getRecruitData();
      this.getbasicPieData();
      this.getDiplomaData();
      this.getPayData();
      this.getAreaData();
      this.getRecruitmentData();
    },
    methods:{
      // 获取招聘时间数据
      getRecruitData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:1,
        };
        this.$axios.get("/businessInfo/recruitmentByType",params).then(({data,})=>{
          data.forEach(item=>{
            this.recruitName.push(item.name);
            this.recruitValue.push(item.value);
          });
        });
      },
      // 获取职位数据
      getbasicPieData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:2,
        };
        this.$axios.get("/businessInfo/recruitmentByType",params).then(({data,})=>{
          this.basicPieData = data;
        });
      },
      // 获取学历要求数据
      getDiplomaData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:3,
        };
        this.$axios.get("/businessInfo/recruitmentByType",params).then(({data,})=>{
          this.diplomaPieData = data;
        });
      },
      // 获取薪酬范围数据
      getPayData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:4,
        };
        this.$axios.get("/businessInfo/recruitmentByType",params).then(({data,})=>{
          this.payPieData = data;
        });
      },
      // 获取区域分布数据
      getAreaData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:5,
        };
        this.$axios.get("/businessInfo/recruitmentByType",params).then(({data,})=>{
          this.areaPieData = data;
        });
      },
      // 裁判文书表格数据
      getRecruitmentData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.recruitmentCurrentPage,
          pageSize:this.recruitmentPageSize,
        };
        this.$axios.post("/businessInfo/recruitment",params).then(({data,})=>{
          this.recruitmentTotal = data.total;
          this.recruitmentData = data.list.map(item=>{
            return {
              position: item.title,
              recruitTime: item.startDate,
              educationRequire: item.education,
              workExperience: item.experience,
              wages: item.salary,
              area: item.city,
            };
          });
        });
      },
      // 裁判文书分页
      recruitmentCurrentChange(val){
        this.recruitmentCurrentPage = val;
        this.getRecruitmentData();
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