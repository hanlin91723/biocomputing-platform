<template>
  <div class="enterprise-list-wrap">企业检索列表</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style lang="less" scoped>
.enterprise-list-wrap {
  width: 1900px;
  height: 1000px;
}
</style>
