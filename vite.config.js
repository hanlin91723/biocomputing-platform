import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig(() => {
  return {
    base: "./", //生产环境服务的公共基础路径
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // 引入 global.less 这样就可以在全局中使用 global.less 中预定义的变量了
          // 必须给导入的路径最后加上;
          additionalData: '@import "@/assets/css/global.less";',
        },
      },
    },
    plugins: [vue()],
    server: {
      host: "localhost",
      port: 8080,
      strictPort: false, //设为false时若端口已被占用则会尝试下一个可用端口，而不是直接退出
      open: false, // 是否自动在浏览器打开
      https: false, // 是否开启 https
      proxy: {
        "/api": {
          target: "http://36.103.199.181:8888", //微服务端
          // target: "http://119.27.172.203:5000", //微服务端
          // target: "http://192.168.2.255:8090", //本地
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/socket.io": {
          target: "ws://localhost:3000",
          ws: true,
        },
      },
    },
    optimizeDeps: {
      force: false, //设置为true可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖
    },
    build: {
      cssCodeSplit: true, //设置为false整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    },
  };
});
