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
      <el-form-item prop="heavy_sequence">
        <template #label>
          <span>heavy_sequence</span>
        </template>
        <el-input v-model="formObj.heavy_sequence"></el-input>
      </el-form-item>
      <el-form-item prop="light_sequence">
        <template #label>
          <span>light_sequence</span>
        </template>
        <el-input v-model="formObj.light_sequence"></el-input>
      </el-form-item>
      <el-form-item prop="decoys">
        <template #label>
          <span>decoys</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              Number of decoys to create. The lowest energy decoy will be
              selected as final predicted structure.
            </div>
          </el-popover>
        </template>
        <el-input
          v-model.number="formObj.decoys"
          placeholder="magnitude of the random decoys applied (in degrees)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="renumber">
        <template #label>
          <span>renumber</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              Convert final predicted structure to Chothia format using AbNum.
            </div>
          </el-popover>
        </template>
        <el-radio-group v-model="formObj.renumber">
          <el-radio :value="true">是</el-radio>
          <el-radio :value="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="form-tools" label-width="0">
        <el-button
          type="primary"
          @click="handleSubmitForm"
          :loading="loading"
          >确定</el-button
        >
        <el-button type="default" @click="handleResetForm"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validateNumCheck = (_rule, value, callback) => {
      const regExp = /^\d+$/;
      if (value === "" || regExp.test(value)) {
        callback();
      } else {
        callback(new Error("This decoys must be a non-negative integer."));
      }
    };
    return {
      formObj: {
        taskname: "",
        renumber: false,
        decoys: 5,
        light_sequence: "",
        heavy_sequence: "",
      },
      formRules: {
        taskname: [
          {
            required: true,
            message: "The taskname is required.",
            trigger: "blur",
          },
        ],
        light_sequence: [
          {
            required: true,
            message: "The light_sequence is required.",
            trigger: "blur",
          },
        ],
        heavy_sequence: [
          {
            required: true,
            message: "The heavy_sequence is required.",
            trigger: "blur",
          },
        ],
        renumber: [
          {
            required: true,
            message: "The renumber is required.",
            trigger: "change",
          },
        ],
        decoys: [
          {
            required: false,
            validator: validateNumCheck,
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
              heavy_sequence: this.formObj.heavy_sequence,
              light_sequence: this.formObj.light_sequence,
              decoys: this.formObj.decoys,
              renumber: this.formObj.renumber,
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
