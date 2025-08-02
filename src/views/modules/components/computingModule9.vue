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
      <el-form-item prop="taskname" :label-width="165">
        <template #label>
          <span>任务名称</span>
          <!-- <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>This is taskname.</div>
          </el-popover> -->
        </template>
        <el-input v-model="formObj.taskname"></el-input>
      </el-form-item>
      <el-form-item prop="proteinsequence" :label-width="165">
        <template #label>
          <span>蛋白质序列</span>
        </template>
        <el-input v-model="formObj.proteinsequence"></el-input>
      </el-form-item>
      <el-form-item prop="ligandsequence" :label-width="165">
        <template #label>
          <span>小分子信息（SMILES）</span>
        </template>
        <el-input v-model="formObj.ligandsequence"></el-input>
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
        ligandsequence: "",
      },
      formRules: {
        taskname: [
          {
            required: true,
            message: "任务名称不能为空",
            trigger: "blur",
          },
        ],
        proteinsequence: [
          {
            required: true,
            message: "蛋白质序列不能为空",
            trigger: "blur",
          },
        ],
        ligandsequence: [
          {
            required: true,
            message: "小分子信息（SMILES）不能为空",
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
              ligandsequence: this.formObj.ligandsequence,
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
