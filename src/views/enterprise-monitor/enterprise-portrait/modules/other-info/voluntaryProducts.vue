<template>
  <div>
    <h3 class="title">自愿性工业产品认证 {{voluntaryProductsTotal}}</h3>
      <el-table
       :data="voluntaryProductsData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="149"></el-table-column>
      <el-table-column prop="productName" label="产品名称及单元" width="149"></el-table-column>
      <el-table-column prop="certificateStatus" label="证书状态" width="149"></el-table-column>
      <el-table-column prop="issuingAuthority" label="发证机构" width="149"></el-table-column>
      <el-table-column prop="approvalMark" label="证书使用的认可标识" width="149"></el-table-column>
      <el-table-column prop="standard" label="认证依据的标准和技术要求" width="153"></el-table-column>
      <el-table-column prop="certificationTime" label="颁证日期" width="149"></el-table-column>
      <el-table-column prop="certificateExpireTime" label="证书到期日期" width="149"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="voluntaryProductsTotal > 10"
       layout="total, prev, pager, next"
       :page-size="voluntaryProductsPageSize"
       :total="voluntaryProductsTotal" 
       :current-page="voluntaryProductsCurrentPage"
       class="pagination"
       @current-change="voluntaryProductsCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        voluntaryProductsData:[],
        // 变更记录分页
        voluntaryProductsCurrentPage:1,
        voluntaryProductsPageSize:10,
        voluntaryProductsTotal:0,
      };
    },
    created(){
      this.getVoluntaryProductsData();
    },
    methods:{
      // 变更记录表格数据
      getVoluntaryProductsData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.voluntaryProductsTotal = 2;
          this.voluntaryProductsData = [
          {
            projectName: "",
            productName: "",
            certificateStatus: "",
            issuingAuthority: " ",
            approvalMark: "",
            standard: "",
            certificationTime: "",
            certificateExpireTime: "",
          },
          {
            projectName: "",
            productName: "",
            certificateStatus: "",
            issuingAuthority: " ",
            approvalMark: "",
            standard: "",
            certificationTime: "",
            certificateExpireTime: "",
          },
        ];
      },
      // 变更记录分页
      voluntaryProductsCurrentChange(val){
      this.voluntaryProductsCurrentPage = val;
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