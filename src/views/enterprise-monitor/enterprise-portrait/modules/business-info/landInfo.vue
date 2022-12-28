<template>
  <div>
    <h3 class="title">土地信息 {{landInfoTotal}}</h3>
      <el-table
       :data="landInfoData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="projectposition" label="项目位置"></el-table-column>
      <el-table-column prop="district" label="行政区" width="149"></el-table-column>
      <el-table-column prop="area" label="面积（公顷）" width="149"></el-table-column>
      <el-table-column prop="transactionPrice" label="成交价格（万元）" width="149"></el-table-column>
      <el-table-column prop="landUse" label="土地用途" width="149"></el-table-column>
      <el-table-column prop="company" label="批准单位"></el-table-column>
      <el-table-column prop="signingDate" label="合同签订时间" width="149"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background
       v-show="landInfoTotal > 10"
       layout="total, prev, pager, next"
       :page-size="landInfoPageSize"
       :total="landInfoTotal" 
       :current-page="landInfoCurrentPage"
       class="pagination"
       @current-change="landInfoCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        landInfoData:[],
        // 变更记录分页
        landInfoCurrentPage:1,
        landInfoPageSize:10,
        landInfoTotal:0,
      };
    },
    created(){
      this.getLandInfoData();
    },
    methods:{
      // 变更记录表格数据
      getLandInfoData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.landInfoCurrentPage,
          pageSize:this.landInfoPageSize,
        };
        this.$axios.post("/businessInfo/landInfo",params).then(({data,})=>{
          this.landInfoTotal = data.total;
          this.landInfoData = data.list.map(item=>{
            return {
              projectName: item.pname,
              projectposition: item.address,
              district: item.province+item.city,
              area: item.darea,
              transactionPrice: item.dprice,
              landUse: item.duse,
              company: item.authorg,
              signingDate: item.tdate,
            };
          });
        });
      },
      // 变更记录分页
      landInfoCurrentChange(val){
        this.landInfoCurrentPage = val;
        this.getLandInfoData();
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