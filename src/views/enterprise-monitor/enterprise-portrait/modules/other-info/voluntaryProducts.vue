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
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="productName" label="产品名称及单元" width="149"></el-table-column>
      <el-table-column prop="certificateStatus" label="证书状态" width="149"></el-table-column>
      <el-table-column prop="issuingAuthority" label="发证机构"></el-table-column>
      <el-table-column prop="approvalMark" label="证书使用的认可标识" width="149"></el-table-column>
      <el-table-column prop="standard" label="认证依据的标准和技术要求"></el-table-column>
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
import { useUserStore } from "@/store/index.js";
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
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.voluntaryProductsCurrentPage,
          pageSize:this.voluntaryProductsPageSize,
        };
        this.$axios.post("/other/voluntary",params).then(({data,})=>{
          this.voluntaryProductsTotal = data.total;
          this.voluntaryProductsData = data.list.map(item=>{
            return {
              projectName: item.certProject,
              productName: item.productName,
              certificateStatus: item.certStatus,
              issuingAuthority: item.orgNum,
              approvalMark: item.approvalMark,
              standard: item.certificateBasis,
              certificationTime: item.awardDate,
              certificateExpireTime: item.expireDate,
            };
          });
        });
      },
      // 变更记录分页
      voluntaryProductsCurrentChange(val){
        this.voluntaryProductsCurrentPage = val;
        this.getVoluntaryProductsData();
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