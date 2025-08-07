<template>
  <div class="computing-module">
    <el-form
      :model="formObj"
      :rules="formRules"
      ref="formRef"
      class="rule-form"
      @submit.native.prevent
      label-width="110px"
      label-position="top"
    >
      <el-form-item label="Input mode" prop="input_mode">
        <el-radio-group v-model="formObj.input_mode">
          <el-radio-button value="single">Single sequence</el-radio-button>
          <el-radio-button value="bulk">Bulk input</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="taskname" prop="taskname">
        <el-input v-model="formObj.taskname" placeholder="Antibody1"></el-input>
      </el-form-item>
      <template v-if="formObj.input_mode === 'single'">
        <el-form-item prop="vh">
          <template #label>
            <span>Antibody heavy chain sequence</span>
            <el-link
              type="primary"
              class="example"
              @click="
                formObj.vh =
                  'QVQLQQSGAELARPGASVKMSCKASGYTFTRYTMHWVKQRPGQGLEWIGYINPSRGYTNYNQKFKDKATLTTDKSSSTAYMQLSSLTSEDSAVYYCARYYDDHYCLDYWGQGTTLTVSS'
              "
              >use example</el-link
            >
          </template>
          <el-input
            type="textarea"
            autosize
            v-model="formObj.vh"
            placeholder="QVQLQ..."
          ></el-input>
        </el-form-item>
        <el-form-item prop="vl">
          <template #label>
            <span>Antibody light chain sequence</span>
            <el-link
              type="primary"
              class="example"
              @click="
                formObj.vl =
                  'QIVLTQSPAIMSASPGEKVTMTCSASSSVSYMNWYQQKSGTSPKRWIYDTSKLASGVPAHFRGSGSGTSYSLTISGMEAEDAATYYCQQWSSNPFTFGSGTKLEIN'
              "
              >use example</el-link
            >
          </template>
          <el-input
            type="textarea"
            autosize
            v-model="formObj.vl"
            placeholder="DIVMT..."
          ></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <div class="desc">
          Provide multiple antibody sequences. Both chains of an antibody should
          have the same ID in the FASTA header, optionally with _HC/_LC or
          _VH/_VL suffix.
        </div>
        <el-form-item prop="sequence_text">
          <template #label>
            <span>Antibody sequences (FASTA)</span>
            <el-link
              type="primary"
              class="example"
              @click="
                formObj.sequence_text = `>Muromonab-CD3 Variable light chain
QIVLTQSPAIMSASPGEKVTMTCSASSSVSYMNWYQQKSGTSPKRWIYDTSKLASGVPAH
FRGSGSGTSYSLTISGMEAEDAATYYCQQWSSNPFTFGSGTKLEIN
>Muromonab-CD3 Variable heavy chain
QVQLQQSGAELARPGASVKMSCKASGYTFTRYTMHWVKQRPGQGLEWIGYINPSRGYTNY
NQKFKDKATLTTDKSSSTAYMQLSSLTSEDSAVYYCARYYDDHYCLDYWGQGTTLTVSS`
              "
              >use example</el-link
            >
          </template>
          <el-input
            class="textarea"
            type="textarea"
            :autosize="{ minRows: 4 }"
            v-model="formObj.sequence_text"
            placeholder=">Antibody1 VH
