<template>
  <div class="user">
    <div class="header">
      <div>
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
          v-model="enterpriseName"
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
    <el-table :data="tableData" border stripe class="table">
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
          <span class="edit" @click="riskDetails(scope.row)">风险详情</span>
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
export default {
  data() {
    return {
      tableData: [],
      industryOptions: [],
      riskGradeOptions: [],
      // 查询数据
      industryValue: "1",
      riskGradeValue: "1",
      enterpriseName: "",
      // 分页
      total: 110,
      pageSize: 11,
      currentPage: 1,
    };
  },
  created() {
    this.getTableData();
    this.getIndustryOptions();
    this.getriskGradeOptions();
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
    getIndustryOptions() {
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);

      // });
      this.industryOptions = [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "农、林、牧、渔业",
        },
        {
          value: "3",
          label: "采矿业",
        },
        {
          value: "4",
          label: "制造业",
        },
        {
          value: "5",
          label: "电力、热力、燃气及水生产和供应业",
        },
        {
          value: "6",
          label: "建筑业",
        },
      ];
    },
    getriskGradeOptions() {
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);

      // });
      this.riskGradeOptions = [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "高风险",
        },
        {
          value: "3",
          label: "较高风险",
        },
        {
          value: "4",
          label: "中风险",
        },
        {
          value: "5",
          label: "低风险",
        },
      ];
    },
    // 查询
    search() {
      // 调用接口查询，拿到结果给表格
      console.log("查询");
      // let params = {
      //   industryValue:this.industryValue,
      //   riskGradeValue:this.riskGradeValue,
      //   enterpriseName:this.enterpriseName,
      //   enterpriseLabelValue:this.enterpriseLabelValue,
      // };
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
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
    // 风险详情
    riskDetails({ id, }) {
      console.log(id);
      this.$router.push({
        path: "/enterprise-risk/detail/1",
      });
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
  .ok,
  .cancel {
    width: 60px;
    height: 30px;
  }
}
</style>
