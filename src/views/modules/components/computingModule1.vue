<template>
  <div class="computing-module">
    <el-form
      :model="formObj"
      :rules="formRules"
      ref="formRef"
      label-width="150px"
      class="rule-form"
      @submit.native.prevent
    >
      <el-form-item label="输入文件" prop="file1List">
        <el-upload
          ref="uploadFile1"
          action=""
          multiple
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
      <el-form-item prop="partners">
        <template #label>
          <span>对接对象</span>
          <!-- <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>A_HL表示文件中A链与HL链对接</div>
          </el-popover> -->
        </template>
        <el-input v-model="formObj.partners"></el-input>
      </el-form-item>
      <el-form-item prop="translation">
        <template #label>
          <span>平移参数</span>
          <!-- <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              magnitude of the random translation applied (in Angstroms)
            </div>
          </el-popover> -->
        </template>
        <el-input v-model="formObj.translation"></el-input>
      </el-form-item>
      <el-form-item prop="rotation">
        <template #label>
          <span>旋转参数</span>
          <!-- <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>magnitude of the random rotation applied (in degrees)</div>
          </el-popover> -->
        </template>
        <el-input v-model="formObj.rotation"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="jobs">
        <template #label>
          <span>jobs</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>the number of jobs (trajectories) to perform</div>
          </el-popover>
        </template>
        <el-input
          v-model="formObj.jobs"
        ></el-input>
      </el-form-item> -->
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
        jobs: "1",
        rotation: "8.0",
        translation: "3.0",
        partners: "A_HL",
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
            subparam: {
              partners: this.formObj.partners,
              translation: this.formObj.translation,
              rotation: this.formObj.rotation,
              jobs: this.formObj.jobs,
            },
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
  },
};
</script>

<style lang="less" scoped>
.computing-module {
  .rule-form {
    width: 800px;
    margin: 20px auto 0;
    .upload-file {
      position: relative;
      .file-wrap {
        position: absolute;
        left: 120px;
        top: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .close {
          margin-left: 10px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
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
