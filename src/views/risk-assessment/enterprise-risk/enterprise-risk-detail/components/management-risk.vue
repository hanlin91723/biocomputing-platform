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
          border
          size="small"
        >
          <el-table-column
            prop="row"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="立案日期"></el-table-column>
          <el-table-column prop="fssRegNo" label="执行标的"></el-table-column>
          <el-table-column prop="fssCourtId" label="案号"></el-table-column>
          <el-table-column prop="fssName" label="执行法院"></el-table-column>
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
          border
          size="small"
        >
          <el-table-column
            prop="row"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="立案日期"></el-table-column>
          <el-table-column prop="fssRegNo" label="执行标的"></el-table-column>
          <el-table-column prop="fssCourtId" label="案号"></el-table-column>
          <el-table-column prop="fssName" label="执行法院"></el-table-column>
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
          border
          size="small"
        >
          <el-table-column
            prop="row"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="立案日期"></el-table-column>
          <el-table-column prop="fssRegNo" label="执行标的"></el-table-column>
          <el-table-column prop="fssCourtId" label="案号"></el-table-column>
          <el-table-column prop="fssName" label="执行法院"></el-table-column>
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
          border
          size="small"
        >
          <el-table-column
            prop="row"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="立案日期"></el-table-column>
          <el-table-column prop="fssRegNo" label="执行标的"></el-table-column>
          <el-table-column prop="fssCourtId" label="案号"></el-table-column>
          <el-table-column prop="fssName" label="执行法院"></el-table-column>
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
          border
          size="small"
        >
          <el-table-column
            prop="row"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="立案日期"></el-table-column>
          <el-table-column prop="fssRegNo" label="执行标的"></el-table-column>
          <el-table-column prop="fssCourtId" label="案号"></el-table-column>
          <el-table-column prop="fssName" label="执行法院"></el-table-column>
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
      pageSize: 1,
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
      this.$axios.get("/construction/projectManager").then(() => {
        this.tableData = {
          abnormalOperationResp: {
            riskLevel: "高风险",
            desc: "发打算发达",
            count: 3,
            abnormalOperationList: [
              {
                row: 1,
                id: 96,
                entId: "8535efbfc3d44226206332272daeffc5",
                personId: "0",
                fssGuId: "113843750",
                fssCaseNo: "（2016）苏0902执293号",
                fssName: "盐城市亭湖区黄尖供销合作有限公司",
                fssStatus: "已结案",
                fssCourtName: "",
                fssCourtId: "320801",
                fssMoney: 952365,
                fssRegNo: "745597120",
                fssLasj: "2016-01-20T16:00:00.000+00:00",
                fssFileNum: null,
                fssEndDate: "2016-10-13T16:00:00.000+00:00",
                fssOutDate: null,
                fssAreaCode: "320902",
                fssAreaName: "-1",
                fssSqr: null,
                fssFocusNum: null,
                fssIdt: null,
                display: 0,
                createTime: "2022-11-15 01:21:36",
                updateTime: "2022-11-15 01:21:36",
              },
              {
                row: 2,
                id: 78320,
                entId: "8535efbfc3d44226206332272daeffc5",
                personId: "0",
                fssGuId: null,
                fssCaseNo: "（2018）苏0924执3172号",
                fssName: "盐城市亭湖区黄尖供销合作有限公司",
                fssStatus: "执行中",
                fssCourtName: "",
                fssCourtId: "320808",
                fssMoney: 1419200,
                fssRegNo: "91320902745****120Y",
                fssLasj: "2018-11-11T16:00:00.000+00:00",
                fssFileNum: "(2014)亭东民初字第0081号",
                fssEndDate: null,
                fssOutDate: null,
                fssAreaCode: null,
                fssAreaName: "-1",
                fssSqr: null,
                fssFocusNum: null,
                fssIdt: "2018-11-23T16:00:00.000+00:00",
                display: 0,
                createTime: "2022-11-15 02:23:32",
                updateTime: "2022-11-15 02:23:32",
              },
              {
                row: 3,
                id: 84902,
                entId: "8535efbfc3d44226206332272daeffc5",
                personId: "0",
                fssGuId: null,
                fssCaseNo: "（2015）亭东执字第00021号",
                fssName: "盐城市亭湖区黄尖供销合作有限公司",
                fssStatus: "执行中",
                fssCourtName: "",
                fssCourtId: "320801",
                fssMoney: 0,
                fssRegNo: "",
                fssLasj: "2015-01-05T16:00:00.000+00:00",
                fssFileNum: null,
                fssEndDate: null,
                fssOutDate: null,
                fssAreaCode: null,
                fssAreaName: "-1",
                fssSqr: "李俊",
                fssFocusNum: 0,
                fssIdt: "2016-04-21T16:00:00.000+00:00",
                display: 0,
                createTime: "2022-11-15 02:29:13",
                updateTime: "2022-11-15 02:29:13",
              },
            ],
          },
          breatchTrustResp: {
            riskLevel: "高风险",
            desc: "范德萨范德萨范德萨",
            count: 20,
            breachTrustList: [
              {
                row: 1,
                id: 6005,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                creditCode: "91320902745597120Y",
                registrationNumber: "320924000019628",
                inReason:
                  "经原江苏省盐城市国家税务局稽查局检查，发现其在2015年1月1日至2016年4月30日期间，主要存在以下问题：对外虚开增值税销项发票325份，虚开金额3000.44万元、税额390.06万元。",
                inDate: "2020-08-25T16:00:00.000+00:00",
                inOrg: "原盐城市税务局稽查局",
                inWnum: null,
                inTitle: null,
                inContent: null,
                yzType: null,
                yzFact: null,
                url: null,
                createTime: "2022-11-15 02:11:34",
                updateTime: "2022-11-15 02:11:34",
              },
            ],
          },
          pledgeEquityResp: {
            riskLevel: "警示",
            desc: "发撒打发打算",
            count: 1,
            pledgeEquityList: [
              {
                row: 1,
                id: 7744,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                filingDate: "2018-11-11T16:00:00.000+00:00",
                caseNo: "(2018)苏0924执3172号",
                qyInfo: "盐城市亭湖区黄尖供销合作有限公司",
                xname: "龚锦生",
                publishDate: null,
                webDetailUrl: null,
                filePath:
                  "http://zxgk.court.gov.cn/xglfile/1244/2019-03-19/57206748a9314635867eb31ba8529c56.pdf",
                filePathLoad: null,
                createTime: "2022-11-04 11:23:37",
                updateTime: "2022-11-04 11:23:37",
              },
            ],
          },
          adminPenaltyResp: {
            riskLevel: "中风险",
            desc: "发第三方的撒范德萨",
            count: 2,
            adminPenaltyList: [
              {
                row: 1,
                id: 3112,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                caseCreateTime: "2016-01-18T16:00:00.000+00:00",
                caseFinalTime: "2016-07-12T16:00:00.000+00:00",
                caseCode: "(2016)苏0902执247号",
                execMoney: 849348,
                execMoneyUnit: "元",
                noExecMoney: 0,
                noExecMoneyUnit: "元",
                execCourtName: "盐城市亭湖区人民法院",
                createTime: "2022-11-17 00:01:43",
                updateTime: "2022-11-17 00:01:43",
              },
              {
                row: 2,
                id: 10084,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                caseCreateTime: "2016-01-20T16:00:00.000+00:00",
                caseFinalTime: "2016-07-12T16:00:00.000+00:00",
                caseCode: "(2016)苏0902执293号",
                execMoney: 952365,
                execMoneyUnit: "元",
                noExecMoney: 0,
                noExecMoneyUnit: "元",
                execCourtName: "盐城市亭湖区人民法院",
                createTime: "2022-11-17 00:05:44",
                updateTime: "2022-11-17 00:05:44",
              },
            ],
          },
          taxArrearsResp: {
            riskLevel: "警示",
            desc: "发撒打发打算发打算分散",
            count: 15,
            taxArrearsList: [
              {
                row: 1,
                id: 3112,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                caseCreateTime: "2016-01-18T16:00:00.000+00:00",
                caseFinalTime: "2016-07-12T16:00:00.000+00:00",
                caseCode: "(2016)苏0902执247号",
                execMoney: 849348,
                execMoneyUnit: "元",
                noExecMoney: 0,
                noExecMoneyUnit: "元",
                execCourtName: "盐城市亭湖区人民法院",
                createTime: "2022-11-17 00:01:43",
                updateTime: "2022-11-17 00:01:43",
              },
              {
                row: 2,
                id: 10084,
                entId: "8535efbfc3d44226206332272daeffc5",
                entName: "盐城市亭湖区黄尖供销合作有限公司",
                caseCreateTime: "2016-01-20T16:00:00.000+00:00",
                caseFinalTime: "2016-07-12T16:00:00.000+00:00",
                caseCode: "(2016)苏0902执293号",
                execMoney: 952365,
                execMoneyUnit: "元",
                noExecMoney: 0,
                noExecMoneyUnit: "元",
                execCourtName: "盐城市亭湖区人民法院",
                createTime: "2022-11-17 00:05:44",
                updateTime: "2022-11-17 00:05:44",
              },
            ],
          },
        };
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
      console.log(type, val);
      switch (type) {
        case "abnormalOperationResp":
          this.abnormalOperationRespPageNum = val;
          this.$axios
            .get("/construction/projectManager", {
              pageNum: this.abnormalOperationRespPageNum,
              pageSize: this.pageSize,
            })
            .then(() => {
              this.tableData.abnormalOperationResp.abnormalOperationList = [
                {
                  row: 1,
                  id: 96,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  personId: "0",
                  fssGuId: "113843750",
                  fssCaseNo: "（2016）苏0902执293号",
                  fssName: "盐城市亭湖区黄尖供销合作有限公司",
                  fssStatus: "已结案",
                  fssCourtName: "",
                  fssCourtId: "320801",
                  fssMoney: 952365,
                  fssRegNo: "745597120",
                  fssLasj: "2016-01-20T16:00:00.000+00:00",
                  fssFileNum: null,
                  fssEndDate: "2016-10-13T16:00:00.000+00:00",
                  fssOutDate: null,
                  fssAreaCode: "320902",
                  fssAreaName: "-1",
                  fssSqr: null,
                  fssFocusNum: null,
                  fssIdt: null,
                  display: 0,
                  createTime: "2022-12-25 01:21:36",
                  updateTime: "2022-11-15 01:21:36",
                },
                {
                  row: 2,
                  id: 78320,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  personId: "0",
                  fssGuId: null,
                  fssCaseNo: "（2018）苏0924执3172号",
                  fssName: "盐城市亭湖区黄尖供销合作有限公司",
                  fssStatus: "执行中",
                  fssCourtName: "",
                  fssCourtId: "320808",
                  fssMoney: 1419200,
                  fssRegNo: "91320902745****120Y",
                  fssLasj: "2018-11-11T16:00:00.000+00:00",
                  fssFileNum: "(2014)亭东民初字第0081号",
                  fssEndDate: null,
                  fssOutDate: null,
                  fssAreaCode: null,
                  fssAreaName: "-1",
                  fssSqr: null,
                  fssFocusNum: null,
                  fssIdt: "2018-11-23T16:00:00.000+00:00",
                  display: 0,
                  createTime: "2022-12-11 02:23:32",
                  updateTime: "2022-11-15 02:23:32",
                },
                {
                  row: 3,
                  id: 84902,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  personId: "0",
                  fssGuId: null,
                  fssCaseNo: "（2015）亭东执字第00021号",
                  fssName: "盐城市亭湖区黄尖供销合作有限公司",
                  fssStatus: "执行中",
                  fssCourtName: "",
                  fssCourtId: "320801",
                  fssMoney: 0,
                  fssRegNo: "",
                  fssLasj: "2015-01-05T16:00:00.000+00:00",
                  fssFileNum: null,
                  fssEndDate: null,
                  fssOutDate: null,
                  fssAreaCode: null,
                  fssAreaName: "-1",
                  fssSqr: "李俊",
                  fssFocusNum: 0,
                  fssIdt: "2016-04-21T16:00:00.000+00:00",
                  display: 0,
                  createTime: "2022-12-19 02:29:13",
                  updateTime: "2022-11-15 02:29:13",
                },
              ];
            });
          break;
        case "breatchTrustResp":
          this.breatchTrustRespPageNum = val;
          this.$axios
            .get("/construction/projectManager", {
              pageNum: this.breatchTrustRespPageNum,
              pageSize: this.pageSize,
            })
            .then(() => {
              this.tableData.breatchTrustResp.breachTrustList = [
                {
                  row: val,
                  id: 6005,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  entName: "盐城市亭湖区黄尖供销合作有限公司",
                  creditCode: "91320902745597120Y",
                  registrationNumber: "320924000019628",
                  inReason:
                    "经原江苏省盐城市国家税务局稽查局检查，发现其在2015年1月1日至2016年4月30日期间，主要存在以下问题：对外虚开增值税销项发票325份，虚开金额3000.44万元、税额390.06万元。",
                  inDate: "2020-08-25T16:00:00.000+00:00",
                  inOrg: "原盐城市税务局稽查局",
                  inWnum: null,
                  inTitle: null,
                  inContent: null,
                  yzType: null,
                  yzFact: null,
                  url: null,
                  createTime: "2022-11-15 02:11:34",
                  updateTime: "2022-11-15 02:11:34",
                },
              ];
            });
          break;
        case "pledgeEquityResp":
          this.pledgeEquityRespPageNum = val;
          this.$axios
            .get("/construction/projectManager", {
              pageNum: this.pledgeEquityRespPageNum,
              pageSize: this.pageSize,
            })
            .then(() => {
              this.tableData.pledgeEquityResp.pledgeEquityList = [
                {
                  row: val,
                  id: 6005,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  entName: "盐城市亭湖区黄尖供销合作有限公司",
                  creditCode: "91320902745597120Y",
                  registrationNumber: "320924000019628",
                  inReason:
                    "经原江苏省盐城市国家税务局稽查局检查，发现其在2015年1月1日至2016年4月30日期间，主要存在以下问题：对外虚开增值税销项发票325份，虚开金额3000.44万元、税额390.06万元。",
                  inDate: "2020-08-25T16:00:00.000+00:00",
                  inOrg: "原盐城市税务局稽查局",
                  inWnum: null,
                  inTitle: null,
                  inContent: null,
                  yzType: null,
                  yzFact: null,
                  url: null,
                  createTime: "2022-11-15 02:11:34",
                  updateTime: "2022-11-15 02:11:34",
                },
              ];
            });
          break;
        case "adminPenaltyResp":
          this.adminPenaltyRespPageNum = val;
          this.$axios
            .get("/construction/projectManager", {
              pageNum: this.adminPenaltyRespPageNum,
              pageSize: this.pageSize,
            })
            .then(() => {
              this.tableData.adminPenaltyResp.adminPenaltyList = [
                {
                  row: val,
                  id: 6005,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  entName: "盐城市亭湖区黄尖供销合作有限公司",
                  creditCode: "91320902745597120Y",
                  registrationNumber: "320924000019628",
                  inReason:
                    "经原江苏省盐城市国家税务局稽查局检查，发现其在2015年1月1日至2016年4月30日期间，主要存在以下问题：对外虚开增值税销项发票325份，虚开金额3000.44万元、税额390.06万元。",
                  inDate: "2020-08-25T16:00:00.000+00:00",
                  inOrg: "原盐城市税务局稽查局",
                  inWnum: null,
                  inTitle: null,
                  inContent: null,
                  yzType: null,
                  yzFact: null,
                  url: null,
                  createTime: "2022-11-15 02:11:34",
                  updateTime: "2022-11-15 02:11:34",
                },
              ];
            });
          break;
        case "taxArrearsResp":
          this.taxArrearsRespPageNum = val;
          this.$axios
            .get("/construction/projectManager", {
              pageNum: this.taxArrearsRespPageNum,
              pageSize: this.pageSize,
            })
            .then(() => {
              this.tableData.taxArrearsResp.taxArrearsList = [
                {
                  row: val,
                  id: 6005,
                  entId: "8535efbfc3d44226206332272daeffc5",
                  entName: "盐城市亭湖区黄尖供销合作有限公司",
                  creditCode: "91320902745597120Y",
                  registrationNumber: "320924000019628",
                  inReason:
                    "经原江苏省盐城市国家税务局稽查局检查，发现其在2015年1月1日至2016年4月30日期间，主要存在以下问题：对外虚开增值税销项发票325份，虚开金额3000.44万元、税额390.06万元。",
                  inDate: "2020-08-25T16:00:00.000+00:00",
                  inOrg: "原盐城市税务局稽查局",
                  inWnum: null,
                  inTitle: null,
                  inContent: null,
                  yzType: null,
                  yzFact: null,
                  url: null,
                  createTime: "2022-11-15 02:11:34",
                  updateTime: "2022-11-15 02:11:34",
                },
              ];
            });
          break;
        default:
      }
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
