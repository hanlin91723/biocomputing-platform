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
        <el-table-column
         prop="applyDate"
         label="申请日"
         width="170"
         :filters="filterApplyData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="brand" label="商标" width="170">
          <template slot-scope="scope">
            <el-image 
            style="width: 50px; height: 50px" 
            :src="scope.row.brand" 
            fit="fill">
          </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="商标名称">
          <template slot-scope="scope">
            <span class="brandName">{{scope.row.brandName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerNum" label="注册号"></el-table-column>
        <el-table-column
         prop="classify"
         label="国际分类"
         width="170"
         :filters="filterTypeData"
         :filter-method="filterHandler">
        </el-table-column>
        <!-- <el-table-column
         prop="brandStatus"
         label="商标状态"
         :filters="filterStatusData"
         :filter-method="filterHandler">
        </el-table-column> -->
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
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        brandInfoData:[],
        recruitName:[],
        recruitValue:[],
        basicPieData:[],
        // 企业投资分页
        brandInfoCurrentPage:1,
        brandInfoPageSize:10,
        brandInfoTotal:0,
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
            text: "09类-科学仪器",
            value: "09类-科学仪器",
          },
          {
            text: "37类-建筑修理",
            value: "37类-建筑修理",
          },
        ],
        filterStatusData:[
          {
            text: "初审公告",
            value: "初审公告",
          },
          {
            text: "商标已注册",
            value: "商标已注册",
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
    },
    created(){
      this.getRecruitData();
      this.getBasicPieData();
      this.getBrandInfoData();
    },
    methods:{
      // 获取商标申请趋势数据
      getRecruitData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:1,
        };
        this.$axios.get("/knowledge/trademarkType",params).then(({data,})=>{
          data.forEach(item=>{
            this.recruitName.push(item.name);
            this.recruitValue.push(item.value);
          });
        });
      },
      // 获取商标类型数据
      getBasicPieData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:2,
        };
        this.$axios.get("/knowledge/trademarkType",params).then(({data,})=>{
          this.basicPieData = data;
        });
      },
      // 裁判文书表格数据
      getBrandInfoData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.brandInfoCurrentPage,
          pageSize:this.brandInfoPageSize,
        };
        this.$axios.post("/knowledge/trademarkInfo",params).then(({data,})=>{
          this.brandInfoTotal = data.total;
          this.brandInfoData = data.list.map(item=>{
            return {
              applyDate: item.applicationDate,
              brand: item.pic,
              brandName: item.tname,
              registerNum: item.tnum,
              classify: item.ttype,
              // brandStatus: "初审公告",
              registerDate: item.registerDate,
            };
          });
        });
      },
      // 裁判文书分页
      brandInfoCurrentChange(val){
        this.brandInfoCurrentPage = val;
        this.getBrandInfoData();
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