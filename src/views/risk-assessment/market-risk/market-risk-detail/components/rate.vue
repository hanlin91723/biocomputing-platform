<template>
  <div class="rate-wrap">
    <div class="rate-name">
      {{ type === 1 ? "高风险" : type === 2 ? "中风险" : "警示" }}企业（{{
        num
      }}
      家）
    </div>
    <div class="progress-wrap">
      <div class="name">占比：</div>
      <el-progress
        :class="[
          'rate-progress',
          type === 1 ? 'high-risk' : type === 2 ? 'medium-risk' : 'warning',
        ]"
        :text-inside="false"
        :stroke-width="16"
        :percentage="percent"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      required: true,
    },
    num: {
      type: Number,
      required: true,
      default: 0,
    },
    percent: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  methods: {
    tagColor() {
      switch (true) {
        case this.level >= 0 && this.level <= 25:
          return {
            level: 1,
            tag: "tag1",
            text: "低风险",
          };
        case this.level > 25 && this.level <= 50:
          return {
            level: 2,
            tag: "tag2",
            text: "中风险",
          };
        case this.level > 50 && this.level <= 75:
          return {
            level: 3,
            tag: "tag3",
            text: "较高风险",
          };
        case this.level > 75 && this.level <= 100:
          return {
            level: 4,
            tag: "tag4",
            text: "高风险",
          };
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.rate-wrap {
  .rate-name {
    font-size: 12px;
    line-height: 2;
  }
  .progress-wrap {
    display: flex;
    align-items: center;
    .name {
      font-size: 12px;
    }
    .rate-progress {
      width: 80%;
      /deep/ .el-progress__text {
        font-size: 12px !important;
      }
      /deep/ .el-progress-bar__innerText {
        line-height: 16px;
        vertical-align: text-top;
      }
      &.high-risk {
        /deep/ .el-progress-bar__inner {
          background-color: rgba(245, 114, 114, 1);
        }
      }
      &.medium-risk {
        /deep/ .el-progress-bar__inner {
          background-color: rgba(244, 165, 47, 1);
        }
      }
      &.warning {
        /deep/ .el-progress-bar__inner {
          background-color: rgba(182, 200, 76, 1);
        }
      }
    }
  }
}
</style>
