<template>
  <div class="level">
    <div class="level-bar">
      <span
       :class="{['level-bar-item']:true, [tagColor().tag]:item<=tagColor().level}"
       v-for="item in 4"
       :key="item"></span>
    </div>
    <div :class="{tag:true,[tagColor().tag]:true}">{{tagColor().text}}</div>
  </div>
</template>

<script>
export default {
props:{
  level:{
    type:Number,
    required:true,
  },
},
methods:{
  tagColor(){
    switch (true) {
        case this.level === 0:
          return {
            level:1,
            tag:"tag1",
            text:"无风险",
          };
        case this.level === 3:
        return {
            level:2,
            tag:"tag2",
            text:"警示",
          };
        case this.level === 2:
        return {
            level:3,
            tag:"tag3",
            text:"中风险",
          };
        case this.level === 1:
        return {
            level:4,
            tag:"tag4",
            text:"高风险",
          };
        default:
          break;
      }
  },
},
};
</script>

<style lang="less" scoped>
.level{
  display: flex;
  align-items: center;
  .level-bar{
  display: flex;
  justify-content: space-between;
  width: 134px;
  height: 8px;
  .level-bar-item{
    width: 32px;
    background-color: #EAECEF;
    &.tag1{
      background-color: rgba(93, 209, 140, 1);
    }
    &.tag2{
      background-color: rgba(182, 200, 76, 1);
    }
    &.tag3{
      background-color: rgba(244, 165, 47, 1);
    }
    &.tag4{
      background-color: rgba(245, 114, 114, 1);
    }
  }
}
.tag{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 26px;
  &.tag1{
    border: 1px solid rgba(93, 209, 140, 0.3);
    background-color: rgba(93, 209, 140, 0.1);
    color: rgba(93, 209, 140, 1);
  }
  &.tag2{
    border: 1px solid rgba(182, 200, 76, 0.3);
    background-color: rgba(182, 200, 76, 0.1);
    color: rgba(182, 200, 76, 1);
  }
  &.tag3{
    border: 1px solid rgba(244, 165, 47, 0.3);
    background-color: rgba(244, 165, 47, 0.1);
    color: rgba(244, 165, 47, 1);
  }
  &.tag4{
    border: 1px solid rgba(245,114,114,0.3);
    background-color: rgba(245,114,114,0.1);
    color: rgba(245,114,114,1);
  }
}
}
</style>