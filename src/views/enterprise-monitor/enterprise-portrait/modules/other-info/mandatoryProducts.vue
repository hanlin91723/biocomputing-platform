<template>
  <div>
    <h3 class="title">强制性产品认证 {{ mandatoryProductsTotal }}</h3>
    <el-table
      :data="mandatoryProductsData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称及单元"
        width="170"
      ></el-table-column>
      <el-table-column
        prop="certificateStatus"
        label="证书状态"
        width="156"
      ></el-table-column>
      <el-table-column
        prop="issuingAuthority"
        label="发证机构"
      ></el-table-column>
      <el-table-column
        prop="standard"
        label="认证依据的标准和技术要求"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="certificationTime"
        label="颁证日期"
        width="170"
      ></el-table-column>
      <el-table-column
        prop="certificateExpireTime"
        label="证书到期日期"
        width="170"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="mandatoryProductsTotal > 10"
      layout="total, prev, pager, next"
      :page-size="mandatoryProductsPageSize"
      :total="mandatoryProductsTotal"
      :current-page="mandatoryProductsCurrentPage"
      class="pagination"
      @current-change="mandatoryProductsCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      mandatoryProductsData: [],
      // 变更记录分页
      mandatoryProductsCurrentPage: 1,
      mandatoryProductsPageSize: 10,
      mandatoryProductsTotal: 0,
    };
  },
  created() {
    this.getMandatoryProductsData();
  },
  methods: {
    // 变更记录表格数据
    getMandatoryProductsData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.copyrightCurrentPage,
        pageSize: this.copyrightPageSize,
      };
      this.$axios.post("/other/mandatoryProduct", params).then(({ data }) => {
        this.mandatoryProductsTotal = data.total;
        this.mandatoryProductsData = data.list.map((item) => {
          return {
            projectName: item.certProject,
            productName: item.productName,
            certificateStatus: item.certStatus,
            issuingAuthority: item.orgNum,
            standard: item.certBasis,
            certificationTime: item.awardDate,
            certificateExpireTime: item.expireDate,
          };
        });
      });
    },
    // 变更记录分页
    mandatoryProductsCurrentChange(val) {
      this.mandatoryProductsCurrentPage = val;
      this.getMandatoryProductsData();
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
