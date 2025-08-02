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
        <template #default="{ row }">
          <el-descriptions
            class="desc"
            direction="vertical"
            border
            :column="5"
            v-if="row.status === '已完成'"
          >
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
          <div v-if="row.codeflag === '1'">
            <div class="desc score-wrap">
              <h4 class="score-name">结构合理性评分</h4>
              <el-popover
                trigger="hover"
                :width="400"
                popper-class="score-popover"
              >
                <template #reference>
                  <el-icon class="tip"><Warning /></el-icon>
                </template>
                <div>
                  <span class="score-tip">90~100 (很高置信度)</span>
                  <span>：预测非常准确，接近实验结构</span>
                </div>
                <div>
                  <span class="score-tip">70~90 (高置信度)</span>
                  <span>：预测通常准确，可用于大多数应用</span>
                </div>
                <div>
                  <span class="score-tip">50~70 (低置信度)</span>
                  <span>：预测可能有误差，需谨慎使用</span>
                </div>
                <div>
                  <span class="score-tip">&lt; 50 (很低置信度)</span>
                  <span>：预测不可靠，通常为无序区域</span>
                </div>
              </el-popover>
              <h4>：</h4>
              <h4 class="score-value">{{ row.plddt }}</h4>
            </div>
            <div class="desc score-wrap">
              <h4 class="score-name">结合界面评分</h4>
              <el-popover
                trigger="hover"
                :width="300"
                popper-class="score-popover"
              >
                <template #reference>
                  <el-icon class="tip"><Warning /></el-icon>
                </template>
                <div>
                  <span class="score-tip">&gt; 0.8</span>
                  <span>：高置信度，界面预测很可能准确</span>
                </div>
                <div>
                  <span class="score-tip">0.5~0.8</span>
                  <span>：中等置信度</span>
                </div>
                <div>
                  <span class="score-tip">&lt; 0.5</span>
                  <span>：低置信度，界面预测可能不准确</span>
                </div>
              </el-popover>
              <h4>：</h4>
              <h4 class="score-value">{{ row.iptm }}</h4>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="任务编号"></el-table-column>
      <el-table-column prop="taskname" label="任务名称"></el-table-column>
      <el-table-column prop="algoname" label="算法名称"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
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
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            size="small"
            class="param-btn"
            @click="handleParams(row)"
            >详细参数</el-button
          >
          <el-popconfirm title="您确定删除吗？" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" plain size="small" class="del-btn"
                >删除</el-button
              >
            </template>
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
      v-model="drawerIsVisible"
      direction="rtl"
      :size="600"
    >
      <el-descriptions class="params" :column="1">
        <el-descriptions-item
          v-for="(value, key) in paramsObj"
          :label="key + '：'"
          :key="key"
          class-name="drawer-desc-value"
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
      :deep(.el-descriptions__label) {
        padding: 12px 10px;
      }
      :deep(.el-descriptions__content) {
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
        padding: 4px 12px;
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
      &.score-wrap {
        display: flex;
        align-items: center;
        margin-top: 12px;
        .score-name {
        }
        .tip {
          margin: 0 3px;
        }
        .score-value {
          font-size: 14px;
          color: var(--el-color-primary);
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
    .del-btn {
      margin-left: 0;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .params {
    padding: 0;
    :deep(.drawer-desc-value) {
      word-break: break-all;
    }
  }
}
.score-popover {
  .score-tip {
    font-weight: 700;
  }
}
</style>
