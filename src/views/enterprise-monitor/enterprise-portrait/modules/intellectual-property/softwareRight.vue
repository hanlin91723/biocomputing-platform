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
      <el-table-column prop="FullName" label="软件全称" width="199"></el-table-column>
      <el-table-column prop="abbreviation" label="软件简称" width="199"></el-table-column>
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
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.softwareRightTotal = 4;
          this.softwareRightData = [
          {
            approvalTime: "2022-09-27",
            FullName: "基于OSM数据的建筑物识别数据集生产系统",
            abbreviation: "",
            registerNum: "2022SR1375617",
            versionNum: "1.0",
            firstPublishDate: "",
          },
          {
            approvalTime: "2022-09-5",
            FullName: "智慧农业综合指挥平台系统",
            abbreviation: "",
            registerNum: "2022SR1346770",
            versionNum: "1.0",
            firstPublishDate: "",
          },
          {
            approvalTime: "2022-09-15",
            FullName: "基于K8S技术的切片调度管理系统 ",
            abbreviation: "",
            registerNum: "2022SR1375617",
            versionNum: "1.0",
            firstPublishDate: "",
          },
          {
            approvalTime: "2022-09-10",
            FullName: "智慧农业综合指挥平台系统 ",
            abbreviation: "",
            registerNum: "2022SR1375617",
            versionNum: "1.0",
            firstPublishDate: "",
          },
        ];
      },
      // 变更记录分页
      softwareRightCurrentChange(val){
      this.softwareRightCurrentPage = val;
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