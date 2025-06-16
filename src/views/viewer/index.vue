<template>
  <div class="iframe-container">
    <iframe src="/viewer.html" class="viewer-iframe" />
  </div>
</template>

<style scoped lang="less">
.iframe-container {
  width: 100%;
  height: calc(100vh - 100px); /* 使用视口高度 */
  overflow: hidden;
  .viewer-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
