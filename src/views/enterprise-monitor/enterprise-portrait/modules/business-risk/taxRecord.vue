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
      <el-table-column prop="taxCategory" label="欠税税种"></el-table-column>
      <el-table-column prop="newBalance" label="当前新发生的欠税余额" width="199"></el-table-column>
      <el-table-column prop="balance" label="欠税余额" width="199"></el-table-column>
      <el-table-column prop="taxAuthority" label="税务机关"></el-table-column>
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
import { useUserStore } from "@/store/index.js";
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
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.taxRecordCurrentPage,
          pageSize:this.taxRecordPageSize,
        };
        this.$axios.post("/businessRisk/taxArrears",params).then(({data,})=>{
          this.taxRecordTotal = data.total;
          this.taxRecordData = data.list.map(item=>{
            return {
              releaseTime: item.pubTime,
              number: item.qNum,
              taxCategory: item.taxType,
              newBalance: item.cAmount,
              balance: item.debt,
              taxAuthority: item.taxOrg,
            };
          });
        });
      },
      // 变更记录分页
      taxRecordCurrentChange(val){
        this.taxRecordCurrentPage = val;
        this.getTaxRecordData();
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