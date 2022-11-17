<template>
  <div>
    <h3 class="title">行政处罚 {{administrationPunishTotal}}</h3>
      <el-table
       :data="administrationPunishData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="punishTime" label="处罚日期" width="199"></el-table-column>
      <el-table-column prop="documentNum" label="决定文书号" width="199"></el-table-column>
      <el-table-column prop="punishReason" label="处罚事由/违法行为类型" width="201"></el-table-column>
      <el-table-column prop="punishResult" label="处罚结果/内容" width="199"></el-table-column>
      <el-table-column prop="punishCompany" label="处罚单位" width="199"></el-table-column>
      <el-table-column prop="dataSources" label="数据来源" width="199"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="administrationPunishTotal > 10"
       layout="total, prev, pager, next"
       :page-size="administrationPunishPageSize"
       :total="administrationPunishTotal" 
       :current-page="administrationPunishCurrentPage"
       class="pagination"
       @current-change="administrationPunishCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        administrationPunishData:[],
        // 变更记录分页
        administrationPunishCurrentPage:1,
        administrationPunishPageSize:10,
        administrationPunishTotal:0,
      };
    },
    created(){
      this.getAdministrationPunishData();
    },
    methods:{
      // 变更记录表格数据
      getAdministrationPunishData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.administrationPunishTotal = 1;
          this.administrationPunishData = [
          {
            punishTime: "2019-09-05",
            documentNum: "首次公开发行股票配售对象黑名单公告（2019年第2号）",
            punishReason: "违反《首次公开发行股票承销业务规范》第四十五条、四十六条规定",
            punishResult: "列入黑名单",
            punishCompany: "中国证券业协会",
            dataSources: "",
          },
        ];
      },
      // 变更记录分页
      administrationPunishCurrentChange(val){
      this.administrationPunishCurrentPage = val;
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