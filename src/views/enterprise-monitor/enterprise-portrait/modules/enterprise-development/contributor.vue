<template>
  <div>
    <h3 class="title">股东（发起人）及出资信息</h3>
    <el-table
      :data="contributorData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="inv" label="股东名称"></el-table-column>
      <el-table-column prop="subconam" label="出资金额">
        <template slot-scope="{ row }">
          {{ row.conMoney + row.conMoneyUnit }}
        </template>
      </el-table-column>
      <el-table-column prop="conprop" label="出资比例">
        <template slot-scope="{ row }"> {{ row.conprop }}% </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="contributorTotal > 10"
      layout="total, prev, pager, next"
      :page-size="contributorPageSize"
      :total="contributorTotal"
      :current-page="contributorCurrentPage"
      class="pagination"
      @current-change="contributorCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      contributorData: [],
      // 变更记录分页
      contributorCurrentPage: 1,
      contributorPageSize: 10,
      contributorTotal: 0,
    };
  },
  created() {
    this.getContributorData();
  },
  methods: {
    // 变更记录表格数据
    getContributorData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.contributorCurrentPage,
        pageSize: this.contributorPageSize,
      };
      this.$axios
        .post("/riskManager/develop/contribution", params)
        .then(({ data }) => {
          this.contributorTotal = data.total;
          this.contributorData = data.list;
        });
    },
    // 变更记录分页
    contributorCurrentChange(val) {
      this.contributorCurrentPage = val;
      this.getContributorData();
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
