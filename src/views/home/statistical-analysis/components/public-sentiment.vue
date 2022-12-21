<template>
  <div class="public-sentiment-wrap">
    <div class="flex">
      <div class="index title">序号</div>
      <div class="news title">新闻标题</div>
      <div class="related-enterprise title">相关企业</div>
      <div class="type title">舆情态度</div>
      <div class="time title">时间</div>
    </div>
    <vue-seamless-scroll
      :data="list"
      :class-option="classOption"
      class="public-sentiment-list-wrap"
    >
      <ul class="public-sentiment-list">
        <li
          :class="['public-sentiment-item', 'flex', index % 2 ? 'odd' : 'even']"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <div class="index">{{ index + 1 }}</div>
          <div class="news" :title="item.title">{{ item.title }}</div>
          <div class="related-enterprise" :title="item.companys">
            {{ item.companys }}
          </div>
          <div class="type">{{ item.tabsEmotionLabels }}</div>
          <div class="time">{{ item.pubTime }}</div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
export default {
  components: {
    vueSeamlessScroll: () => import("vue-seamless-scroll"),
  },
  data() {
    return {
      classOption: {
        step: 0.2,
        // singleHeight: 80,
      },
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.public-sentiment-wrap {
  margin-top: 20px;
  text-align: center;
  .public-sentiment-list-wrap {
    height: 317px;
    margin-top: 20px;
    overflow: hidden;
    font-size: 14px;
    .public-sentiment-item {
      padding: 5px 0;
      &.odd {
        background: #f5f7fa;
      }
      &.even {
        background: #fff;
      }
    }
  }
  .index {
    width: 50px;
  }
  .news {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    width: 270px;
  }
  .related-enterprise {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    width: 180px;
  }
  .type {
    width: 60px;
  }
  .time {
    width: 150px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
