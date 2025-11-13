<template>
  <div class="computing-module">
    <el-form
      :model="formObj"
      :rules="formRules"
      ref="formRef"
      label-width="110px"
      class="rule-form"
      @submit.native.prevent
    >
      <el-form-item label="输入文件" prop="file1List">
        <el-space alignment="stretch" :size="20">
          <el-upload
            ref="uploadFile1"
            action=""
            :multiple="false"
            :limit="1"
            :on-change="
              (file, fileList) =>
                handleChangeFileList(file, fileList, 'file1List')
            "
            :on-remove="
              (file, fileList) =>
                handleChangeFileList(file, fileList, 'file1List')
            "
            :on-exceed="
              (file, fileList) => handleExceed(file, fileList, 'file1List')
            "
            :file-list="formObj.file1List"
            :http-request="handleRequest"
          >
            <template #trigger>
              <el-button icon="Upload" type="primary">选择文件</el-button>
            </template>
          </el-upload>
          <el-button
            icon="Download"
            type="primary"
            plain
            @click="handleDownloadTemplate"
            >下载模板</el-button
          >
        </el-space>
      </el-form-item>
      <el-form-item prop="taskname">
        <template #label>
          <span>任务名称</span>
          <!-- <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>这是任务名称</div>
          </el-popover> -->
        </template>
        <el-input v-model="formObj.taskname"></el-input>
      </el-form-item>
      <el-form-item class="form-tools" label-width="0">
        <el-button type="primary" @click="handleSubmitForm" :loading="loading"
          >确定</el-button
        >
        <el-button type="default" @click="handleResetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formObj: {
        taskname: "",
        file1List: [],
      },
      formRules: {
        taskname: [
          {
            required: true,
            message: "任务名称不能为空",
            trigger: "blur",
          },
        ],
        file1List: [
          {
            required: true,
            message: "输入文件不能为空",
            trigger: "change",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    //单文件上传时新文件替换已选文件
    handleExceed(file, _fileList, name) {
      this.formObj[name] = [
        {
          raw: file[0],
          name: file[0].name,
        },
      ];
    },
    //单、多文件上传
    handleChangeFileList(_file, fileList, name) {
      this.formObj[name] = fileList;
      this.$refs.formRef.validateField(name);
    },
    //覆盖默认的上传行为,不能删掉
    handleRequest(params) {
      console.log(params);
    },
    handleSubmitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let formData = new FormData();
          this.formObj.file1List.forEach((item) => {
            formData.append("file1", item.raw);
          });
          const params = {
            algonum: this.$route.params.id,
            taskname: this.formObj.taskname,
            subparam: {},
          };
          formData.append("param", JSON.stringify(params));
          const headers = {
            "Content-Type": "multipart/form-data",
          };
          this.loading = true;
          this.$axios
            .post("/algo/orifile_upload", formData, { headers })
            .then(() => {
              // this.$message.success("任务创建成功，请到数据中心查看结果");
              this.$message.success("任务创建成功");
              this.$router.push({
                path: "/result-list",
              });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    handleResetForm() {
      this.$refs.uploadFile1.clearFiles();
      this.formObj.file1List = [];
      this.$refs.formRef.resetFields();
    },
    handleDownloadTemplate() {
      const url =
        this.$urlPrev +
        "/download/usr/local/bin/BCIService/algo/template/10/0_template.csv";
      // 创建临时链接元素触发下载
      const link = document.createElement("a");
      link.href = url;
      link.download = "高通量模板.csv"; // 设置下载文件名
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="less" scoped>
.computing-module {
  .rule-form {
    width: 800px;
    margin: 20px auto 0;
    :deep(.el-form-item__label) {
      display: flex;
      justify-content: flex-end;
      .tip {
        padding-left: 5px;
        font-size: 18px;
        vertical-align: text-top;
      }
    }
    .form-tools {
      text-align: center;
    }
  }
}
</style>