QVQLQ...
>Antibody1 VL
DIVMT..."
          ></el-input>
        </el-form-item>
        <el-form-item label="Upload file (FASTA/PDB)" prop="file2">
          <el-upload
            ref="uploadFile2"
            action=""
            :multiple="false"
            :limit="1"
            :on-change="
              (file, fileList) => handleChangeFileList(file, fileList, 'file2')
            "
            :on-remove="
              (file, fileList) => handleChangeFileList(file, fileList, 'file2')
            "
            :on-exceed="
              (file, fileList) => handleExceed(file, fileList, 'file2')
            "
            :file-list="formObj.file2"
            :http-request="handleRequest"
          >
            <template #trigger>
              <el-button icon="Upload" type="primary">select file</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item prop="pdb_ids">
          <template #label>
            <span>PDB IDs</span>
            <el-link
              type="primary"
              class="example"
              @click="formObj.pdb_ids = '5DK3'"
              >use example</el-link
            >
          </template>
          <el-input v-model="formObj.pdb_ids"></el-input>
        </el-form-item> -->
      </template>
      <el-form-item prop="scheme">
        <template #label>
          <span>Numbering</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              ANARCI numbering scheme used to align the sequence and annotate
              position numbers.
            </div>
          </el-popover>
        </template>
        <el-select v-model="formObj.scheme">
          <el-option value="kabat"></el-option>
          <el-option value="chothia"></el-option>
          <el-option value="imgt"></el-option>
          <el-option value="aho"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="cdr_definition">
        <template #label>
          <span>CDR Definition</span>
          <el-popover trigger="hover">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              Scheme used to define the CDR regions. Given regions are not
              humanized, the parental sequence is preserved.
            </div>
          </el-popover>
        </template>
        <el-select v-model="formObj.cdr_definition">
          <el-option value="kabat"></el-option>
          <el-option value="chothia"></el-option>
          <el-option value="imgt"></el-option>
          <el-option value="north"></el-option>
          <el-option value="kabat_vernier"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Humanization method" prop="method">
        <el-radio-group v-model="formObj.method">
          <el-radio-button value="sapiens">Sapiens</el-radio-button>
          <el-radio-button value="cdr_grafting">CDR Grafting</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <template v-if="formObj.method === 'sapiens'">
        <div class="desc">
          Sapiens is a high-throughput humanization method based on deep
          learning on antibody repertoires of more than 500 human subjects from
          the
          <el-link
            class="link"
            href="http://opig.stats.ox.ac.uk/webapps/oas/"
            target="_blank"
            >Observed Antibody Space</el-link
          >
          database.
        </div>
        <el-form-item prop="iterations">
          <template #label>
            <span>Humanization iterations</span>
            <el-popover trigger="hover">
              <template #reference>
                <el-icon class="tip"><Warning /></el-icon>
              </template>
              <div>
                Sapiens humanization can be repeated multiple times to produce a
                more human sequence.
              </div>
            </el-popover>
          </template>
          <el-input v-model.number="formObj.iterations"></el-input>
        </el-form-item>
        <el-form-item prop="humanize_cdrs">
          <el-checkbox v-model="formObj.humanize_cdrs" true-value="yes">
            <span>Humanization iterations</span>
            <el-popover trigger="hover">
              <template #reference>
                <el-icon class="tip"><Warning /></el-icon>
              </template>
              <div>
                Allow predicting humanizing mutations in
                complementarity-determining regions (will impact binding).
              </div>
            </el-popover>
          </el-checkbox>
        </el-form-item>
      </template>
      <template v-else>
        <div class="desc">
          Graft the CDR regions into the nearest human V and J gene sequences
          based on % sequence identity.
        </div>
        <el-form-item prop="heavy_v_germline">
          <template label>
            <span>Heavy germline</span>
            <el-popover trigger="hover">
              <template #reference>
                <el-icon class="tip"><Warning /></el-icon>
              </template>
              <div>
                Germline heavy V gene to use as template for humanization. Use
                Auto to pick nearest germline based on sequence homology.
              </div>
            </el-popover>
          </template>
          <el-select v-model="formObj.heavy_v_germline">
            <el-option
              v-for="item in heavy_v_germline_opts"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="light_v_germline">
          <template #label>
            <span>Light germline</span>
            <el-popover trigger="hover">
              <template #reference>
                <el-icon class="tip"><Warning /></el-icon>
              </template>
              <div>
                Germline light V gene to use as template for humanization. Use
                Auto to pick nearest germline based on sequence homology.
              </div>
            </el-popover>
          </template>
          <el-select v-model="formObj.light_v_germline">
            <el-option
              v-for="item in light_v_germline_opts"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sapiens_final_pass">
          <el-checkbox v-model="formObj.sapiens_final_pass" true-value="yes">
            <span>Perform final humanization pass using Sapiens</span>
            <el-popover trigger="hover">
              <template #reference>
                <el-icon class="tip"><Warning /></el-icon>
              </template>
              <div>
                After creating the CDR graft, apply Sapiens to humanize the
                sequence further and repair potential issues.
              </div>
            </el-popover>
          </el-checkbox>
        </el-form-item>
      </template>
      <el-form-item prop="min_subjects">
        <template #label>
          <span>OASis prevalence threshold</span>
          <el-popover trigger="hover" :popper-style="{ width: '600px' }">
            <template #reference>
              <el-icon class="tip"><Warning /></el-icon>
            </template>
            <div>
              OASis identity score of an antibody is calculated as the fraction
              of its 9-mer peptides that are considered human. The prevalence
              threshold determines what fraction of human subjects from the
              Observed Antibody Space database should contain a given peptide in
              order for it to be considered human. The higher the threshold, the
              stricter the evaluation.
            </div>
          </el-popover>
        </template>
        <el-radio-group v-model="formObj.min_subjects" class="radio-group">
          <el-radio value="loose">loose (≥1% subjects)</el-radio>
          <el-radio value="relaxed">relaxed (≥10% subjects)</el-radio>
          <el-radio value="medium">medium (≥50% subjects)</el-radio>
          <el-radio value="strict">strict (≥90% subjects)</el-radio>
          <el-radio value="custom"
            >custom
            <el-form-item
              prop="custom_min_subjects"
              style="display: inline-block"
            >
              <el-input
                class="custom-min-input"
                v-model.number="formObj.custom_min_subjects"
                :disabled="formObj.min_subjects !== 'custom'"
              ></el-input>
            </el-form-item>
            % subjects</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <div class="desc">
        Submit the task to the queue. Results are stored for a 24-hour period
        and accessible under a secret URL.
      </div>
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
    const validateIterations = (_rule, value, callback) => {
      const regExp = /^\d+$/;
      if (value === "" || (regExp.test(value) && value <= 10)) {
        callback();
      } else {
        callback(new Error("This field must be an integer from 0 to 10."));
      }
    };
    const validateCustomMinSubjects = (_rule, value, callback) => {
      const regExp = /^\d+$/;
      if (regExp.test(value) && value <= 100) {
        callback();
      } else {
        callback(new Error("This field must be an integer from 0 to 100."));
      }
    };
    return {
      formObj: {
        input_mode: "single",
        taskname: "",
        vh: "",
        vl: "",
        sequence_text: "",
        file2: [],
        pdb_ids: "",
        scheme: "kabat",
        cdr_definition: "kabat",
        method: "sapiens",
        iterations: "1",
        humanize_cdrs: "",
        heavy_v_germline: "auto",
        light_v_germline: "auto",
        sapiens_final_pass: "",
        min_subjects: "loose",
        custom_min_subjects: "1",
      },
      formRules: {
        taskname: [
          {
            required: true,
            message: "The taskname is required.",
            trigger: "blur",
          },
        ],
        iterations: [
          {
            validator: validateIterations,
            trigger: "blur",
          },
        ],
        custom_min_subjects: [
          {
            validator: validateCustomMinSubjects,
            trigger: "blur",
          },
        ],
      },
      loading: false,
      heavy_v_germline_opts: [
        "auto",
        "IGHV1",
        "IGHV1-18",
        "IGHV1-2",
        "IGHV1-24",
        "IGHV1-3",
        "IGHV1-38-4",
        "IGHV1-45",
        "IGHV1-46",
        "IGHV1-58",
        "IGHV1-68",
        "IGHV1-69",
        "IGHV1-69-2",
        "IGHV1-69D",
        "IGHV1-8",
        "IGHV1-NL1",
        "IGHV2",
        "IGHV2-10",
        "IGHV2-26",
        "IGHV2-5",
        "IGHV2-70",
        "IGHV2-70D",
        "IGHV3",
        "IGHV3-11",
        "IGHV3-13",
        "IGHV3-15",
        "IGHV3-16",
        "IGHV3-19",
        "IGHV3-20",
        "IGHV3-21",
        "IGHV3-22",
        "IGHV3-23",
        "IGHV3-23D",
        "IGHV3-25",
        "IGHV3-29",
        "IGHV3-30",
        "IGHV3-30-2",
        "IGHV3-30-22",
        "IGHV3-30-3",
        "IGHV3-30-33",
        "IGHV3-30-42",
        "IGHV3-30-5",
        "IGHV3-30-52",
        "IGHV3-32",
        "IGHV3-33",
        "IGHV3-33-2",
        "IGHV3-35",
        "IGHV3-38",
        "IGHV3-38-3",
        "IGHV3-41",
        "IGHV3-43",
        "IGHV3-43D",
        "IGHV3-47",
        "IGHV3-48",
        "IGHV3-49",
        "IGHV3-52",
        "IGHV3-53",
        "IGHV3-54",
        "IGHV3-62",
        "IGHV3-63",
        "IGHV3-64",
        "IGHV3-64D",
        "IGHV3-66",
        "IGHV3-69-1",
        "IGHV3-7",
        "IGHV3-71",
        "IGHV3-72",
        "IGHV3-73",
        "IGHV3-74",
        "IGHV3-9",
        "IGHV3-NL1",
        "IGHV4",
        "IGHV4-28",
        "IGHV4-30-2",
        "IGHV4-30-4",
        "IGHV4-31",
        "IGHV4-34",
        "IGHV4-38-2",
        "IGHV4-39",
        "IGHV4-4",
        "IGHV4-55",
        "IGHV4-59",
        "IGHV4-61",
        "IGHV5",
        "IGHV5-10-1",
        "IGHV5-51",
        "IGHV5-78",
        "IGHV6",
        "IGHV6-1",
        "IGHV7",
        "IGHV7-34-1",
        "IGHV7-4-1",
        "IGHV7-40",
        "IGHV7-81",
        "IGHV8",
        "IGHV8-51-1",
      ],
      light_v_germline_opts: [
        "auto",
        "IGKV",
        "IGKV1",
        "IGKV1-12",
        "IGKV1-13",
        "IGKV1-16",
        "IGKV1-17",
        "IGKV1-27",
        "IGKV1-33",
        "IGKV1-37",
        "IGKV1-39",
        "IGKV1-5",
        "IGKV1-6",
        "IGKV1-8",
        "IGKV1-9",
        "IGKV1-NL1",
        "IGKV1D",
        "IGKV1D-12",
        "IGKV1D-13",
        "IGKV1D-16",
        "IGKV1D-17",
        "IGKV1D-33",
        "IGKV1D-37",
        "IGKV1D-39",
        "IGKV1D-42",
        "IGKV1D-43",
        "IGKV1D-8",
        "IGKV2",
        "IGKV2-18",
        "IGKV2-24",
        "IGKV2-28",
        "IGKV2-29",
        "IGKV2-30",
        "IGKV2-4",
        "IGKV2-40",
        "IGKV2D",
        "IGKV2D-18",
        "IGKV2D-24",
        "IGKV2D-26",
        "IGKV2D-28",
        "IGKV2D-29",
        "IGKV2D-30",
        "IGKV2D-40",
        "IGKV3",
        "IGKV3-11",
        "IGKV3-15",
        "IGKV3-20",
        "IGKV3-7",
        "IGKV3D",
        "IGKV3D-11",
        "IGKV3D-15",
        "IGKV3D-20",
        "IGKV3D-7",
        "IGKV4",
        "IGKV4-1",
        "IGKV5",
        "IGKV5-2",
        "IGKV6",
        "IGKV6-21",
        "IGKV6D",
        "IGKV6D-21",
        "IGKV6D-41",
        "IGKV7",
        "IGKV7-3",
        "IGLV",
        "IGLV1",
        "IGLV1-36",
        "IGLV1-40",
        "IGLV1-41",
        "IGLV1-44",
        "IGLV1-47",
        "IGLV1-50",
        "IGLV1-51",
        "IGLV1-62",
        "IGLV10",
        "IGLV10-54",
        "IGLV11",
        "IGLV11-55",
        "IGLV2",
        "IGLV2-11",
        "IGLV2-14",
        "IGLV2-18",
        "IGLV2-23",
        "IGLV2-33",
        "IGLV2-34",
        "IGLV2-5",
        "IGLV2-8",
        "IGLV3",
        "IGLV3-1",
        "IGLV3-10",
        "IGLV3-12",
        "IGLV3-13",
        "IGLV3-16",
        "IGLV3-19",
        "IGLV3-21",
        "IGLV3-22",
        "IGLV3-25",
        "IGLV3-27",
        "IGLV3-31",
        "IGLV3-32",
        "IGLV3-9",
        "IGLV4",
        "IGLV4-3",
        "IGLV4-60",
        "IGLV4-69",
        "IGLV5",
        "IGLV5-37",
        "IGLV5-39",
        "IGLV5-45",
        "IGLV5-48",
        "IGLV5-52",
        "IGLV6",
        "IGLV6-57",
        "IGLV7",
        "IGLV7-43",
        "IGLV7-46",
        "IGLV8",
        "IGLV8-61",
        "IGLV9",
        "IGLV9-49",
      ],
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
          //imput_mode为bulk时,sequence_text与file2二选一必填，也可同时填写
          if (
            this.formObj.input_mode === "bulk" &&
            !this.formObj.sequence_text &&
            !this.formObj.file2.length
          )
            return this.$message.error(
              "The antibody sequences and the file should fill in at least one."
            );
          let formData = new FormData();
          let subparam = {
            input_mode: this.formObj.input_mode,
            scheme: this.formObj.scheme, //对应web显示字段Numbering
            cdr_definition: this.formObj.cdr_definition,
            method: this.formObj.method,
            min_subjects: this.formObj.min_subjects, //默认auto
            submit: "Submit", //写死
          };
          if (this.formObj.input_mode === "single") {
            subparam.name = this.formObj.taskname;
            subparam.vh = this.formObj.vh;
            subparam.vl = this.formObj.vl;
            subparam.sequence_text = "";
            subparam.pdb_ids = "";
          } else {
            subparam.name = "";
            subparam.vh = "";
            subparam.vl = "";
            this.formObj.file2.forEach((item) => {
              formData.append("file2", item.raw);
            });
            subparam.sequence_text = this.formObj.sequence_text;
            subparam.pdb_ids = this.formObj.pdb_ids;
          }

          if (this.formObj.method === "sapiens") {
            subparam.iterations = this.formObj.iterations;
            subparam.heavy_v_germline = "";
            subparam.light_v_germline = "";
            //method选择sapines时有此选择，勾选则传该字段，不勾选则不传该字段
            if (this.formObj.humanize_cdrs)
              subparam.humanize_cdrs = this.formObj.humanize_cdrs;
          } else {
            subparam.iterations = "";
            subparam.heavy_v_germline = this.formObj.heavy_v_germline;
            subparam.light_v_germline = this.formObj.light_v_germline;
            //method选择cdr_grafting时有此选择，勾选则传该字段，不勾选则不传该字段
            if (this.formObj.sapiens_final_pass)
              subparam.sapiens_final_pass = this.formObj.sapiens_final_pass;
          }

          //整形，仅当min_subjects选择custom时传该值
          if (this.formObj.min_subjects === "custom")
            subparam.custom_min_subjects = this.formObj.custom_min_subjects;
          const params = {
            algonum: this.$route.params.id,
            taskname: this.formObj.taskname,
            subparam,
          };
          formData.append("param", JSON.stringify(params));
          console.log(subparam);
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
      // this.$refs.uploadFile2.clearFiles();
      // this.formObj.file2 = [];
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
      align-items: center;
      padding: 0;
      .example {
        margin-left: 20px;
      }
    }
    .tip {
      padding-left: 5px;
      font-size: 18px;
      vertical-align: text-top;
    }
    .desc {
      font-size: 14px;
      color: #606266;
      .link {
        color: #409eff;
      }
    }
    .textarea {
      :deep(.el-textarea__inner) {
        min-height: 96px !important;
      }
    }
    .radio-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .el-radio {
        margin-bottom: 10px;
      }
    }
    .custom-min-input {
      width: auto;
      :deep(.el-input__inner) {
        width: 55px;
        height: 32px;
        line-height: 32px;
      }
    }
    .form-tools {
      margin-top: 22px;
      text-align: center;
    }
  }
}
</style>
