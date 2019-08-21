<template>
  <div>
    <!-- <icon-svg icon-class="shichangbu" />
    <icon-svg icon-class="file" /> -->
    <section class="filter-container">
        <el-input
          class="w-lg"
          v-model="queryForm.userName"
          placeholder="用户名" clearable></el-input>
        <el-select v-model="queryForm.sex" placeholder="性别" clearable>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
        <el-select v-model="queryForm.status" placeholder="状态" clearable>
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
        <el-button plain type="primary" @click="query">查询</el-button>
        <el-button plain type="primary" v-show="getBtnAuth.indexOf('add') > -1">新增</el-button>
    </section>
    <el-table
      :data="tableData"
      :default-sort = "{prop: 'age', order: 'enabled'}"
      style="width:100%;">
      <el-table-column
        label="用户名"
        sortable
        prop="userName" />
      <el-table-column
        label="年龄"
        sortable
        prop="age" />
      <el-table-column
        label="性别"
        sortable
        prop="sex" />
      <el-table-column
        label="头像"
        prop="portrait">
        <template slot-scope="scope">
          <el-image
            style="width:25;heigh:25px;"
            fit="cover"
            :src="scope.row.portrait"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        sortable
        prop="enabled">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enabled === '启用'? 'success':'danger'">{{ scope.row.enabled }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button v-show="getBtnAuth.indexOf('look') > -1" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button v-show="getBtnAuth.indexOf('edit') > -1" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :config="{
      'currentPage':queryForm.currentPage,
      'pageSize':queryForm.pageSize,
      'total':queryForm.total,
      'currentPageChanged':handleCurrentPageChanged,
      'pageSizeChanged':handlePageSizeChanged}">
    </pagination>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
import '~/assets/icons/svg/file.svg'
import { getUserList,testUser } from '~/api/user'
import { getPageBtns } from '~/utils/auth'

export default {
  data(){
    return {
      tableData:[],
      queryForm:{
        userName:'',
        currentPage:1,
        pageSize:10,
        total:0
      }
    }
  },
  computed:{
    getBtnAuth(){
      return getPageBtns()
    }
  },
  created(){
    this.getUserList()
    this.testUser()
  },
  methods:{
    async testUser(){
      const d = await testUser({id:1})
    },
    async getUserList(){
      const { data } = await getUserList(this.queryForm)
      this.tableData = data.list
      this.queryForm.total = data.total
    },
    query(){
      this.currentPage = 1
      this.getUserList()
    },
    handleCurrentPageChanged(){
      this.query()
    },
    handlePageSizeChanged(ps){
      this.pageSize = ps
      this.query()
    }
  }
}
</script>
