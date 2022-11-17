<template>
  <div>
    <h3 class="title">限制出境 {{restrictedExitTotal}}</h3>
      <el-table
       :data="restrictedExitData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="referenceNum" label="案号" width="175"></el-table-column>
      <el-table-column prop="restrictedExitObjects" label="限制出境对象" width="170"></el-table-column>
      <el-table-column prop="executeeInfo" label="被执行人信息" width="171"></el-table-column>
      <el-table-column prop="executionApplicant" label="申请执行人" width="170"></el-table-column>
      <el-table-column prop="executeAmount" label="执行标的金额" width="170"></el-table-column>
      <el-table-column prop="court" label="承办法院" width="170"></el-table-column>
      <el-table-column prop="releaseTime" label="发布日期" width="170"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="restrictedExitTotal > 10"
       layout="total, prev, pager, next"
       :page-size="restrictedExitPageSize"
       :total="restrictedExitTotal" 
       :current-page="restrictedExitCurrentPage"
       class="pagination"
       @current-change="restrictedExitCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        restrictedExitData:[],
        // 变更记录分页
        restrictedExitCurrentPage:1,
        restrictedExitPageSize:10,
        restrictedExitTotal:0,
      };
    },
    created(){
      this.getRestrictedExitData();
    },
    methods:{
      // 变更记录表格数据
      getRestrictedExitData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.restrictedExitTotal = 2;
          this.restrictedExitData = [
          {
            referenceNum: "",
            restrictedExitObjects: "",
            executeeInfo: "",
            executionApplicant: " ",
            executeAmount: "",
            court:"",
            releaseTime: "",
          },
          {
            referenceNum: "",
            restrictedExitObjects: "",
            executeeInfo: "",
            executionApplicant: " ",
            executeAmount: "",
            court:"",
            releaseTime: "",
          },
        ];
      },
      // 变更记录分页
      restrictedExitCurrentChange(val){
      this.restrictedExitCurrentPage = val;
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