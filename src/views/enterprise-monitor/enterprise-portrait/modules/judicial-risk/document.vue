<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">裁判文书 {{documentTotal}}</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">案由</h3>
          <v-chart class="chartContent" :option="causePie"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">类型</h3>
          <v-chart class="chartContent" :option="typePie"></v-chart>
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
        <el-table-column prop="referenceNum" label="案号"></el-table-column>
        <el-table-column prop="documentTitle" label="文书标题"></el-table-column>
        <el-table-column
         prop="causeAction"
         label="案由"
         width="132"
         :filters="filterCauseData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
         prop="type"
         label="类型"
         width="132"
         :filters="filterTypeData"
         :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="party" label="当事人"></el-table-column>
        <el-table-column prop="caseAmount" label="案件金额" width="132"></el-table-column>
        <el-table-column prop="judgmentResult" label="裁判结果">
          <template slot-scope="scope">
            <span class="ellipsis">{{ scope.row.judgmentResult }}</span>
          </template>
        </el-table-column>
        <el-table-column
         prop="releaseTime"
         label="发布日期"
         width="132"
         :filters="filterDateData"
         :filter-method="filterHandler">
        </el-table-column>
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
import { basicPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        documentData:[],
        causePieData:[],
        typePieData:[],
        // 企业投资分页
        documentCurrentPage:1,
        documentPageSize:10,
        documentTotal:0,
        filterCauseData:[
          {
            text: "劳动争议",
            value: "劳动争议",
          },
          {
            text: "专利行政管理（专利）",
            value: "专利行政管理（专利）",
          },
        ],
        filterTypeData:[
          {
            text: "民事",
            value: "民事",
          },
          {
            text: "调解",
            value: "调解",
          },
        ],
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
      };
    },
    computed:{
      causePie(){
        return basicPie(this.causePieData);
      },
      typePie(){
        return basicPie(this.typePieData);
      },
    },
    created(){
      this.getCausePieData();
      this.getTypePieData();
      this.getDocumentData();
    },
    methods:{
      getCausePieData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:1,
        };
        this.$axios.get("/judicial/judicialInfoByType",params).then(({data,})=>{
          this.causePieData = data.map(item=>{
            return {
              name: item.name,
              value:item.value,
            };
          });
        });
      },
      getTypePieData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          type:2,
        };
        this.$axios.get("/judicial/judicialInfoByType",params).then(({data,})=>{
          this.typePieData = data.map(item=>{
            return {
              name: item.name,
              value:item.value,
            };
          });
        });
      },
      // 裁判文书表格数据
      getDocumentData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.documentCurrentPage,
          pageSize:this.documentPageSize,
        };
        this.$axios.post("/judicial/judicialInfo",params).then(({data,})=>{
          this.documentTotal = data.total;
          this.documentData = data.list.map(item=>{
            return {
              referenceNum: item.caseNum,
              documentTitle: item.docType,
              causeAction: item.otherInfo,
              type: item.caseType,
              party: item.party,
              caseAmount: "",
              judgmentResult: item.judgmentResult,
              releaseTime: item.updated,
              judgmentTime: item.judgmentDate,
            };
          });
        });
      },
      // 裁判文书分页
      documentCurrentChange(val){
        this.documentCurrentPage = val;
        this.getDocumentData();
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

.ellipsis{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
}
.pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  }
}
</style>