<template>
  <!-- 面包屑 -->
  <el-breadcrumb
    class="breadcrumb-col"
    separator-class="el-icon-arrow-right"
  >
    <el-breadcrumb-item
      v-for="item in breadList"
      :key="item.name"
    >
      <a :href="isSkip(item.path)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    'name': 'Breadcrumb',
    data() {
        return {
            'breadList': []
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            this.breadList = this.$route.matched.filter(item => item.name)
        },
        isSkip(v) {
            return v ? 'javascript:;' : v
        }
    }
}
</script>
<style lang="sass" scoped>
    .breadcrumb-col{
        background: #fff;
        color:#565656;
        font-weight: 600;
        margin-left:50px;
    }
</style>