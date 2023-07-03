<template>
  <div>
    <h3 class="title">欠税记录 {{ taxRecordTotal }}</h3>
    <div class="subtitle">欠税金额合计{{ amountTotal }}元</div>
    <el-table
      :data="taxRecordData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        prop="pubTime"
        label="发布日期"
        width="199"
      ></el-table-column>
      <el-table-column
        prop="qNum"
        label="纳税人识别号"
        width="199"
      ></el-table-column>
      <el-table-column prop="taxType" label="欠税税种"></el-table-column>
      <el-table-column
        prop="cAmount"
        label="当前新发生的欠税余额"
        width="199"
      ></el-table-column>
      <el-table-column
        prop="debt"
        label="欠税余额"
        width="199"
      ></el-table-column>
      <el-table-column prop="taxOrg" label="税务机关"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="taxRecordTotal > 10"
      layout="total, prev, pager, next"
      :page-size="taxRecordPageSize"
      :total="taxRecordTotal"
      :current-page="taxRecordCurrentPage"
      class="pagination"
      @current-change="taxRecordCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      taxRecordData: [],
      amountTotal: 0,
      // 变更记录分页
      taxRecordCurrentPage: 1,
      taxRecordPageSize: 10,
      taxRecordTotal: 0,
    };
  },
  created() {
    this.getTaxRecordData();
  },
  methods: {
    // 变更记录表格数据
    getTaxRecordData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.taxRecordCurrentPage,
        pageSize: this.taxRecordPageSize,
      };
      this.$axios
        .post("/riskManager/businessRisk/taxArrears", params)
        .then(({ data, total }) => {
          this.amountTotal = total;
          this.taxRecordTotal = data.total;
          this.taxRecordData = data.list;
        });
    },
    // 变更记录分页
    taxRecordCurrentChange(val) {
      this.taxRecordCurrentPage = val;
      this.getTaxRecordData();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  margin-bottom: 12px;
}
.subtitle {
  margin-bottom: 12px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
