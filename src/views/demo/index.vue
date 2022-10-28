<template>
  <el-tabs class="info-list" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane class="info-item" label="用户管理" name="first"
      >用户管理</el-tab-pane
    >
    <el-tab-pane
      class="info-item"
      label="配置管理"
      name="second"
      style="text-align: center"
      >配置管理</el-tab-pane
    >
    <el-tab-pane class="info-item" label="角色管理" name="third"
      >角色管理</el-tab-pane
    >
    <el-tab-pane class="info-item" label="定时任务补偿" name="fourth"
      >定时任务补偿</el-tab-pane
    >
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second', //范德萨
      aaa: '放松撒接口了', //范德萨
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
@bb: #ff0;

.info-list {
  line-height: 20px;
  list-style-type: disc;
  list-style-position: inside;

  .info-item {
    font-size: 20px;
    color: @abc;
  }
}
</style>
