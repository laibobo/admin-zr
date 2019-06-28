<template>
  <el-container class="frame-col">
    <el-aside>
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="false"
          :collapse-transition="true"
          :router="true"
        >
          <menu-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :is-nest="false"
            :base-path="route.path"
          />
        </el-menu>
    </el-aside>
     <el-container>
      <el-header>
        <span
          v-show="!isCollapse"
          class="i-sh"
          @click="isCollapse = true"
        ><i class="el-icon-s-fold" /></span>
        <span
          v-show="isCollapse"
          class="i-sh"
          @click="isCollapse = false"
        >
          <i class="el-icon-s-unfold" />
        </span>
        <breadcrumb />
        <div class="right-info">
          <el-dropdown  @command="handleCommandHeaderRight">
            <span class="el-dropdown-link">
              <i class="el-icon-setting" />王小虎
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="sass" scoped>
    .frame-col {
        position: absolute;
        width: 100%;
        height: 100%;
        /deep/.el-aside {
            width: auto !important;
            background-color: #0A7768;
            .el-menu {
                background-color: #0A7768;
                background-color: initial;
                border-right: none;
                width: 200px;
                &.el-menu--collapse {
                    width: 64px;
                }
                .el-menu-item-group {
                    .el-menu-item-group__title {
                        color: #EDF0F5;
                        font-weight: 600;
                        font-size: 16px;
                    }
                }
                .el-menu-item {
                    color: #EDF0F5;
                    &.is-active,
                    &:hover,
                    &:focus {
                        background-color: #20B2AA;
                        font-weight: 600;
                        color: #fff;
                    }
                }
                .el-submenu__title {
                    color: #EDF0F5;
                    &:hover,
                    &:focus {
                        background-color: #20B2AA;
                        font-weight: 600;
                        color: #fff;
                    }
                    >i {
                        color: #EDF0F5;
                    }
                }
            }
        }
        /deep/.el-header {
            height: 50px !important;
            display: flex;
            align-items: center;
            background-color: #fff;
            font-size: 14px;
            color: #42b983;
            font-weight: 600;
            box-shadow: 0px 1px 2px #ccc;
            span[aria-current="page"]{
                a{
                    text-decoration:none
                }
            }
            .i-sh {
                font-size: 20px;
                cursor: pointer;
                color: #000;
            }
            .right-info {
                position: absolute;
                right: 30px;
                >.el-dropdown {
                    color: #42b983;
                    font-weight: 600;
                }
            }
        }
        /deep/.el-main {
            background: #fff;
            margin-top: 3px;
            pading:0 20px;
        }
    }
</style>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '~/components/breadcrumb'
import MenuItem from './components/sidebar/menu-item.vue'
export default {
  components: { Breadcrumb,MenuItem },
  data() {
    return {
      isCollapse:false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // variables() {
    //   return variables
    // }
  },
  methods:{
    handleCommandHeaderRight(command){
      if(command === 'logout'){
        this.logout()
      }
    },
    logout(){
       this.$store.dispatch('logout').then(()=> {
         this.$router.push({ path: '/login'})
       }).catch(err=>{
         this.$notify({
           title:'退出系统失败！',
           message: err,
           type: 'error',
           duration: 0
         })
       })
    }
  }
}
</script>
