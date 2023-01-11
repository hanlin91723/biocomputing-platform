<template>
  <div>
    <h3 class="title">行政许可 {{ administrationTotal }}</h3>
    <el-table
      :data="administrationData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        prop="permitNumber"
        label="许可文件编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="permitName" label="许可文件名称"></el-table-column>
      <el-table-column
        prop="validBegin"
        label="有效期自"
        width="199"
      ></el-table-column>
      <el-table-column
        prop="validEnd"
        label="有效期至"
        width="199"
      ></el-table-column>
      <el-table-column
        prop="licensingAuthority"
        label="许可机关"
      ></el-table-column>
      <el-table-column
        prop="licensingContent"
        label="许可内容"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="administrationTotal > 10"
      layout="total, prev, pager, next"
      :page-size="administrationPageSize"
      :total="administrationTotal"
      :current-page="administrationCurrentPage"
      class="pagination"
      @current-change="administrationCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      administrationData: [],
      // 变更记录分页
      administrationCurrentPage: 1,
      administrationPageSize: 10,
      administrationTotal: 0,
    };
  },
  created() {
    this.getAdministrationData();
  },
  methods: {
    // 变更记录表格数据
    getAdministrationData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.administrationCurrentPage,
        pageSize: this.administrationPageSize,
      };
      this.$axios
        .post("/businessInfo/administrativeLicense", params)
        .then(({ data }) => {
          this.administrationTotal = data.total;
          this.administrationData = data.list.map((item) => {
            return {
              permitNumber: item.licCode,
              permitName: item.licName,
              validBegin: item.valForm,
              validEnd: item.valTo,
              licensingAuthority: item.licAnth,
              licensingContent: item.licContent,
            };
          });
        });
    },
    // 变更记录分页
    administrationCurrentChange(val) {
      this.administrationCurrentPage = val;
      this.getAdministrationData();
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
