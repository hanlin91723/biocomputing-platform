<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab.startsWith('经营异常'),disabled:businessUnusualTotal == 0}">经营异常 {{businessUnusualTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('历史经营异常'),disabled:oldBusinessUnusualTotal == 0}">历史经营异常 {{oldBusinessUnusualTotal}}</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('经营异常')"
       :data="businessUnusualData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="inclusionTime" label="列入日期" width="398"></el-table-column>
      <el-table-column prop="office" label="登记/移入机关" width="398"></el-table-column>
      <el-table-column prop="inclusionReason" label="列入原因" width="400"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('经营异常') && businessUnusualTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="businessUnusualPageSize"
     :total="businessUnusualTotal" 
     :current-page="businessUnusualCurrentPage"
     class="pagination"
     @current-change="businessUnusualCurrentChange">
    </el-pagination>
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('历史经营异常')"
       :data="oldBusinessUnusualData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="removeTime" label="移出日期" width="398"></el-table-column>
      <el-table-column prop="office" label="核验/移出机关" width="398"></el-table-column>
      <el-table-column prop="removeReason" label="移出原因" width="400"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('历史经营异常') && oldBusinessUnusualTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="oldBusinessUnusualPageSize"
     :total="oldBusinessUnusualTotal" 
     :current-page="oldBusinessUnusualCurrentPage"
     class="pagination"
     @current-change="oldBusinessUnusualCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"",
        businessUnusualData:[],
        oldBusinessUnusualData:[],
        // 经营异常分页
        businessUnusualCurrentPage:1,
        businessUnusualPageSize:10,
        businessUnusualTotal:0,
        // 历史经营异常分页
        oldBusinessUnusualCurrentPage:1,
        oldBusinessUnusualPageSize:10,
        oldBusinessUnusualTotal:0,
      };
    },
    created(){
      this.getBusinessUnusualData();
      this.getOldBusinessUnusualData();
      this.defaultTab();
    },
    methods: {
      // 每次页面刷新自动选中第一个非零tab项
      defaultTab(){
        if(this.businessUnusualTotal){
          this.selectTab = "经营异常";
        }else if(this.oldBusinessUnusualTotal){
          this.selectTab = "历史经营异常";
        }else{
          return;
        }
      },
      // 经营异常表格数据
      getBusinessUnusualData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.businessUnusualTotal = 1;
          this.businessUnusualData = [
          {
            inclusionTime:"2022-02-28",
            office:"重庆市江北区市场监督管理局",
            inclusionReason:"通过登记的住所或者经营场所无法联系",
          },
        ];
      },
      // 经营异常分页
      businessUnusualCurrentChange(val){
      this.businessUnusualCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 历史经营异常表格数据
      getOldBusinessUnusualData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.oldBusinessUnusualTotal = 1;
          this.oldBusinessUnusualData = [
          {
            removeTime:"",
            office:"",
            removeReason:"",
          },
        ];
      },
      // 历史经营异常分页
      oldBusinessUnusualCurrentChange(val){
      this.oldBusinessUnusualCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // tab切换
      handleTab(e){
        if (e.target.className === "title" || e.target.innerText.includes("0")) return;
        this.selectTab = e.target.innerText;
      },
    },
  };
</script>

<style lang="less" scoped>
  .title{
    margin-bottom: 16px;
    .titleItem{
      cursor: pointer;
      margin-right: 24px;
      padding-bottom: 5px;
      font-size: 16px;
      font-weight: 700;
      &.active{
        border-bottom: 2px solid #0084ff;
        color: #0084ff;
      }
      &.disabled{
        color: #D3D3D3;
      }
    }
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>