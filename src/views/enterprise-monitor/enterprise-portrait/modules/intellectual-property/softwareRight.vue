<template>
  <div>
    <h3 class="title">软件著作权 {{softwareRightTotal}}</h3>
      <el-table
       :data="softwareRightData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="approvalTime" label="登记批准时间" width="199"></el-table-column>
      <el-table-column prop="FullName" label="软件全称"></el-table-column>
      <el-table-column prop="abbreviation" label="软件简称"></el-table-column>
      <el-table-column prop="registerNum" label="登记号" width="199"></el-table-column>
      <el-table-column prop="versionNum" label="版本号" width="199"></el-table-column>
      <el-table-column prop="firstPublishDate" label="首次发表日期" width="199"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="softwareRightTotal > 10"
       layout="total, prev, pager, next"
       :page-size="softwareRightPageSize"
       :softwareRightTotal="softwareRightTotal" 
       :current-page="softwareRightCurrentPage"
       class="pagination"
       @current-change="softwareRightCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        softwareRightData:[],
        // 变更记录分页
        softwareRightCurrentPage:1,
        softwareRightPageSize:10,
        softwareRightTotal:0,
      };
    },
    created(){
      this.getSoftwareRightData();
    },
    methods:{
      // 变更记录表格数据
      getSoftwareRightData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.softwareRightCurrentPage,
          pageSize:this.softwareRightPageSize,
        };
        this.$axios.post("/knowledge/softwareWorks",params).then(({data,})=>{
          this.softwareRightTotal = data.total;
          this.softwareRightData = data.list.map(item=>{
            return {
              approvalTime: item.rdate,
              FullName: item.sname,
              abbreviation: item.shortName,
              registerNum: item.snum,
              versionNum: item.vnum,
              firstPublishDate: item.pdate,
            };
          });
        });
      },
      // 变更记录分页
      softwareRightCurrentChange(val){
        this.softwareRightCurrentPage = val;
        this.getSoftwareRightData();
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