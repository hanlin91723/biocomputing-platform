<template>
  <div class="user">
    <div class="header">
      <div>
        <label for="" class="label">行业：</label>
        <el-select v-model="industry" placeholder="请选择" class="user-select">
          <el-option
            v-for="item in industryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
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
      <div>
        <label for="" class="label">企业名称：</label>
        <el-input
          class="input"
          placeholder="请输入关键字"
          v-model="entName"
          clearable
        ></el-input>
      </div>
      <!-- <div>
          <label for="" class="label">企业标签：</label>
          <el-select v-model="enterpriseLabelValue" placeholder="请选择" class="user-select">
            <el-option v-for="item in enterpriseLabelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div> -->
      <el-button type="primary" class="search" @click="search">查询</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table :data="tableData" stripe class="table">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column prop="entName" label="企业名称"></el-table-column>
      <el-table-column prop="legalPerson" label="法人"></el-table-column>
      <el-table-column
        prop="creditCode"
        label="统一社会信用代码"
      ></el-table-column>
      <el-table-column prop="industry" label="行业"></el-table-column>
      <el-table-column prop="entRiskScore" label="综合风险指数">
        <template slot-scope="{ row }">
          <span :class="{ [riskGrade(row.entRiskScore).className]: true }">{{
            riskGrade(row.entRiskScore).text
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="entRiskNum"
        label="风险统计（条）"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <span class="edit" @click="riskDetails(row)">风险详情</span>
          <span class="reset" @click="portrait(row)">企业画像</span>
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
export default {
  data() {
    return {
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
      // 查询数据
      industry: "全部",
      riskGradeValue: "全部",
      entName: "",
      // 分页
      total: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.getIndustryOptions();
    this.getTableData();
  },
  methods: {
    getTableData() {
      let params = {
        industry: this.industry,
        riskLevel: this.riskGradeValue,
        indexRiskLevel: "全部",
        entName: this.entName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$axios
        .post("/entRisk/queryEntRiskByCondition", params)
        .then(({ data }) => {
          this.total = data.total;
          this.tableData = data.list;
        });
    },
    getIndustryOptions() {
      let params = {
        dictType: "industry",
      };
      this.$axios.get("/dict/queryDictByType", params).then(({ data }) => {
        this.industryOptions = data.map((item) => ({
          value: item.dictName,
          label: item.dictName,
        }));
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
    // 企业画像
    portrait({ entId, entName }) {
      const userStore = useUserStore();
      userStore.saveEntId(entId, entName);
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
    riskDetails({ entId }) {
      this.$router.push({
        path: `/enterprise-risk/detail/${entId}`,
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
    width: 1150px;
    margin-bottom: 20px;
    .input {
      width: 270px;
      // margin: 0 30px;
    }
    .search {
      width: 100px;
    }
    .addUser {
      width: 100px;
    }
  }
  .table {
    width: 100%;
    // height: 575px;
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
    .reset,
    .edit,
    .delete {
      color: rgb(3, 167, 240);
      cursor: pointer;
    }
    .edit {
      margin-right: 20px;
    }
    .delete {
      color: orange;
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
