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
      <el-form-item label="PDB File" prop="file1List">
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
            <el-button icon="Upload" type="primary">select file</el-button>
          </template>
        </el-upload>
      </el-form-item>
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
      <!-- <el-form-item class="form-tools" label-width="0">
        <el-button
          type="primary"
          @click="handleSubmitForm"
          :loading="loading"
          >确定</el-button
        >
        <el-button type="default" @click="handleResetForm"
          >重置</el-button
        >
      </el-form-item> -->
    </el-form>
    <div ref="mol" class="mol-container"></div>
  </div>
</template>

<script>
import * as $3Dmol from "3dmol/build/3Dmol.js";
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
            message: "The taskname is required.",
            trigger: "blur",
          },
        ],
        file1List: [
          {
            required: true,
            message: "The file is required.",
            trigger: "change",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    console.log($3Dmol);
  },
  methods: {
    //单文件上传时新文件替换已选文件
    handleExceed(file, _fileList, name) {
      console.log(file, _fileList);
      const newFileList = [
        {
          raw: file[0],
          name: file[0].name,
        },
      ];
      this.formObj[name] = newFileList;
      this.loadModel(newFileList[0]);
    },
    //单、多文件上传
    handleChangeFileList(_file, fileList, name) {
      this.formObj[name] = fileList;
      // this.$refs.formRef.validateField(name);
      if (fileList.length === 0) return;
      this.loadModel(fileList[0]);
    },
    //渲染分子模型
    loadModel(file) {
      const reader = new FileReader();
      reader.readAsText(file.raw);
      const arr = file.name.split(".");
      const fileType = arr[arr.length - 1];
      console.log(arr, fileType);
      reader.onload = (e) => {
        // 读取文件内容
        const pdbData = e.target.result;
        // 接下来可对文件内容进行处理
        console.log(pdbData);
        const element = this.$refs.mol;
        const config = { backgroundColor: "#f2f2f2" };
        const viewer = $3Dmol.createViewer(element, config);
        //添加分子
        viewer
          .addModel(pdbData, "pdb")
          .setStyle({}, { cartoon: { color: "#17ac80" } });
        viewer.addSurface($3Dmol.SurfaceType.VDW, {
          opacity: 0.5,
          color: "white",
        });
        //分子动态围绕y轴旋转
        // viewer.spin("y", 2);
        // 在HTML页面中显示分子
        viewer.zoomTo();
        viewer.render();
        viewer.zoom(1, 2000);
      };
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
  .mol-container {
    position: relative;
    width: 50%;
    height: 400px;
    margin: 20px auto;
  }
}
</style>
