<template>
  <div>
    <h3 class="title">百科介绍</h3>
    <table class="project-table">
      <tr class="project-table-tr">
        <td class="project-name">官网网址</td>
        <td class="project-value">{{ infoData?.webSite }}</td>
        <td class="project-name">ICP备案号</td>
        <td class="project-value">{{ infoData?.icpNum }}</td>
        <td class="project-name">经营范围</td>
        <td class="project-value">{{ infoData?.businessScope }}</td>
      </tr>
      <tr class="project-table-tr">
        <td class="project-name">网站标题</td>
        <td class="project-value">{{ infoData?.headTitle }}</td>
        <td class="project-name">网站关键词</td>
        <td class="project-value">{{ infoData?.headKeywords }}</td>
        <td class="project-name">网站描述</td>
        <td class="project-value">{{ infoData?.headDescription }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      infoData: {},
      // 分页
      currentPage: 1,
      pageSize: 1,
      total: 0,
    };
  },
  created() {
    this.getInfoData();
  },
  methods: {
    // 获取数据
    getInfoData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$axios
        .post("/riskManager/other/introEncy", params)
        .then(({ data }) => {
          this.total = data.total;
          this.infoData = data.list[0];
        });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  margin-bottom: 12px;
}
</style>
