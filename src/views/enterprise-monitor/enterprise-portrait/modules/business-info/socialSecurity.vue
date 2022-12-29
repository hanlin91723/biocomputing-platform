<template>
  <div>
    <h3 class="title">社保</h3>
    <table class="security-table">
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">社保年份</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >年份</td>
            <td class="security-value">{{infoData[0]?.ancheYear || '--'}}年</td>
            <td class="security-value">{{infoData[1]?.ancheYear || '--'}}年</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">发布时间</td>
            <td class="security-value">{{infoData[0]?.ancheDate}}</td>
            <td class="security-value">{{infoData[1]?.ancheDate}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">社保信息</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险人数</td>
            <td class="security-value">{{infoData[0]?.so1}}</td>
            <td class="security-value">{{infoData[1]?.so1}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险人数</td>
            <td class="security-value">{{infoData[0]?.so2}}</td>
            <td class="security-value">{{infoData[1]?.so2}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险人数</td>
            <td class="security-value">{{infoData[0]?.so3}}</td>
            <td class="security-value">{{infoData[1]?.so3}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险人数</td>
            <td class="security-value">{{infoData[0]?.so4}}</td>
            <td class="security-value">{{infoData[1]?.so4}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险人数</td>
            <td class="security-value">{{infoData[0]?.so5}}</td>
            <td class="security-value">{{infoData[1]?.so5}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">单位缴费基数</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险缴费基数</td>
            <td class="security-value">{{infoData[0]?.totalWagesSo1}}</td>
            <td class="security-value">{{infoData[1]?.totalWagesSo1}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险缴费基数</td>
            <td class="security-value">{{infoData[0]?.totalWagesSo2}}</td>
            <td class="security-value">{{infoData[1]?.totalWagesSo2}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险缴费基数</td>
            <td class="security-value">{{infoData[0]?.totalWagesSo3}}</td>
            <td class="security-value">{{infoData[1]?.totalWagesSo3}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险缴费基数</td>
            <td class="security-value">{{infoData[0]?.totalWagesSo4}}</td>
            <td class="security-value">{{infoData[1]?.totalWagesSo4}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险缴费基数</td>
            <td class="security-value">{{infoData[0]?.totalWagesSo5}}</td>
            <td class="security-value">{{infoData[1]?.totalWagesSo5}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">本期实际缴费基数</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险实缴基数</td>
            <td class="security-value">{{infoData[0]?.totalPaymentSo1}}</td>
            <td class="security-value">{{infoData[1]?.totalPaymentSo1}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险实缴基数</td>
            <td class="security-value">{{infoData[0]?.totalPaymentSo2}}</td>
            <td class="security-value">{{infoData[1]?.totalPaymentSo2}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险实缴基数</td>
            <td class="security-value">{{infoData[0]?.totalPaymentSo3}}</td>
            <td class="security-value">{{infoData[1]?.totalPaymentSo3}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险实缴基数</td>
            <td class="security-value">{{infoData[0]?.totalPaymentSo4}}</td>
            <td class="security-value">{{infoData[1]?.totalPaymentSo4}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险实缴基数</td>
            <td class="security-value">{{infoData[0]?.totalPaymentSo5}}</td>
            <td class="security-value">{{infoData[1]?.totalPaymentSo5}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">单位累计欠款金额</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险累计欠缴</td>
            <td class="security-value">{{infoData[0]?.unPaidSocialInsSo1}}</td>
            <td class="security-value">{{infoData[1]?.unPaidSocialInsSo1}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险累计欠缴</td>
            <td class="security-value">{{infoData[0]?.unPaidSocialInsSo2}}</td>
            <td class="security-value">{{infoData[1]?.unPaidSocialInsSo2}}</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险累计欠缴</td>
            <td class="security-value">{{infoData[0]?.unPaidSocialInsSo3}}</td>
            <td class="security-value">{{infoData[1]?.unPaidSocialInsSo3}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险累计欠缴</td>
            <td class="security-value">{{infoData[0]?.unPaidSocialInsSo4}}</td>
            <td class="security-value">{{infoData[1]?.unPaidSocialInsSo4}}</td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险累计欠缴</td>
            <td class="security-value">{{infoData[0]?.unPaidSocialInsSo5}}</td>
            <td class="security-value">{{infoData[1]?.unPaidSocialInsSo5}}</td>
          </tr>
    </table>
     <!-- 分页器 -->
     <el-pagination background
       layout="total, prev, pager, next"
       :page-size="pageSize"
       :total="total" 
       :current-page="currentPage"
       class="pagination"
       @current-change="currentChange">
      </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        infoData:[],
        // 分页
        currentPage:1,
        pageSize:2,
        total:0,
      };
    },
    created(){
      this.getInfoData();
    },
    methods:{
      // 获取表格数据
      getInfoData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        };
        this.$axios.post("/businessInfo/socialSecurity",params).then(({data,})=>{
          this.total = data.total;
          this.infoData = data.list;
        });
      },
      // 分页
      currentChange(val){
        this.currentPage = val;
        this.getInfoData();
      },
    },
  };
</script>

<style lang="less" scoped>
.title{
  font-size: 16px;
  margin-bottom: 12px;
}
.security-table {
  table-layout: fixed;
  // border-collapse: collapse;
  border-collapse: separate;
  width: 100%;
  // border-spacing: 0 2px;
  .security-title {
    width: 1389px;
    min-height: 39px;
    padding: 8px;
    font-size: 13px;
    text-align: left;
    color: #606266;
    background-color: #f0f7fc;
    border: 1px solid #e4eef6;
  }
  .security-name,.security-value {
    width: 296px;
    padding: 8px;
    font-size: 13px;
    text-align: left;
    color: #606266;
    border: 1px solid #e4eef6;
  }
  .security-value{
    width: 630px;
    text-align: center;
  }
}
.pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>