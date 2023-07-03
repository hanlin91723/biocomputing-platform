<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">裁判文书 {{ documentTotal }}</h3>
      <div class="chart">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">案由</h3>
          <v-chart class="chartContent" :option="causePie"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">类型</h3>
          <v-chart class="chartContent" :option="typePie"></v-chart>
        </el-card>
      </div>
      <el-table
        :data="documentData"
        size="small"
        header-cell-class-name="header-row"
      >
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="caseNum" label="案号"></el-table-column>
        <el-table-column prop="docType" label="文书类型"></el-table-column>
        <el-table-column
          prop="otherInfo"
          label="案由"
          :filters="filterCauseData"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="caseType"
          label="类型"
          :filters="filterTypeData"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="party"
          label="当事人"
          width="280"
        ></el-table-column>
        <el-table-column prop="caseAmount" label="案件金额"></el-table-column>
        <el-table-column prop="judgmentResult" label="裁判结果" width="280">
          <template slot-scope="{ row }">
            <el-tooltip placement="top">
              <div slot="content" class="judgment-result">
                {{ row.judgmentResult }}
              </div>
              <div class="ellipsis">{{ row.judgmentResult }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="updated"
          label="发布日期"
          width="120"
          :filters="filterDateData"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="judgmentDate"
          label="裁判日期"
          width="120"
        ></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        v-show="documentTotal > 10"
        layout="total, prev, pager, next"
        :page-size="documentPageSize"
        :total="documentTotal"
        :current-page="documentCurrentPage"
        class="pagination"
        @current-change="documentCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { basicPie } from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      documentData: [],
      causePieData: [],
      typePieData: [],
      // 企业投资分页
      documentCurrentPage: 1,
      documentPageSize: 10,
      documentTotal: 0,
      filterCauseData: [
        {
          text: "劳动争议",
          value: "劳动争议",
        },
        {
          text: "专利行政管理（专利）",
          value: "专利行政管理（专利）",
        },
      ],
      filterTypeData: [
        {
          text: "民事",
          value: "民事",
        },
        {
          text: "调解",
          value: "调解",
        },
      ],
      filterDateData: [
        {
          text: "2022",
          value: "2022",
        },
        {
          text: "2021",
          value: "2021",
        },
      ],
    };
  },
  computed: {
    causePie() {
      return basicPie(this.causePieData);
    },
    typePie() {
      return basicPie(this.typePieData);
    },
  },
  created() {
    this.getCausePieData();
    this.getTypePieData();
    this.getDocumentData();
  },
  methods: {
    getCausePieData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        type: 1,
      };
      this.$axios
        .get("/riskManager/judicial/judicialInfoByType", params)
        .then(({ data }) => {
          this.causePieData = data.map((item) => {
            return {
              name: item.name,
              value: item.value,
            };
          });
        });
    },
    getTypePieData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        type: 2,
      };
      this.$axios
        .get("/riskManager/judicial/judicialInfoByType", params)
        .then(({ data }) => {
          this.typePieData = data.map((item) => {
            return {
              name: item.name,
              value: item.value,
            };
          });
        });
    },
    // 裁判文书表格数据
    getDocumentData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.documentCurrentPage,
        pageSize: this.documentPageSize,
      };
      this.$axios
        .post("/riskManager/judicial/judicialInfo", params)
        .then(({ data }) => {
          this.documentTotal = data.total;
          this.documentData = data.list.map((item) => ({
            ...item,
            caseAmount: "-",
          }));
        });
    },
    // 裁判文书分页
    documentCurrentChange(val) {
      this.documentCurrentPage = val;
      this.getDocumentData();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style lang="less" scoped>
.outInvest {
  .title {
    font-size: 16px;
    margin-bottom: 12px;
  }
  .enterpriseInvest {
    margin-bottom: 30px;
    .chart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .mapChart,
      .pieChart {
        width: 49%;
        text-align: center;
        .chartContent {
          height: 263px;
        }
      }
      .chartTitle {
        font-size: 16px;
        margin-bottom: 8px;
      }
    }
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
.judgment-result {
  max-width: 500px;
}
</style>
