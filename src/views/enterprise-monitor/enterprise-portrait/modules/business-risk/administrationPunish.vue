<template>
  <div>
    <h3 class="title">行政处罚 {{ administrationPunishTotal }}</h3>
    <el-table
      :data="administrationPunishData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column
        label="序号"
        width="50"
        type="index"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column prop="penDecIssDate" label="处罚日期"></el-table-column>
      <el-table-column prop="penDecNo" label="决定文书号"></el-table-column>
      <el-table-column prop="caseReason" label="处罚事由"></el-table-column>
      <el-table-column prop="caseType" label="违法行为类型"></el-table-column>
      <el-table-column prop="penResult" label="处罚结果"></el-table-column>
      <el-table-column prop="penAuthName" label="处罚单位"></el-table-column>
      <el-table-column prop="dataSource" label="数据来源"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="administrationPunishTotal > 10"
      layout="total, prev, pager, next"
      :page-size="administrationPunishPageSize"
      :total="administrationPunishTotal"
      :current-page="administrationPunishCurrentPage"
      class="pagination"
      @current-change="administrationPunishCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      administrationPunishData: [],
      // 变更记录分页
      administrationPunishCurrentPage: 1,
      administrationPunishPageSize: 10,
      administrationPunishTotal: 0,
    };
  },
  created() {
    this.getAdministrationPunishData();
  },
  methods: {
    // 变更记录表格数据
    getAdministrationPunishData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.administrationPunishCurrentPage,
        pageSize: this.administrationPunishPageSize,
      };
      this.$axios
        .post("/riskManager/businessRisk/adminPenalty", params)
        .then(({ data }) => {
          this.administrationPunishTotal = data.total;
          this.administrationPunishData = data.list;
        });
    },
    // 变更记录分页
    administrationPunishCurrentChange(val) {
      this.administrationPunishCurrentPage = val;
      this.getAdministrationPunishData();
    },
    indexMethod(index) {
      return (
        (this.administrationPunishCurrentPage - 1) *
          this.administrationPunishPageSize +
        index +
        1
      );
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
