<template>
  <div class="computing-module">
    <el-steps :active="currentStep" finish-status="success" simple>
      <el-step title="第一步" />
      <el-step title="第二步" />
    </el-steps>
    <el-form
      :model="formObj"
      :rules="formRules"
      ref="formRef"
      label-width="110px"
      class="rule-form"
      @submit.native.prevent
    >
      <el-form-item label="输入文件" prop="file1List" v-if="currentStep === 0">
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
      </el-form-item>
      <template v-else-if="currentStep === 1">
        <el-form-item prop="taskname">
          <template #label>
            <span>任务名称</span>
          </template>
          <el-input v-model="formObj.taskname"></el-input>
        </el-form-item>

        <!-- 动态生成链的表单项 -->
        <el-form-item
          v-for="chain in chain_list"
          :key="chain"
          :prop="chain"
          :label="chain"
        >
          <el-input
            v-model="formObj[chain]"
            maxlength="1"
            placeholder="1个字符，推荐大写字母或数字"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item class="form-tools" label-width="0">
        <el-button
          type="primary"
          @click="next"
          v-if="currentStep === 0"
          :loading="loading"
          >下一步</el-button
        >
        <template v-else-if="currentStep === 1">
          <el-button type="primary" @click="prev">上一步</el-button>
          <el-button type="primary" @click="handleSubmitForm" :loading="loading"
            >确定</el-button
          >
          <el-button type="default" @click="handleResetForm">重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      chain_list: [], // 添加这一行，用于存储链信息
      formObj: {
        taskname: "",
        file1List: [],
        // 动态表单项的值会在后面添加
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
    prev() {
      this.currentStep = 0;
    },
    next() {
      this.$refs.formRef.validateField("file1List", (valid) => {
        if (valid) {
          // 验证通过，进入下一步
          let formData = new FormData();
          this.formObj.file1List.forEach((item) => {
            formData.append("file1", item.raw);
          });
          const headers = {
            "Content-Type": "multipart/form-data",
          };
          this.loading = true;
          this.$axios
            .post("/algo/chain_rename_step1", formData, { headers })
            .then((data) => {
              this.chain_list = data.chain_list; // 保存链列表
              // 为每个链初始化表单项 - Vue3直接赋值
              this.chain_list.forEach((chain) => {
                // 直接赋值，Vue3会自动跟踪这些新属性
                this.formObj[chain] = "";
                // 同样直接为formRules添加验证规则
                this.formRules[chain] = [
                  {
                    required: true,
                    message: `${chain}不能为空`,
                    trigger: "blur",
                  },
                  {
                    validator: (_rule, value, callback) => {
                      if (!/^[A-Z0-9]$/.test(value)) {
                        callback(new Error("请输入大写字母或数字"));
                      } else {
                        callback();
                      }
                    },
                    trigger: "blur",
                  },
                ];
              });
              this.currentStep = 1;
            })
            .finally(() => {
              this.loading = false;
            });
        }
        // 验证不通过时不执行任何操作，表单会自动显示错误信息
      });
    },
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
          let new_chain_ids = Object.assign({}, this.formObj);
          delete new_chain_ids.taskname;
          delete new_chain_ids.file1List;

          const params = Object.assign({}, this.formObj, {
            algonum: this.$route.params.id,
            taskname: this.formObj.taskname,
            subparam: {
              new_chain_ids,
            },
          });
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
      // this.$refs.uploadFile1.clearFiles();
      // this.formObj.file1List = [];
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
