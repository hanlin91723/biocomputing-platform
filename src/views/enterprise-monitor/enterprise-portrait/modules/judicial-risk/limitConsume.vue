<template>
  <div>
    <h3 class="title">限制高消费 {{limitConsumeTotal}}</h3>
      <el-table
       :data="limitConsumeData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="referenceNum" label="案号"></el-table-column>
      <el-table-column prop="limitObjects" label="限制令对象"></el-table-column>
      <el-table-column prop="associatedObjects" label="关联对象" width="199"></el-table-column>
      <el-table-column prop="applicant" label="申请人" width="199"></el-table-column>
      <el-table-column prop="filingCaseTime" label="立案日期" width="199"></el-table-column>
      <el-table-column
         prop="releaseTime"
         label="发布日期"
         width="199"
         :filters="filterData"
         :filter-method="filterHandler">
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="limitConsumeTotal > 10"
       layout="total, prev, pager, next"
       :page-size="limitConsumePageSize"
       :total="limitConsumeTotal" 
       :current-page="limitConsumeCurrentPage"
       class="pagination"
       @current-change="limitConsumeCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        limitConsumeData:[],
        // 变更记录分页
        limitConsumeCurrentPage:1,
        limitConsumePageSize:10,
        limitConsumeTotal:0,
        filterData:[
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
    created(){
      this.getLimitConsumeData();
    },
    methods:{
      // 变更记录表格数据
      getLimitConsumeData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        };
        this.$axios.post("/judicial/limitConsumption",params).then(({data,})=>{
          this.limitConsumeTotal = data.total;
          this.limitConsumeData = data.list.map(item=>{
            return {
              referenceNum: item.caseNo,
              limitObjects: item.qyInfo,
              associatedObjects: item.xname,
              applicant: " ",
              filingCaseTime: item.filingDate,
              releaseTime: item.publishDate,
            };
          });
        });
      },
      // 变更记录分页
      limitConsumeCurrentChange(val){
        this.limitConsumeCurrentPage = val;
        this.getLimitConsumeData();
      },
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
    },
  };
</script>

<style lang="less" scoped>
.title{
      font-size: 16px;
      margin-bottom: 12px;
    }
    .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>