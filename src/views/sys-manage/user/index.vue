<template>
  <div>
    <!-- <icon-svg icon-class="shichangbu" />
    <icon-svg icon-class="file" /> -->
    <section class="filter-container">
        <el-input
          class="w-lg"
          v-model="handleQueryForm.userName"
          placeholder="用户名" 
          clearable></el-input>
        <el-select v-model="handleQueryForm.userStatus" placeholder="状态" clearable>
          <el-option label="启用" :value="true"></el-option>
          <el-option label="禁用" :value="false"></el-option>
        </el-select>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button plain type="primary" v-show="getBtnAuth.indexOf('add') > -1">新增</el-button>
    </section>
    <el-table
      :data="tableData"
      :default-sort = "{prop: 'age', order: 'enabled'}"
      v-loading="loading"
      style="width:100%;">
      <el-table-column
        label="序号"
        type="index"
        width="100"
        >
        </el-table-column>
      <el-table-column
        label="用户名"
        sortable
        prop="UserName" />
      <el-table-column
        label="头像"
        prop="Photo">
        <template slot-scope="scope">
          <el-image
            style="width:25;heigh:25px;"
            fit="cover"
            :src="scope.row.Photo" v-if="scope.row.Photo"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        sortable
        prop="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status ? 'success':'danger'">{{ scope.row.Status?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button v-show="getBtnAuth.indexOf('look') > -1" @click="handleUpdateUserStatus(scope.row)" type="text" size="small">{{ scope.row.Status?'禁用':'启用' }}</el-button>
          <el-button v-show="getBtnAuth.indexOf('edit') > -1" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :config="{
      'currentPage':handleQueryForm.current,
      'pageSize':handleQueryForm.size,
      'total':total,
      'currentPageChanged':handleCurrentPageChanged,
      'pageSizeChanged':handlePageSizeChanged}">
    </pagination>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
import '~/assets/icons/svg/file.svg'
import { getUserList,testUser,updateUserStatus } from '~/api/user'
import { getPageBtns } from '~/utils/auth'
import { delayTime } from '~/utils/index'

export default {
  data(){
    return {
      loading:true,
      tableData:[],
      handleQueryForm:{
        userName:'',
        userStatus:null,
        current:1,
        size:10
      },
      total:0
    }
  },
  computed:{
    getBtnAuth(){
      return getPageBtns()
    }
  },
  created(){
    this.getUserList()
  },
  mounted(){
    console.log(this)
  },
  methods:{
    async getUserList(){
      this.loading = true
      try {
        const resp = await getUserList(this.handleQueryForm)
        // this.$alert('提示大城大事的',{
        //   type:'warning',
        //   showClose:false,
        //   center:true,
        //   customClass:'b-alerts'
        // })
        delayTime().then(_=>{
          this.loading = false           
          if(resp.status === 1){
            this.tableData = resp.data.rows
            this.total = resp.data.total
            console.log(this.tableData)
          }else{

          }
        })
      } catch (error) {
        console.error('请求异常：'+ error)
      }
    },
    async updateUserStatus(params){
      const loading = this.$loading({
          lock: true,
          text: '处理中，请稍等',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      })
      const p = {
        Id:params.Id,
        Status:!params.Status
      }
      try {
        const reps = await updateUserStatus(p)
        loading.close()
        if(reps.status === 1){
          alert(reps.msg)
        }else{
          alert(reps.msg)
        }
      } catch (error) {
        loading.close()
        console.log('修改用户状态接口异常：',error)
      }
    },
    handleQuery(current = 1){
      this.current = current
      this.getUserList()
    },
    handleUpdateUserStatus(params){
      const txt = params.Status ? '禁用' : '启用'
      this.$confirm(`确认${txt}吗？`)
          .then(_ => {
            this.updateUserStatus(params)
          }).catch(_ => {})
    },
    handleCurrentPageChanged(current){
      this.handleQuery(current)
    },
    handlePageSizeChanged(ps){
      this.size = ps
      this.handleQuery()
    }
  }
}
</script>
