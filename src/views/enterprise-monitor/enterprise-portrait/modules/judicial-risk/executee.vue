<template>
  <div>
    <h3 class="title">被执行人 {{ executeeTotal }}</h3>
    <div class="subtitle">
      执行标的金额总额 {{ formatter(totalMoney) || "--" }}元
    </div>
    <el-table
      :data="executeeData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        prop="referenceNum"
        label="案号"
        width="259"
      ></el-table-column>
      <el-table-column
        prop="IDCard"
        label="被执行人身份证号码/组织机构代码"
        width="249"
      ></el-table-column>
      <el-table-column
        prop="filingCaseTime"
        label="立案日期"
        width="209"
      ></el-table-column>
      <el-table-column prop="court" label="执行法院"></el-table-column>
      <el-table-column
        prop="amount"
        label="执行标的(元)"
        width="209"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="executeeTotal > 10"
      layout="total, prev, pager, next"
      :page-size="executeePageSize"
      :total="executeeTotal"
      :current-page="executeeCurrentPage"
      class="pagination"
      @current-change="executeeCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
import { formatter } from "@/util/util";
export default {
  data() {
    return {
      totalMoney: 0,
      executeeData: [],
      // 变更记录分页
      executeeCurrentPage: 1,
      executeePageSize: 10,
      executeeTotal: 0,
    };
  },
  created() {
    this.getExecuteeData();
  },
  methods: {
    // 变更记录表格数据
    getExecuteeData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.executeeCurrentPage,
        pageSize: this.executeePageSize,
      };
      this.$axios
        .post("/judicial/personSubjectedExecution", params)
        .then(({ data, total }) => {
          this.executeeTotal = data.total;
          this.totalMoney = total;
          this.executeeData = data.list.map((item) => {
            return {
              referenceNum: item.fssCaseNo,
              IDCard: item.fssRegNo,
              filingCaseTime: item.fssLasj,
              court: item.fssCourtName,
              amount: formatter(item.fssMoney),
            };
          });
        });
    },
    // 变更记录分页
    executeeCurrentChange(val) {
      this.executeeCurrentPage = val;
      this.getExecuteeData();
    },
    formatter(val) {
      return formatter(val);
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
