<template>
  <div class="computing-module">
    <el-form
      :model="formObj"
      :rules="formRules"
      ref="formRef"
      label-width="130px"
      class="rule-form"
      @submit.native.prevent
    >
      <el-form-item label="输入文件" prop="file1List">
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
      <template v-if="showFlag">
        <el-form-item label="结构信息解析结果">
          <el-descriptions
            class="parser-wrap"
            :column="1"
            border
            :label-width="100"
            v-for="item in parserList"
            :key="item.model"
          >
            <el-descriptions-item label="Model" class-name="parser">{{
              item.model
            }}</el-descriptions-item>
            <div v-for="chain in item.chain_list" :key="chain.chain_id">
              <el-descriptions-item label="Chain ID" class-name="parser">{{
                chain.chain_id
              }}</el-descriptions-item>
              <el-descriptions-item label="Sequence" class-name="parser">{{
                chain.sequence
              }}</el-descriptions-item>
            </div>
          </el-descriptions>
        </el-form-item>
        <el-form-item prop="taskname">
          <template #label>
            <span>任务名称</span>
          </template>
          <el-input v-model="formObj.taskname"></el-input>
        </el-form-item>
        <el-form-item prop="rename_flag" label="文件处理">
          <el-checkbox
            v-model="formObj.rename_flag"
            true-value="1"
            false-value="0"
            label="蛋白质链名修改"
          />
          <el-checkbox
            v-model="formObj.renumber_flag"
            true-value="1"
            false-value="0"
            label="序列重新编号"
          />
        </el-form-item>

        <!-- 动态生成链的表单项 -->
        <div v-if="formObj.rename_flag === '1'">
          <el-form-item
            v-for="chain in chainList"
            :key="chain"
            :prop="chain"
            :label="chain"
          >
            <el-input
              v-model="formObj[chain]"
              maxlength="1"
              placeholder="1个字符，须是大写字母或数字"
            ></el-input>
          </el-form-item>
        </div>
      </template>
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
    // 添加自定义验证方法
    const validateCheckboxes = (_rule, _value, callback) => {
      if (
        this.formObj.rename_flag === "0" &&
        this.formObj.renumber_flag === "0"
      ) {
        callback(new Error("请至少选择一个选项"));
      } else {
        callback();
      }
    };
    return {
      showFlag: false,
      chainList: [], // 添加这一行，用于存储链信息
      parserList: [],
      formObj: {
        taskname: "",
        file1List: [],
        rename_flag: "0",
        renumber_flag: "0",
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
        // 添加对rename_flag的验证
        rename_flag: [
          {
            required: true,
            validator: validateCheckboxes,
            trigger: "change",
          },
        ],
        // 添加对renumber的验证
        renumber_flag: [
          {
            validator: validateCheckboxes,
            trigger: "change",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
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
              this.chainList = data.chain_list; // 保存链列表
              // 为每个链初始化表单项 - Vue3直接赋值
              this.chainList.forEach((chain) => {
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

              this.chainList = ["A", "B", "C", "D"]; // 保存链列表

              // 为每个链初始化表单项 - Vue3直接赋值
              this.chainList.forEach((chain) => {
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
      let formData = new FormData();
      this.formObj.file1List.forEach((item) => {
        formData.append("file1", item.raw);
      });
      const param = {
        algonum: this.$route.params.id,
      };
      formData.append("param", JSON.stringify(param));
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      this.$axios
        .post("/algo/proteinx_file_handle_step1", formData, { headers })
        .then((data) => {
          console.log(data);
          this.showFlag = true;
          this.parserList = data.parser_list;
          this.chainList = data.chain_list; // 保存链列表
          // 为每个链初始化表单项 - Vue3直接赋值
          this.chainList.forEach((chain) => {
            // 直接赋值，Vue3会自动跟踪这些新属性
            this.formObj[chain] = "";
            // 同样直接为formRules添加验证规则
            this.formRules[chain] = [
              // {
              //   required: true,
              //   message: `${chain}不能为空`,
              //   trigger: "blur",
              // },
              {
                validator: (_rule, value, callback) => {
                  console.log(_rule, value);
                  if (value === "") {
                    callback();
                  }
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
        });
    },
    handleSubmitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let new_chain_ids = Object.assign({}, this.formObj);
          delete new_chain_ids.taskname;
          delete new_chain_ids.file1List;
          delete new_chain_ids.rename_flag;
          delete new_chain_ids.renumber_flag;
          if (
            this.formObj.rename_flag === "1" &&
            Object.keys(new_chain_ids).every((key) => new_chain_ids[key] === "")
          ) {
            const keyNames = Object.keys(new_chain_ids).join("、");
            this.$message.error(`${keyNames}请至少填写一个选项`);
            return;
          }
          let formData = new FormData();
          this.formObj.file1List.forEach((item) => {
            formData.append("file1", item.raw);
          });
          const params = Object.assign(
            {},
            {
              algonum: this.$route.params.id,
              taskname: this.formObj.taskname,
              subparam: {
                new_chain_ids,
                rename_flag: this.formObj.rename_flag,
                renumber_flag: this.formObj.renumber_flag,
              },
            }
          );
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
      this.showFlag = false;
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
    .parser-wrap {
      width: 100%;
      :deep(.parser) {
        word-break: break-all;
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
