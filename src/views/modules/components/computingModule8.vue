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
      <el-form-item prop="taskname">
        <template #label>
          <span>taskname</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>This is taskname.</div>
          </el-popover>
        </template>
        <el-input v-model="formObj.taskname"></el-input>
      </el-form-item>
      <el-form-item prop="proteinsequence">
        <template #label>
          <span>proteinsequence</span>
        </template>
        <el-input v-model="formObj.proteinsequence"></el-input>
      </el-form-item>
      <el-form-item prop="dnasequence">
        <template #label>
          <span>dnasequence</span>
        </template>
        <el-input v-model="formObj.dnasequence"></el-input>
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
        proteinsequence: "",
        dnasequence: "",
      },
      formRules: {
        taskname: [
          {
            required: true,
            message: "The taskname is required.",
            trigger: "blur",
          },
        ],
        proteinsequence: [
          {
            required: true,
            message: "The proteinsequence is required.",
            trigger: "blur",
          },
        ],
        dnasequence: [
          {
            required: true,
            message: "The dnasequence is required.",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    handleSubmitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const param = {
            algonum: this.$route.params.id,
            taskname: this.formObj.taskname,
            subparam: {
              proteinsequence: this.formObj.proteinsequence,
              dnasequence: this.formObj.dnasequence,
            },
          };
          let formData = new FormData();
          formData.append("param", JSON.stringify(param));
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
