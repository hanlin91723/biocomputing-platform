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
      <el-table-column prop="shareholderName" label="股东名称"></el-table-column>
      <el-table-column prop="AccumulatedShouldAmount" label="累计认缴额" width="170"></el-table-column>
      <el-table-column prop="conprop" label="出资比例" width="170"></el-table-column>
      <!-- <el-table-column prop="shouldMode" label="认缴出资方式" width="170"></el-table-column> -->
      <el-table-column prop="AccumulatedActualAmount" label="累计实缴额" width="170"></el-table-column>
      <el-table-column prop="actualTime" label="实缴出资日期" width="170"></el-table-column>
      <!-- <el-table-column prop="actualMode" label="实缴出资方式" width="171"></el-table-column> -->
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
import { useUserStore } from "@/store/index.js";
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
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.contributorCurrentPage,
          pageSize:this.contributorPageSize,
        };
        this.$axios.post("/develop/contribution",params).then(({data,})=>{
          this.contributorTotal = data.total;
          this.contributorData = data.list.map(item=>{
            return {
              shareholderName: item.inv,
              AccumulatedShouldAmount: item.subconam,
              conprop: item.conprop,
              AccumulatedActualAmount: item.acconam,
              actualTime: item.condate,
            };
          });
        });
      },
      // 变更记录分页
      contributorCurrentChange(val){
        this.contributorCurrentPage = val;
        this.getContributorData();
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