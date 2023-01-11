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
        <el-button type="primary" @click="getTableData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置条件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出列表</el-button>
      </el-form-item>
    </el-form>
    <div class="filter-list-wrap flex">
      <div class="filter-list-title">已选条件：</div>
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
    <el-table :data="tableData" stripe class="table" id="outTable">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column prop="entName" label="企业名称"></el-table-column>
      <el-table-column prop="entStatus" label="经营状态"></el-table-column>
      <el-table-column prop="legalPerson" label="法人代表"></el-table-column>
      <el-table-column prop="registeredCapital" label="注册资本">
        <template slot-scope="{ row }">
          <span>{{ row.registeredCapital + row.registeredCapitalUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="incorporationDate"
        label="成立日期"
      ></el-table-column>
      <el-table-column prop="industry" label="行业"></el-table-column>
      <el-table-column prop="highTechEnt" label="特色标签"></el-table-column>
      <el-table-column prop="riskIndex" label="综合风险指数">
        <template slot-scope="scope">
          <span :class="{ [riskGrade(scope.row.riskIndex).className]: true }">{{
            riskGrade(scope.row.riskIndex).text
          }}</span>
        </template>
      </el-table-column>
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
// import { exportTableAsXLSX } from "@/util/util";
import { useUserStore } from "@/store/index.js";
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
    prop: "entName",
    value: "",
    formType: "input",
    isMultiple: false,
    optsName: "",
  },
  {
    formLabel: "特色标签",
    prop: "highTechEnt",
    value: [],
    formType: "select",
    isMultiple: true,
    optsName: "highTechEntOpts",
  },
  {
    formLabel: "统一信用代码",
    prop: "creditCode",
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
    prop: "businessDesc",
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
    prop: "entType",
    value: [],
    formType: "select",
    isMultiple: true,
    optsName: "entTypeOpts",
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
        industryOpts: [],
        registerCapitalOpts: [
          {
            id: "100万以内",
            name: "100万以内",
          },
          {
            id: "100-200万",
            name: "100-200万",
          },
          {
            id: "200-500万",
            name: "200-500万",
          },
          {
            id: "500-1000万",
            name: "500-1000万",
          },
          {
            id: "1000万以上",
            name: "1000万以上",
          },
        ],
        highTechEntOpts: [
          {
            name: "高新技术企业",
            id: "高新技术企业",
          },
          {
            name: "独角兽企业",
            id: "独角兽企业",
          },
          {
            name: "瞪羚企业",
            id: "瞪羚企业",
          },
          {
            name: "上市企业",
            id: "上市企业",
          },
          {
            name: "专精特新企业",
            id: "专精特新企业",
          },
        ],
        durationOpts: [
          {
            id: "1年内",
            name: "1年内",
          },
          {
            id: "1-5年",
            name: "1-5年",
          },
          {
            id: "5-10年",
            name: "5-10年",
          },
          {
            id: "10-15年",
            name: "10-15年",
          },
          {
            id: "15年以上",
            name: "15年以上",
          },
        ],
        entTypeOpts: [
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
            id: "小于50人",
            name: "小于50人",
          },
          {
            id: "50-99人",
            name: "50-99人",
          },
          {
            id: "100-499人",
            name: "100-499人",
          },
          {
            id: "500-999人",
            name: "500-999人",
          },
          {
            id: "1000-4999人",
            name: "1000-4999人",
          },
          {
            id: "5000-9999人",
            name: "5000-9999人",
          },
          {
            id: "10000人以上",
            name: "10000人以上",
          },
        ],
      },
      moreFlag: false,
      tableData: [],
      total: 0,
      pageSize: 10,
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
    this.searchFormData.highTechEnt = routeParams.highTechEnt
      ? [routeParams.highTechEnt]
      : [];
    this.searchFormData.entName = routeParams.entName || "";
    this.getIndustryList();
    this.getTableData();
  },
  methods: {
    getTableData() {
      let params = Object.assign({}, this.searchFormData, {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      });
      switch (this.searchFormData.registerCapital) {
        case "100万以内":
          params.endRegisteredCapital = 100;
          break;
        case "100-200万":
          params.startRegisteredCapital = 100;
          params.endRegisteredCapital = 200;
          break;
        case "200-500万":
          params.startRegisteredCapital = 200;
          params.endRegisteredCapital = 500;
          break;
        case "500-1000万":
          params.startRegisteredCapital = 500;
          params.endRegisteredCapital = 1000;
          break;
        case "1000万以上":
          params.startRegisteredCapital = 1000;
          break;
        default:
      }
      switch (this.searchFormData.duration) {
        case "1年内":
          params.incorporationStartDate = this.getDate(1);
          break;
        case "1-5年":
          params.incorporationStartDate = this.getDate(5);
          params.incorporationEndDate = this.getDate(1);
          break;
        case "5-10年":
          params.incorporationStartDate = this.getDate(10);
          params.incorporationEndDate = this.getDate(5);
          break;
        case "10-15年":
          params.incorporationStartDate = this.getDate(15);
          params.incorporationEndDate = this.getDate(10);
          break;
        case "15年以上":
          params.incorporationEndDate = this.getDate(15);
          break;
        default:
      }
      switch (this.searchFormData.staffNum) {
        case "小于50人":
          params.personEndNum = 50;
          break;
        case "50-99人":
          params.personStartNum = 50;
          params.personEndNum = 99;
          break;
        case "100-499人":
          params.personStartNum = 100;
          params.personEndNum = 499;
          break;
        case "500-999人":
          params.personStartNum = 500;
          params.personEndNum = 999;
          break;
        case "1000-4999人":
          params.personStartNum = 1000;
          params.personEndNum = 4999;
          break;
        case "5000-9999人":
          params.personStartNum = 5000;
          params.personEndNum = 9999;
          break;
        case "10000人以上":
          params.personStartNum = 10000;
          break;
        default:
      }
      this.$axios.post("/entInfo/condition", params).then(({ data }) => {
        this.total = data.total;
        this.tableData = data.list;
      });
    },
    getIndustryList() {
      this.$axios
        .get("/dict/queryDictByType", {
          dictType: "industry",
        })
        .then(({ data }) => {
          this.optsObj.industryOpts = data.map((item) => ({
            id: item.dictName,
            name: item.dictName,
          }));
        });
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
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    onSubmit() {
      // exportTableAsXLSX("outTable");
      let params = Object.assign({}, this.searchFormData, {
        pageSize: 2000,
        pageNum: 1,
      });
      switch (this.searchFormData.registerCapital) {
        case "100万以内":
          params.endRegisteredCapital = 100;
          break;
        case "100-200万":
          params.startRegisteredCapital = 100;
          params.endRegisteredCapital = 200;
          break;
        case "200-500万":
          params.startRegisteredCapital = 200;
          params.endRegisteredCapital = 500;
          break;
        case "500-1000万":
          params.startRegisteredCapital = 500;
          params.endRegisteredCapital = 1000;
          break;
        case "1000万以上":
          params.startRegisteredCapital = 1000;
          break;
        default:
      }
      switch (this.searchFormData.duration) {
        case "1年内":
          params.incorporationStartDate = this.getDate(1);
          break;
        case "1-5年":
          params.incorporationStartDate = this.getDate(5);
          params.incorporationEndDate = this.getDate(1);
          break;
        case "5-10年":
          params.incorporationStartDate = this.getDate(10);
          params.incorporationEndDate = this.getDate(5);
          break;
        case "10-15年":
          params.incorporationStartDate = this.getDate(15);
          params.incorporationEndDate = this.getDate(10);
          break;
        case "15年以上":
          params.incorporationEndDate = this.getDate(15);
          break;
        default:
      }
      switch (this.searchFormData.staffNum) {
        case "小于50人":
          params.personEndNum = 50;
          break;
        case "50-99人":
          params.personStartNum = 50;
          params.personEndNum = 99;
          break;
        case "100-499人":
          params.personStartNum = 100;
          params.personEndNum = 499;
          break;
        case "500-999人":
          params.personStartNum = 500;
          params.personEndNum = 999;
          break;
        case "1000-4999人":
          params.personStartNum = 1000;
          params.personEndNum = 4999;
          break;
        case "5000-9999人":
          params.personStartNum = 5000;
          params.personEndNum = 9999;
          break;
        case "10000人以上":
          params.personStartNum = 10000;
          break;
        default:
      }
      // 创建当前时间字符串，生成文件名称时使用
      const time = this.getCurentTime();
      this.$axios
        .post("/entInfo/exportEnt", params, { responseType: "blob" })
        .then((res) => {
          // 转化为blob对象
          let blob = new Blob([res.data], {
            type: "application/octet-stream",
          });
          let filename = time + ".xls";
          // 将blob对象转为一个URL
          var blobURL = window.URL.createObjectURL(blob);
          // 创建一个a标签
          var tempLink = document.createElement("a");
          // 隐藏a标签
          tempLink.style.display = "none";
          // 设置a标签的href属性为blob对象转化的URL
          tempLink.href = blobURL;
          // 给a标签添加下载属性
          tempLink.setAttribute("download", filename);
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }
          // 将a标签添加到body当中
          document.body.appendChild(tempLink);
          // 启动下载
          tempLink.click();
          // 下载完毕删除a标签
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
          this.$message({
            message: "导出成功~",
            type: "success",
          });
        });
    },
    getCurentTime() {
      var date = new Date();
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate = "_" + year + month + strDate + hour + minute + second;
      return currentdate;
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
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    getName(item) {
      const nameArr = item.value.map((itemTemp1) => {
        const arr = this.optsObj[item.prop + "Opts"];
        return arr.find((itemTemp2) => itemTemp2.id === itemTemp1).name;
      });
      return nameArr.join("，");
    },
    getDate(num) {
      return this.$dayjs().subtract(num, "year").format("YYYY-MM-DD");
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
