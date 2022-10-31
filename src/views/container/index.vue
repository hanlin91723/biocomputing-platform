<template>
  <div class="home">
    <el-container>
      <el-aside width="190px">
        <el-menu
          ref="menu"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            v-for="item in menuList"
            :key="item.menuId"
            :index="item.menuUrl"
            class="menu1"
          >
            <template slot="title">
              <span>{{ item.menuName }}</span>
            </template>
            <el-submenu
              v-for="info in item.subMenuList"
              :index="info.id + ''"
              :key="info.id"
              class="menu2"
            >
              <template slot="title">{{ info.type }}</template>
              <el-submenu
                v-for="subInfo in info.list"
                :index="subInfo.id + ''"
                :key="subInfo.id"
                class="menu3"
              >
                <template slot="title">{{ subInfo.type }}</template>
                <el-menu-item
                  v-for="subItem in subInfo.list"
                  :index="subItem.id + ''"
                  :key="subItem.id"
                  class="menu4"
                  >{{ subItem.type }}</el-menu-item
                >
              </el-submenu>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="background-color: #545c64; overflow-y: hidden">
          <span class="header-title">物料管理系统</span>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="user-name-tel">李佳林</span>
              <!-- <img src="../assets/default-user.png" class="user-default" /> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      menuList: [],
      res: {
        success: true,
        data: [
          {
            menuId: 1,
            icon: "li-icon-xiangmuguanli",
            menuName: "物料信息",
            menuUrl: "wuliao",
            subMenuList: [],
          },
          {
            menuId: 33,
            icon: "li-icon-dingdanguanli",
            menuName: "商务信息",
            menuUrl: "shangwu",
            subMenuList: [
              {
                id: "11111111",
                type: "商务信息1",
              },
            ],
          },
          {
            menuId: 71,
            icon: "li-icon-xitongguanli",
            menuName: "供应商信息",
            menuUrl: "gongyingshang",
            subMenuList: [
              {
                id: "22222222",
                type: "供应商信息1",
              },
            ],
          },
          {
            menuId: 128,
            icon: "li-icon-shangchengxitongtubiaozitihuayuanwenjian91",
            menuName: "汇率管理",
            menuUrl: "huilv",
            subMenuList: [
              {
                id: "33333333",
                type: "汇率管理1",
              },
            ],
          },
          {
            menuId: 150,
            icon: "li-icon-shangchengxitongtubiaozitihuayuanwenjian91",
            menuName: "系统管理",
            menuUrl: "xitong",
            subMenuList: [
              {
                id: "44444444",
                type: "系统管理1",
              },
            ],
          },
          {
            menuId: 186,
            icon: "li-icon-shangchengxitongtubiaozitihuayuanwenjian91",
            menuName: "承认书管理",
            menuUrl: "chengrenshu",
            subMenuList: [
              {
                id: "55555555",
                type: "承认书管理1",
              },
            ],
          },
        ],
        msg: "success",
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.get("").then((res) => {
        this.res.data[0].subMenuList = res;
        this.menuList = this.res.data;
      });
      //获取所有公有属性下拉列表
      this.$axios.get("").then((res) => {
        console.log(res);
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({
        path: `/materialInfo/${key}`,
        query: {
          general: keyPath[1],
          matFirst: keyPath[2],
        },
      });
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command === "modifyPwd") {
        console.log(123);
      } else if (command === "exit") {
        this.$confirm("退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          setTimeout(() => {
            // this.$store.commit("logout", "false");
            this.$router.push({
              path: "/login",
            });
            this.$message({
              type: "success",
              message: "已退出登录!",
            });
          }, 1000);
          // loginout()
          //   .then(res => {
          //     if (res.success) {
          //       //如果请求成功就让他2秒跳转路由
          //       setTimeout(() => {
          //         this.$store.commit('logout', 'false')
          //         this.$router.push({ path: '/login' })
          //         this.$message({
          //           type: 'success',
          //           message: '已退出登录!'
          //         })
          //       }, 1000)
          //     } else {
          //       this.$message.error(res.msg)
          //       this.logining = false
          //       return false
          //     }
          //   })
          //   .catch(err => {
          //     // 获取图形验证码
          //     this.getcode()
          //     this.logining = false
          //     this.$message.error('退出失败，请稍后再试！')
          //   })
        });
      }
    },
    handleOpen(key, keyPath) {
      let listTemp = this.res.data[0].subMenuList;
      if (keyPath.length === 2) {
        const itemTemp = listTemp.find((item) => item.id.toString() === key);
        if (itemTemp.list.length > 0) return;
        this.$axios.get("").then((response) => {
          listTemp.forEach((item, index) => {
            if (item.id.toString() === key) {
              listTemp[index].list = response;
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.home {
  height: 100%;
  // background: #eee;
  // .el-submenu__title {
  //   padding-left: 10px !important;
  // }
  .menu1 {
    > .el-submenu__title {
      padding-left: 10px !important;
    }
    .menu2 {
      > .el-submenu__title {
        padding-left: 20px !important;
      }
      .menu3 {
        > .el-submenu__title {
          padding-left: 30px !important;
        }
        .menu4 {
          min-width: auto;
          padding: 0;
          padding-left: 40px !important;
        }
      }
    }
  }
  .el-container {
    height: 100%;
    .el-menu {
      height: 100%;
      border-right: none;
    }
    .header-title {
      color: #fff;
    }
    .el-dropdown {
      position: relative;
      left: 100%;
      margin-top: 10px;
      margin-left: -200px;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-default {
          width: 40px;
          border-radius: 50%;
        }
        .user-name-tel {
          margin-left: -10px;
          margin-right: 10px;
          color: #fff;
        }
      }
    }
  }
}
</style>