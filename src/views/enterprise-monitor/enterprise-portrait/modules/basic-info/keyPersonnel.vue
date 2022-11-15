<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab==`主要人员`}">主要人员</span>
      <span :class="{titleItem:true,active:selectTab==`历史高管`}">历史高管</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab==`主要人员`"
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
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab==`历史高管`"
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"主要人员",
        keyPersonnelData:[
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
        ],
        oldManagerData:[
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
        ],
      };
    },
    methods: {
      handleTab(e){
        if (e.target.className === "title") return;
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
    }
  }
</style>