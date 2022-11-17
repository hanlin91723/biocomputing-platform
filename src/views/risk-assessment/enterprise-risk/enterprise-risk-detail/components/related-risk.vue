<template>
  <div class="related-risk">
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="企业名称"></el-table-column>
      <el-table-column prop="amount1" label="法人代表"></el-table-column>
      <el-table-column
        prop="amount2"
        label="统一社会信用代码"
      ></el-table-column>
      <el-table-column prop="amount3" label="关联关系"></el-table-column>
      <el-table-column prop="amount3" label="持股/占股比例"></el-table-column>
      <el-table-column prop="amount1" label="地区"></el-table-column>
      <el-table-column prop="amount2" label="风险统计" min-width="300">
        <template slot-scope="{ row }">
          <el-tag
            v-for="item in row.list"
            class="tag"
            type="success"
            size="small"
            :key="item.name"
            >{{ item.name }} {{ item.num }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="amount3" label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handleRiskDetail(row)" type="text" size="small"
            >风险详情</el-button
          >
          <el-button @click="handleEnterpriseInfo(row)" type="text" size="small"
            >企业画像</el-button
          >
        </template>
      </el-table-column>
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
          list: [
            {
              name: "财务预警",
              num: 6,
            },
            {
              name: "人员风险",
              num: 21,
            },
            {
              name: "信用预警",
              num: 1,
            },
            {
              name: "被执行人 ",
              num: 5,
            },
          ],
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
          list: [
            {
              name: "财务预警",
              num: 6,
            },
            {
              name: "人员风险",
              num: 21,
            },
            {
              name: "信用预警",
              num: 1,
            },
            {
              name: "被执行人 ",
              num: 5,
            },
          ],
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
          list: [
            {
              name: "财务预警",
              num: 6,
            },
            {
              name: "人员风险",
              num: 21,
            },
            {
              name: "信用预警",
              num: 1,
            },
            {
              name: "被执行人 ",
              num: 5,
            },
          ],
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          list: [
            {
              name: "财务预警",
              num: 6,
            },
            {
              name: "人员风险",
              num: 21,
            },
            {
              name: "信用预警",
              num: 1,
            },
            {
              name: "被执行人 ",
              num: 5,
            },
          ],
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          list: [
            {
              name: "财务预警",
              num: 6,
            },
            {
              name: "人员风险",
              num: 21,
            },
            {
              name: "信用预警",
              num: 1,
            },
            {
              name: "被执行人 ",
              num: 5,
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleRiskDetail(row) {
      console.log(row);
    },
    handleEnterpriseInfo(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="less" scoped>
.related-risk {
  .tag {
    margin: 5px;
  }
}
</style>
