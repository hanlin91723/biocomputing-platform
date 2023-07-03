<template>
  <div>
    <h3 class="title">信用评价 {{ creditTotal }}</h3>
    <el-table
      :data="creditData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="company" label="评级公司"></el-table-column>
      <el-table-column
        prop="subjectGrade"
        label="主体信用等级"
        width="239"
      ></el-table-column>
      <el-table-column
        prop="DebtGrade"
        label="债项信用等级"
        width="239"
      ></el-table-column>
      <el-table-column prop="expectation" label="展望"></el-table-column>
      <el-table-column
        prop="dateTime"
        label="评级/发布日期"
        width="239"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="creditTotal > 10"
      layout="total, prev, pager, next"
      :page-size="creditPageSize"
      :total="creditTotal"
      :current-page="creditCurrentPage"
      class="pagination"
      @current-change="creditCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      creditData: [],
      // 变更记录分页
      creditCurrentPage: 1,
      creditPageSize: 10,
      creditTotal: 0,
    };
  },
  created() {
    this.getCreditData();
  },
  methods: {
    // 变更记录表格数据
    getCreditData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.creditCurrentPage,
        pageSize: this.creditPageSize,
      };
      this.$axios
        .post("/riskManager/businessInfo/creditLevel", params)
        .then(({ data }) => {
          this.creditTotal = data.total;
          this.creditData = data.list.map((item) => {
            return {
              company: item.ratingEntName,
              subjectGrade: item.subjectLevel,
              DebtGrade: item.bondCreditLevel,
              expectation: item.ratingOutLook,
              dateTime: item.ratingDate,
            };
          });
        });
    },
    // 变更记录分页
    creditCurrentChange(val) {
      this.creditCurrentPage = val;
      this.getCreditData();
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
