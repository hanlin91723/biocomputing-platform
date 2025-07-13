<template>
  <div class="login-bg" ref="loginBg">
    <div class="wrap">
      <h3 class="title">生物计算集成平台</h3>
      <el-form
        class="form"
        ref="loginForm"
        :rules="loginFormRules"
        :model="loginForm"
        @keyup.enter.native="submitForm"
      >
        <el-form-item class="form-item" prop="username">
          <el-input
            class="input"
            placeholder="请输入用户名"
            prefix-icon="User"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input
            class="input"
            placeholder="请输入密码"
            v-model="loginForm.password"
            prefix-icon="Lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            :loading="loading"
            type="primary"
            @click="submitForm"
          >
            <span>登</span>
            <span>录</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-link class="register-btn" type="primary" @click="toRegister"
        >注册账号</el-link
      >
    </div>
  </div>
</template>

<script>
import CanvasNest from "canvas-nest.js";
export default {
  name: "Login",
  data() {
    return {
      bgCanvas: null,
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const config = {
        // 配置
        color: "25, 187, 255", // 线条颜色
        pointColor: "255, 255, 255", // 节点颜色
        opacity: 1, // 线条透明度
        count: 200, // 线条数量
        zIndex: 1, // 画面层级
      };
      this.bgCanvas = new CanvasNest(this.$refs.loginBg, config);
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("/user/login", this.loginForm)
            .then(({ data }) => {
              sessionStorage.setItem("username", data.username);
              sessionStorage.setItem("token", data.id);
              sessionStorage.setItem("permission", data.level);
              this.$router.push({
                path: this.$route.query.redirect || "/module-list",
              });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    toRegister() {
      this.$router.push({
        path: "/register",
      });
    },
  },
  beforeDestroy() {
    this.bgCanvas.destroy();
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  position: relative;
  width: 100%;
  height: 100vh;
  // background-image: url("@/assets/images/bg.png");
  .wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 160px;
    z-index: 2;
    margin: auto;
    width: 400px;
    height: fit-content;
    padding: 20px;
    // background: rgb(32, 36, 110);
    box-shadow: var(--el-box-shadow-light);
    .title {
      padding-bottom: 20px;
      font-size: 24px;
      text-align: center;
      // color: #fff;
    }
    .form {
      // width: 500px;
      .form-item {
        margin-bottom: 30px;
        :deep(.el-form-item__error) {
          padding-top: 8px;
          font-size: 16px;
        }
        .input {
          :deep(.el-input__inner) {
            padding: 0 30px;
            font-size: 16px;
            &::-webkit-input-placeholder {
              font-size: 16px;
              font-weight: 400;
            }
          }
          :deep(.el-input__prefix) {
            font-size: 20px;
          }
          :deep(.el-input__suffix) {
            .el-input__clear {
              font-size: 18px;
            }
          }
        }
      }
      .submit-btn {
        width: 100%;
        height: 32px;
        // margin-top: 20px;
        padding: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        // text-indent: 100px;
        // letter-spacing: 100px;
        span {
          padding: 0 12px;
        }
      }
    }
    .register-btn {
      float: right;
    }
  }
}
</style>
