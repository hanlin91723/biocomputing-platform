<template>
  <div class="outInvest">
    <div class="enterpriseInvest">
      <h3 class="title">作品著作权 {{ copyrightTotal }}</h3>
      <div class="chart" v-if="copyrightTotal > 0">
        <el-card class="mapChart" shadow="never">
          <h3 class="chartTitle">作品著作权申请趋势</h3>
          <v-chart class="chartContent" :option="recruit"></v-chart>
        </el-card>
        <el-card class="pieChart" shadow="never">
          <h3 class="chartTitle">作品类型</h3>
          <v-chart class="chartContent" :option="basicPie"></v-chart>
        </el-card>
      </div>
      <el-table
        :data="copyrightData"
        size="small"
        header-cell-class-name="header-row"
      >
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="workName" label="作品名称"></el-table-column>
        <el-table-column prop="registerNum" label="登记号"></el-table-column>
        <el-table-column
          prop="workCategory"
          label="作品类别"
          width="199"
        ></el-table-column>
        <el-table-column
          prop="finishDate"
          label="创作完成日期"
          width="199"
        ></el-table-column>
        <el-table-column
          prop="registerDate"
          label="登记日期"
          width="199"
        ></el-table-column>
        <el-table-column
          prop="firstPublishDate"
          label="首次发表日期"
          width="199"
        ></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        v-show="copyrightTotal > 10"
        layout="total, prev, pager, next"
        :page-size="copyrightPageSize"
        :total="copyrightTotal"
        :current-page="copyrightCurrentPage"
        class="pagination"
        @current-change="copyrightCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  recruit,
  basicPie,
} from "@/views/enterprise-monitor/enterprise-portrait/options/echarts-options";
import { useUserStore } from "@/store/index.js";
export default {
  data() {
    return {
      copyrightData: [],
      recruitName: [],
      recruitValue: [],
      basicPieData: [],
      // 企业投资分页
      copyrightCurrentPage: 1,
      copyrightPageSize: 10,
      copyrightTotal: 0,
    };
  },
  computed: {
    recruit() {
      return recruit(this.recruitName, this.recruitValue);
    },
    basicPie() {
      return basicPie(this.basicPieData);
    },
  },
  created() {
    this.getRecruitData();
    this.getBasicPieData();
    this.getCopyrightData();
  },
  methods: {
    // 获取作品申请趋势数据
    getRecruitData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        type: 1,
      };
      this.$axios
        .get("/knowledge/copyrightWorksType", params)
        .then(({ data }) => {
          data.forEach((item) => {
            this.recruitName.push(item.name);
            this.recruitValue.push(item.value);
          });
        });
    },
    // 获取作品类型数据
    getBasicPieData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        type: 2,
      };
      this.$axios
        .get("/knowledge/copyrightWorksType", params)
        .then(({ data }) => {
          this.basicPieData = data;
        });
    },
    // 裁判文书表格数据
    getCopyrightData() {
      const userStore = useUserStore();
      let params = {
        entId: userStore.entId,
        entName: userStore.entName,
        pageNum: this.copyrightCurrentPage,
        pageSize: this.copyrightPageSize,
      };
      this.$axios
        .post("/knowledge/copyrightWorksInfo", params)
        .then(({ data }) => {
          this.copyrightTotal = data.total;
          this.copyrightData = data.list.map((item) => {
            return {
              workName: item.wname,
              registerNum: item.wnum,
              workCategory: item.wtype,
              finishDate: item.cDate,
              registerDate: item.rDate,
              firstPublishDate: item.fDate,
            };
          });
        });
    },
    // 裁判文书分页
    copyrightCurrentChange(val) {
      this.copyrightCurrentPage = val;
      this.getCopyrightData();
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
    .brandName {
      color: rgba(55, 87, 255, 1);
    }
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
