<template>
    <el-menu-item  v-if="!item.hidden &&
    (hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren))" 
    :index="resolvePath(onlyOneChild.path)"
    :class="{'submenu-title-noDropdown':!isNest}">
         <icon-svg :icon-class="onlyOneChild.meta.icon"/>
        {{ onlyOneChild.meta.title }}
    </el-menu-item>
    <el-submenu :index="item.path" v-else-if="!item.hidden" ref="subMenu">
        <template slot="title" v-if="item.meta && item.meta.title">
            <icon-svg :icon-class="item.meta && item.meta.icon" />
            <span slot="title">{{item.meta.title}}</span>
        </template>
        <menu-item v-for="child in item.children" 
            :key="child.path" 
            :item="child"
            :is-nest="true"

            class="nest-menu"
            :base-path="resolvePath(child.path)" />
    </el-submenu>
</template>
<script>
    import path from 'path'
    import {
        isExternal
    } from '~/utils/validate'
    export default {        
        name: 'MenuItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data(){
            this.onlyOneChild = null
            return {}
        },
        methods: {
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    }
                    this.onlyOneChild = item
                    return true
                })
                if (showingChildren.length === 1) {
                    return true
                }

                if (showingChildren.length === 0) {
                    this.onlyOneChild = {
                        ...parent,
                        path: '',
                        noShowingChildren: true
                    }
                    return true
                }
                return false
            },
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>