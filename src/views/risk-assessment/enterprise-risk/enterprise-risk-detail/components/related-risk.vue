<template>
  <div class="related-risk">
    <el-table :data="tableData" stripe header-cell-class-name="header-row">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="entName" label="企业名称"></el-table-column>
      <el-table-column prop="legalPerson" label="法人代表"></el-table-column>
      <el-table-column
        prop="creditCode"
        label="统一社会信用代码"
      ></el-table-column>
      <el-table-column prop="relation" label="关联关系"></el-table-column>
      <el-table-column prop="prop" label="持股/占股比例">
        <template slot-scope="{ row }">{{ row.prop }}%</template>
      </el-table-column>
      <el-table-column prop="area" label="地区"></el-table-column>
      <el-table-column
        prop="riskTypeStatisRespList"
        label="风险统计"
        min-width="300"
      >
        <template slot-scope="{ row }">
          <el-tag
            v-for="item in row.riskTypeStatisRespList"
            :class="['tag', `tag${item.level}`]"
            size="small"
            :key="item.name"
            >{{ item.name }} {{ item.value }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="amount3" label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handleRiskDetail(row)" type="text" size="small"
            >风险详情</el-button
          >
          <el-button
            :disabled="!enterprisePortraitHasPermission"
            @click="handleEnterpriseInfo(row)"
            type="text"
            size="small"
            >企业画像</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { useUserStore, relatedRiskStore } from "@/store/index.js";
const userStore = useUserStore();
export default {
  data() {
    return {
      enterprisePortraitHasPermission:
        userStore.enterprisePortraitHasPermission,
      tableData: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      const params = {
        entId: this.$route.params.id,
      };
      this.$axios.get("/entRisk/relationRisk", params).then(({ data }) => {
        this.tableData = data;
        const relatedRisk = relatedRiskStore();
        relatedRisk.updateRelatedRiskNum(data.length);
      });
    },
    handleRiskDetail(row) {
      this.$router.push({
        path: `/enterprise-risk/detail/${row.entId}`,
      });
    },
    handleEnterpriseInfo(row) {
      userStore.saveEntId(row.entId, row.entName);
      // this.$router.push(
      //   `/enterprise-retrieval/enterprise-portrait/${row.entId}`
      // );
      //新窗口打开企业画像
      const routeData = this.$router.resolve({
        path: `${
          import.meta.env.BASE_URL
        }enterprise-retrieval/enterprise-portrait/${row.entId}`,
      });
      window.open(routeData.location.path, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.related-risk {
  .tag {
    margin: 5px;
  }
  .tag0 {
    border: 1px solid rgba(93, 209, 140, 0.3);
    background-color: rgba(93, 209, 140, 0.1);
    color: rgba(93, 209, 140, 1);
  }
  .tag1 {
    border: 1px solid rgba(245, 114, 114, 0.3);
    background-color: rgba(245, 114, 114, 0.1);
    color: rgba(245, 114, 114, 1);
  }
  .tag2 {
    border: 1px solid rgba(244, 165, 47, 0.3);
    background-color: rgba(244, 165, 47, 0.1);
    color: rgba(244, 165, 47, 1);
  }
  .tag3 {
    border: 1px solid rgba(182, 200, 76, 0.3);
    background-color: rgba(182, 200, 76, 0.1);
    color: rgba(182, 200, 76, 1);
  }
}
</style>
