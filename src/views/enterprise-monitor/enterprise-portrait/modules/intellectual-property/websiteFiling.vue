<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab.startsWith('网站备案'),disabled:websiteFilingTotal == 0}">网站备案 {{websiteFilingTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('历史网站备案'),disabled:oldWebsiteFilingTotal == 0}">历史网站备案 {{oldWebsiteFilingTotal}}</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('网站备案')"
       :data="websiteFilingData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="auditDate" label="审核日期" width="239"></el-table-column>
      <el-table-column prop="homePage" label="网站首页" width="239">
        <template slot-scope="scope">
            <span class="homePage">{{scope.row.homePage}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="domainName" label="域名" width="239"></el-table-column>
      <el-table-column prop="websiteFiling" label="网站备案/许可证书" width="240"></el-table-column>
      <el-table-column prop="registerAuthority" label="登记机关" width="239"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('网站备案') && websiteFilingTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="websiteFilingPageSize"
     :total="websiteFilingTotal" 
     :current-page="websiteFilingCurrentPage"
     class="pagination"
     @current-change="websiteFilingCurrentChange">
    </el-pagination>
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab.startsWith('历史网站备案')"
       :data="oldWebsiteFilingData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="auditDate" label="审核日期" width="199"></el-table-column>
      <el-table-column prop="homePage" label="网站首页" width="199">
        <template slot-scope="scope">
            <span class="homePage">{{scope.row.homePage}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="domainName" label="域名" width="199"></el-table-column>
      <el-table-column prop="websiteFiling" label="网站备案/许可证书" width="201"></el-table-column>
      <el-table-column prop="logoutDate" label="注销日期" width="199"></el-table-column>
      <el-table-column prop="registerAuthority" label="登记机关" width="199"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('历史网站备案') && oldWebsiteFilingTotal > 10"
     background
     layout="total, prev, pager, next"
     :page-size="oldWebsiteFilingPageSize"
     :total="oldWebsiteFilingTotal" 
     :current-page="oldWebsiteFilingCurrentPage"
     class="pagination"
     @current-change="oldWebsiteFilingCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"",
        websiteFilingData:[],
        oldWebsiteFilingData:[],
        // 网站备案分页
        websiteFilingCurrentPage:1,
        websiteFilingPageSize:10,
        websiteFilingTotal:0,
        // 历史网站备案分页
        oldWebsiteFilingCurrentPage:1,
        oldWebsiteFilingPageSize:10,
        oldWebsiteFilingTotal:0,
      };
    },
    created(){
      this.getWebsiteFilingData();
      this.getOldWebsiteFilingData();
      this.defaultTab();
    },
    methods: {
      // 每次页面刷新自动选中第一个非零tab项
      defaultTab(){
        if(this.websiteFilingTotal){
          this.selectTab = "网站备案";
        }else if(this.oldWebsiteFilingTotal){
          this.selectTab = "历史网站备案";
        }else{
          return;
        }
      },
      // 网站备案表格数据
      getWebsiteFilingData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.websiteFilingTotal = 3;
          this.websiteFilingData = [
          {
            auditDate:"2022-03-13",
            homePage:"202.111.178.13",
            domainName:"202.111.178.13",
            websiteFiling:"吉ICP备15001825号-4",
            registerAuthority:"",
          },
          {
            auditDate:"2022-03-13",
            homePage:"www.600089.com.cn",
            domainName:"600089.com.cn",
            websiteFiling:"吉ICP备15001825号-4",
            registerAuthority:"",
          },
          {
            auditDate:"2022-03-13",
            homePage:"202.111.178.13",
            domainName:"202.111.178.13",
            websiteFiling:"吉ICP备15001825号-4",
            registerAuthority:"",
          },
        ];
      },
      // 网站备案分页
      websiteFilingCurrentChange(val){
      this.websiteFilingCurrentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
      },
      // 历史网站备案表格数据
      getOldWebsiteFilingData(){
        // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
          this.oldWebsiteFilingTotal = 3;
          this.oldWebsiteFilingData = [
          {
            auditDate:"2022-03-13",
            homePage:"202.111.178.13",
            domainName:"202.111.178.13",
            websiteFiling:"吉ICP备15001825号-4",
            logoutDate:"",
            registerAuthority:"",
          },
          {
            auditDate:"2022-03-13",
            homePage:"www.600089.com.cn",
            domainName:"600089.com.cn",
            websiteFiling:"吉ICP备15001825号-4",
            logoutDate:"",
            registerAuthority:"",
          },
          {
            auditDate:"2022-03-13",
            homePage:"202.111.178.13",
            domainName:"202.111.178.13",
            websiteFiling:"吉ICP备15001825号-4",
            logoutDate:"",
            registerAuthority:"",
          },
        ];
      },
      // 历史网站备案分页
      oldWebsiteFilingCurrentChange(val){
      this.oldWebsiteFilingCurrentPage = val;
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
  .homePage{
    color:rgba(55, 87, 255, 1);
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>