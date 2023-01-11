<template>
  <div class="user">
    <div class="header">
      <div class="header-left">
        <el-select
          v-model="roleVal"
          placeholder="请选择角色"
          class="user-select"
          clearable
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="input"
          placeholder="请输入用户名"
          v-model="userName"
          clearable
        ></el-input>
        <el-button type="primary" @click="getTableData">查询</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="handleEdit()"
        >添加用户</el-button
      >
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table :data="tableData" stripe header-cell-class-name="header-row">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column prop="phonenumber" label="手机"></el-table-column>
      <el-table-column prop="remark" label="用户身份备注"></el-table-column>
      <el-table-column prop="createTime" label="注册时间"></el-table-column>
      <el-table-column prop="roleNameList" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <!-- 重置密码 -->
          <el-popconfirm
            hide-icon
            title="确定要重置密码吗？"
            @confirm="handlePassword(row)"
          >
            <el-button type="text" slot="reference">重置密码</el-button>
          </el-popconfirm>
          <el-button class="edit-btn" type="text" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm
            hide-icon
            title="确认删除该用户吗？"
            @confirm="deleteUser(row)"
          >
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
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
    >
    </el-pagination>
    <!-- 编辑和添加用户弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible="showUserDialog"
      width="500px"
      @close="isCancel"
    >
      <el-form
        label-width="120px"
        :model="userInfo"
        :rules="userInfoRules"
        ref="userInfo"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="userInfo.userName"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input placeholder="请输入手机号" v-model="userInfo.phonenumber" />
        </el-form-item>
        <el-form-item label="用户身份备注" prop="remark">
          <el-input placeholder="请输入身份备注" v-model="userInfo.remark" />
        </el-form-item>
        <el-form-item label="用户权限" prop="roleIds">
          <el-select
            class="select"
            placeholder="请选择用户权限"
            v-model="userInfo.roleIds"
            clearable
            multiple
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
      tableData: [],
      roleOptions: [],
      roleVal: "",
      userName: "",
      showUserDialog: false,
      isEdit: false,
      userId: "", //当前编辑的userId
      userInfo: {
        userName: "",
        phonenumber: "",
        remark: "",
        roleIds: [],
      },
      userInfoRules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        phonenumber: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        remark: [
          { required: true, message: "用户身份备注不能为空", trigger: "blur" },
        ],
        roleIds: [
          { required: true, message: "用户权限不能为空", trigger: "change" },
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
    this.getRoleOptions();
  },
  methods: {
    getTableData() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        roleId: this.roleVal,
        userName: this.userName,
      };
      this.$axios.get("/system/user/list", params).then(({ data }) => {
        this.tableData = data.list.map((item) => ({
          ...item,
          roleNameList: item.roles.map((item) => item.roleName).join("、"),
        }));
        this.total = data.total;
      });
    },
    getRoleOptions() {
      this.$axios.get("/system/role/optionselect").then(({ data }) => {
        this.roleOptions = data.map((item) => ({
          label: item.roleName,
          value: item.roleId,
        }));
      });
    },
    // 删除用户
    deleteUser(row) {
      this.$axios.delete(`/system/user/${row.userId}`).then(() => {
        this.$message.success("删除成功！");
        this.getTableData();
      });
    },
    // 重置密码
    handlePassword(row) {
      const params = {
        userId: row.userId,
      };
      this.$axios.put("/system/user/resetPwd", params).then(() => {
        this.$message.success("重置密码成功！");
      });
    },
    // 添加/编辑用户
    handleEdit(row) {
      this.isEdit = Boolean(row);
      if (this.isEdit) {
        this.userInfo = {
          userName: row.userName,
          phonenumber: row.phonenumber,
          remark: row.remark,
          roleIds: row.roleIds,
        };
        this.userId = row.userId;
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
            userName: this.userInfo.userName,
            phonenumber: this.userInfo.phonenumber,
            remark: this.userInfo.remark,
            roleIds: this.userInfo.roleIds,
          };
          if (this.isEdit) {
            params.userId = this.userId;
          }
          this.$axios[this.isEdit ? "put" : "post"](
            "/system/user",
            params
          ).then(() => {
            this.$message.success(`${this.isEdit ? "修改" : "添加"}成功！`);
            this.getTableData();
            this.isCancel();
          });
        }
      });
    },
    // 取消
    isCancel() {
      this.userId = "";
      this.$refs.userInfo.resetFields(); // 重置校验结果
      this.showUserDialog = false;
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
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
  .select {
    width: 100%;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
