<template>
  <div>
    <h3 class="title">变更记录 {{changeTotal}}</h3>
      <el-table
       :data="changeData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="changeProject" label="变更项目"></el-table-column>
      <el-table-column prop="changeTime" label="变更日期" width="299"></el-table-column>
      <el-table-column prop="beforeInfo" label="变更前信息" width="299"></el-table-column>
      <el-table-column prop="afterInfo" label="变更后信息" width="299"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="changeTotal > 10"
       layout="total, prev, pager, next"
       :page-size="changePageSize"
       :total="changeTotal" 
       :current-page="changeCurrentPage"
       class="pagination"
       @current-change="changeCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        changeData:[],
        // 变更记录分页
        changeCurrentPage:1,
        changePageSize:10,
        changeTotal:0,
      };
    },
    created(){
      this.getChangeData();
    },
    methods:{
      // 变更记录表格数据
      getChangeData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.changeTotal = 3;
          this.changeData = [
          {
            changeProject: "法定代表人变更",
            changeTime: "2022-08-23",
            beforeInfo: "金乐亲",
            afterInfo: "刘波",
          },
          {
            changeProject: "章程备案",
            changeTime: "2021-07-15",
            beforeInfo: "金乐亲",
            afterInfo: "章程",
          },
          {
            changeProject: "清算组备案",
            changeTime: "2019-11-21",
            beforeInfo: "金乐亲",
            afterInfo: "章程",
          },
        ];
      },
      // 变更记录分页
      changeCurrentChange(val){
      this.changeCurrentPage = val;
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