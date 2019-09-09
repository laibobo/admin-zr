<template>
  <div>
    <!--用户管理-->
    <section class="filter-container">
      <el-row :gutter="10">
        <el-col :xs="10" :sm="6" :md="3">
          <el-input v-model="handleQueryForm.userName" placeholder="用户名" clearable></el-input>
        </el-col>
        <el-col :xs="10" :sm="6" :md="3">
          <el-select v-model="handleQueryForm.userStatus" placeholder="状态" clearable>
            <el-option label="启用" :value="true"></el-option>
            <el-option label="禁用" :value="false"></el-option>
          </el-select>
        </el-col>
        <el-col class="btn-group">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button plain type="primary" v-show="getBtnAuth.indexOf('add') > -1" @click="handleAddUser">新增</el-button>
        </el-col>
      </el-row>
    </section>
    <el-table :data="tableData" :default-sort="{prop: 'Status', order: 'Status'}" v-loading="loading" style="width:100%;">
      <el-table-column label="序号" type="index" width="100">
      </el-table-column>
      <el-table-column label="用户名" sortable prop="UserName" />
      <el-table-column label="头像" prop="Photo">
        <template slot-scope="scope">
          <el-image style="width:25;heigh:25px;" fit="cover" :src="scope.row.Photo" v-if="scope.row.Photo"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="Roles">
      </el-table-column>
      <el-table-column label="状态" sortable prop="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status ? 'success':'danger'">{{ scope.row.Status?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">          
          <el-button type="warning" size="mini" @click="handleEditUser(scope.row)">编辑</el-button>
          <el-button
            type="primary"
            size="mini"
            v-show="getBtnAuth.indexOf('look') > -1" 
            @click="handleUpdateUserStatus(scope.row)">{{ scope.row.Status?'禁用':'启用' }}</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :config="{
      'currentPage':handleQueryForm.current,
      'pageSize':handleQueryForm.size,
      'total':total,
      'currentPageChanged':handleCurrentPageChanged,
      'pageSizeChanged':handlePageSizeChanged}">
    </pagination>
    <!-- 新增/编辑用户 -->
    <el-dialog 
      :title="userDialogTitle"
      width="30%"
      :visible.sync="userInfoDialog">
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="user-form"
        label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" placeholder="请输入用户名" v-model="userForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否修改密码" v-if="isUpdateOper">
          <el-switch v-model="isUpdatePwd"></el-switch>
        </el-form-item>
        <el-form-item label="新密码" prop="userPwd" v-if="isUpdatePwd">
          <el-input type="text" placeholder="请输入新密码" v-model="userForm.Pwd" clearable></el-input>
        </el-form-item>
        <el-form-item label="设置角色">
          <el-select v-model="userForm.RoleIds" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="submitUserForm">提交</el-button>
          <el-button @click="resetForm('user-form')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import '~/assets/icons/svg/file.svg'
  import { 
    getRoles
  } from '~/api/role'
  import {
    getUserList,
    updateUserStatus,
    deleteUser,
    addUser,
    updateUser
  } from '~/api/user'
  import {
    getPageBtns
  } from '~/utils/auth'
  import {
    delayTime
  } from '~/utils/index'

  export default {
    data() {
      return {
        roles:[],
        isUpdateOper:false,
        isUpdatePwd:false,
        userDialogTitle:'',
        userFormRules:{
          userName:[
            { required:true,message:'请输入用户名',trigger:'blur' }
          ],
          Pwd:[
            { required:true,message:'请输入新密码',trigger:'blur' }
          ]
        },
        userForm:{
          Id:null,
          userName:'',
          Pwd:''
        },
        userInfoDialog:false,
        loading: true,
        tableData: [],
        handleQueryForm: {
          userName: '',
          userStatus: null,
          current: 1,
          size: 10
        },
        total: 0
      }
    },
    computed: {
      getBtnAuth() {
        return getPageBtns()
      }
    },
    created() {
      this.getUserList()
      this.getRoles()
    },
    methods: {
      async getRoles(){
        try {
          const resp = await getRoles()
          if(resp.status === 1){
            this.roles = resp.data
          }
        } catch (error) {
          console.error('获取角色数据异常：' + error)
        }
      },
      //根据条件获取用户数据集合
      async getUserList() {
        this.loading = true
        try {
          const resp = await getUserList(this.handleQueryForm)
          delayTime().then(_ => {
            this.loading = false
            if (resp.status === 1) {
              const list = resp.data.rows
              list.forEach(item => {
                console.log(item)
                item.Roles = item.Roles.length > 0? item.Roles.join('、') : ''
              })
              this.tableData = list
              this.total = resp.data.total
            } else {
              this.$alertError(resp.msg)
            }
          })
        } catch (error) {
          this.loading = false
          console.error('请求用户数据列表异常：' + error)
          this.$alertWarning('“用户数据列表数据”接口异常！请联系平台管理人员')
        }
      },
      //修改用户状态
      async updateUserStatus(params) {
        const loading = this.$loading({
          text: '处理中，请稍等'
        })
        const p = {
          Id: params.Id,
          Status: !params.Status
        }
        try {
          const reps = await updateUserStatus(p)
          loading.close()
          if (reps.status === 1) {
            this.$alertSuccess(reps.msg)
            this.handleQuery()
          } else {
            this.$alertError(reps.msg)
          }
        } catch (error) {
          loading.close()
          console.error('修改用户状态接口异常：', error)
          this.$alertWarning('修改用户状态接口异常！请联系平台管理人员')
        }
      },
      //删除用户
      async deleteUser(params){
        const loading = this.$loading({
          text: '处理中，请稍等'
        })
        const id = params.Id
        try {
          const resp = await deleteUser({id})
          loading.close()
          if (resp.status === 1) {
            this.$alertSuccess(resp.msg)
            this.handleQuery()
          } else {
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('删除用户接口异常：', error)
          this.$alertWarning('删除用户接口异常！请联系平台管理人员')
        }
      },
      //添加用户
      async addUser(loading){
        try {
          const resp = await addUser(this.userForm)
          loading.close()
          if(resp.status === 1){
              this.userInfoDialog = false
              this.handleQuery()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('添加用户接口异常：',error)
          this.$alertWarning('添加用户接口异常！请联系平台管理人员')
        }
      },
      //编辑用户
      async editUser(loading){
        try {
          const resp = await updateUser(this.userForm)
          loading.close()
          if(resp.status === 1){
              this.userInfoDialog = false
              this.handleQuery()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('编辑用户接口异常：',error)
          this.$alertWarning('编辑用户接口异常！请联系平台管理人员')
        }
      },
      //添加/编辑 用户信息
      submitUserForm(){
       this.$refs['user-form'].validate((valid) => {
          if (valid) {
             this.$confirm(`确认提交吗？`).then(_ => {
                const loading = this.$loading({
                  text: '处理中，请稍等'
                })
                if(this.isUpdateOper){
                  this.editUser(loading)
                }else{
                  this.addUser(loading)
                }
            }).catch(_ => {})
          } 
        })
      },
      handleSetRoles(){
        this.setRolesDialog = true
      },
      handleEditUser(params){
        this.userForm.Id = params.Id
        this.userForm.userName = params.UserName
        this.userForm.RoleIds = params.RoleIds
        this.isUpdateOper = true
        this.userInfoDialog = true
        this.userDialogTitle = '编辑用户'
      },
      handleDeleteUser(params){
        this.$confirm(`确认删除该用户吗？`).then(_ => {
          this.deleteUser(params)
        }).catch(_ => {})
      },
      handleAddUser(){
        this.isUpdateOper = false
        this.userInfoDialog = true
        this.userForm = {}
        this.userDialogTitle = '添加用户'
      },
      handleQuery(current = 1) {
        this.current = current
        this.getUserList()
      },
      handleUpdateUserStatus(params) {
        const txt = params.Status ? '禁用' : '启用'
        this.$confirm(`确认${txt}吗？`).then(_ => {
          this.updateUserStatus(params)
        }).catch(_ => {})
      },
      handleCurrentPageChanged(current) {
        this.handleQuery(current)
      },
      handlePageSizeChanged(ps) {
        this.size = ps
        this.handleQuery()
      }
    }
  }

</script>
