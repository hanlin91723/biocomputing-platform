<template>
  <div>
    <h3 class="title">股东（发起人）及出资信息（单位：万人民币）</h3>
      <el-table
       :data="contributorData"
       row-key="shareholderName"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="shareholderName" label="股东名称" width="175"></el-table-column>
      <el-table-column prop="AccumulatedShouldAmount" label="累计认缴额" width="170"></el-table-column>
      <el-table-column prop="shouldTime" label="认缴出资日期" width="170"></el-table-column>
      <el-table-column prop="shouldMode" label="认缴出资方式" width="170"></el-table-column>
      <el-table-column prop="AccumulatedActualAmount" label="累计实缴额" width="170"></el-table-column>
      <el-table-column prop="actualTime" label="实缴出资日期" width="170"></el-table-column>
      <el-table-column prop="actualMode" label="实缴出资方式" width="171"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="contributorTotal > 10"
       layout="total, prev, pager, next"
       :page-size="contributorPageSize"
       :total="contributorTotal" 
       :current-page="contributorCurrentPage"
       class="pagination"
       @current-change="contributorCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contributorData:[],
        // 变更记录分页
        contributorCurrentPage:1,
        contributorPageSize:10,
        contributorTotal:0,
      };
    },
    created(){
      this.getContributorData();
    },
    methods:{
      // 变更记录表格数据
      getContributorData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.contributorTotal = 1;
          this.contributorData = [
          {
            shareholderName: "2020年报",
            AccumulatedShouldAmount: "",
            shouldTime: "",
            shouldMode: "",
            AccumulatedActualAmount: "",
            actualTime: "",
            actualMode: "",
            children:[
              {
                shareholderName: "A股股东",
                AccumulatedShouldAmount: "500.0万元",
                shouldTime: "2036-07-28",
                shouldMode: "",
                AccumulatedActualAmount: "",
                actualTime: "",
                actualMode: "",
              },
              {
                shareholderName: "境外上市外资股",
                AccumulatedShouldAmount: "500.0万元",
                shouldTime: "2036-07-28",
                shouldMode: "",
                AccumulatedActualAmount: "",
                actualTime: "",
                actualMode: "",
              },
            ],
          },
        ];
      },
      // 变更记录分页
      contributorCurrentChange(val){
      this.contributorCurrentPage = val;
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