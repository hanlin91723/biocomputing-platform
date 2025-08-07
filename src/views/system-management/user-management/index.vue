<template>
  <div class="user">
    <el-form inline class="btn-form">
      <el-form-item>
        <el-button type="primary" plain @click="refresh">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="handleEdit()"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" header-cell-class-name="table-header-row">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="100"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="权限等级">
        <template #default="{ row }">{{
          roleOptions.find((item) => item.value === row.level)?.label
        }}</template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-popconfirm
            hide-icon
            title="确定要重置该用户密码吗？"
            @confirm="handleResetPwd(row)"
          >
            <template #reference>
              <el-button
                type="warning"
                plain
                size="small"
                :disabled="!isAdmin(userRole)"
                >重置密码</el-button
              >
            </template>
          </el-popconfirm>
          <el-button
            class="edit-btn"
            type="primary"
            plain
            size="small"
            :disabled="!isAdmin(userRole)"
            @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm
            hide-icon
            title="确认删除该用户吗？"
            @confirm="deleteUser(row)"
          >
            <template #reference>
              <el-button
                type="danger"
                plain
                size="small"
                class="del-btn"
                :disabled="!isAdmin(userRole)"
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
    >
    </el-pagination>
    <!-- 编辑和添加用户弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      v-model="showUserDialog"
      width="500px"
      @close="isCancel"
    >
      <el-form
        label-width="110px"
        :model="userInfo"
        :rules="userInfoRules"
        ref="userInfo"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userInfo.username"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="权限等级" prop="level">
          <el-select
            class="select"
            placeholder="请选择权限等级"
            v-model="userInfo.level"
            clearable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm"
              >确定</el-button
            >
            <el-button size="medium" @click="isCancel">取消</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRole: sessionStorage.getItem("permission"), //当前用户的角色
      tableData: [],
      roleOptions: [
        {
          label: "超级管理员",
          value: "admin",
        },
        {
          label: "普通用户",
          value: "guest",
        },
      ],
      showUserDialog: false,
      isEdit: false,
      id: "", //当前编辑的id
      userInfo: {
        username: "",
        level: "",
      },
      userInfoRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "权限等级不能为空",
            trigger: "change",
          },
        ],
      },
      // 分页
      total: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    refresh() {
      this.currentPage = 1;
      this.getTableData();
    },
    getTableData() {
      const params = {
        pagesize: this.pageSize,
        currentpage: this.currentPage,
      };
      this.$axios.get("/user/account", params).then((data) => {
        this.tableData = data.data_list;
        this.total = data.total;
      });
    },
    // 删除用户
    deleteUser(row) {
      const params = {
        id: row.id,
      };
      this.$axios.delete("/user/account", params).then(() => {
        this.$message.success("删除成功");
        this.refresh();
      });
    },
    //重置密码
    handleResetPwd(row) {
      const params = {
        id: row.id,
      };
      this.$axios.patch("/user/passwordreset", params).then(() => {
        this.$message.success("密码重置成功");
      });
    },
    // 添加/编辑用户
    handleEdit(row) {
      this.isEdit = Boolean(row);
      if (this.isEdit) {
        this.userInfo = {
          username: row.username,
          level: row.level,
        };
        this.id = row.id;
      }
      this.showUserDialog = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    submitForm() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          let params = {
            username: this.userInfo.username,
            level: this.userInfo.level,
          };
          if (this.isEdit) {
            params.id = this.id;
          }
          this.$axios[this.isEdit ? "patch" : "post"](
            "/user/account",
            params
          ).then(() => {
            this.$message.success(`${this.isEdit ? "修改" : "添加"}成功`);
            this.refresh();
            this.isCancel();
          });
        }
      });
    },
    // 取消
    isCancel() {
      this.id = "";
      this.userInfo = {
        username: "",
        level: "",
      };
      this.$refs.userInfo.resetFields(); // 重置校验结果
      this.showUserDialog = false;
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //是否是超级管理员
    isAdmin(permission) {
      return permission === "admin";
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    // border-bottom: 1px solid #333;
    .header-left {
      display: flex;
      width: 900px;
      .input {
        width: 270px;
        margin: 0 30px;
      }
    }
  }
  .edit-btn {
    margin: 0 10px;
  }
  .del-btn {
    margin-left: 0;
  }
  .select {
    width: 100%;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
