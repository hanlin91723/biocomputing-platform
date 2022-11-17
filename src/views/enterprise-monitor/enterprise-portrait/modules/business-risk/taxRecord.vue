<template>
  <div>
    <h3 class="title">欠税记录 {{taxRecordTotal}}</h3>
    <div class="subtitle">欠税金额合计27940092.73元</div>
      <el-table
       :data="taxRecordData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="releaseTime" label="发布日期" width="199"></el-table-column>
      <el-table-column prop="number" label="纳税人识别号" width="199"></el-table-column>
      <el-table-column prop="taxCategory" label="欠税税种" width="199"></el-table-column>
      <el-table-column prop="newBalance" label="当前新发生的欠税余额" width="199"></el-table-column>
      <el-table-column prop="balance" label="欠税余额" width="199"></el-table-column>
      <el-table-column prop="taxAuthority" label="税务机关" width="201"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="taxRecordTotal > 10"
       layout="total, prev, pager, next"
       :page-size="taxRecordPageSize"
       :total="taxRecordTotal" 
       :current-page="taxRecordCurrentPage"
       class="pagination"
       @current-change="taxRecordCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        taxRecordData:[],
        // 变更记录分页
        taxRecordCurrentPage:1,
        taxRecordPageSize:10,
        taxRecordTotal:0,
      };
    },
    created(){
      this.getTaxRecordData();
    },
    methods:{
      // 变更记录表格数据
      getTaxRecordData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.taxRecordTotal = 1;
          this.taxRecordData = [
          {
            releaseTime: "2021-04-27",
            number: "91440101721917441U",
            taxCategory: "企业所得税、印花税",
            newBalance: " ",
            balance: "27940092.73元",
            taxAuthority: "国家税务总局广州市税务局",
          },
        ];
      },
      // 变更记录分页
      taxRecordCurrentChange(val){
      this.taxRecordCurrentPage = val;
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