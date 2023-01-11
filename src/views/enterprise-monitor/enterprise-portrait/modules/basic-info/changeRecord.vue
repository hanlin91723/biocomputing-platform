<template>
  <div>
    <h3 class="title">变更记录 {{ changeTotal }}</h3>
    <el-table
      :data="changeData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="changeProject" label="变更项目"></el-table-column>
      <el-table-column
        prop="changeTime"
        label="变更日期"
        width="299"
      ></el-table-column>
      <el-table-column
        prop="beforeInfo"
        label="变更前信息"
        width="299"
      ></el-table-column>
      <el-table-column
        prop="afterInfo"
        label="变更后信息"
        width="299"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="changeTotal > 10"
      layout="total, prev, pager, next"
      :page-size="changePageSize"
      :total="changeTotal"
      :current-page="changeCurrentPage"
      class="pagination"
      @current-change="changeCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      changeData: [],
      // 变更记录分页
      changeCurrentPage: 1,
      changePageSize: 10,
      changeTotal: 0,
    };
  },
  created() {
    this.getChangeData();
  },
  methods: {
    // 变更记录表格数据
    getChangeData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.changeCurrentPage,
        pageSize: this.changePageSize,
      };
      this.$axios.post("/entInfo/changeRecord", params).then(({ data }) => {
        this.changeTotal = data.total;
        this.changeData = data.list.map((item) => {
          return {
            changeProject: item.altitem,
            changeTime: item.altDate?.split(" ")[0],
            beforeInfo: item.altbe,
            afterInfo: item.altaf,
          };
        });
      });
    },
    // 变更记录分页
    changeCurrentChange(val) {
      this.changeCurrentPage = val;
      this.getChangeData();
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
