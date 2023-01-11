<template>
  <div class="judicial-risk">
    <div class="filter-wrap flex">
      <h5 class="title">风险类型：</h5>
      <el-checkbox
        class="check-all-btn"
        :indeterminate="riskTypeIsIndeterminate"
        v-model="checkAllRiskType"
        @change="handleCheckAllRiskTypes"
        >全部类型</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedRiskTypes"
        @change="handleCheckedRiskType"
      >
        <el-checkbox
          v-for="item in riskTypeList"
          :label="item.value"
          :key="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div class="filter-wrap flex">
      <h5 class="title">风险等级：</h5>
      <el-checkbox
        class="check-all-btn"
        :indeterminate="riskLevelIsIndeterminate"
        v-model="checkAllRiskLevel"
        @change="handleCheckAllRiskLevels"
        >全部等级</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedRiskLevels"
        @change="handleCheckedRiskLevel"
      >
        <el-checkbox
          v-for="item in riskLevelList"
          :label="item.value"
          :key="item.value"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div class="tip">
      共<span class="total">{{ total }}</span
      >条符合条件的司法风险
    </div>
    <!-- <div class="tip">{{ tableDataTemp }}</div> -->
    <el-collapse>
      <!-- 经营异常 -->
      <el-collapse-item
        v-if="tableDataTemp.abnormalOperationResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">经营异常</div>
          <div class="risk-disc">
            {{ tableDataTemp.abnormalOperationResp.desc }}（{{
              tableDataTemp.abnormalOperationResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.abnormalOperationResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.abnormalOperationResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.abnormalOperationResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.abnormalOperationResp.abnormalOperationList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('abnormalOperationResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="inDate" label="列入日期"></el-table-column>
          <el-table-column
            prop="yrRegorg"
            label="登记/移入机关"
          ></el-table-column>
          <el-table-column prop="inReason" label="列入原因"></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="abnormalOperationRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.abnormalOperationResp.count"
          @current-change="pageChange('abnormalOperationResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 严重违法 -->
      <el-collapse-item
        v-if="tableDataTemp.breatchTrustResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">严重违法</div>
          <div class="risk-disc">
            {{ tableDataTemp.breatchTrustResp.desc }}（{{
              tableDataTemp.breatchTrustResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.breatchTrustResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.breatchTrustResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.breatchTrustResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.breatchTrustResp.breachTrustList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('breatchTrustResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="inDate" label="列入日期"></el-table-column>
          <el-table-column
            prop="inOrg"
            label="作出决定机关(列入)"
          ></el-table-column>
          <el-table-column
            prop="inReason"
            label="列入严重违法失信企业名单原因"
          ></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="breatchTrustRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.breatchTrustResp.count"
          @current-change="pageChange('breatchTrustResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 股权质押 -->
      <el-collapse-item
        v-if="tableDataTemp.pledgeEquityResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">股权质押</div>
          <div class="risk-disc">
            {{ tableDataTemp.pledgeEquityResp.desc }}（{{
              tableDataTemp.pledgeEquityResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.pledgeEquityResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.pledgeEquityResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.pledgeEquityResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.pledgeEquityResp.pledgeEquityList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('pledgeEquityResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="pledgor" label="出质人"></el-table-column>
          <el-table-column
            prop="relatedCompany"
            label="出质股权标的企业"
          ></el-table-column>
          <el-table-column prop="impOrg" label="质权人"></el-table-column>
          <el-table-column prop="impAm" label="质押金额"></el-table-column>
          <el-table-column
            prop="impOnRecDate"
            label="质押备案日期"
          ></el-table-column>
          <el-table-column prop="exeState" label="状态"></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="pledgeEquityRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.pledgeEquityResp.count"
          @current-change="pageChange('pledgeEquityResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 行政处罚 -->
      <el-collapse-item
        v-if="tableDataTemp.adminPenaltyResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">行政处罚</div>
          <div class="risk-disc">
            {{ tableDataTemp.adminPenaltyResp.desc }}（{{
              tableDataTemp.adminPenaltyResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.adminPenaltyResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.adminPenaltyResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.adminPenaltyResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.adminPenaltyResp.adminPenaltyList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('adminPenaltyResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="penDecIssDate"
            label="处罚日期"
          ></el-table-column>
          <el-table-column prop="penDecNo" label="决定文书号"></el-table-column>
          <el-table-column
            prop="caseType"
            label="处罚事由/违法行为类型"
          ></el-table-column>
          <el-table-column prop="penResult" label="处罚结果"></el-table-column>
          <el-table-column prop="content" label="处罚内容"></el-table-column>
          <el-table-column
            prop="penAuthName"
            label="处罚单位"
          ></el-table-column>
          <el-table-column prop="dataSource" label="数据来源"></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="adminPenaltyRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.adminPenaltyResp.count"
          @current-change="pageChange('adminPenaltyResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 欠税公告 -->
      <el-collapse-item
        v-if="tableDataTemp.taxArrearsResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">欠税公告</div>
          <div class="risk-disc">
            {{ tableDataTemp.taxArrearsResp.desc }}（{{
              tableDataTemp.taxArrearsResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.taxArrearsResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.taxArrearsResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.taxArrearsResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.taxArrearsResp.taxArrearsList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('taxArrearsResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="pubTime" label="发布日期"></el-table-column>
          <el-table-column prop="qnum" label="纳税人识别号"></el-table-column>
          <el-table-column prop="taxType" label="欠税税种"></el-table-column>
          <el-table-column
            prop="camount"
            label="当前新发生的欠税余额"
          ></el-table-column>
          <el-table-column prop="debt" label="欠税余额"></el-table-column>
          <el-table-column prop="taxOrg" label="税务机关"></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="taxArrearsRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.taxArrearsResp.count"
          @current-change="pageChange('taxArrearsResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { managementRiskStore } from "@/store/index.js";
export default {
  data() {
    return {
      checkAllRiskType: false,
      checkedRiskTypes: [],
      riskTypeIsIndeterminate: false,
      checkAllRiskLevel: false,
      checkedRiskLevels: [],
      riskLevelIsIndeterminate: false,
      tableData: {},
      pageSize: 5,
      abnormalOperationRespPageNum: 1, //经营异常
      breatchTrustRespPageNum: 1, //严重违法
      pledgeEquityRespPageNum: 1, //股权质押
      adminPenaltyRespPageNum: 1, //行政处罚
      taxArrearsRespPageNum: 1, //欠税公告
    };
  },
  computed: {
    riskTypeList() {
      return [
        {
          label: "经营异常",
          value: "abnormalOperationResp",
        },
        {
          label: "严重违法",
          value: "breatchTrustResp",
        },
        {
          label: "股权质押",
          value: "pledgeEquityResp",
        },
        {
          label: "行政处罚",
          value: "adminPenaltyResp",
        },
        {
          label: "欠税公告",
          value: "taxArrearsResp",
        },
      ];
    },
    riskLevelList() {
      return [
        {
          label: "高风险",
          value: "高风险",
        },
        {
          label: "中风险",
          value: "中风险",
        },
        {
          label: "警示",
          value: "警示",
        },
      ];
    },
    tableDataTemp() {
      //过滤风险类型
      const riskTypes =
        this.checkedRiskTypes.length === 0
          ? this.riskTypeList.map((item) => item.value)
          : this.checkedRiskTypes;
      let tableDataTemp1 = {};
      riskTypes.forEach((item) => {
        tableDataTemp1[item] = this.tableData[item];
      });
      //过滤风险等级
      const riskLevels =
        this.checkedRiskLevels.length === 0
          ? this.riskLevelList.map((item) => item.value)
          : this.checkedRiskLevels;
      const filterKeys = Object.keys(tableDataTemp1).filter((key) =>
        riskLevels.some((item) => item === tableDataTemp1[key]?.riskLevel)
      );
      let tableDataTemp2 = {};
      filterKeys.forEach((item) => {
        tableDataTemp2[item] = tableDataTemp1[item];
      });
      return tableDataTemp2;
    },
    total() {
      return Object.keys(this.tableDataTemp).reduce(
        (prev, cur) => prev + this.tableDataTemp[cur].count,
        0
      );
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        entId: this.$route.params.id,
      };
      this.$axios.get("/entRisk/businessRisk", params).then(({ data }) => {
        this.tableData = data;
        const managementRiskToalNum = Object.keys(data).reduce(
          (prev, cur) => prev + data[cur].count,
          0
        );
        const managementRisk = managementRiskStore();
        managementRisk.updateManagementRiskNum(managementRiskToalNum);
      });
    },
    handleCheckAllRiskTypes(val) {
      this.checkedRiskTypes = val
        ? this.riskTypeList.map((item) => item.value)
        : [];
      this.riskTypeIsIndeterminate = false;
    },
    handleCheckedRiskType(value) {
      let checkedCount = value.length;
      this.checkAllRiskType = checkedCount === this.riskTypeList.length;
      this.riskTypeIsIndeterminate =
        checkedCount > 0 && checkedCount < this.riskTypeList.length;
    },
    handleCheckAllRiskLevels(val) {
      this.checkedRiskLevels = val
        ? this.riskLevelList.map((item) => item.value)
        : [];
      this.riskLevelIsIndeterminate = false;
    },
    handleCheckedRiskLevel(value) {
      let checkedCount = value.length;
      this.checkAllRiskLevel = checkedCount === this.riskLevelList.length;
      this.riskLevelIsIndeterminate =
        checkedCount > 0 && checkedCount < this.riskLevelList.length;
    },
    pageChange(type, val) {
      const entId = this.$route.params.id;
      switch (type) {
        case "abnormalOperationResp":
          this.abnormalOperationRespPageNum = val;
          this.$axios
            .post("/businessRisk/abnormalOperation", {
              entId,
              pageNum: this.abnormalOperationRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.abnormalOperationResp.abnormalOperationList =
                data.list;
            });
          break;
        case "breatchTrustResp":
          this.breatchTrustRespPageNum = val;
          this.$axios
            .post("/businessRisk/breachTrust", {
              entId,
              pageNum: this.breatchTrustRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.breatchTrustResp.breachTrustList = data.list;
            });
          break;
        case "pledgeEquityResp":
          this.pledgeEquityRespPageNum = val;
          this.$axios
            .post("/businessRisk/pledgeEquity", {
              entId,
              pageNum: this.pledgeEquityRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.pledgeEquityResp.pledgeEquityList = data.list;
            });
          break;
        case "adminPenaltyResp":
          this.adminPenaltyRespPageNum = val;
          this.$axios
            .post("/businessRisk/adminPenalty", {
              entId,
              pageNum: this.adminPenaltyRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.adminPenaltyResp.adminPenaltyList = data.list;
            });
          break;
        case "taxArrearsResp":
          this.taxArrearsRespPageNum = val;
          this.$axios
            .post("/businessRisk/taxArrears", {
              entId,
              pageNum: this.taxArrearsRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.taxArrearsResp.taxArrearsList = data.list;
            });
          break;
        default:
      }
    },
    indexMethod(type) {
      const that = this;
      return function (index) {
        switch (type) {
          case "abnormalOperationResp":
            return (
              (that.abnormalOperationRespPageNum - 1) * that.pageSize +
              index +
              1
            );
          case "breatchTrustResp":
            return (
              (that.breatchTrustRespPageNum - 1) * that.pageSize + index + 1
            );
          case "pledgeEquityResp":
            return (
              (that.pledgeEquityRespPageNum - 1) * that.pageSize + index + 1
            );
          case "adminPenaltyResp":
            return (
              (that.adminPenaltyRespPageNum - 1) * that.pageSize + index + 1
            );
          case "taxArrearsResp":
            return (that.taxArrearsRespPageNum - 1) * that.pageSize + index + 1;
          default:
        }
      };
    },
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.judicial-risk {
  .filter-wrap {
    padding: 10px 20px;
    .title {
      margin-right: 30px;
    }
    .check-all-btn {
      margin-right: 30px;
    }
  }
  .colllapse-item-wrap {
    /deep/ .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
  .tip {
    margin: 10px 0;
    .total {
      padding: 0 10px;
      color: #f56c6c;
    }
  }
  .header {
    align-items: center;
    .risk-type {
      padding: 0 10px;
      font-size: 14px;
      font-weight: 700;
    }
    .risk-disc {
      padding: 0 10px;
    }
    .risk-level {
      padding: 0 10px;
    }
    .risk-num {
      padding: 0 10px;
    }
  }
  .page-tool {
    padding: 10px 0;
    text-align: right;
  }
  /deep/ .header-row {
    background: #f0f7fc;
  }
}
</style>
