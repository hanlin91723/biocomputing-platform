<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">专利信息 {{patentInfoTotal}}</h3>
      <div class="subtitle">专利申请合计 847 条，当前共有保护期内专利 746 条</div>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">专利申请趋势</h3>
          <v-chart class="chartContent" :option="patentBar"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">专利类型</h3>
          <v-chart class="chartContent" :option="basicPie"></v-chart>
        </el-card>
      </div>
      <el-table
         :data="patentInfoData"
         style="width: 100%"
         border
         :cell-style="{'text-align':'center'}"
         :header-cell-style="{
          backgroundColor:'#f0f7fc',
          'text-align':'center'
          }">
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column
         prop="applyDate"
         label="申请日"
         width="149"
         :filters="filterApplyData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="patentName" label="专利名称"></el-table-column>
        <el-table-column
         prop="patentType"
         label="专利类型"
         width="149"
         :filters="filterTypeData"
         :filter-method="filterHandler">
        </el-table-column>
        <!-- <el-table-column
         prop="patentStatus"
         label="专利状态"
         width="149"
         :filters="filterStatusData"
         :filter-method="filterHandler">
        </el-table-column> -->
        <el-table-column prop="applyNum" label="申请号" width="149"></el-table-column>
        <el-table-column prop="openNum" label="公开号" width="149"></el-table-column>
        <el-table-column
         prop="openDate"
         label="公开日"
         width="149"
         :filters="filterOpenData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="inventor" label="发明人"></el-table-column>
      </el-table>
       <!-- 分页器 -->
       <el-pagination background
       v-show="patentInfoTotal > 10"
       layout="total, prev, pager, next"
       :page-size="patentInfoPageSize"
       :total="patentInfoTotal" 
       :current-page="patentInfoCurrentPage"
       class="pagination"
       @current-change="patentInfoCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { patentBar,basicPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        patentInfoData:[],
        pieData:[],
        patentBarData:[],
        // 企业投资分页
        patentInfoCurrentPage:1,
        patentInfoPageSize:10,
        patentInfoTotal:0,
        filterApplyData:[
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
            text: "发明专利",
            value: "发明专利",
          },
          {
            text: "实用新型专利",
            value: "实用新型专利",
          },
        ],
        filterStatusData:[
          {
            text: "公开",
            value: "公开",
          },
          {
            text: "个人",
            value: "个人",
          },
        ],
        filterOpenData:[
          {
            text: "2022",
            value: "2022",
          },
          {
            text: "2021",
            value: "2021",
          },
        ],
      };
    },
    computed:{
      patentBar(){
        return patentBar(this.patentBarData);
      },
      basicPie(){
        return basicPie(this.pieData);
      },
    },
    created(){
      this.getPatentBarData();
      this.getBasicPieData();
      this.getPatentInfoData();
    },
    methods:{
      // 获取专利申请趋势数据
      getPatentBarData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
        };
        this.$axios.get("/knowledge/patentApplyTrend",params).then(({data,})=>{
          this.patentBarData = data;
        });
      },
      // 获取专利类型数据
      getBasicPieData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:2,
        };
        this.$axios.get("/knowledge/patentType",params).then(({data,})=>{
          this.pieData = data;
        });
      },
      // 裁判文书表格数据
      getPatentInfoData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.patentInfoCurrentPage,
          pageSize:this.patentInfoPageSize,
        };
        this.$axios.post("/develop/publicInfo",params).then(({data,})=>{
          this.patentInfoTotal = data.total;
          this.patentInfoData = data.list.map(item=>{
            return {
              applyDate: item.sqrq,
              patentName: item.patname,
              patentType: item.ptypeName,
              // patentStatus: "公开",
              applyNum: item.sgh,
              openNum: item.gkggh,
              openDate: item.gkggr,
              inventor: item.fmr,
            };
          });
        });
      },
      // 裁判文书分页
      patentInfoCurrentChange(val){
        this.patentInfoCurrentPage = val;
        this.getPatentInfoData();
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