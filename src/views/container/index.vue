<template>
  <el-container class="container">
    <el-aside width="200px">
      <h3 class="header-title">企业风险管理</h3>
      <el-menu
        ref="menu"
        class="menu-list"
        @select="handleSelect"
        :default-active="activeMenuItem"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="item in menuList"
          :index="item.meta.title"
          :key="item.meta.title"
          class="menu-item"
        >
          <template slot="title">
            <i :class="item.meta.ico"></i>
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
      <el-header class="header">
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
            v-for="item in menuList"
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
              >个人资料</el-dropdown-item
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
      <el-main :class="['section', isCollapse ? 'collapse' : '']">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  filterAsyncRoutes,
  asyncRouterMap,
  resetRouter,
} from "@/router/index.js";
export default {
  name: "Container",
  data() {
    const rolePermissionList = ["1-1", "3-1", "3-2", "4-2"];
    const asyncRoutes = filterAsyncRoutes(asyncRouterMap, rolePermissionList);
    return {
      isCollapse: false,
      menuList: asyncRoutes[0].children,
    };
  },
  computed: {
    activeMenuItem() {
      return "/" + this.$route.path.split("/")[1];
    },
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      this.$axios.get("").then((res) => {
        this.res.data[0].subMenuList = res;
        this.menuList = this.res.data;
      });
    },
    handleCommand(command) {
      switch (command) {
        case "personalInfo":
          console.log("个人资料");
          break;
        case "modifyPwd":
          console.log("修改密码");
          break;
        case "exit":
          this.$confirm("即将退出登录，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              sessionStorage.clear();
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
      return submenuList.filter((item) => !item.meta.hidden);
    },
  },
};
</script>

<style lang="less" scoped>
@headerTitleHeight: 60px;

.container {
  height: fit-content;

  .header-title {
    text-align: center;
    line-height: @headerTitleHeight;
    background: #545c64;
    color: #fff;
  }

  .menu-list {
    height: calc(100vh - @headerTitleHeight);
    border-right: none;

    .submenu-item {
      min-width: auto;

      &.is-active {
        background: rgb(67, 74, 80) !important;
      }
    }
  }

  .header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #545c64;

    .collapse-btn {
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
    }

    .breadcrumb-txt {
      /deep/ .el-breadcrumb__inner {
        color: #fff;
      }
    }

    .dropdown-wrap {
      margin-left: auto;
      padding: 0 20px;

      .username-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;

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
</style>
