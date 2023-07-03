<template>
  <div>
    <h3 class="title">终本案件 {{ finalCaseTotal }}</h3>
    <el-table
      :data="finalCaseData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="referenceNum" label="案号"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="finalCaseTotal > 10"
      layout="total, prev, pager, next"
      :page-size="finalCasePageSize"
      :total="finalCaseTotal"
      :current-page="finalCaseCurrentPage"
      class="pagination"
      @current-change="finalCaseCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      finalCaseData: [],
      // 变更记录分页
      finalCaseCurrentPage: 1,
      finalCasePageSize: 10,
      finalCaseTotal: 0,
    };
  },
  created() {
    this.getFinalCaseData();
  },
  methods: {
    // 变更记录表格数据
    getFinalCaseData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$axios
        .post("/riskManager/judicial/closingCase", params)
        .then(({ data }) => {
          this.finalCaseTotal = data.total;
          this.finalCaseData = data.list.map((item) => {
            return {
              referenceNum: item.caseCode,
            };
          });
        });
    },
    // 变更记录分页
    finalCaseCurrentChange(val) {
      this.finalCaseCurrentPage = val;
      this.getFinalCaseData();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  margin-bottom: 12px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
