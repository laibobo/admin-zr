<template>
  <div>
    <!--角色管理-->
    <section class="filter-container">
      <el-row :gutter="10">
        <el-col :xs="10" :sm="6" :md="3">
          <el-input v-model="queryForm.roleName" placeholder="角色名称" clearable></el-input>
        </el-col>
        <el-col class="btn-group">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button plain type="primary" v-show="getBtnAuth.indexOf('add') > -1" @click="handleAddRole">新增</el-button>
        </el-col>
      </el-row>
    </section>
    <el-table :data="tableData" v-loading="loading" style="width:100%;">
      <el-table-column label="序号" type="index" width="100">
      </el-table-column>
      <el-table-column label="角色名称" sortable prop="Name" />      
      <el-table-column label="编码" sortable prop="Code" />
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleEditRole(scope.row)">编辑</el-button>          
          <el-button type="danger" size="mini" @click="handleDeleteRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :config="{
      'currentPage':queryForm.current,
      'pageSize':queryForm.size,
      'total':total,
      'currentPageChanged':handleCurrentPageChanged,
      'pageSizeChanged':handlePageSizeChanged}">
    </pagination>
    <el-dialog 
      :title="roleDialogTitle"
      width="30%"
      :visible.sync="roleInfoDialog">
      <el-form
        :model="roleForm"
        :rules="roleFormRules"
        ref="role-form"
        label-width="100px">
        <el-form-item label="角色名称" prop="Name">
          <el-input type="text" placeholder="请输入角色名称" v-model="roleForm.Name" clearable></el-input>
        </el-form-item>
         <el-form-item label="角色编码" prop="Code">
          <el-input type="text" placeholder="请输入角色编码" v-model="roleForm.Code" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="submitRoleForm">提交</el-button>
          <el-button @click="resetForm('role-form')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import '~/assets/icons/svg/file.svg'
  import {
    getRoleList,
    deleteRole,
    addRole,
    updateRole
  } from '~/api/role'
  import {
    getPageBtns
  } from '~/utils/auth'
  import {
    delayTime
  } from '~/utils/index'

  export default {
    data() {
      return {
        isUpdateOper:false,
        roleDialogTitle:'',
        roleFormRules:{
          Name:[
            { required:true,message:'请输入角色名称',trigger:'blur' }
          ],
          Code:[
            { required:true,message:'请输入角色编码',trigger:'blur' }
          ]
        },
        roleForm:{
          Id:null,
          Name:'',
          Code:''
        },
        roleInfoDialog:false,
        loading: true,
        tableData: [],
        queryForm: {
          roleName: '',
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
      this.getRoleList()
    },
    methods: {
      //根据条件获取角色数据集合
      async getRoleList() {
        this.loading = true
        try {
          const resp = await getRoleList(this.queryForm)
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
          this.$alertWarning('“角色数据列表数据”接口异常！请联系平台管理人员')
        }
      },
      //删除角色
      async deleteRole(params){
        const loading = this.$loading({
          text: '处理中，请稍等'
        })
        const id = params.Id
        try {
          const resp = await deleteRole({id})
          loading.close()
          if (resp.status === 1) {
            this.$alertSuccess(resp.msg)
            this.handleQuery()
          } else {
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('删除角色接口异常：', error)
          this.$alertWarning('删除角色接口异常！请联系平台管理人员')
        }
      },
      //添加角色
      async addRole(loading){
        try {
          const resp = await addRole(this.roleForm)
          loading.close()
          if(resp.status === 1){
              this.roleInfoDialog = false
              this.handleQuery()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('添加角色接口异常：',error)
          this.$alertWarning('添加角色接口异常！请联系平台管理人员')
        }
      },
      //编辑角色
      async editRole(loading){
        try {
          const resp = await updateRole(this.roleForm)
          loading.close()
          if(resp.status === 1){
              this.roleInfoDialog = false
              this.handleQuery()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('编辑角色接口异常：',error)
          this.$alertWarning('编辑角色接口异常！请联系平台管理人员')
        }
      },
      //添加/编辑 角色信息
      submitRoleForm(){
       this.$refs['role-form'].validate((valid) => {
          if (valid) {
             this.$confirm(`确认提交吗？`).then(_ => {
                const loading = this.$loading({
                  text: '处理中，请稍等'
                })
                if(this.isUpdateOper){
                  this.editRole(loading)
                }else{
                  this.addRole(loading)
                }
            }).catch(_ => {})
          } 
        })
      },
      handleEditRole(params){
        this.roleForm.Id = params.Id
        this.roleForm.Name = params.Name
        this.roleForm.Code = params.Code

        this.isUpdateOper = true
        this.roleInfoDialog = true
        this.roleDialogTitle = '编辑角色'
      },
      handleDeleteRole(params){
        this.$confirm(`确认删除该角色吗？`).then(_ => {
          this.deleteRole(params)
        }).catch(_ => {})
      },
      handleAddRole(){
        this.isUpdateOper = false
        this.roleInfoDialog = true
        this.roleForm = {}
        this.roleDialogTitle = '添加角色'
      },
      handleQuery(current = 1) {
        this.current = current
        this.getRoleList()
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
