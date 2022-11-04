<template>
  <div class="user">
    <div class="header">
        <div>
          <label for="" class="label">分类：</label>
        <el-select v-model="classifyValue" placeholder="请选择" class="user-select">
          <el-option v-for="item in classifyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        </div>
        <div>
          <label for="" class="label">风险等级：</label>
        <el-select v-model="riskGradeValue" placeholder="请选择" class="user-select">
          <el-option v-for="item in riskGradeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
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
          <span :class="{[riskColor(scope.row.riskGrade)]:true}">{{scope.row.riskGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="riskIndex" label="风险指标"></el-table-column>
      <el-table-column prop="riskClassify" label="风险分类"></el-table-column>
      <el-table-column prop="riskDescribe" label="风险描述" width="420"></el-table-column>
      <el-table-column prop="riskEnterpriseCount" label="风险企业数量" :render-header="renderCount"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="edit" @click="riskDetails(scope.row)">风险详情</span>
        </template>
    </el-table-column>
  </el-table>
    <!-- 分页器 -->
    <el-pagination background
     layout="total, prev, pager, next"
     :page-size="pageSize"
     :total="total"
     :current-page="currentPage"
     class="pagination" 
     @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      classifyOptions:[],
      riskGradeOptions:[],
      // 查询数据
      classifyValue:"1",
      riskGradeValue:"1",
      // 分页
      total:110,
      pageSize:11,
      currentPage:1,
    };
  },
  created(){
    this.getTableData();
    this.getclassifyOptions();
    this.getriskGradeOptions();
  },
  methods:{
    getTableData(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.tableData = [{
          id:1,
          riskGrade: "高风险",
          riskIndex: "被执行人",
          riskClassify:"司法风险",
          riskDescribe:"司法案件风险企业占比超过35%",
          riskEnterpriseCount:49885,
        },{
          id:2,
          riskGrade: "中风险",
          riskIndex: "失信信息",
          riskClassify:"司法风险",
          riskDescribe:"失信信息风险企业数量同比上升18%",
          riskEnterpriseCount:984,
        },{
          id:3,
          riskGrade: "中风险",
          riskIndex: "限制高消费",
          riskClassify:"监管风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:894,
        },{
          id:4,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:5,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:6,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:7,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:8,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:9,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:10,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },{
          id:11,
          riskGrade: "警示",
          riskIndex: "限制出境",
          riskClassify:"司法风险",
          riskDescribe:"限制高消费风险企业占比超过32%且数量同比上升17%",
          riskEnterpriseCount:954,
        },];
    },
    getclassifyOptions(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.classifyOptions = [{
          value: "1",
          label: "全部",
        },{
          value: "2",
          label: "司法风险",
        },{
          value: "3",
          label: "监管风险",
        },{
          value: "4",
          label: "市场活力",
        },{
          value: "5",
          label: "社会效益",
        },];
    },
    getriskGradeOptions(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.riskGradeOptions = [{
          value: "1",
          label: "全部",
        },{
          value: "2",
          label: "高风险",
        },{
          value: "3",
          label: "中风险",
        },{
          value: "4",
          label: "警示",
        },];
    },
    // 查询
    search(){
      // 调用接口查询，拿到结果给表格
      console.log("查询");
      // let params = {
      //   classifyValue:this.classifyValue,
      //   riskGradeValue:this.riskGradeValue,
      // };
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
    },
    // 风险指数
    riskColor(val){
      switch (val) {
        case "高风险":
          return "riskColor1";
        case "中风险":
          return "riskColor2";
        case "警示":
          return "riskColor3";
        default:
          break;
      }
    },
    // 风险详情
    riskDetails({id,}){
      console.log(id);
      // this.$router.push(`/riskDetails?id=${id}`);
    },
    // 分页
    handleCurrentChange(val){
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
    // 为表格头标题添加小图标并hover后出现提示信息
    renderCount (h, { column, }) {
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
            h("i", { // 生成 i 标签 ，添加icon 设置 样式，slot 必填
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
.user{
  .header{
    display: flex;
    justify-content: space-between;
    width: 750px;
    margin-bottom: 20px;
      .input{
        width: 270px;
        // margin: 0 30px;
      }
      .search{
        width: 100px;
      }
    .addUser{
        width: 100px;
      }
  }
  .table{
    width: 100%;
    height: 575px;
    margin-bottom: 10px;
    .riskColor1{
      color: rgb(217, 0, 27);
    }
    .riskColor2{
      color: rgb(245, 154, 42);
    }
    .riskColor3{
      color: rgb(184, 116, 26);
    }
    .reset,.edit,.delete{
      color:rgb(3, 167, 240);
      cursor: pointer;
    }
    .edit{
      margin: 0 20px;
    }
    .delete{
      color:orange;
    }
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
  }
  .ok,.cancel{
    width: 60px;
    height: 30px;
  }
}
</style>