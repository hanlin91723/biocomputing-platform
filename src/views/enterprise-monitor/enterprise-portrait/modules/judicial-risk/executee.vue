<template>
  <div>
    <h3 class="title">被执行人 {{executeeTotal}}</h3>
    <div class="subtitle">执行标的金额总额 145,455.00 元</div>
      <el-table
       :data="executeeData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="referenceNum" label="案号" width="259"></el-table-column>
      <el-table-column prop="IDCard" label="被执行人身份证号码/组织机构代码" width="249"></el-table-column>
      <el-table-column prop="filingCaseTime" label="立案日期" width="209"></el-table-column>
      <el-table-column prop="court" label="执行法院" width="270"></el-table-column>
      <el-table-column prop="amount" label="执行标的(元)" width="209"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="executeeTotal > 10"
       layout="total, prev, pager, next"
       :page-size="executeePageSize"
       :total="executeeTotal" 
       :current-page="executeeCurrentPage"
       class="pagination"
       @current-change="executeeCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        executeeData:[],
        // 变更记录分页
        executeeCurrentPage:1,
        executeePageSize:10,
        executeeTotal:0,
      };
    },
    created(){
      this.getExecuteeData();
    },
    methods:{
      // 变更记录表格数据
      getExecuteeData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.executeeTotal = 2;
          this.executeeData = [
          {
            referenceNum: "（2022）粤0106执21905号",
            IDCard: "9144010172****441U",
            filingCaseTime: "2022-09-28",
            court: "广东省广州市天河区人民法院 ",
            amount: "85,142.00",
          },
          {
            referenceNum: "（2022）粤0106执21163号",
            IDCard: "9144010172****441U",
            filingCaseTime: "2022-09-13",
            court: "广东省广州市天河区人民法院 ",
            amount: "42,041.00",
          },
        ];
      },
      // 变更记录分页
      executeeCurrentChange(val){
      this.executeeCurrentPage = val;
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
    .subtitle{
      margin-bottom: 12px;
    }
    .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>