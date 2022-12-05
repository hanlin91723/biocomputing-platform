<template>
  <div>
    <h3 class="title">股权质押 {{equityPledgeTotal}}</h3>
    <div class="subtitle">出质金额合计 1614 万人民币</div>
      <el-table
       :data="equityPledgeData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="registerNum" label="登记编号"></el-table-column>
      <el-table-column prop="pledgor" label="出质人" width="170"></el-table-column>
      <el-table-column prop="pledgorEnterprise" label="出质股权标的企业"></el-table-column>
      <el-table-column prop="pledgee" label="质权人" width="170"></el-table-column>
      <el-table-column prop="pledgeAmount" label="质押金额" width="170"></el-table-column>
      <el-table-column prop="pledgeFilingTime" label="质押备案日期" width="170"></el-table-column>
      <el-table-column
         prop="status"
         label="状态"
         width="170"
         :filters="filterData"
         :filter-method="filterHandler">
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="equityPledgeTotal > 10"
       layout="total, prev, pager, next"
       :page-size="equityPledgePageSize"
       :total="equityPledgeTotal" 
       :current-page="equityPledgeCurrentPage"
       class="pagination"
       @current-change="equityPledgeCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        equityPledgeData:[],
        // 变更记录分页
        equityPledgeCurrentPage:1,
        equityPledgePageSize:10,
        equityPledgeTotal:0,
        filterData:[
          {
            text: "质押",
            value: "质押",
          },
          {
            text: "出售",
            value: "出售",
          },
        ],
      };
    },
    created(){
      this.getEquityPledgeData();
    },
    methods:{
      // 变更记录表格数据
      getEquityPledgeData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.equityPledgeTotal = 1;
          this.equityPledgeData = [
          {
            registerNum: "",
            pledgor: "",
            pledgorEnterprise: "",
            pledgee: " ",
            pledgeAmount: "",
            pledgeFilingTime: "",
            status: "",
          },
        ];
      },
      // 变更记录分页
      equityPledgeCurrentChange(val){
      this.equityPledgeCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
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