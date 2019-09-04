<template>
  <div>
    <div class="custom-tree-container">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <div class="block">
        <el-tree
          :data="permissions" 
          show-checkbox 
          node-key="id" 
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false" 
          ref="permission-tree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                添加
              </el-button>
              <el-button type="text" size="mini" @click="() => update(node, data)"  v-if="node.label != '顶级'">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)"  v-if="node.label != '顶级'">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="permission-form"
        :model="form"
        :rules="rules"
        label-width="80px"
        >
        <el-form-item label="上一级">
          <span style="color:red;">{{ ParentName }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input type="text" v-model.trim="form.Name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="Code">
          <el-input type="text" v-model.trim="form.Code" placeholder="请输入编码" clearable></el-input>
        </el-form-item>  
        <el-form-item label="类型">
          <el-select v-model="form.Type" placeholder="请选择类型">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" prop="OrderNumber">
          <el-input-number :min="0" v-model="form.OrderNumber" controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="submitPermissionForm">提交</el-button>
          <el-button @click="resetForm('permission-form')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  .custom-tree-container{
    width: 70%;
    min-width: 600px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 2px 3px 5px #eee;
    .block{
      margin-top: 30px;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
<script>
  import '~/assets/icons/svg/file.svg'
  import {
    getPermissionList,
    deletePermission,
    addPermission,
    updatePermission
  } from '~/api/permission'
  import {
    getPageBtns
  } from '~/utils/auth'
  import {
    delayTime
  } from '~/utils/index'

  let id = 1000;

  export default {
    data() {
      const permission = [{
        id: 0,
        label: '顶级',
        children: []
      }]
      return {
        isUpdateOper:false,
        dialogVisible:false,
        dialogTitle:'',
        filterText:'',
        ParentName:'顶级',
        form:{
          Name:'',
          Code:'',
          Type:1,
          OrderNumber:0,
          ParentId:0,
        },
        permissions: permission,
        rules:{
          Name:[
            { required:true, message: '请输入名称', trigger: 'blur' }
          ],
          Code:[
            { required:true, message: '请输入编码', trigger: 'blur' },
            { validator:(rule,value,callback)=>{
              if(value === ''){
                callback('请输入编码') 
              }else if(/^[A-Za-z]+$/.test(value)){
                callback()
              }else{
                callback('请输入字母格式的编码') 
              }
            }, trigger: 'blur' }
          ],
          OrderNumber:[
            { required: true, message:'序号不能为空', trigger: 'blur' }
          ]
        },
      }
    },
    created(){
      console.log('this:',this)
      this.getPermissionList()
    },
    watch: {
      filterText(val) {
        this.$refs['permission-tree'].filter(val)
      }
    },
    methods: {
      async getPermissionList(){
        try {
          const resp = await getPermissionList()
          if(resp.status === 1){
            this.permissions[0].children = resp.data
          }else{
            this.$alertError('获取权限数据失败！'+ resp.msg)
          }  
        } catch (error) {
          console.error('获取权限数据接口异常：',error)
          this.$alertWarning('获取权限数据接口异常！请联系平台管理人员')
        }
      },
      async addPermission(loading){
        try {
          const resp = await addPermission(this.form)
          loading.close()
          if(resp.status === 1){            
              this.dialogVisible = false
              this.getPermissionList()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('添加权限接口异常：',error)
          this.$alertWarning('添加权限接口异常！请联系平台管理人员')
        }
      },
      async editPermission(loading){
         try {
          const resp = await updatePermission(this.form)
          loading.close()
          if(resp.status === 1){            
              this.dialogVisible = false
              this.getPermissionList()
              this.$alertSuccess(resp.msg)
          }else{
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('编辑权限接口异常：',error)
          this.$alertWarning('编辑权限接口异常！请联系平台管理人员')
        }
      },
      async deletePermission(params){
       const loading = this.$loading({
          text: '处理中，请稍等'
        })
        const id = params.id
        try {
          const resp = await deletePermission({id})
          loading.close()
          if (resp.status === 1) {
            this.$alertSuccess(resp.msg)
            this.getPermissionList()
          } else {
            this.$alertError(resp.msg)
          }
        } catch (error) {
          loading.close()
          console.error('删除权限接口异常：', error)
          this.$alertWarning('删除权限接口异常！请联系平台管理人员')
        }
      },
      //添加/编辑
      submitPermissionForm(){
        this.$refs['permission-form'].validate((valid) => {
            if (valid) {
              this.$confirm(`确认提交吗？`).then(_ => {
                  const loading = this.$loading({
                    text: '处理中，请稍等'
                  })
                  if(this.isUpdateOper){
                    this.editPermission(loading)
                  }else{
                    this.addPermission(loading)
                  }
              }).catch(_ => {})
            } 
          })
      },
      append(data) {
        this.dialogTitle = '新增'
        this.dialogVisible = true
        this.isUpdateOper = false
        this.ParentName = data.label
        this.form = {}
        this.form.ParentId = data.id

      },
      update(node,data){
        const parent = node.parent
        console.log('parent:',parent)
        this.dialogTitle = '编辑'
        this.dialogVisible = true
        this.isUpdateOper = true
        this.form.id = data.id
        this.form.Name = data.label
        this.form.OrderNumber = data.orderNumber
        this.form.Type = data.type
        this.form.ParentId =  parent.data.id
        this.form.Code = data.code
        this.ParentName = parent.data.label || data.label
      },
      remove(node, data) {
         this.$confirm(`确认删除吗？`).then(_ => {
            this.deletePermission(data)
          }).catch(_ => {})
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
  };

</script>
