<template>
  <div>
    <h3 class="title">基本注册信息</h3>
    <table class="project-table">
          <tr class="project-table-tr">
            <td class="project-name">企业名称</td>
            <td class="project-value">{{ registerInfo?.entName }}</td>
            <td class="project-name">企业登记状态</td>
            <td class="project-value">{{ registerInfo?.entStatus }}</td>
            <td class="project-name">法人</td>
            <td class="project-value">{{ registerInfo?.legalPerson }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">注册资本</td>
            <td class="project-value">{{ registerInfo?.registeredCapital }}{{ registerInfo?.registeredCapital ? '万元':'' }}</td>
            <td class="project-name">成立日期</td>
            <td class="project-value">{{ registerInfo?.incorporationDate?.split('T')[0] }}</td>
            <td class="project-name">核准日期</td>
            <td class="project-value">{{ registerInfo?.approvalDate?.split('T')[0] }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">统一社会信用代码</td>
            <td class="project-value">{{ registerInfo?.creditCode }}</td>
            <td class="project-name">纳税人识别号</td>
            <td class="project-value">{{ registerInfo?.taxpayerIdNumber }}</td>
            <td class="project-name">注册号</td>
            <td class="project-value">{{ registerInfo?.registrationNumber }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">组织机构代码</td>
            <td class="project-value">{{ registerInfo?.organizationCode }}</td>
            <td class="project-name">参保人数</td>
            <td class="project-value">{{ registerInfo?.insuredPersons }}</td>
            <td class="project-name">企业类型</td>
            <td class="project-value">{{ registerInfo?.entType }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">曾用名</td>
            <td class="project-value">{{ registerInfo?.nameUsedBefore }}</td>
            <td class="project-name">英文名</td>
            <td class="project-value">{{ registerInfo?.companyNameEn }}</td>
            <td class="project-name"></td>
            <td class="project-value"></td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">企业地址</td>
            <td class="project-value" colspan="5">{{ registerInfo?.address }}</td>
          </tr>
          <tr class="project-table-tr">
            <td class="project-name">经营范围</td>
            <td class="project-value" colspan="5">{{ registerInfo?.businessDescription }}</td>
          </tr>
        </table>
  </div>
</template>

<script>
import { useUserStore } from "@/store/index.js";
  export default {
    data() {
      return {
        registerInfo:{},
      };
    },
    created(){
      this.getInfo();
    },
    methods:{
      getInfo(){
        const userStore = useUserStore();
        let params = {
          entId:userStore.entId,
        };
        this.$axios.get("/entInfo/info",params).then(({data,})=>{
          this.registerInfo = data;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
.title{
  font-size: 16px;
  margin-bottom: 12px;
}
</style>