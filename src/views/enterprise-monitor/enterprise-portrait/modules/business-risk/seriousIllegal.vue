<template>
  <div>
    <h3 class="title">严重违法 {{seriousIllegalTotal}}</h3>
      <el-table
       :data="seriousIllegalData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="inclusionTime" label="列入日期" width="398"></el-table-column>
      <el-table-column prop="office" label="作出决定机关(列入)"></el-table-column>
      <el-table-column prop="inclusionReason" label="列入严重违法失信企业名单原因"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="seriousIllegalTotal > 10"
       layout="total, prev, pager, next"
       :page-size="seriousIllegalPageSize"
       :total="seriousIllegalTotal" 
       :current-page="seriousIllegalCurrentPage"
       class="pagination"
       @current-change="seriousIllegalCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        seriousIllegalData:[],
        // 变更记录分页
        seriousIllegalCurrentPage:1,
        seriousIllegalPageSize:10,
        seriousIllegalTotal:0,
      };
    },
    created(){
      this.getSeriousIllegalData();
    },
    methods:{
      // 变更记录表格数据
      getSeriousIllegalData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.seriousIllegalTotal = 1;
          this.seriousIllegalData = [
          {
            inclusionTime: "",
            office: "",
            inclusionReason: "",
          },
        ];
      },
      // 变更记录分页
      seriousIllegalCurrentChange(val){
      this.seriousIllegalCurrentPage = val;
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