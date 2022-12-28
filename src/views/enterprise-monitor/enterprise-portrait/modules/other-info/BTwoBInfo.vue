<template>
  <div>
    <h3 class="title">B2B信息</h3>
    <table class="project-table">
          <tr class="project-table-tr">
            <td class="project-name">B2B平台</td>
            <td class="project-value">{{ infoData?.b2b }}</td>
            <td class="project-name">详细地址</td>
            <td class="project-value">{{ infoData?.address }}</td>
            <td class="project-name">经营地址</td>
            <td class="project-value">{{ infoData?.dom }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">经营模式</td>
            <td class="project-value">{{ infoData?.bizModal }}</td>
            <td class="project-name">主营产品</td>
            <td class="project-value">{{ infoData?.mainProd }}</td>
            <td class="project-name">官网</td>
            <td class="project-value">{{ infoData?.website }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">营业额</td>
            <td class="project-value">{{ infoData?.turnOver }}</td>
            <td class="project-name">主要销售区域</td>
            <td class="project-value">{{ infoData?.targetMkt }}</td>
            <td class="project-name">主要客户群体</td>
            <td class="project-value">{{ infoData?.targetCli }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">品牌商标</td>
            <td class="project-value">{{ infoData?.brand }}</td>
            <td class="project-name">员工人数</td>
            <td class="project-value">{{ infoData?.memberCnt }}</td>
            <td class="project-name">人数偏差</td>
            <td class="project-value">{{ infoData?.devCnt }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">厂房面积</td>
            <td class="project-value">{{ infoData?.area }}</td>
            <td class="project-name">加工方式</td>
            <td class="project-value">{{ infoData?.processMethod }}</td>
            <td class="project-name">工艺</td>
            <td class="project-value">{{ infoData?.technology }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">公司所需产品</td>
            <td class="project-value">{{ infoData?.needProducts }}</td>
            <td class="project-name">行业大类</td>
            <td class="project-value">{{ infoData?.directoryName }}</td>
            <td class="project-name">行业名</td>
            <td class="project-value">{{ infoData?.industryName }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">是否代工</td>
            <td class="project-value">{{ infoData?.hasOem }}</td>
            <td class="project-name">产量</td>
            <td class="project-value">{{ infoData?.outPut }}</td>
            <td class="project-name">产品数量</td>
            <td class="project-value">{{ infoData?.prodNum }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">诚信通年数</td>
            <td class="project-value">{{ infoData?.authInfoSummary }}</td>
            <td class="project-name">供应等级</td>
            <td class="project-value">{{ infoData?.gongLevel }}</td>
            <td class="project-name">交易勋章</td>
            <td class="project-value">{{ infoData?.jiaoYiZhang }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">满意度</td>
            <td class="project-value">{{ infoData?.manYiDu }}</td>
            <td class="project-name">描述相符<br/>(同行业相比)</td>
            <td class="project-value">{{ infoData?.miaoShuMark }}<br/>{{ infoData?.miaoShuMarkComp }}</td>
            <td class="project-name">服务态度<br/>(同行业相比)</td>
            <td class="project-value">{{ infoData?.fuWuMark }}<br/>{{ infoData?.fuWuMarkcomp }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">到货速度<br/>(同行业相比)</td>
            <td class="project-value">{{ infoData?.daoHoMark }}<br/>{{ infoData?.daoHoMarkComp }}</td>
            <td class="project-name">旺旺ID</td>
            <td class="project-value">{{ infoData?.wangWangId }}</td>
            <td class="project-name"></td>
            <td class="project-value"></td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">简介</td>
            <td class="project-value" colspan="5">{{ infoData?.intro }}</td>
          </tr>
        </table>
    <!-- 分页器 -->
    <el-pagination background
       layout="total, prev, pager, next"
       :page-size="pageSize"
       :total="total" 
       :current-page="currentPage"
       class="pagination"
       @current-change="currentChange">
      </el-pagination>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        infoData:{},
        // 分页
        currentPage:1,
        pageSize:1,
        total:0,
      };
    },
    created(){
      this.getVoluntaryProductsData();
    },
    methods:{
      // 变更记录表格数据
      getVoluntaryProductsData(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
          entName:userStore.entName,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        };
        this.$axios.post("/other/b2bInfo",params).then(({data,})=>{
          this.total = data.total;
          this.infoData = data.list[0];
        });
      },
      // 分页
      currentChange(val){
        this.currentPage = val;
        this.getVoluntaryProductsData();
      },
    },
  };
</script>

<style lang="less" scoped>
.title{
  font-size: 16px;
  margin-bottom: 12px;
}
.pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>