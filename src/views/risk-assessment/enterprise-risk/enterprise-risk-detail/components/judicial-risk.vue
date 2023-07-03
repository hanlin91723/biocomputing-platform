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
    <el-collapse>
      <!-- 被执行人 -->
      <el-collapse-item
        v-if="tableDataTemp.personSubjectResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">被执行人</div>
          <div class="risk-disc">
            {{ tableDataTemp.personSubjectResp.desc }}（{{
              tableDataTemp.personSubjectResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.personSubjectResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.personSubjectResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.personSubjectResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.personSubjectResp.personSubjectList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('personSubjectResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="fssCaseNo" label="案号"></el-table-column>
          <el-table-column
            prop="fssRegNo"
            label="被执行人身份证号码/组织机构代码"
          ></el-table-column>
          <el-table-column prop="fssLasj" label="立案日期"></el-table-column>
          <el-table-column
            prop="fssCourtName"
            label="执行法院"
          ></el-table-column>
          <el-table-column
            prop="fssMoney"
            label="执行标的(元)"
          ></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="personSubjectRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.personSubjectResp.count"
          @current-change="pageChange('personSubjectResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 失信信息 -->
      <el-collapse-item
        v-if="tableDataTemp.breatchTrustResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">失信信息</div>
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
          <el-table-column prop="inReason" label="列入原因"></el-table-column>
          <el-table-column prop="inDate" label="列入日期"></el-table-column>
          <el-table-column prop="inOrg" label="列入决定机关"></el-table-column>
          <el-table-column prop="inWnum" label="列入文号"></el-table-column>
          <el-table-column prop="yzType" label="违法类型"></el-table-column>
          <el-table-column prop="yzFact" label="违法事实"></el-table-column>
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
      <!-- 限制高消费 -->
      <el-collapse-item
        v-if="tableDataTemp.limitConsumptionResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">限制高消费</div>
          <div class="risk-disc">
            {{ tableDataTemp.limitConsumptionResp.desc }}（{{
              tableDataTemp.limitConsumptionResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.limitConsumptionResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.limitConsumptionResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.limitConsumptionResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.limitConsumptionResp.limitConsumptionList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('limitConsumptionResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="caseNo" label="案号"></el-table-column>
          <el-table-column prop="qyInfo" label="限制令对象"></el-table-column>
          <el-table-column prop="xname" label="关联对象"></el-table-column>
          <el-table-column prop="filingDate" label="立案日期"></el-table-column>
          <el-table-column
            prop="publishDate"
            label="发布日期"
          ></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="limitConsumptionRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.limitConsumptionResp.count"
          @current-change="pageChange('limitConsumptionResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
      <!-- 终本案件 -->
      <el-collapse-item
        v-if="tableDataTemp.closingCaseResp"
        class="colllapse-item-wrap"
      >
        <div class="header flex" slot="title">
          <div class="risk-type">终本案件</div>
          <div class="risk-disc">
            {{ tableDataTemp.closingCaseResp.desc }}（{{
              tableDataTemp.closingCaseResp.count
            }}）
          </div>
          <el-tag
            class="risk-level"
            :type="
              tableDataTemp.closingCaseResp.riskLevel === '高风险'
                ? 'danger'
                : tableDataTemp.closingCaseResp.riskLevel === '中风险'
                ? 'warning'
                : 'info'
            "
            size="small"
            >{{ tableDataTemp.closingCaseResp.riskLevel }}</el-tag
          >
        </div>
        <el-table
          :data="tableDataTemp.closingCaseResp.closingCaseList"
          size="small"
          stripe
          header-cell-class-name="header-row"
        >
          <el-table-column
            type="index"
            :index="indexMethod('closingCaseResp')"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="caseCreateTime"
            label="立案日期"
          ></el-table-column>
          <el-table-column
            prop="caseFinalTime"
            label="终本日期"
          ></el-table-column>
          <el-table-column prop="caseCode" label="案号"></el-table-column>
          <el-table-column prop="execMoney" label="执行标的">
            <template slot-scope="{ row }">{{
              row.execMoney + row.execMoneyUnit
            }}</template>
          </el-table-column>
          <el-table-column prop="noExecMoney" label="未履行金额">
            <template slot-scope="{ row }">{{
              row.noExecMoney + row.noExecMoneyUnit
            }}</template>
          </el-table-column>
          <el-table-column
            prop="execCourtName"
            label="执行法院"
          ></el-table-column>
        </el-table>
        <el-pagination
          class="page-tool"
          background
          small
          layout="prev, pager, next"
          :current-page="closingCaseRespPageNum"
          :page-size="pageSize"
          :total="tableDataTemp.closingCaseResp.count"
          @current-change="pageChange('closingCaseResp', $event)"
        >
        </el-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { judicialRiskStore } from "@/store/index.js";
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
      personSubjectRespPageNum: 1, //被执行人
      breatchTrustRespPageNum: 1, //失信信息
      limitConsumptionRespPageNum: 1, //限制高消费
      closingCaseRespPageNum: 1, //终本案件
    };
  },
  computed: {
    riskTypeList() {
      return [
        {
          label: "被执行人",
          value: "personSubjectResp",
        },
        {
          label: "失信信息",
          value: "breatchTrustResp",
        },
        {
          label: "限制高消费",
          value: "limitConsumptionResp",
        },
        {
          label: "终本案件",
          value: "closingCaseResp",
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
      this.$axios
        .get("/riskManager/entRisk/judicialRisk", params)
        .then(({ data }) => {
          this.tableData = data;
          const judicialRiskToalNum = Object.keys(data).reduce(
            (prev, cur) => prev + data[cur].count,
            0
          );
          const judicialRisk = judicialRiskStore();
          judicialRisk.updateJudicialRiskNum(judicialRiskToalNum);
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
        case "personSubjectResp":
          this.personSubjectRespPageNum = val;
          this.$axios
            .post("/riskManager/judicial/personSubjectedExecution", {
              entId,
              pageNum: this.personSubjectRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.personSubjectResp.personSubjectList = data.list;
            });
          break;
        case "breatchTrustResp":
          this.breatchTrustRespPageNum = val;
          this.$axios
            .post("/riskManager/judicial/disHonest", {
              entId,
              pageNum: this.breatchTrustRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.breatchTrustResp.breachTrustList = data.list;
            });
          break;
        case "limitConsumptionResp":
          this.limitConsumptionRespPageNum = val;
          this.$axios
            .post("/riskManager/judicial/limitConsumption", {
              entId,
              pageNum: this.limitConsumptionRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.limitConsumptionResp.limitConsumptionList =
                data.list;
            });
          break;
        case "closingCaseResp":
          this.closingCaseRespPageNum = val;
          this.$axios
            .post("/riskManager/judicial/closingCase", {
              entId,
              pageNum: this.closingCaseRespPageNum,
              pageSize: this.pageSize,
            })
            .then(({ data }) => {
              this.tableData.closingCaseResp.closingCaseList = data.list;
            });
          break;
        default:
      }
    },
    indexMethod(type) {
      const that = this;
      return function (index) {
        switch (type) {
          case "personSubjectResp":
            return (
              (that.personSubjectRespPageNum - 1) * that.pageSize + index + 1
            );
          case "breatchTrustResp":
            return (
              (that.breatchTrustRespPageNum - 1) * that.pageSize + index + 1
            );
          case "limitConsumptionResp":
            return (
              (that.limitConsumptionRespPageNum - 1) * that.pageSize + index + 1
            );
          case "closingCaseResp":
            return (
              (that.closingCaseRespPageNum - 1) * that.pageSize + index + 1
            );
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
}
</style>
