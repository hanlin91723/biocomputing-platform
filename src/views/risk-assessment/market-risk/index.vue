<template>
  <div class="user">
    <div class="header">
      <div>
        <label for="" class="label">分类：</label>
        <el-select
          v-model="classifyValue"
          placeholder="请选择"
          class="user-select"
        >
          <el-option
            v-for="item in classifyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label for="" class="label">风险等级：</label>
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
      <el-button type="primary" class="search" @click="getTableData"
        >查询</el-button
      >
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      class="table"
      header-cell-class-name="header-row"
    >
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column
        prop="indexSmallTypeName"
        label="风险指标"
      ></el-table-column>
      <el-table-column
        prop="indexLargeTypeName"
        label="风险分类"
      ></el-table-column>
      <el-table-column prop="riskGrade" label="风险等级">
        <template slot-scope="{ row }">
          <span :class="{ [riskColor(row.riskGrade)]: true }">{{
            row.riskGrade
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="entMarketRiskScore"
        label="市场指标风险指数"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="edit" @click="riskDetails(scope.row)">风险详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      classifyOptions: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "司法风险",
          label: "司法风险",
        },
        {
          value: "监管风险",
          label: "监管风险",
        },
        {
          value: "市场活力",
          label: "市场活力",
        },
        {
          value: "社会效益",
          label: "社会效益",
        },
      ],
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
          value: "中风险",
          label: "中风险",
        },
        {
          value: "警示",
          label: "警示",
        },
        {
          value: "无风险",
          label: "无风险",
        },
      ],
      // 查询数据
      classifyValue: "全部",
      riskGradeValue: "全部",
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    riskTrans(num) {
      switch (num) {
        case 0:
          return "无风险";
        case 1:
          return "高风险";
        case 2:
          return "中风险";
        case 3:
          return "警示";
        default:
          break;
      }
    },
    getTableData() {
      const params = {
        riskType: this.classifyValue,
        riskLevel: this.riskGradeValue,
      };
      this.$axios.get("/marketRisk/byCondition", params).then(({ data }) => {
        this.tableData = data.map((item) => ({
          ...item,
          riskGrade: this.riskTrans(item.riskLevel),
        }));
      });
    },
    // 风险指数
    riskColor(val) {
      switch (val) {
        case "高风险":
          return "riskColor1";
        case "中风险":
          return "riskColor2";
        case "警示":
          return "riskColor3";
        case "无风险":
          return "riskColor4";
        default:
          break;
      }
    },
    // 风险详情
    riskDetails({ id }) {
      this.$router.push({
        path: "/market-risk/detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    justify-content: space-between;
    width: 750px;
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
      color: rgb(217, 0, 27);
    }
    .riskColor2 {
      color: rgb(245, 154, 42);
    }
    .riskColor3 {
      color: rgb(182, 200, 76);
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
      margin: 0 20px;
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
