<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab.startsWith('股东信息'),disabled:shareholderTotal == 0}">股东信息 {{shareholderTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('历史股东信息'),disabled:oldShareholderTotal == 0}">历史股东信息 {{oldShareholderTotal}}</span>
      <span :class="{titleItem:true,active:selectTab.startsWith('股东变更'),disabled:stockRightTotal == 0}">股东变更 {{stockRightTotal}}</span>
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
    <!-- 股东变更表格 -->
    <el-table
       v-show="selectTab.startsWith('股东变更')"
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
      <el-table-column prop="beforeChangeQuota" label="变更前认缴金额" width="170"></el-table-column>
      <el-table-column prop="afterChangeQuota" label="变更后认缴金额" width="170"></el-table-column>
      <el-table-column prop="beforeChangeOccupy" label="变动前投资占比" width="170"></el-table-column>
      <el-table-column prop="afterChangeOccupy" label="变动后投资占比" width="170"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
     v-show="selectTab.startsWith('股东变更') && stockRightTotal > 10"
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
import { useUserStore } from "@/store/index.js";
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
        // 股东变更分页
        stockRightCurrentPage:1,
        stockRightPageSize:10,
        stockRightTotal:0,
      };
    },
    created(){
      this.getShareholderData();
      this.getOldShareholderData();
      this.getStockRightData();
    },
    watch:{
      shareholderTotal(){
        this.defaultTab();
      },
      oldShareholderTotal(){
        this.defaultTab();
      },
      stockRightTotal(){
        this.defaultTab();
      },
    },
    methods: {
      // 每次页面刷新自动选中第一个非零tab项
      defaultTab(){
        if(this.shareholderTotal){
          this.selectTab = "股东信息";
        }else if(this.oldShareholderTotal){
          this.selectTab = "历史股东信息";
        }else if(this.stockRightTotal){
          this.selectTab = "股东变更";
        }else{
          return;
        }
      },
      // 股东信息表格数据
      getShareholderData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.shareholderCurrentPage,
          pageSize:this.shareholderPageSize,
        };
        this.$axios.post("/entInfo/shareholderContr",params).then(({data,})=>{
          this.shareholderTotal = data.total;
          this.shareholderData = data.list.map(item=>{
            return {
              shareholder:item.inv,
              scale:item.conprop,
            };
          });
        });
      },
      // 股东信息分页
      shareholderCurrentChange(val){
        this.shareholderCurrentPage = val;
        this.getShareholderData();
      },
      // 历史股东表格数据
      getOldShareholderData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.oldShareholderCurrentPage,
          pageSize:this.oldShareholderPageSize,
        };
        this.$axios.post("/entInfo/hisShareholders",params).then(({data,})=>{
          this.oldShareholderTotal = data.total;
          this.oldShareholderData = data.list.map(item=>{
            return {
              oldShareholderName:item.inv,
              scale:"",
              shouldQuota:"",
              shouldTime:"",
              sharesTime:item.inDate?.split("T")[0],
              exitTime:item.outDate,
            };
          });
        });
        },
      // 历史股东信息分页
      oldShareholderCurrentChange(val){
        this.oldShareholderCurrentPage = val;
        this.getOldShareholderData();
      },
      // 股东变更表格数据
      getStockRightData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.stockRightCurrentPage,
          pageSize:this.stockRightPageSize,
        };
        this.$axios.post("/entInfo/histShareholderChange",params).then(({data,})=>{
          this.stockRightTotal = data.total;
          this.stockRightData = data.list.map(item=>{
            return {
              changeType:item.changeName,
              changeTime:item.changeDate,
              shareholderName:item.inv,
              beforeChangeQuota:item.conamBefore,
              afterChangeQuota:item.conamAfter,
              beforeChangeOccupy:item.conpropBefore+"%",
              afterChangeOccupy:item.conpropAfter+"%",
            };
          });
        });
        },
      // 股东变更分页
      stockRightCurrentChange(val){
        this.stockRightCurrentPage = val;
        this.getStockRightData();
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
  .table{
    width: 100%;
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>