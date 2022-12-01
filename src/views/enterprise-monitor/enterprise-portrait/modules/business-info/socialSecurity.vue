<template>
  <div>
    <h3 class="title">社保</h3>
    <table class="security-table">
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">社保年份</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >年份</td>
            <td class="security-value">2021年</td>
            <td class="security-value">2020年</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">发布时间</td>
            <td class="security-value">2022-06-15</td>
            <td class="security-value">2022-06-1</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">社保信息</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险人数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险人数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险人数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险人数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险人数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">单位缴费基数</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险缴费基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险缴费基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险缴费基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险缴费基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险缴费基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">本期实际缴费基数</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险实缴基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险实缴基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险实缴基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险实缴基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险实缴基数</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-title" colspan="3">单位累计欠款金额</td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name" >城镇职工养老保险累计欠缴</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">失业保险累计欠缴</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
          <tr class="security-table-tr">
            <td class="security-name">职工医疗保险累计欠缴</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">工伤保险累计欠缴</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr><tr class="security-table-tr">
            <td class="security-name">生育保险累计欠缴</td>
            <td class="security-value"></td>
            <td class="security-value"></td>
          </tr>
        </table>
  </div>
</template>

<script>
  export default {
    
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
</style>