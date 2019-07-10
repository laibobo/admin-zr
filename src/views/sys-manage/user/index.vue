<template>
  <div>
    <!-- <icon-svg icon-class="shichangbu" />
    <icon-svg icon-class="file" /> -->
    <el-table
      :data="tableData"
      :default-sort = "{prop: 'age', order: 'enabled'}"
      style="width:100%;">
      <el-table-column
        label="用户名"
        prop="userName" />
      <el-table-column
        label="年龄"
        prop="age" />
      <el-table-column
        label="性别"
        prop="sex" />
      <el-table-column
        label="头像"
        prop="portrait">
        <template slot-scope="scope">
          <el-image
            style="width:50;heigh:50px;"
            fit="cover"
            :src="scope.row.portrait"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="enabled">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enabled === '启用'? 'success':'danger'">{{ scope.row.enabled }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
import '~/assets/icons/svg/file.svg'
import { getUserList } from '~/api/user'
export default {
  data(){
    return {
      tableData:[]
    }
  },
  created(){
    this.getUserList()
  },
  methods:{
    async getUserList(){
      const { data } = await getUserList()
      this.tableData = data.list
    }
  }
}
</script>
