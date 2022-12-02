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
import { resetRouter } from "@/router/index.js";
import { useUserStore } from "@/store/index.js";
const userInfo = useUserStore();
export default {
  name: "Container",
  data() {
    return {
      isCollapse: false,
      menuList: userInfo.hasPermissionRoutes[0].children,
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
  mounted() {},
  methods: {
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
</style>
