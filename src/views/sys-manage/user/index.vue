<template>
  <div>
    <!-- <icon-svg icon-class="shichangbu" />
    <icon-svg icon-class="file" /> -->
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
    <el-table :data="tableData" :default-sort="{prop: 'age', order: 'enabled'}" v-loading="loading" style="width:100%;">
      <el-table-column label="序号" type="index" width="100">
      </el-table-column>
      <el-table-column label="用户名" sortable prop="UserName" />
      <el-table-column label="头像" prop="Photo">
        <template slot-scope="scope">
          <el-image style="width:25;heigh:25px;" fit="cover" :src="scope.row.Photo" v-if="scope.row.Photo"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable prop="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status ? 'success':'danger'">{{ scope.row.Status?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="warning" size="mini">编辑</el-button>
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
          <el-input type="text" placeholder="请输入用户名" v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="是否修改密码">
          <el-switch v-model="userForm.isUpdatePwd"></el-switch>
        </el-form-item>
        <el-form-item label="新密码" prop="userPwd" v-if="userForm.isUpdatePwd">
          <el-input type="text" placeholder="请输入新密码" v-model="userForm.userPwd"></el-input>
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
    getUserList,
    updateUserStatus,
    deleteUser
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
        userDialogTitle:'',
        userFormRules:{
          userName:[
            { required:true,message:'请输入用户名',trigger:'blur' }
          ],
          userPwd:[
            { required:true,message:'请输入新密码',trigger:'blur' }
          ]
        },
        userForm:{
          userName:'',
          userPwd:'',
          isUpdatePwd:false
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
    },
    methods: {
      //根据条件获取用户数据集合
      async getUserList() {
        this.loading = true
        try {
          const resp = await getUserList(this.handleQueryForm)
          delayTime().then(_ => {
            this.loading = false
            if (resp.status === 1) {
              this.tableData = resp.data.rows
              this.total = resp.data.total
            } else {
              this.$alertError(resp.msg)
            }
          })
        } catch (error) {
          this.loading = false
          console.error('请求异常：' + error)
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
      //添加/编辑 用户信息
      submitUserForm(){
       this.$refs['user-form'].validate((valid) => {
          if (valid) {
            console.log(valid)
          } 
        })
      },
      //重置表单
      resetForm(formName){
        this.$refs[formName].resetFields()
      },
      handleDeleteUser(params){
        this.$confirm(`确认删除该用户吗？`).then(_ => {
          this.deleteUser(params)
        }).catch(_ => {})
      },
      handleAddUser(){
        this.userInfoDialog = true
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
