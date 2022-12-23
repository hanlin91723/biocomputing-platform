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
      <el-table-column prop="fullName" label="姓名"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
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
      <el-table-column prop="position" label="职位"></el-table-column>
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
import { useUserStore } from "@/store/index.js";
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
    },
    watch:{
      keyPersonnelTotal(){
        this.defaultTab();
      },
      oldManagerTotal(){
        this.defaultTab();
      },
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
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.keyPersonnelCurrentPage,
          pageSize:this.keyPersonnelPageSize,
        };
        this.$axios.post("/entInfo/mainstaff",params).then(({data,})=>{
          this.keyPersonnelTotal = data.total;
          this.keyPersonnelData = data.list.map(item=>{
            return {
              fullName:item.staffName,
              position:item.positionName,
            };
          });
        });
      },
      // 主要人员分页
      keyPersonnelCurrentChange(val){
      this.keyPersonnelCurrentPage = val;
      this.getKeyPersonnelData();
      },
      // 历史高管表格数据
      getOldManagerData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.oldManagerCurrentPage,
          pageSize:this.oldManagerPageSize,
        };
        this.$axios.post("/entInfo/hisExecutives",params).then(({data,})=>{
          this.oldManagerTotal = data.total;
          this.oldManagerData = data.list.map(item=>{
            return {
              fullName:item.name,
              position:item.positionName,
              InductionTime:item.inDate?.split("T")[0],
              quitTime:item.outDate,
            };
          });
        });
      },
      // 历史高管分页
      oldManagerCurrentChange(val){
      this.oldManagerCurrentPage = val;
      this.getOldManagerData();
      },
      // tab切换
      handleTab(e){
        if (e.target.className === "title" || e.target.innerText.split(" ")[1] === "0") return;
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