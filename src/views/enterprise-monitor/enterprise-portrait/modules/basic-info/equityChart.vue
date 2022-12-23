<template>
  <div>
    <h3 class="title">股权穿透图</h3>
    <div class="chart" ref="chart">
      <el-button class="icon" icon="el-icon-full-screen" @click="fullScreen">{{isFullScreen ? '退出全屏' : '全屏查看' }}</el-button>
    </div>
  </div>
</template>

<script>
import StockTree from "./StockTree.js";
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        threeData:{
          id: "abc1005",
          // 根节点名称
          name: "山东吠舍科技有限责任公司",
          // 子节点列表
          children: [
            {
              id:"abc1006",
              name: "山东第一首陀罗科技服务有限公司",
              percent: "100%",
            },
            {
              id:"abc1007",
              name: "山东第二首陀罗程技术有限公司",
              percent: "100%",
            },
            {
              id:"abc1008",
              name: "山东第三首陀罗光伏材料有限公司",
              percent: "100%",
            },
            {
              id:"abc1009",
              name: "山东第四首陀罗科技发展有限公司",
              percent: "100%",
              children: [
                {
                  id:"abc1010",
                  name: "山东第一达利特瑞利分析仪器有限公司",
                  percent: "100%",
                  children:[
                    {
                      id:"abc1011",
                      name: "山东瑞利的子公司一",
                      percent: "80%",
                    },
                    {
                      id:"abc1012",
                      name: "山东瑞利的子公司二",
                      percent: "90%",
                    },
                    {
                      id:"abc1013",
                      name: "山东瑞利的子公司三",
                      percent: "100%",
                    },
                  ],
                },
              ],
            },
            {
              id:"abc1014",
              name: "山东第五首陀罗电工科技有限公司",
              percent: "100%",
              children: [
                {
                  id:"abc1015",
                  name: "山东第二达利特低自动化设备有限公司",
                  percent: "100%",
                  children:[
                    {
                      id:"abc1016",
                      name: "山东敬业的子公司一",
                      percent: "100%",
                    },
                    {
                      id:"abc1017",
                      name: "山东敬业的子公司二",
                      percent: "90%",
                    },
                  ],
                },
              ],
            },
            {
              id: "abc1020",
              name: "山东第六首陀罗分析仪器(集团)有限责任公司",
              percent: "100%",
              children: [
                {
                  id:"abc1021",
                  name: "山东第三达利特分气体工业有限公司",
                },
              ],
            },
          ],
          // 父节点列表
          parents: [
            {
              id: "abc2001",
              name: "山东刹帝利集团有限责任公司",
              percent: "60%",
              parents: [
                {
                  id: "abc2000",
                  name: "山东婆罗门集团有限公司",
                  percent: "100%",
                },
              ],
            },
            {
              id: "abc2002",
              name: "吴小远",
              percent: "40%",
            },
          ],
    },
    tree:null,
    isFullScreen:false,
      };
    },
    mounted(){
      this.initTree();
    },
    methods:{
      initTree(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
        };
        console.log(params);
        this.$axios.get("/entInfo/equityPenetration",params).then(({data,})=>{
          this.threeData = data;
          this.tree = new StockTree({
        el: ".chart",
        originTreeData: this.threeData,
        // 节点点击事件
        nodeClickEvent: function (e,d){
          console.log("当前节点的数据：",d);
        },
    });
        });
        
      },
      fullScreen(){
        if(this.isFullScreen){
          // 退出全屏
          document.exitFullscreen();
          this.isFullScreen = false;
        }else{
          // 进入全屏
          this.$refs.chart.requestFullscreen();
          this.isFullScreen = true;
        }
      },
    },
  };
</script>

<style lang="less" scoped>
.title{
  font-size: 16px;
  margin-bottom: 12px;
}
.chart{
  width: 100%;
  height: 416px;
  border: 1px solid #f0f7fc;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;
  margin: 0 auto;
  .icon{
    float: right;
    width: 134px;
    height: 38px;
    line-height: 38px;
    padding: 0 16px;
    font-size: 14px;
    color: #0083ff;
    cursor: pointer;
  }
}
</style>