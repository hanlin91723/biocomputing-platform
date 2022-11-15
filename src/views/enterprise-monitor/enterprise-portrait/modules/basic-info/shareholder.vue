<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span :class="{titleItem:true,active:selectTab==`股东信息`}">股东信息</span>
      <span :class="{titleItem:true,active:selectTab==`历史股东信息`}">历史股东信息</span>
      <span :class="{titleItem:true,active:selectTab==`股权变更`}">股权变更</span>
    </div>
    <!-- 股东信息表格 -->
    <el-table
       v-show="selectTab==`股东信息`"
       :data="shareholderData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="shareholder" label="股东名称" width="196"></el-table-column>
      <el-table-column prop="scale" label="出资比例" width="100"></el-table-column>
      <el-table-column prop="shouldQuota" label="认缴出资额" width="150"></el-table-column>
      <el-table-column prop="shouldTime" label="认缴出资日期" width="150"></el-table-column>
      <el-table-column prop="shouldMode" label="认缴出资方式" width="150"></el-table-column>
      <el-table-column prop="actualQuota" label="实缴出资额" width="150"></el-table-column>
      <el-table-column prop="actualTime" label="实缴出资日期" width="150"></el-table-column>
      <el-table-column prop="actualMode" label="实缴出资方式" width="150"></el-table-column>
    </el-table>
    <!-- 历史股东信息表格 -->
    <el-table
       v-show="selectTab==`历史股东信息`"
       :data="oldShareholderData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="oldShareholderName" label="历史股东名称" width="200"></el-table-column>
      <el-table-column prop="scale" label="出资比例" width="196"></el-table-column>
      <el-table-column prop="shouldQuota" label="认缴出资额" width="200"></el-table-column>
      <el-table-column prop="shouldTime" label="认缴出资日期" width="200"></el-table-column>
      <el-table-column prop="sharesTime" label="入股日期" width="200"></el-table-column>
      <el-table-column prop="exitTime" label="退出日期" width="200"></el-table-column>
    </el-table>
    <!-- 股权变更表格 -->
    <el-table
       v-show="selectTab==`股权变更`"
       :data="stockRightData"
       style="width: 100%"
       border
       :cell-style="{'text-align':'center'}"
       :header-cell-style="{
        backgroundColor:'#f0f7fc',
        'text-align':'center'
        }">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="changeType" label="变动类型" width="175"></el-table-column>
      <el-table-column prop="changeTime" label="变动日期" width="170"></el-table-column>
      <el-table-column prop="shareholderName" label="股东名称" width="170"></el-table-column>
      <el-table-column prop="beforeChangeQuota" label="变更前投资额" width="170"></el-table-column>
      <el-table-column prop="afterChangeQuota" label="变更后投资额" width="170"></el-table-column>
      <el-table-column prop="beforeChangeOccupy" label="变更前股权占比" width="170"></el-table-column>
      <el-table-column prop="afterChangeOccupy" label="变更后股权占比" width="170"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectTab:"股东信息",
        shareholderData:[
          {
            shareholder:"周建",
            scale:"50%",
            shouldQuota:'500.0万元',
            shouldTime:"2036-07-28",
          },
          {
            shareholder:"天广中茂股份有限公司",
            scale:"50%",
            shouldQuota:'500.0万元',
            shouldTime:"2036-07-28",
          },
        ],
        oldShareholderData:[
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
        ],
        stockRightData:[
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
        ],
      };
    },
    methods: {
      handleTab(e){
        if (e.target.className === "title") return;
        this.selectTab = e.target.innerText;
      }
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