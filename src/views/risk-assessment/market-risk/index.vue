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
      <el-button type="primary" class="search" @click="search">查询</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table :data="tableData" border stripe class="table">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="riskGrade" label="风险等级">
        <template slot-scope="scope">
          <span :class="{ [riskColor(scope.row.riskGrade)]: true }">{{
            scope.row.riskGrade
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="riskIndex" label="风险指标"></el-table-column>
      <el-table-column prop="riskClassify" label="风险分类"></el-table-column>
      <el-table-column
        prop="riskDescribe"
        label="风险描述"
        width="420"
      ></el-table-column>
      <el-table-column
        prop="riskEnterpriseCount"
        label="风险企业数量"
        :render-header="renderCount"
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
          value: "无风险",
          label: "无风险",
        },
        {
          value: "警示",
          label: "警示",
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
    riskTrans(num){
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
      let params = {
        riskType:this.classifyValue,
        riskLevel:this.riskGradeValue,
      };
      this.$axios.get("/marketRisk/byCondition",params).then(({data,})=>{
        this.tableData = data.map(item=>{
          return {
            id: item.id,
            riskGrade: this.riskTrans(item.riskLevel),
            riskIndex: item.indexSmallTypeName,
            riskClassify: item.indexLargeTypeName,
            riskDescribe: item.desc,
            riskEnterpriseCount: item.entNum,
          };
        });
      });
    },
    // 查询
    search() {
      // 调用接口查询，拿到结果给表格
      let params = {
        riskType:this.classifyValue,
        riskLevel:this.riskGradeValue,
      };
      this.$axios.get("/marketRisk/byCondition",params).then(({data,})=>{
        this.tableData = data.map(item=>{
          return {
            id: item.id,
            riskGrade: this.riskTrans(item.riskLevel),
            riskIndex: item.indexSmallTypeName,
            riskClassify: item.indexLargeTypeName,
            riskDescribe: item.desc,
            riskEnterpriseCount: item.entNum,
          };
        });
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
    riskDetails({ id, }) {
      this.$router.push({
        path: "/market-risk/detail",
        query:{
          id,
        },
      });
    },
    // 为表格头标题添加小图标并hover后出现提示信息
    renderCount(h, { column, }) {
      // h 是一个渲染函数       column 是一个对象表示当前列      $index 第几列
      return h("div", [
        h("span", column.label + "  ", {
          align: "center",
          marginTop: "10px",
        }),
        h(
          "el-popover",
          {
            props: {
              placement: "top-start", // 一般 icon 处可添加浮层说明，浮层位置等属性
              width: "310",
              trigger: "hover",
            },
          },
          [
            h("p", "风险企业数量根据企业风险等级加权汇总统计", {
              class: "text-align: center; margin: 0",
            }),
            h("i", {
              // 生成 i 标签 ，添加icon 设置 样式，slot 必填
              class: "el-icon-warning",
              style: "color:#ccc,margin:18px,padding-top:10px",
              slot: "reference",
            }),
          ]
        ),
      ]);
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
