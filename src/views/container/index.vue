<template>
  <el-container class="container">
    <el-aside width="200px">
      <h3 :class="{ ['header-title']: true, isCollapse: isCollapse }">
        <i class="el-icon-menu"></i>
        {{ isCollapse ? "" : "企业风险管理" }}
      </h3>
      <el-menu
        ref="menu"
        class="menu-list"
        @select="handleSelect"
        unique-opened
        :default-active="activeMenuItem"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#1A3885"
        text-color="#fff"
        active-text-color="#FFFFFF"
      >
        <el-submenu
          v-for="item in menuList"
          :index="item.meta.title"
          :key="item.meta.title"
          class="menu-item"
        >
          <template slot="title">
            <i :class="item.meta.ico" style="color: #fff"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="subItem in filterSubmenu(item.children)"
            :index="subItem.path"
            :key="subItem.meta.title"
            class="submenu-item"
            >{{ subItem.meta.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header :class="['header', 'section', isCollapse ? 'collapse' : '']">
        <i
          @click="isCollapse = !isCollapse"
          :class="[
            'collapse-btn',
            isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
          ]"
        ></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            class="breadcrumb-txt"
            v-for="item in breadcrumbList"
            :key="item.meta.title"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <el-dropdown
          class="dropdown-wrap"
          @command="handleCommand"
          placement="bottom"
        >
          <div class="el-dropdown-link username-wrap">
            <i class="el-icon-user-solid user-ico"></i>
            <span class="username">{{ "测试" }}</span>
          </div>
          <el-dropdown-menu class="dropdown-menu" slot="dropdown">
            <el-dropdown-item class="dropdown-menu-item" command="personalInfo"
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item class="dropdown-menu-item" command="modifyPwd"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item class="dropdown-menu-item" command="exit"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main :class="['section', isCollapse ? 'collapse' : '']" ref="main">
        <router-view />
      </el-main>
    </el-container>
    <el-dialog
      title="个人信息"
      :visible="showUserDialog"
      width="700px"
      @close="handleCancel"
    >
      <div class="user-info-wrap">
        <div class="user-info-item">
          <span class="name">姓名：</span>
          <span class="value">{{ info.name }}</span>
        </div>
        <div class="user-info-item">
          <span class="name">手机号：</span>
          <span class="value">{{ info.phone }}</span>
        </div>
        <div class="user-info-item">
          <span class="name">用户身份备注：</span>
          <span class="value">{{ info.remark }}</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible="showPwdDialog"
      width="700px"
      @close="handleCancel"
    >
      <el-form
        class="form"
        ref="form"
        :rules="formRules"
        :model="formData"
        label-width="120px"
      >
        <el-form-item class="form-item" prop="oldPwd" label="当前密码">
          <el-input
            class="input"
            placeholder="请输入当前密码"
            prefix-icon="el-icon-lock"
            v-model="formData.oldPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="newPwd" label="新密码">
          <el-input
            class="input"
            placeholder="请输入新密码"
            prefix-icon="el-icon-lock"
            v-model="formData.newPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="checkedNewPwd" label="确认新密码">
          <el-input
            class="input"
            placeholder="请再次输入新密码"
            prefix-icon="el-icon-lock"
            v-model="formData.checkedNewPwd"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="isOk"
              >确定</el-button
            >
            <el-button size="medium" @click="handleCancel">取消</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import { resetRouter } from "@/router/index.js";
import { useUserStore } from "@/store/index.js";
const userInfo = useUserStore();
export default {
  name: "Container",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (this.formData.checkedNewPwd === "") {
        callback(new Error("请再次输入新密码"));
      } else if (this.formData.checkedNewPwd !== this.formData.newPwd) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      isCollapse: false,
      menuList: userInfo.hasPermissionRoutes[0].children,
      showUserDialog: false,
      showPwdDialog: false,
      info: {},
      formData: {
        oldPwd: "",
        newPwd: "",
        checkedNewPwd: "",
      },
      formRules: {
        oldPwd: [
          {
            required: true,
            message: "请输入当前密码",
            trigger: "blur",
          },
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
        checkedNewPwd: [
          {
            required: true,
            validator: validatePassCheck,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    activeMenuItem() {
      return "/" + this.$route.path.split("/")[1];
    },
    breadcrumbList() {
      return this.$route.matched.filter((item) => item.meta.title);
    },
  },
  watch: {
    activeMenuItem() {
      this.$refs.main.$el.scrollTop = 0;
    },
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios.get("/statistics/marketRiskProp").then(() => {
        this.info = {
          name: "测试",
          phone: "13212345678",
          remark: "后台管理员",
        };
      });
    },
    handleCommand(command) {
      switch (command) {
        case "personalInfo":
          this.showUserDialog = true;
          break;
        case "modifyPwd":
          this.showPwdDialog = true;
          break;
        case "exit":
          this.$confirm("即将退出登录，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              //清空缓存数据
              sessionStorage.clear();
              userInfo.permissionList = [];
              this.$router.push({
                path: "/login",
              });
              resetRouter(); //退出登录后重置路由
            })
            .catch(() => {}); //修复关闭弹窗报错
          break;
        default:
      }
    },
    handleSelect(index) {
      this.$router.push({
        path: `${index}`,
      });
    },
    //过滤掉隐藏的子菜单项
    filterSubmenu(submenuList) {
      return submenuList?.filter((item) => !item.meta.hidden);
    },
    handleCancel() {
      this.showUserDialog = false;
      this.showPwdDialog = false;
    },
    isOk() {
      this.$axios
        .get("/construction/projectManager", this.formData)
        .then(() => {
          this.$message.success("密码修改成功，下次登录后生效");
          this.handleCancel();
        });
    },
  },
};
</script>

<style lang="less" scoped>
@headerTitleHeight: 60px;

.container {
  height: fit-content;

  .header-title {
    width: 200px;
    text-align: center;
    line-height: @headerTitleHeight;
    // background: #545c64;
    background: #1a3885;
    color: #fff;
    &.isCollapse {
      width: 64px;
    }
  }

  .menu-list {
    height: calc(100vh - @headerTitleHeight);
    border-right: none;
    /deep/.el-submenu__title {
      font-weight: 700;
      font-size: 17px;
    }
    .submenu-item {
      min-width: auto;
      padding-left: 57px !important;
      background: rgba(21, 45, 106, 0.6) !important;
      &:hover {
        background: rgba(21, 45, 106, 1) !important;
      }

      &.is-active {
        // background: rgb(67, 74, 80) !important;
        background: #5d77ff !important;
      }
    }
  }

  .header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    // background: #545c64;
    z-index: 2;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);

    .collapse-btn {
      padding-right: 20px;
      // color: #fff;
      color: #acb1bc;
      font-size: 32px;
      cursor: pointer;
    }

    .breadcrumb-txt {
      /deep/ .el-breadcrumb__inner {
        // color: #fff;
        color: #1e293b;
      }
    }

    .dropdown-wrap {
      margin-left: auto;
      padding: 0 20px;

      .username-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        // color: #fff;
        color: #1e293b;

        .username {
          padding-left: 10px;
        }
      }
    }
  }

  .section {
    overflow-x: hidden;
    height: calc(100vh - @headerTitleHeight);

    &.collapse {
      margin-left: -136px;
    }
  }
}

.dropdown-menu-item {
  padding: 0 20px;
}
.user-info-wrap {
  padding-left: 50px;
  .user-info-item {
    padding: 10px 0;
    font-size: 16px;
    .name {
      display: inline-block;
      width: 130px;
      padding-right: 10px;
      font-weight: 700;
      text-align: right;
      color: #303133;
    }
    .value {
      color: #606266;
    }
  }
}
</style>
