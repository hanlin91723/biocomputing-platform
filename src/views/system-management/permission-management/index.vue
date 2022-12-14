<template>
  <div class="user">
    <div class="header">
      <div class="header-left">
        <el-input class="input" placeholder="请输入角色名称/权限描述" v-model="nameOrRole" clearable></el-input>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="addRole">新建角色</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table :data="tableData" border stripe class="table">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" ></el-table-column>
      <el-table-column prop="permissionDescription" label="权限描述" width="400"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="roleCount" label="角色人数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="edit" @click="handleEdit(scope.row)">编辑</span>
            <span class="delete" @click="deleteRole(scope.row)">删除</span>
        </template>
    </el-table-column>
  </el-table>
    <!-- 分页器 -->
    <el-pagination background
     layout="total, prev, pager, next"
     :page-size="pageSize"
     :total="total" 
     :current-page="currentPage"
     class="pagination"
     @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 编辑和添加用户弹窗 -->
    <el-dialog :title="roleId==-1?'新建角色':'编辑角色'" :visible="showRoleDialog" width="45%" @close="isCancel" top="9vh">
    <el-form label-width="120px" :model="roleInfo" :rules="roleInfoRules" ref="userInfo">
      <el-form-item label="角色名称" prop="roleName">
        <el-input placeholder="请输入角色名称"  v-model="roleInfo.roleName"/>
      </el-form-item>
      <el-form-item label="权限描述" prop="permissionDescription">
        <el-input type="textarea"  placeholder="请输入权限描述" v-model="roleInfo.permissionDescription"/>
      </el-form-item>
      <el-form-item label="功能权限" prop="functionPermission" class="permission">
        <!-- 多组多选项 -->
        <div v-for="(item,index) in roleList" :key="item.label">
          <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkedAll" @change="(val)=>{handleCheckAllChange(val,item,index)}">{{item.name}}</el-checkbox>
          <el-checkbox-group v-model="checkedCities[index]" @change="(arr)=>{handleCheckedCitiesChange(arr,item,index)}">
            <el-checkbox v-for="child in item.children" :label="child.label" :key="child.label">{{child.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="medium" type="primary" @click="isOk">确定</el-button>
          <el-button size="medium" @click="isCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      roleList:[{
          label: 1,
          name:"概览",
          children:[{
            label:"1-1",
            name:"风险地图",
            checked:false,
          },{
            label:"1-2",
            name:"统计分析",
            checked:false,
          },],
          checkedAll:false,
          isIndeterminate:true,
        },{
          label: 2,
          name:"企业监测",
          children:[{
            label:"2-1",
            name:"企业检索",
            checked:false,
          },{
            label:"2-2",
            name:"企业画像",
            checked:false,
          },],
          checkedAll:false,
          isIndeterminate:true,
        },{
          label: 3,
          name:"风险评估",
          children:[{
            label:"3-1",
            name:"企业风险",
            checked:false,
          },{
            label:"3-2",
            name:"市场风险",
            checked:false,
          },],
          checkedAll:false,
          isIndeterminate:true,
        },{
          label: 4,
          name:"系统管理",
          children:[{
            label:"4-1",
            name:"用户管理",
            checked:false,
          },{
            label:"4-2",
            name:"权限管理",
            checked:false,
          },],
          checkedAll:false,
          isIndeterminate:true,
      },],
      checkedCities:[
          [],
          [],
          [],
          [],
      ],
      nameOrRole:"",
      showRoleDialog:false,
      roleId:-1,
      roleInfo:{
        roleName:"",
        permissionDescription:"",
        functionPermission:[],
      },
      roleInfoRules: {
        roleName: [{ required: true, message: "用户名不能为空", trigger: "blur", }, {
          min: 1, max: 10, message: "用户名为1-10位",
        },],
        permissionDescription: [{ required: true, message: "权限描述不能为空", trigger: "blur", },],
        functionPermission: [{ required: true, message: "用户权限不能为空", trigger: "change", },],
      },
      // 分页
      total:110,
      pageSize:11,
      currentPage:1,
    };
  },
  created(){
    this.getTableData();
  },
  methods:{
    getTableData(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.tableData = [{
          id:1,
          roleName: "高级管理员",
          permissionDescription: "可查看编辑系统内全部数据",
          time:"2022-03-02",
          roleCount:5,
        },{
          id:2,
          roleName: "普通管理员",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:2,
        },{
          id:3,
          roleName: "访客",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:30,
        },{
          id:4,
          roleName: "高级管理员",
          permissionDescription: "可查看编辑系统内全部数据",
          time:"2022-03-02",
          roleCount:5,
        },{
          id:5,
          roleName: "普通管理员",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:2,
        },{
          id:6,
          roleName: "访客",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:30,
        },{
          id:7,
          roleName: "高级管理员",
          permissionDescription: "可查看编辑系统内全部数据",
          time:"2022-03-02",
          roleCount:5,
        },{
          id:8,
          roleName: "普通管理员",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:2,
        },{
          id:9,
          roleName: "访客",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:30,
        },{
          id:10,
          roleName: "高级管理员",
          permissionDescription: "可查看编辑系统内全部数据",
          time:"2022-03-02",
          roleCount:5,
        },{
          id:11,
          roleName: "普通管理员",
          permissionDescription: "用户权限描述文字",
          time:"2022-03-02",
          roleCount:2,
        },];
    },
    // 全选
    handleCheckAllChange(val,item,index) {
        let checked = item.children.map((item) => item.label);
        this.checkedCities[index] = val ? checked : [];
        this.roleList[index].isIndeterminate = false;
      },
    // 单选
    handleCheckedCitiesChange(arr,item,index) {
      let checkedCount = arr.length;
      let allCount = item.children.length;
      this.roleList[index].checkedAll = checkedCount === allCount;
      this.roleList[index].isIndeterminate = checkedCount > 0 && checkedCount < allCount;
    },
    // 分页
    handleCurrentChange(val){
      this.currentPage = val;
      // let params = {
      //   currentPage:this.currentPage,
      //   pageSize:this.pageSize,
      // }
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
    },
    // 查询
    search(){
      // 调用接口查询，拿到结果给表格
      console.log("查询");
      // let params = {
      //   nameOrRole:this.nameOrRole,
      // };
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
    },
    // 删除用户
    async deleteRole({id,}) {
      //  提示
      try {
        await this.$confirm("确认删除该角色吗");
        // 只有点击了确定 才能进入到下方
        // await deleteUser(id) // 调用删除接口
        console.log(id);
        // this.getRoleList(); // 重新加载数据
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    // 添加用户
    addRole(){
      this.showRoleDialog = true;
    },
    // 编辑
    handleEdit({id,roleName,permissionDescription,}){
      this.roleInfo = {
        roleName,
        permissionDescription,
        functionPermission:[],
      };
      this.roleId = id;
      this.showRoleDialog = true;
    },
    // 确定
    async isOk(){
      // 两种，一是确定添加角色，二是确定编辑角色
      if(this.userId !== -1){
        // 编辑角色
        try {
          await this.$refs.roleInfo.validate();
          // 调用接口
          // await addEmployee(this.formData) // 编辑角色
          this.$message.success("编辑角色成功！");
      } catch (error) {
        this.$message.error("编辑角色失败~");
      } finally{
        this.isCancel();
      }
      }else{
        // 添加角色
        try {
          await this.$refs.roleInfo.validate();
          // 调用接口
          // await addEmployee(this.formData) // 添加角色
          this.$message.success("添加角色成功！");
      } catch (error) {
        this.$message.error("添加角色失败~");
      } finally{
        this.isCancel();
      }
      }
    },
    // 取消
    isCancel(){
      this.roleInfo = {
        roleName:"",
        permissionDescription:"",
        functionPermission:[],
      };
      // this.$refs.roleInfo.resetFields(); // 重置校验结果
      this.showRoleDialog = false;
      this.roleId = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.user{
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    // border-bottom: 1px solid #333;
    .header-left{
      display: flex;
      width: 900px;
      .input{
        width: 270px;
        margin-right: 30px;
      }
      
    }
  }
  .table{
    width: 100%;
    height: 575px;
    margin-bottom: 10px;
    .reset,.edit,.delete{
      color:rgb(3, 167, 240);
      cursor: pointer;
    }
    .edit{
      margin: 0 20px;
    }
    .delete{
      color:orange;
    }
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
  }
  .permission{
    height: 290px;
  }
}
</style>