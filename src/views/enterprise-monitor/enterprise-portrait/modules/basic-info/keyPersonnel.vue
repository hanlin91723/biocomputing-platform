<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab.startsWith('主要人员'),disabled:keyPersonnelTotal == 0}">主要人员 {{keyPersonnelTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('历史高管'),disabled:oldManagerTotal == 0}">历史高管 {{oldManagerTotal}}</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('主要人员')"
       :data="keyPersonnelData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="fullName" label="姓名" width="598"></el-table-column>
      <el-table-column prop="position" label="职位" width="598"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('主要人员') && keyPersonnelTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="keyPersonnelPageSize"
     :total="keyPersonnelTotal" 
     :current-page="keyPersonnelCurrentPage"
     class="pagination"
     @current-change="keyPersonnelCurrentChange">
    </el-pagination>
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('历史高管')"
       :data="oldManagerData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="fullName" label="姓名" width="596"></el-table-column>
      <el-table-column prop="position" label="职位" width="200"></el-table-column>
      <el-table-column prop="InductionTime" label="入职日期" width="200"></el-table-column>
      <el-table-column prop="quitTime" label="离职日期" width="200"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('历史高管') && oldManagerTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="oldManagerPageSize"
     :total="oldManagerTotal" 
     :current-page="oldManagerCurrentPage"
     class="pagination"
     @current-change="oldManagerCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"",
        keyPersonnelData:[],
        oldManagerData:[],
        // 主要人员分页
        keyPersonnelCurrentPage:1,
        keyPersonnelPageSize:10,
        keyPersonnelTotal:0,
        // 历史高管分页
        oldManagerCurrentPage:1,
        oldManagerPageSize:10,
        oldManagerTotal:0,
      };
    },
    created(){
      this.getKeyPersonnelData();
      this.getOldManagerData();
      this.defaultTab();
    },
    methods: {
      // 每次页面刷新自动选中第一个非零tab项
      defaultTab(){
        if(this.keyPersonnelTotal){
          this.selectTab = "主要人员";
        }else if(this.oldManagerTotal){
          this.selectTab = "历史高管";
        }else{
          return;
        }
      },
      // 主要人员表格数据
      getKeyPersonnelData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.keyPersonnelTotal = 3;
          this.keyPersonnelData = [
          {
            fullName:"周建",
            position:"董事长，总经理",
          },
          {
            fullName:"陈方瑜",
            position:"董事",
          },
          {
            fullName:"陈奕璇",
            position:"监事",
          },
        ];
      },
      // 主要人员分页
      keyPersonnelCurrentChange(val){
      this.keyPersonnelCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 历史高管表格数据
      getOldManagerData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.oldManagerTotal = 3;
          this.oldManagerData = [
          {
            fullName:"施建新",
            position:"",
            InductionTime:"2016-07-20",
            quitTime:"2020-03-05",
          },
          {
            fullName:"张广辉",
            position:"",
            InductionTime:"2014-01-03",
            quitTime:"2020-03-05",
          },
          {
            fullName:"陈浩",
            position:"",
            InductionTime:"2016-07-20",
            quitTime:"2020-03-05",
          },
        ];
      },
      // 历史高管分页
      oldManagerCurrentChange(val){
      this.oldManagerCurrentPage = val;
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