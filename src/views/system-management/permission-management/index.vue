<template>
  <div class="user">
    <div class="header">
      <div class="header-left">
        <el-input
          class="input"
          placeholder="请输入角色名称"
          v-model="roleNameVal"
          clearable
        />
        <el-input
          class="input"
          placeholder="请输入权限描述"
          v-model="permissionDescVal"
          clearable
        />
        <el-button type="primary" @click="getTableData">查询</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="handleEdit()"
        >新建角色</el-button
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
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column
        prop="roleDesc"
        label="权限描述"
        width="400"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="roleNum" label="角色人数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button class="edit-btn" type="text" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm
            hide-icon
            title="确认删除该角色吗？"
            @confirm="deleteRole(row)"
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
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible="showRoleDialog"
      width="500px"
      @close="isCancel"
    >
      <el-form
        label-width="100px"
        :model="roleInfo"
        :rules="roleInfoRules"
        ref="roleInfo"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            maxlength="30"
            show-word-limit
            v-model="roleInfo.roleName"
          />
        </el-form-item>
        <el-form-item label="权限描述" prop="roleDesc">
          <el-input
            type="textarea"
            placeholder="请输入权限描述"
            v-model="roleInfo.roleDesc"
          />
        </el-form-item>
        <el-form-item label="功能权限" prop="checkedRoleObj" class="permission">
          <!-- 多组多选项 -->
          <div v-for="item in roleList" :key="item.id">
            <el-checkbox
              :indeterminate="isIndeterminateObj[item.id]"
              v-model="checkedAllObj[item.id]"
              @change="handleCheckAllChange(item, $event)"
              >{{ item.label }}</el-checkbox
            >
            <el-checkbox-group
              v-model="roleInfo.checkedRoleObj[item.id]"
              @change="handleCheckedRolesChange(item, $event)"
            >
              <el-checkbox
                v-for="child in item.children"
                :label="child.id"
                :key="child.id"
                >{{ child.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
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
    const checkedRoleValidate = (rule, value, callback) => {
      let arr = [];
      Object.keys(value).forEach((item) => {
        arr = [...arr, ...value[item]];
      });
      return arr.length === 0
        ? callback(new Error("请至少选择一项功能权限"))
        : callback();
    };
    return {
      roleNameVal: "",
      permissionDescVal: "",
      tableData: [],
      roleList: [],
      isIndeterminateObj: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      checkedAllObj: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      showRoleDialog: false,
      isEdit: false,
      roleId: "",
      roleInfo: {
        roleName: "",
        roleDesc: "",
        checkedRoleObj: {
          1: [],
          2: [],
          3: [],
          4: [],
        },
      },
      roleInfoRules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "权限描述不能为空", trigger: "blur" },
        ],
        checkedRoleObj: [
          {
            required: true,
            validator: checkedRoleValidate,
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
    this.getRoleList();
  },
  methods: {
    getTableData() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        roleName: this.roleNameVal,
        roleDesc: this.permissionDescVal,
      };
      this.$axios.post("/system/role/list", params).then(({ data }) => {
        this.tableData = data.list;
        this.total = data.total;
      });
    },
    getRoleList() {
      this.$axios.get("/system/menu/treeSelect").then(({ data }) => {
        this.roleList = data;
      });
    },
    // 全选
    handleCheckAllChange(item, val) {
      this.roleInfo.checkedRoleObj[item.id] = val
        ? item.children.map((item) => item.id)
        : [];
      this.isIndeterminateObj[item.id] = false;
    },
    // 单选
    handleCheckedRolesChange(item, val) {
      const checkedCount = val.length;
      const length = item.children.length;
      this.checkedAllObj[item.id] = checkedCount === length;
      this.isIndeterminateObj[item.id] =
        checkedCount > 0 && checkedCount < length;
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    // 删除角色
    deleteRole(row) {
      this.$axios.delete(`/system/role/${row.roleId}`).then(() => {
        this.$message.success("删除成功");
        this.getTableData();
      });
    },
    // 编辑/添加角色
    handleEdit(row) {
      this.isEdit = Boolean(row);
      if (this.isEdit) {
        this.roleInfo = {
          roleName: row.roleName,
          roleDesc: row.roleDesc,
          checkedRoleObj: row.menuIdMap,
        };
        this.roleId = row.roleId;
        Object.keys(row.menuIdMap).forEach((item) => {
          const itemTemp = this.roleList.find((key) => key.id === Number(item));
          this.handleCheckedRolesChange(itemTemp, row.menuIdMap[item]);
        });
      } else {
        this.roleList.forEach((item) => {
          this.checkedAllObj[item.id] = false;
          this.isIndeterminateObj[item.id] = false;
        });
      }
      this.showRoleDialog = true;
    },
    // 确定
    submitForm() {
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          let obj = Object.assign({}, this.roleInfo.checkedRoleObj);
          Object.keys(obj).forEach((item) => {
            if (obj[item].length === 0) {
              delete obj[item];
            }
          });
          let params = {
            roleName: this.roleInfo.roleName,
            roleDesc: this.roleInfo.roleDesc,
            checkedRoleObj: obj,
          };
          if (this.isEdit) {
            params.roleId = this.roleId;
          }
          this.$axios[this.isEdit ? "put" : "post"](
            "/system/role",
            params
          ).then(() => {
            this.$message.success(`${this.isEdit ? "修改" : "添加"}成功`);
            this.getTableData();
            this.isCancel();
          });
        }
      });
    },
    // 取消
    isCancel() {
      this.roleInfo = {
        roleName: "",
        roleDesc: "",
        checkedRoleObj: {
          1: [],
          2: [],
          3: [],
          4: [],
        },
      };
      this.$refs.roleInfo.resetFields(); // 重置校验结果
      this.showRoleDialog = false;
      this.roleId = "";
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
        margin-right: 30px;
      }
    }
  }
  .edit-btn {
    margin-right: 10px;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
