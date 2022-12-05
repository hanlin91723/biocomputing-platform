<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab.startsWith('股东信息'),disabled:shareholderTotal == 0}">股东信息 {{shareholderTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('历史股东信息'),disabled:oldShareholderTotal == 0}">历史股东信息 {{oldShareholderTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('股权变更'),disabled:stockRightTotal == 0}">股权变更 {{stockRightTotal}}</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('股东信息')"
       :data="shareholderData"
       class="table"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="shareholder" label="股东名称"></el-table-column>
      <el-table-column prop="scale" label="出资比例" width="100"></el-table-column>
      <el-table-column prop="shouldQuota" label="认缴出资额" width="150"></el-table-column>
      <el-table-column prop="shouldTime" label="认缴出资日期" width="150"></el-table-column>
      <el-table-column prop="shouldMode" label="认缴出资方式" width="150"></el-table-column>
      <el-table-column prop="actualQuota" label="实缴出资额" width="150"></el-table-column>
      <el-table-column prop="actualTime" label="实缴出资日期" width="150"></el-table-column>
      <el-table-column prop="actualMode" label="实缴出资方式" width="150"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('股东信息') && shareholderTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="shareholderPageSize"
     :total="shareholderTotal" 
     :current-page="shareholderCurrentPage"
     class="pagination"
     @current-change="shareholderCurrentChange">
    </el-pagination>
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('历史股东信息')"
       :data="oldShareholderData"
       class="table"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="oldShareholderName" label="历史股东名称"></el-table-column>
      <el-table-column prop="scale" label="出资比例" width="196"></el-table-column>
      <el-table-column prop="shouldQuota" label="认缴出资额" width="200"></el-table-column>
      <el-table-column prop="shouldTime" label="认缴出资日期" width="200"></el-table-column>
      <el-table-column prop="sharesTime" label="入股日期" width="200"></el-table-column>
      <el-table-column prop="exitTime" label="退出日期" width="200"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('历史股东信息') && oldShareholderTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="oldShareholderPageSize"
     :total="oldShareholderTotal" 
     :current-page="oldShareholderCurrentPage"
     class="pagination"
     @current-change="oldShareholderCurrentChange">
    </el-pagination>
    <!-- 股权变更表格 -->
    <el-table
       v-show="selectTab.startsWith('股权变更')"
       :data="stockRightData"
       class="table"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="changeType" label="变动类型"></el-table-column>
      <el-table-column prop="changeTime" label="变动日期" width="170"></el-table-column>
      <el-table-column prop="shareholderName" label="股东名称" width="170"></el-table-column>
      <el-table-column prop="beforeChangeQuota" label="变更前投资额" width="170"></el-table-column>
      <el-table-column prop="afterChangeQuota" label="变更后投资额" width="170"></el-table-column>
      <el-table-column prop="beforeChangeOccupy" label="变更前股权占比" width="170"></el-table-column>
      <el-table-column prop="afterChangeOccupy" label="变更后股权占比" width="170"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('股权变更') && stockRightTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="stockRightPageSize"
     :total="stockRightTotal" 
     :current-page="stockRightCurrentPage"
     class="pagination"
     @current-change="stockRightCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"",
        shareholderData:[],
        oldShareholderData:[],
        stockRightData:[],
        // 股东信息分页
        shareholderCurrentPage:1,
        shareholderPageSize:10,
        shareholderTotal:0,
        // 历史股东信息分页
        oldShareholderCurrentPage:1,
        oldShareholderPageSize:10,
        oldShareholderTotal:0,
        // 股权变更分页
        stockRightCurrentPage:1,
        stockRightPageSize:10,
        stockRightTotal:0,
      };
    },
    created(){
      this.getShareholderData();
      this.getOldShareholderData();
      this.getStockRightData();
      this.defaultTab();
    },
    methods: {
      // 每次页面刷新自动选中第一个非零tab项
      defaultTab(){
        if(this.shareholderTotal){
          this.selectTab = "股东信息";
        }else if(this.oldShareholderTotal){
          this.selectTab = "历史股东信息";
        }else if(this.stockRightTotal){
          this.selectTab = "股权变更";
        }else{
          return;
        }
      },
      // 股东信息表格数据
      getShareholderData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.shareholderTotal = 0;
          this.shareholderData = [
          {
            shareholder:"周建",
            scale:"50%",
            shouldQuota:"500.0万元",
            shouldTime:"2036-07-28",
          },
          {
            shareholder:"天广中茂股份有限公司",
            scale:"50%",
            shouldQuota:"500.0万元",
            shouldTime:"2036-07-28",
          },
        ];
      },
      // 股东信息分页
      shareholderCurrentChange(val){
      this.currentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 历史股东表格数据
      getOldShareholderData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.oldShareholderTotal = 2;
          this.oldShareholderData = [
          {
            oldShareholderName:"贾言秀",
            scale:"50%",
            shouldQuota:"500.0万元",
            shouldTime:"2016-07-20",
            sharesTime:"2016-07-20",
            exitTime:"2020-03-05",
          },
          {
            oldShareholderName:"章建平",
            scale:"50%",
            shouldQuota:"500.0万元",
            shouldTime:"2014-01-03",
            sharesTime:"2014-01-03",
            exitTime:"2020-03-05",
          },
        ];
        },
      // 历史股东信息分页
      oldShareholderCurrentChange(val){
      this.oldShareholderCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 股权变更表格数据
      getStockRightData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.stockRightTotal = 2;
          this.stockRightData = [
          {
            changeType:"股权变更",
            changeTime:"2016-12-31",
            shareholderName:"张雷",
            beforeChangeQuota:"663万元",
            afterChangeQuota:"500万元",
            beforeChangeOccupy:"19.35%",
            afterChangeOccupy:"16.9%",
          },
          {
            changeType:"股权变更",
            changeTime:"2014-12-01",
            shareholderName:"王家骐",
            beforeChangeQuota:"300万元",
            afterChangeQuota:"500万元",
            beforeChangeOccupy:"9.51%",
            afterChangeOccupy:"16.9%",
          },
        ];
        },
      // 股权变更分页
      stockRightCurrentChange(val){
      this.stockRightCurrentPage = val;
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
  .table{
    width: 100%;
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>