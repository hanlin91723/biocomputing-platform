<template>
  <div class="enterprise-list-wrap">
    <el-form
      inline
      :model="searchFormData"
      label-width="100px"
      class="search-form"
    >
      <el-form-item
        v-for="item in searchFormListDefault"
        :key="item.prop"
        :label="item.formLabel"
      >
        <el-select
          v-if="item.formType === 'select'"
          class="form-item"
          clearable
          v-model="searchFormData[item.prop]"
          :multiple="item.isMultiple"
          :placeholder="`请选择${item.formLabel}`"
        >
          <el-option
            v-for="itemTemp in optsObj[item.optsName]"
            :key="itemTemp.id"
            :label="itemTemp.name"
            :value="itemTemp.id"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          class="form-item"
          clearable
          v-model="searchFormData[item.prop]"
          :placeholder="`请输入${item.formLabel}`"
        ></el-input>
      </el-form-item>
      <div class="more-filter el-form-item" @click="moreFlag = !moreFlag">
        <span>更多选项</span>
        <i
          :class="[
            'direction',
            moreFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
          ]"
        ></i>
      </div>
    </el-form>
    <!-- <transition name="more-search-form"> -->
    <el-form
      v-show="moreFlag"
      inline
      :model="searchFormData"
      label-width="100px"
      class="search-form"
    >
      <el-form-item
        v-for="item in searchFormListMore"
        :key="item.prop"
        :label="item.formLabel"
        :prop="item.prop"
      >
        <el-select
          v-if="item.formType === 'select'"
          class="form-item"
          clearable
          v-model="searchFormData[item.prop]"
          :multiple="item.isMultiple"
          :placeholder="`请选择${item.formLabel}`"
        >
          <el-option
            v-for="itemTemp in optsObj[item.optsName]"
            :key="itemTemp.id"
            :label="itemTemp.name"
            :value="itemTemp.id"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          class="form-item"
          clearable
          v-model="searchFormData[item.prop]"
          :placeholder="`请输入${item.formLabel}`"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- </transition> -->
    <el-form inline class="btn-form">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置条件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出列表</el-button>
      </el-form-item>
    </el-form>
    <div class="filter-list-wrap flex">
      <h3 class="filter-list-title">已选条件：</h3>
      <el-tag
        class="filter-item"
        v-for="item in searchFormDataTemp"
        :key="item.name"
        closable
        @close="handleCloseFilter(item)"
      >
        <span class="name">{{ item.name }}：</span>
        <span class="value">{{
          Array.isArray(item.value) ? getName(item) : item.value
        }}</span>
      </el-tag>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border stripe class="table" id="outTable">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column
        prop="enterpriseName"
        label="企业名称"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="legalPerson"
        label="法人"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="creditCode"
        label="统一社会信用代码"
        width="200"
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
        prop="riskStatistics"
        label="风险统计（条）"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="delete" @click="portrait(scope.row)">企业画像</span>
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
import { exportTableAsXLSX } from "@/util/util";
const searchFormList = [
  {
    formLabel: "所属行业",
    prop: "industry",
    value: [],
    formType: "select",
    isMultiple: true,
    optsName: "industryOpts",
  },
  {
    formLabel: "注册资本",
    prop: "registerCapital",
    value: "",
    formType: "select",
    isMultiple: false,
    optsName: "registerCapitalOpts",
  },
  {
    formLabel: "企业名称",
    prop: "enterpriseName",
    value: "",
    formType: "input",
    isMultiple: false,
    optsName: "",
  },
  {
    formLabel: "特色标签",
    prop: "tag",
    value: [],
    formType: "select",
    isMultiple: true,
    optsName: "tagOpts",
  },
  {
    formLabel: "统一信用代码",
    prop: "code",
    value: "",
    formType: "input",
    isMultiple: false,
    optsName: "",
  },
  {
    formLabel: "企业地址",
    prop: "address",
    value: "",
    formType: "input",
    isMultiple: false,
    optsName: "",
  },
  {
    formLabel: "企业经营范围",
    prop: "businessScope",
    value: "",
    formType: "input",
    isMultiple: false,
    optsName: "",
  },
  {
    formLabel: "成立时间",
    prop: "duration",
    value: "",
    formType: "select",
    isMultiple: false,
    optsName: "durationOpts",
  },
  {
    formLabel: "企业类型",
    prop: "enterpriseType",
    value: [],
    formType: "select",
    isMultiple: true,
    optsName: "enterpriseTypeOpts",
  },
  {
    formLabel: "员工数量",
    prop: "staffNum",
    value: "",
    formType: "select",
    isMultiple: false,
    optsName: "staffNumOpts",
  },
];
export default {
  data() {
    let searchFormData = {};
    searchFormList.forEach((item) => {
      searchFormData[item.prop] = item.value;
    });
    return {
      searchFormList,
      searchFormData,
      optsObj: {
        industryOpts: [
          {
            id: "选项1",
            name: "黄金糕",
          },
          {
            id: "选项2",
            name: "双皮奶",
          },
          {
            id: "选项3",
            name: "蚵仔煎",
          },
          {
            id: "选项4",
            name: "龙须面",
          },
          {
            id: "选项5",
            name: "北京烤鸭",
          },
        ],
        registerCapitalOpts: [
          {
            id: "选项1",
            name: "黄金糕",
          },
          {
            id: "选项2",
            name: "双皮奶",
          },
          {
            id: "选项3",
            name: "蚵仔煎",
          },
          {
            id: "选项4",
            name: "龙须面",
          },
          {
            id: "选项5",
            name: "北京烤鸭",
          },
        ],
        tagOpts: [
          {
            name: "高新技术企业",
            id: 1,
          },
          {
            name: "独角兽企业",
            id: 2,
          },
          {
            name: "瞪羚企业",
            id: 3,
          },
          {
            name: "上市企业",
            id: 4,
          },
          {
            name: "专精特新企业",
            id: 5,
          },
        ],
        durationOpts: [
          {
            id: "选项1",
            name: "黄金糕",
          },
          {
            id: "选项2",
            name: "双皮奶",
          },
          {
            id: "选项3",
            name: "蚵仔煎",
          },
          {
            id: "选项4",
            name: "龙须面",
          },
          {
            id: "选项5",
            name: "北京烤鸭",
          },
        ],
        enterpriseTypeOpts: [
          {
            id: "选项1",
            name: "黄金糕",
          },
          {
            id: "选项2",
            name: "双皮奶",
          },
          {
            id: "选项3",
            name: "蚵仔煎",
          },
          {
            id: "选项4",
            name: "龙须面",
          },
          {
            id: "选项5",
            name: "北京烤鸭",
          },
        ],
        staffNumOpts: [
          {
            id: "选项1",
            name: "黄金糕",
          },
          {
            id: "选项2",
            name: "双皮奶",
          },
          {
            id: "选项3",
            name: "蚵仔煎",
          },
          {
            id: "选项4",
            name: "龙须面",
          },
          {
            id: "选项5",
            name: "北京烤鸭",
          },
        ],
      },
      moreFlag: false,
      total: 110,
      pageSize: 11,
      currentPage: 1,
    };
  },
  computed: {
    searchFormListDefault() {
      return this.searchFormList.filter((item, index) => index < 4);
    },
    searchFormListMore() {
      return this.searchFormList.filter((item, index) => index >= 4);
    },
    searchFormDataTemp() {
      const nameArr = Object.keys(this.searchFormData);
      const arr = nameArr.map((item) => ({
        prop: item,
        name: searchFormList.find((itemTemp) => itemTemp.prop === item)
          .formLabel,
        value: this.searchFormData[item],
      }));
      const arrNotEmpty = arr.filter((item) => item.value.toString() !== "");
      return arrNotEmpty;
    },
  },
  created() {
    const routeParams = this.$route.params;
    this.searchFormData.tag = routeParams.tag ? [routeParams.tag,] : [];
    this.searchFormData.enterpriseName = routeParams.enterpriseName || "";
    this.getTableData();
  },
  methods: {
    getTableData() {
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);

      // });
      this.tableData = [
        {
          id: 1,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
        {
          id: 2,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 85,
          riskStatistics: 13548,
        },
        {
          id: 3,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 68,
          riskStatistics: 13548,
        },
        {
          id: 4,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 43,
          riskStatistics: 13548,
        },
        {
          id: 5,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 12,
          riskStatistics: 13548,
        },
        {
          id: 6,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 11,
          riskStatistics: 13548,
        },
        {
          id: 7,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
        {
          id: 8,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
        {
          id: 9,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
        {
          id: 10,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
        {
          id: 11,
          enterpriseName: "江苏商务集团有限公司",
          legalPerson: "张强",
          creditCode: "9132092314052XXXXX",
          industry: "商务服务业",
          riskIndex: 86,
          riskStatistics: 13548,
        },
      ];
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
    portrait({ id, }) {
      //  提示
      this.$router.push(`/enterprise-retrieval/enterprise-portrait/${id}`);
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
    },
    onSubmit() {
      exportTableAsXLSX("outTable");
    },
    reset() {
      for (const keyName in this.searchFormData) {
        this.searchFormData[keyName] = Array.isArray(
          this.searchFormData[keyName]
        )
          ? []
          : "";
      }
    },
    handleCloseFilter(item) {
      this.searchFormData[item.prop] = Array.isArray(item.value) ? [] : "";
    },
    getName(item) {
      const nameArr = item.value.map((itemTemp1) => {
        const arr = this.optsObj[item.prop + "Opts"];
        return arr.find((itemTemp2) => itemTemp2.id === itemTemp1).name;
      });
      return nameArr.join("，");
    },
  },
};
</script>

<style lang="less" scoped>
.more-search-form-enter-active,
.more-search-form-leave-active {
  transition: all 1s ease;
}
.more-search-form-leave-to {
  height: 0;
}
.more-search-form-enter-to {
  height: 62px;
}
.enterprise-list-wrap {
  .more-filter {
    width: 100px;
    height: 40px;
    font-size: 14px;
    text-align: right;
    line-height: 40px;
    color: #409eff;
    cursor: pointer;
    .direction {
      padding-left: 5px;
    }
  }
  .form-item {
    width: 180px;
  }
  .flex {
    display: flex;
  }
  .filter-list-wrap {
    align-items: center;
    flex-wrap: wrap;
    height: 42px;
    .filter-item {
      margin: 5px;
    }
  }
  .table {
    width: 100%;
    height: 575px;
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
}
</style>
