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
      <el-table-column prop="documentNum" label="决定文书号"></el-table-column>
      <el-table-column prop="punishReason" label="处罚事由/违法行为类型"></el-table-column>
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
import { useUserStore } from "@/store/index.js";
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
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.administrationPunishCurrentPage,
          pageSize:this.administrationPunishPageSize,
        };
        this.$axios.post("/businessRisk/pledgeEquity",params).then(({data,})=>{
          this.administrationPunishTotal = data.total;
          this.administrationPunishData = data.list.map(item=>{
            return {
              punishTime: item.penDecIssDate,
              documentNum: item.penDecNo,
              punishReason: item.caseType,
              punishResult: item.penResult || item.content,
              punishCompany: item.penAuthName,
              dataSources: item.dataSource,
            };
          });
        });
      },
      // 变更记录分页
      administrationPunishCurrentChange(val){
        this.administrationPunishCurrentPage = val;
        this.getAdministrationPunishData();
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