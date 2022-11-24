<template>
  <div>
    <h3 class="title">食品农产品认证 {{farmProduceTotal}}</h3>
      <el-table
       :data="farmProduceData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="170"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="170"></el-table-column>
      <el-table-column prop="certificateStatus" label="证书状态" width="156"></el-table-column>
      <el-table-column prop="issuingAuthority" label="发证机构" width="170"></el-table-column>
      <el-table-column prop="standard" label="认证依据" width="190"></el-table-column>
      <el-table-column prop="certificationTime" label="颁证日期" width="170"></el-table-column>
      <el-table-column prop="certificateExpireTime" label="证书到期日期" width="170"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="farmProduceTotal > 10"
       layout="total, prev, pager, next"
       :page-size="farmProducePageSize"
       :total="farmProduceTotal" 
       :current-page="farmProduceCurrentPage"
       class="pagination"
       @current-change="farmProduceCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        farmProduceData:[],
        // 变更记录分页
        farmProduceCurrentPage:1,
        farmProducePageSize:10,
        farmProduceTotal:0,
      };
    },
    created(){
      this.getFarmProduceData();
    },
    methods:{
      // 变更记录表格数据
      getFarmProduceData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.farmProduceTotal = 2;
          this.farmProduceData = [
          {
            projectName: "",
            productName: "",
            certificateStatus: "",
            issuingAuthority: " ",
            standard: "",
            certificationTime: "",
            certificateExpireTime: "",
          },
          {
            projectName: "",
            productName: "",
            certificateStatus: "",
            issuingAuthority: " ",
            standard: "",
            certificationTime: "",
            certificateExpireTime: "",
          },
        ];
      },
      // 变更记录分页
      farmProduceCurrentChange(val){
      this.farmProduceCurrentPage = val;
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