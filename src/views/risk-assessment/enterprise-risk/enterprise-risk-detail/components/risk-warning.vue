<template>
  <div class="risk-warning">
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="预警等级"></el-table-column>
      <el-table-column prop="amount1" label="预警分类"></el-table-column>
      <el-table-column prop="amount2" label="预警指标"></el-table-column>
      <el-table-column prop="amount3" label="预警描述"></el-table-column>
      <el-table-column prop="amount3" label="预警时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.risk-warning {
}
</style>
