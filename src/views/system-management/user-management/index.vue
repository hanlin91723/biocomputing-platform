<template>
  <div class="user">
    <div class="header">
      <div class="header-left">
        <el-select v-model="value" placeholder="请选择" class="user-select">
          <el-option v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input class="input" placeholder="请输入用户名/手机号" v-model="nameOrnumber" clearable></el-input>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table :data="tableData" border stripe class="table">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="remarks" label="用户身份备注"></el-table-column>
      <el-table-column prop="time" label="注册时间"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 重置密码 -->
          <el-popconfirm title="确定要重置密码吗？" @confirm="handlePassword(scope.row)">
          <span class="reset" slot="reference">重置密码</span>
          </el-popconfirm>
          <span class="edit" @click="handleEdit(scope.row)">编辑</span>
            <span class="delete" @click="deleteUser(scope.row)">删除</span>
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
    <el-dialog :title="userId==-1?'添加用户':'编辑用户'" :visible="showUserDialog" width="40%" @close="isCancel">
    <el-form label-width="120px" :model="userInfo" :rules="userInfoRules" ref="userInfo">
      <el-form-item label="用户名" prop="userName">
        <el-input placeholder="请输入用户名"  v-model="userInfo.userName"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input  placeholder="请输入手机号" v-model="userInfo.mobile"/>
      </el-form-item>
      <el-form-item label="初始密码" prop="oldPassword" v-if="userId==-1?true:false">
        <el-input placeholder="请输入初始密码" v-model="userInfo.oldPassword"/>
      </el-form-item>
      <el-form-item label="用户身份备注" prop="remarks">
        <el-input placeholder="请输入身份备注" v-model="userInfo.remarks"/>
      </el-form-item>
      <el-form-item label="用户权限" prop="role">
        <el-select placeholder="请选择用户权限" v-model="userInfo.role"/>
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
      roleOptions: [],
      value:"1",
      nameOrnumber:"",
      showUserDialog:false,
      userId:-1,
      userInfo:{
        userName:"",
        mobile:"",
        oldPassword:"",
        remarks:"",
        role:"",
      },
      userInfoRules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur", }, {
          min: 1, max: 4, message: "用户名为1-4位",
        },],
        mobile: [{ required: true, message: "手机号不能为空", trigger: "blur", }, {
          pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur",
        },],
        oldPassword: [{ required: true, message: "初始密码不能为空", trigger: "blur", },
        {pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,18}$/, message: "密码格式不正确", trigger:"blur",},],
        remarks: [{ required: true, message: "用户身份备注不能为空", trigger: "blur", },],
        role: [{ required: true, message: "用户权限不能为空", trigger: "change", },],
      },
      // 分页
      total:110,
      pageSize:11,
      currentPage:1,
    };
  },
  created(){
    this.getTableData();
    this.getRoleOptions();
  },
  methods:{
    getTableData(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.tableData = [{
          id:1,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:2,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:3,
          userName: "芳芳",
          mobile: "13898761234",
          remarks:"访客",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:4,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:5,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:6,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:7,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:8,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:8,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:10,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },{
          id:11,
          userName: "王小虎",
          mobile: "13898761234",
          remarks:"后台管理员",
          time:"2022-09-01  12:12:00",
          role:"普通管理员",
        },];
    },
    getRoleOptions(){
      // this.$axios.get("/construction/projectManager").then(({data,})=>{
      //   console.log(data);
       
      // });
      this.roleOptions = [{
          value: "1",
          label: "全部",
        },{
          value: "2",
          label: "访客",
        },{
          value: "3",
          label: "普通管理员",
        },{
          value: "4",
          label: "高级管理员",
        },{
          value: "5",
          label: "锁定",
        },];
    },
    // 查询
    search(){
      // 调用接口查询，拿到结果给表格
      console.log("查询");
      // let params = {
      //   roleValue:this.value,
      //   nameOrnumber:this.nameOrnumber,
      // };
      // this.$axios.post("/construction/projectManager",params).then(({data,})=>{
      //   console.log(data);
      //   this.tableData = data;
      // });
    },
    // 删除用户
    async deleteUser({id,}) {
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
    // 重置密码
    handlePassword(row){
      this.$axios.post("/reset",{id:row.id,}).then(({data,})=>{
        console.log(data);
      });
      this.$message.success("重置密码成功！");
    },
    // 添加用户
    addUser(){
      this.showUserDialog = true;
    },
    // 编辑
    handleEdit({id,userName,mobile,remarks,role,}){
      this.userInfo = {
        userName,
        mobile,
        remarks,
        role,
      };
      this.userId = id;
      this.showUserDialog = true;
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
    // 确定
    async isOk(){
      // 两种，一是确定添加用户，二是确定编辑用户
      if(this.userId !== -1){
        // 编辑用户
        try {
          await this.$refs.userInfo.validate();
          // 调用接口
          // await addEmployee(this.formData) // 编辑用户
          this.$message.success("编辑用户成功！");
      } catch (error) {
        this.$message.error("编辑用户失败~");
      } finally{
        this.isCancel();
      }
      }else{
        // 添加用户
        try {
          await this.$refs.userInfo.validate();
          // 调用接口
          // await addEmployee(this.formData) // 添加用户
          this.$message.success("添加用户成功！");
      } catch (error) {
        this.$message.error("添加用户失败~");
      } finally{
        this.isCancel();
      }
      }
    },
    // 取消
    isCancel(){
      this.userInfo = {
        userName:"",
        mobile:"",
        oldPassword:"",
        remarks:"",
        role:"",
      };
      this.$refs.userInfo.resetFields(); // 重置校验结果
      this.showUserDialog = false;
      this.userId = -1;
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
        margin: 0 30px;
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
}
</style>