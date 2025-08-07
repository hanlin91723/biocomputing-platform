<template>
  <el-container class="container">
    <el-header class="header section">
      <h3 class="header-title">生物计算集成平台</h3>
      <el-dropdown
        class="dropdown-wrap"
        @command="handleCommand"
        placement="bottom"
      >
        <div class="el-dropdown-link username-wrap">
          <el-icon class="el-icon-user-solid user-ico"><Avatar /></el-icon>
          <span class="username">{{ username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu" slot="dropdown">
            <el-dropdown-item class="dropdown-menu-item" command="modifyPwd"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item class="dropdown-menu-item" command="exit"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px" style="height: 100%">
        <el-menu
          ref="menu"
          class="menu-list"
          @select="handleSelect"
          unique-opened
          :default-active="activeMenuItem"
          background-color="rgb(236, 245, 255)"
        >
          <el-menu-item
            v-for="item in menuList"
            :index="item.path"
            :key="item.meta.title"
            class="menu-item"
          >
            <!-- <i :class="item.meta.ico" style="color: #fff"></i> -->
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-scrollbar
        class="section"
        :style="{ height: `calc(100vh - ${headerTitleHeight})` }"
      >
        <el-main ref="main">
          <router-view />
        </el-main>
      </el-scrollbar>
    </el-container>
    <el-dialog
      title="修改密码"
      v-model="showPwdDialog"
      width="500px"
      @close="handleCancel"
    >
      <el-form
        class="form"
        ref="form"
        :rules="formRules"
        :model="formData"
        label-width="110px"
      >
        <el-form-item class="form-item" prop="oldPwd" label="当前密码">
          <el-input
            class="input"
            placeholder="请输入当前密码"
            prefix-icon="el-icon-lock"
            v-model="formData.oldPwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="newPwd" label="新密码">
          <el-input
            class="input"
            placeholder="请输入新密码"
            prefix-icon="el-icon-lock"
            v-model="formData.newPwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="checkedNewPwd" label="确认新密码">
          <el-input
            class="input"
            placeholder="请再次输入新密码"
            prefix-icon="el-icon-lock"
            v-model="formData.checkedNewPwd"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button type="primary" @click="isOk">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
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
    const validatePassCheck = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.formData.newPwd) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    const routes = userInfo.hasPermissionRoutes[0].children;
    const menuList = routes.filter((item) => item.meta);
    return {
      menuList,
      showPwdDialog: false,
      username: sessionStorage.getItem("username"),
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
      console.log("/" + this.$route.path.split("/")[1]);
      return "/" + this.$route.path.split("/")[1];
    },
    breadcrumbList() {
      return this.$route.matched.filter((item) => item.meta.title);
    },
    headerTitleHeight() {
      return "60px";
    },
  },
  watch: {
    activeMenuItem() {
      this.$refs.main.$el.scrollTop = 0;
    },
  },
  created() {},
  methods: {
    handleCommand(command) {
      switch (command) {
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
              userInfo.hasPermissionRoutes = [];
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
      console.log(index);
      this.$router.push({
        path: `${index}`,
      });
    },
    //过滤掉隐藏的子菜单项
    filterSubmenu(submenuList) {
      return submenuList?.filter((item) => !item.meta.hidden);
    },
    handleCancel() {
      this.showPwdDialog = false;
    },
    isOk() {
      const params = {
        id: sessionStorage.getItem("token"),
        new_pwd: this.formData.checkedNewPwd,
        old_pwd: this.formData.oldPwd,
      };
      this.$axios.patch("/user/passwordmodify", params).then(() => {
        this.$message.success("密码修改成功，下次登录后生效");
        this.handleCancel();
      });
    },
  },
};
</script>

<style lang="less" scoped>
// @headerTitleHeight: 60px;
.container {
  height: fit-content;
  .menu-list {
    height: calc(100vh - v-bind(headerTitleHeight));
    border-right: none;
    .menu-item {
      font-size: 16px;
      &.is-active {
        background-color: rgb(198, 226, 255) !important;
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 2;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    .dropdown-wrap {
      margin-left: auto;
      padding: 0 20px;
      .username-wrap {
        display: flex;
        align-items: baseline;
        color: #1e293b;
        cursor: pointer;
        .username {
          padding-left: 10px;
        }
      }
    }
  }
  .section {
    overflow-x: hidden;
    width: 100%;
    // height: calc(100vh - @headerTitleHeight);
  }
}
.dropdown-menu-item {
  padding: 0 20px;
}
</style>
