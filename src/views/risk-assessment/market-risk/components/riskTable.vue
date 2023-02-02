<template>
  <div class="user">
    <div class="header">
      <div class="item">
        <label for="" class="label">行业：</label>
        <el-select
          v-model="industryValue"
          placeholder="请选择"
          class="user-select"
        >
          <el-option
            v-for="item in industryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <label for="" class="label">综合风险等级：</label>
        <el-select
          v-model="riskGradeValue"
          placeholder="请选择"
          class="user-select"
        >
          <el-option
            v-for="item in riskGradeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <label for="" class="label">指标风险等级：</label>
        <el-select
          v-model="earlyWarningValue"
          placeholder="请选择"
          class="user-select"
        >
          <el-option
            v-for="item in earlyWarningOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <label for="" class="label">企业名称：</label>
        <el-input
          class="input"
          placeholder="请输入关键字"
          v-model="enterpriseName"
          clearable
        ></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      class="table"
      size="small"
      header-cell-class-name="header-row"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
      <el-table-column prop="legalPerson" label="法人"></el-table-column>
      <el-table-column
        prop="creditCode"
        label="统一社会信用代码"
      ></el-table-column>
      <el-table-column prop="industry" label="行业"></el-table-column>
      <el-table-column prop="riskIndex" label="综合风险指数">
        <template slot-scope="scope">
          <span :class="{ [riskGrade(scope.row.riskIndex).className]: true }">{{
            riskGrade(scope.row.riskIndex).text
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="earlyWarning"
        :label="`指标风险（${typeName}）`"
        sortable
      >
        <template slot-scope="scope">
          <span
            :class="{ [indexRisk(scope.row.earlyWarning).className]: true }"
            >{{ indexRisk(scope.row.earlyWarning).text }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button @click="riskDetails(row)" type="text" size="small"
            >风险详情</el-button
          >
          <el-button
            :disabled="!enterprisePortraitHasPermission"
            @click="portrait(row)"
            type="text"
            size="small"
            >企业画像</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      class="pagination"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
const userStore = useUserStore();
export default {
  data() {
    return {
      enterprisePortraitHasPermission:
        userStore.enterprisePortraitHasPermission,
      tableData: [],
      industryOptions: [],
      riskGradeOptions: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "高风险",
          label: "高风险",
        },
        {
          value: "较高风险",
          label: "较高风险",
        },
        {
          value: "中风险",
          label: "中风险",
        },
        {
          value: "低风险",
          label: "低风险",
        },
      ],
      earlyWarningOptions: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "高风险",
          label: "高风险",
        },
        {
          value: "中风险",
          label: "中风险",
        },
        {
          value: "无风险",
          label: "无风险",
        },
        {
          value: "警示",
          label: "警示",
        },
      ],
      // 查询数据
      industryValue: "全部",
      riskGradeValue: "全部",
      earlyWarningValue: "全部",
      enterpriseName: "",
      // 分页
      total: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  props: {
    params: {
      type: Object,
    },
    typeName: {
      type: String,
      required: false,
      default: "",
    },
  },
  watch: {
    params() {
      this.getTableData();
    },
  },
  created() {
    this.getIndustryOptions();
    // this.getTableData();
  },
  methods: {
    getTableData() {
      let params = {
        industry: this.industryValue,
        riskLevel: this.riskGradeValue,
        indexRiskLevel: this.earlyWarningValue,
        entName: this.enterpriseName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.params,
      };
      this.$axios.post("/marketRisk/marketEntList", params).then(({ data }) => {
        this.total = data.total;
        this.tableData = data.list.map((item, index) => {
          return {
            index: index + 1,
            entId: item.entId,
            enterpriseName: item.entName,
            legalPerson: item.legalPerson,
            creditCode: item.creditCode,
            industry: item.industry,
            riskIndex: item.entRiskScore,
            earlyWarning: item.indexRisk,
          };
        });
      });
    },
    getIndustryOptions() {
      let params = {
        dictType: "industry",
      };
      this.$axios.get("/dict/queryDictByType", params).then(({ data }) => {
        this.industryOptions = data.map((item) => {
          return {
            value: item.dictName,
            label: item.dictName,
          };
        });
        this.industryOptions.unshift({
          value: "全部",
          label: "全部",
        });
      });
    },
    // 查询
    search() {
      // 调用接口查询，拿到结果给表格
      this.currentPage = 1;
      this.getTableData();
    },
    // 风险指数
    riskGrade(val) {
      switch (true) {
        case val > 0 && val <= 25:
          return {
            className: "riskColor4",
            text: val + "（低风险）",
          };
        case val > 25 && val <= 50:
          return {
            className: "riskColor3",
            text: val + "（中风险）",
          };
        case val > 50 && val <= 75:
          return {
            className: "riskColor2",
            text: val + "（较高风险）",
          };
        case val > 75 && val <= 100:
          return {
            className: "riskColor1",
            text: val + "（高风险）",
          };
        default:
          break;
      }
    },
    indexRisk(val) {
      switch (val) {
        case 0:
          return {
            className: "riskColor4",
            text: "无风险",
          };
        case 3:
          return {
            className: "riskColor3",
            text: "警示",
          };
        case 2:
          return {
            className: "riskColor2",
            text: "中风险",
          };
        case 1:
          return {
            className: "riskColor1",
            text: "高风险",
          };
        default:
          break;
      }
    },
    // 企业画像
    portrait({ entId, enterpriseName }) {
      userStore.saveEntId(entId, enterpriseName);
      // this.$router.push(`/enterprise-retrieval/enterprise-portrait/${entId}`);
      //新窗口打开企业画像
      const routeData = this.$router.resolve({
        path: `${
          import.meta.env.BASE_URL
        }enterprise-retrieval/enterprise-portrait/${entId}`,
      });
      window.open(routeData.location.path, "_blank");
    },
    // 风险详情
    riskDetails(row) {
      this.$router.push({
        path: `/enterprise-risk/detail/${row.entId}`,
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    justify-content: space-between;
    // width: 1150px;
    width: 100%;
    margin-bottom: 20px;
    .item {
      display: flex;
      align-items: center;
      .user-select {
        width: 170px;
      }
      .input {
        width: 270px;
        // margin: 0 30px;
      }
    }
    .search {
      width: 100px;
    }
  }
  .table {
    margin-bottom: 10px;
    .riskColor1 {
      color: rgba(245, 114, 114, 1);
    }
    .riskColor2 {
      color: rgba(244, 165, 47, 1);
    }
    .riskColor3 {
      color: rgba(182, 200, 76, 1);
    }
    .riskColor4 {
      color: rgba(93, 209, 140, 1);
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
  .ok,
  .cancel {
    width: 60px;
    height: 30px;
  }
}
</style>
