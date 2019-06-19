<template>
  <el-container class="frame-col">
    <el-aside>
      <el-menu :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">
              选项1
            </el-menu-item>
            <el-menu-item index="1-2">
              选项2
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">
              选项3
            </el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">
              选项1
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu" />
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          disabled
        >
          <i class="el-icon-document" />
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting" />
          <span slot="title">导航四</span>
        </el-menu-item>
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
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-setting" /> 王小虎
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
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
import Breadcrumb from '~/components/breadcrumb'
export default {
    "components": {
        Breadcrumb
    },
    data () {
        return {
            "isCollapse": false
        }
    }
}
</script>
