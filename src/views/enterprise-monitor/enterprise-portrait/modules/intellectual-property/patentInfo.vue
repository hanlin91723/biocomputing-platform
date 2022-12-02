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
        <el-table-column prop="applyDate" label="申请日" width="149"></el-table-column>
        <el-table-column prop="patentName" label="专利名称" width="153"></el-table-column>
        <el-table-column prop="patentType" label="专利类型" width="149"></el-table-column>
        <el-table-column prop="patentStatus" label="专利状态" width="149"></el-table-column>
        <el-table-column prop="applyNum" label="申请号" width="149"></el-table-column>
        <el-table-column prop="openNum" label="公开号" width="149"></el-table-column>
        <el-table-column prop="openDate" label="公开日" width="149"></el-table-column>
        <el-table-column prop="inventor" label="发明人" width="149"></el-table-column>
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
  export default {
    data() {
      return {
        patentInfoData:[],
        // 企业投资分页
        patentInfoCurrentPage:1,
        patentInfoPageSize:10,
        patentInfoTotal:0,
      };
    },
    computed:{
      patentBar(){
        return patentBar();
      },
      basicPie(){
        return basicPie();
      },
    },
    created(){
      this.getPatentInfoData();
    },
    methods:{
      // 裁判文书表格数据
      getPatentInfoData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.patentInfoTotal = 7;
          this.patentInfoData = [
          {
            applyDate: "2022-08-08",
            patentName: "一种机热一体化立方星主承力结构及组装方法",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "申明、孔林、谭陆洋、孙强强",
          },
          {
            applyDate: "2022-08-08",
            patentName: "一种微小卫星热管理仿真系统及平台",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "赵相禹、杨睿光、赵春娟、郑小石、张亮、袁梓馨、陈善搏、高飞、张雷",
          },
          {
            applyDate: "2022-08-08",
            patentName: "一种焦平面的指示棱镜标定方法",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "张长帅、丛杉珊、朱春雨、王晨、孙美娇",
          },
          {
            applyDate: "2022-08-08",
            patentName: "基于边缘检测的建筑物语义分割后处理方法、系统以及设备",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "特日根",
          },
          {
            applyDate: "2022-08-08",
            patentName: "一种机热一体化立方星主承力结构及组装方法",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "赵相禹、杨睿光、赵春娟、郑小石、张亮、袁梓馨、陈善搏、高飞、张雷",
          },
          {
            applyDate: "2022-08-08",
            patentName: "一种机热一体化立方星主承力结构及组装方法",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "赵相禹、杨睿光、赵春娟、郑小石、张亮、袁梓馨、陈善搏、高飞、张雷",
          },
          {
            applyDate: "2022-08-08",
            patentName: "一种机热一体化立方星主承力结构及组装方法",
            patentType: "发明专利",
            patentStatus: "公开",
            applyNum: "CN202210942094.9",
            openNum: "CN115158702A",
            openDate: "2022-10-11 ",
            inventor: "赵相禹、杨睿光、赵春娟、郑小石、张亮、袁梓馨、陈善搏、高飞、张雷",
          },
        ];
      },
      // 裁判文书分页
      patentInfoCurrentChange(val){
      this.patentInfoCurrentPage = val;
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