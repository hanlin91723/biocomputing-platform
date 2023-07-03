<template>
  <div classs="hareholder">
    <div class="title" @click="handleTab">
      <span
        :class="{
          titleItem: true,
          active: selectTab.startsWith('网站备案'),
          disabled: websiteFilingTotal == 0,
        }"
        >网站备案 {{ websiteFilingTotal }}</span
      >
      <span
        :class="{
          titleItem: true,
          active: selectTab.startsWith('历史网站备案'),
          disabled: oldWebsiteFilingTotal == 0,
        }"
        >历史网站备案 {{ oldWebsiteFilingTotal }}</span
      >
    </div>
    <!-- 股东信息表格 -->
    <el-table
      v-show="selectTab.startsWith('网站备案')"
      :data="websiteFilingData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        prop="auditDate"
        label="审核日期"
        width="239"
      ></el-table-column>
      <el-table-column prop="homePage" label="网站首页" width="239">
        <template slot-scope="scope">
          <span class="homePage">{{ scope.row.homePage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="domainName"
        label="域名"
        width="239"
      ></el-table-column>
      <el-table-column
        prop="websiteFiling"
        label="网站备案/许可证书"
      ></el-table-column>
      <el-table-column
        prop="registerAuthority"
        label="登记机关"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-show="selectTab.startsWith('网站备案') && websiteFilingTotal > 10"
      background
      layout="total, prev, pager, next"
      :page-size="websiteFilingPageSize"
      :total="websiteFilingTotal"
      :current-page="websiteFilingCurrentPage"
      class="pagination"
      @current-change="websiteFilingCurrentChange"
    >
    </el-pagination>
    <!-- 历史股东信息表格 -->
    <el-table
      v-show="selectTab.startsWith('历史网站备案')"
      :data="oldWebsiteFilingData"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        prop="auditDate"
        label="审核日期"
        width="199"
      ></el-table-column>
      <el-table-column prop="homePage" label="网站首页" width="199">
        <template slot-scope="scope">
          <span class="homePage">{{ scope.row.homePage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="domainName"
        label="域名"
        width="199"
      ></el-table-column>
      <el-table-column
        prop="websiteFiling"
        label="网站备案/许可证书"
        width="201"
      ></el-table-column>
      <el-table-column prop="logoutDate" label="注销日期"></el-table-column>
      <el-table-column
        prop="registerAuthority"
        label="登记机关"
      ></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-show="
        selectTab.startsWith('历史网站备案') && oldWebsiteFilingTotal > 10
      "
      background
      layout="total, prev, pager, next"
      :page-size="oldWebsiteFilingPageSize"
      :total="oldWebsiteFilingTotal"
      :current-page="oldWebsiteFilingCurrentPage"
      class="pagination"
      @current-change="oldWebsiteFilingCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      selectTab: "",
      websiteFilingData: [],
      oldWebsiteFilingData: [],
      // 网站备案分页
      websiteFilingCurrentPage: 1,
      websiteFilingPageSize: 10,
      websiteFilingTotal: 0,
      // 历史网站备案分页
      oldWebsiteFilingCurrentPage: 1,
      oldWebsiteFilingPageSize: 10,
      oldWebsiteFilingTotal: 0,
    };
  },
  created() {
    this.getWebsiteFilingData();
    this.getOldWebsiteFilingData();
  },
  watch: {
    websiteFilingTotal() {
      this.defaultTab();
    },
    oldWebsiteFilingTotal() {
      this.defaultTab();
    },
  },
  methods: {
    // 每次页面刷新自动选中第一个非零tab项
    defaultTab() {
      if (this.websiteFilingTotal) {
        this.selectTab = "网站备案";
      } else if (this.oldWebsiteFilingTotal) {
        this.selectTab = "历史网站备案";
      } else {
        return;
      }
    },
    // 网站备案表格数据
    getWebsiteFilingData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.websiteFilingCurrentPage,
        pageSize: this.websiteFilingPageSize,
      };
      this.$axios
        .post("/riskManager/knowledge/filingInfo", params)
        .then(({ data }) => {
          this.websiteFilingTotal = data.total;
          this.websiteFilingData = data.list.map((item) => {
            return {
              auditDate: item.shDate,
              homePage: item.hostName,
              domainName: item.hostName,
              websiteFiling: item.icpNum,
              registerAuthority: item.beiAnDi,
            };
          });
        });
    },
    // 网站备案分页
    websiteFilingCurrentChange(val) {
      this.websiteFilingCurrentPage = val;
      this.getWebsiteFilingData();
    },
    // 历史网站备案表格数据
    getOldWebsiteFilingData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.oldWebsiteFilingCurrentPage,
        pageSize: this.oldWebsiteFilingPageSize,
      };
      this.$axios
        .post("/riskManager/knowledge/filingInfoCancel", params)
        .then(({ data }) => {
          this.oldWebsiteFilingTotal = data.total;
          this.oldWebsiteFilingData = data.list.map((item) => {
            return {
              auditDate: item.shDate,
              homePage: item.hostName,
              domainName: item.hostName,
              websiteFiling: item.icpNum,
              logoutDate: item.delIme,
              registerAuthority: item.beiAnDi,
            };
          });
        });
    },
    // 历史网站备案分页
    oldWebsiteFilingCurrentChange(val) {
      this.oldWebsiteFilingCurrentPage = val;
      this.getOldWebsiteFilingData();
    },
    // tab切换
    handleTab(e) {
      if (e.target.className === "title" || e.target.innerText.includes("0"))
        return;
      this.selectTab = e.target.innerText;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 16px;
  .titleItem {
    cursor: pointer;
    margin-right: 24px;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
    &.active {
      border-bottom: 2px solid #0084ff;
      color: #0084ff;
    }
    &.disabled {
      color: #d3d3d3;
    }
  }
}
.homePage {
  color: rgba(55, 87, 255, 1);
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
