<template>
  <div class="result-list-wrap">
    <el-form inline class="btn-form">
      <el-form-item>
        <el-button type="primary" plain @click="refresh">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="handleDelete()" :disabled="flag"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      class="table"
      header-cell-class-name="table-header-row"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="{ row }" v-if="row.status === '已完成'">
          <el-descriptions class="desc" direction="vertical" border :column="5">
            <el-descriptions-item
              :labelStyle="{ background: 'transparent' }"
              :contentStyle="{ background: '#fafafa', color: '#909399' }"
            >
              <div class="desc-item-content-top">原始数据集</div>
              <div class="desc-item-content-bottom">结果数据集</div>
            </el-descriptions-item>
            <el-descriptions-item label="名称">
              <div class="desc-item-content-top">{{ row.sname }}</div>
              <div class="desc-item-content-bottom">
                {{ row.dname }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="大小">
              <div class="desc-item-content-top">{{ row.ssize }}</div>
              <div class="desc-item-content-bottom">
                {{ row.dsize }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="后缀">
              <div class="desc-item-content-top">{{ row.ssuffix }}</div>
              <div class="desc-item-content-bottom">
                {{ row.dsuffix }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="操作">
              <div class="desc-item-content-top">
                <a
                  class="download-btn"
                  :href="$urlPrev + row.spath"
                  :download="row.sname"
                  >下载</a
                >
              </div>
              <div class="desc-item-content-bottom">
                <a
                  class="download-btn"
                  :href="$urlPrev + row.dpath"
                  :download="row.dname"
                  >下载</a
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <!-- <ul class="info-table">
            <li class="info">
              <div class="info-title"></div>
              <div class="info-value">原始数据集</div>
              <div class="info-value">结果数据集</div>
            </li>
            <li class="info name">
              <div class="info-title">名称</div>
              <div class="info-value">{{ row.sname }}</div>
              <div class="info-value">{{ row.dname }}</div>
            </li>
            <li class="info size">
              <div class="info-title">大小</div>
              <div class="info-value">{{ row.ssize }}</div>
              <div class="info-value">{{ row.dsize }}</div>
            </li>
            <li class="info suffix">
              <div class="info-title">后缀</div>
              <div class="info-value">{{ row.ssuffix }}</div>
              <div class="info-value">{{ row.dsuffix }}</div>
            </li>
            <li class="info operate">
              <div class="info-title">操作</div>
              <div class="info-value">
                <a
                  class="download-btn"
                  :href="$urlPrev + row.spath"
                  :download="row.sname"
                  >下载</a
                >
              </div>
              <div class="info-value">
                <a
                  class="download-btn"
                  :href="$urlPrev + row.dpath"
                  :download="row.dname"
                  >下载</a
                >
              </div>
            </li>
          </ul> -->
        </template>
      </el-table-column>
      <el-table-column prop="id" label="任务编号"></el-table-column>
      <el-table-column prop="taskname" label="任务名称"></el-table-column>
      <el-table-column prop="algoname" label="算法名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{ row }">
          <el-tag
            :type="
              row.status === '已完成'
                ? 'success'
                : row.status === '处理中'
                ? 'warning'
                : 'danger'
            "
            >{{ row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            plain
            size="small"
            class="param-btn"
            @click="handleParams(row)"
            >详细参数</el-button
          >
          <el-popconfirm title="您确定删除吗？" @confirm="handleDelete(row)">
            <el-button slot="reference" type="danger" plain size="small"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      layout="total, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      class="pagination"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-drawer
      title="详细参数"
      :visible.sync="drawerIsVisible"
      direction="rtl"
      :size="600"
    >
      <el-descriptions
        class="params"
        :column="1"
        :labelStyle="{ fontWeight: 700 }"
        :contentStyle="{ color: '#909399' }"
      >
        <el-descriptions-item
          v-for="(value, key) in paramsObj"
          :label="key"
          :key="key"
          >{{ value }}</el-descriptions-item
        >
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      flag: true, //是否选中批量
      multipleSelection: [],
      drawerIsVisible: false,
      paramsObj: {},
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleDelete(row) {
      let params = {
        ids: row
          ? row.id
          : this.multipleSelection.map((item) => item.id).toString(),
      };
      this.$axios.delete("/datacentor/tasklist", params).then(() => {
        this.refresh();
        this.$message.success("删除成功");
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.flag = val.length === 0;
      this.multipleSelection = val;
    },
    handleExpandChange(row, expandedRows) {
      console.log(row, expandedRows);
    },
    handleParams(row) {
      const param = JSON.parse(row.param);
      console.log(param);
      this.drawerIsVisible = true;
      this.paramsObj = param;
    },
    refresh() {
      this.currentPage = 1;
      this.getTableData();
    },
    getTableData() {
      let params = {
        pagesize: this.pageSize,
        currentpage: this.currentPage,
      };
      this.loading = true;
      this.$axios
        .get("/datacentor/tasklist", params)
        .then((data) => {
          this.tableData = data.data_list;
          this.total = data.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
  },
};
</script>

<style lang="less" scoped>
.result-list-wrap {
  .form-item {
    width: 180px;
  }
  .flex {
    display: flex;
  }
  .table {
    .desc {
      width: 60%;
      margin-left: 113px;
      .el-descriptions-item__label {
        padding: 12px 10px;
      }
      /deep/ .el-descriptions-item__content {
        padding: 12px 0;
      }
      .desc-item-content-top {
        padding: 0 10px;
        padding-bottom: 12px;
      }
      .desc-item-content-bottom {
        padding: 0 10px;
        padding-top: 12px;
        border-top: 1px solid #ebeef5;
      }
      .download-btn {
        padding: 7px 15px;
        font-size: 12px;
        color: #409eff;
        text-decoration: none;
        background: #ecf5ff;
        border: 1px solid #b3d8ff;
        border-radius: 4px;
        transition: 0.1s;
        &:hover {
          color: #fff;
          background: #409eff;
          border-color: #409eff;
        }
      }
    }
    .info-table {
      display: flex;
      justify-content: space-between;
      width: 600px;
      margin-left: 113px;
      line-height: 2;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // width: 100px;
        height: 120px;
        .info-title {
          height: 36px;
          font-size: 14px;
          font-weight: 700;
          line-height: 36px;
        }
        .info-value {
          height: 36px;
          font-size: 14px;
          line-height: 36px;
          .download-btn {
            padding: 7px 15px;
            color: #409eff;
            text-decoration: none;
            background: #ecf5ff;
            border: 1px solid #b3d8ff;
            border-radius: 4px;
            transition: 0.1s;
            &:hover {
              color: #fff;
              background: #409eff;
              border-color: #409eff;
            }
          }
        }
      }
      .name {
        width: auto;
      }
      .size {
      }
      .suffix {
      }
      .operate {
      }
    }
    .param-btn {
      margin-right: 10px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .params {
    padding: 20px;
  }
}
</style>
