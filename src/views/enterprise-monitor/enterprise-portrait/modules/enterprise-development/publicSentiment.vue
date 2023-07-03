<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">舆情动态 {{ publicSentimentTotal }}</h3>
      <div class="chart" v-if="publicSentimentTotal > 0">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">舆论类型</h3>
          <v-chart class="chartContent" :option="investPie"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">舆情发生变化趋势</h3>
          <v-chart class="chartContent" :option="trendChange"></v-chart>
        </el-card>
      </div>
      <el-table
        :data="publicSentimentData"
        size="small"
        header-cell-class-name="header-row"
      >
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <span class="titleText">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="舆情日期"
          width="169"
          :filters="filterDateData"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="classify"
          label="舆情分类"
          width="169"
          :filters="filterTypeData"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="keyword" label="关键词"></el-table-column>
        <el-table-column
          prop="source"
          label="信息来源"
          width="169"
        ></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        v-show="publicSentimentTotal > 10"
        layout="total, prev, pager, next"
        :page-size="publicSentimentPageSize"
        :total="publicSentimentTotal"
        :current-page="publicSentimentCurrentPage"
        class="pagination"
        @current-change="publicSentimentCurrentChangee"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  investPie,
  trendChange,
} from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      publicSentimentData: [],
      pieData: [],
      barData: [],
      // 企业投资分页
      publicSentimentCurrentPage: 1,
      publicSentimentPageSize: 10,
      publicSentimentTotal: 0,
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
      filterTypeData: [
        {
          text: "积极",
          value: "积极",
        },
        {
          text: "中立",
          value: "中立",
        },
        {
          text: "消极",
          value: "消极",
        },
      ],
    };
  },
  computed: {
    investPie() {
      return investPie(this.pieData);
    },
    trendChange() {
      return trendChange(this.barData);
    },
  },
  created() {
    this.getPieData();
    this.getBarData();
    this.getPublicSentimentData();
  },
  methods: {
    getPieData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        type: 1,
      };
      this.$axios
        .get("/riskManager/develop/publicInfoByType", params)
        .then(({ data }) => {
          this.pieData = data;
        });
    },
    getBarData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
      };
      this.$axios
        .get("/riskManager/develop/publicInfoChangeTrend", params)
        .then((data) => {
          this.barData = data;
        });
    },
    // 企业投资表格数据
    getPublicSentimentData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.publicSentimentCurrentPage,
        pageSize: this.publicSentimentPageSize,
      };
      this.$axios
        .post("/riskManager/develop/publicInfo", params)
        .then(({ data }) => {
          this.publicSentimentTotal = data.total;
          this.publicSentimentData = data.list.map((item) => {
            return {
              title: item.title,
              time: item.pubTime,
              classify: item.tabsEmotionLabels,
              keyword: item.tabsEventLabels,
              source: item.webSite,
            };
          });
        });
    },
    // 企业投资分页
    publicSentimentCurrentChangee(val) {
      this.publicSentimentCurrentPage = val;
      this.getPublicSentimentData();
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
  .titleText {
    color: rgba(55, 87, 255, 1);
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
          width: 569px;
          height: 263px;
          // border: 1px solid #cfcfcf;
        }
      }
      .chartTitle {
        font-size: 16px;
        margin-bottom: 8px;
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
