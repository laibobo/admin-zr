<template>
  <div class="pagination-container" :style="getJustifyContent" v-show="getTotal > 0">
    <el-pagination
      @size-change="pageSizeChanged"
      @current-change="config.currentPageChanged"
      :current-page="config.currentPage"
      :page-size="getPageSize"
      :page-sizes="getPageSizes"
      :total="getTotal"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<style lang="sass"  scoped>
  .pagination-container{
    display: flex;
    flex-direction: row;
    padding:10px 0;
  }
</style>

<script>
/*
  接受一个对象作为初始配置项，例如
  config: {
    currentPage: 1, 必选
    pageSize: 10,
    total: 100,
    currentPageChanged: func, 必选
    pageSizeChanged: func, 必选
    layout: '' //start center end
  }
*/
export default {
  props:{
    config: {
      type: Object,
      required: true
    }
  },
  computed:{
    getTotal(){
      return this.config.total || 0
    },
    getPageSize(){
      return this.config.pageSize || 10
    },
    getPageSizes(){
      return this.config.pageSizes || [10,30,50,100]
    },
    getJustifyContent(){
      let layout = this.config.layout
      let result = 'flex-end'
      if(layout === 'center'){
        result = 'center'
      }else if(layout === 'start'){
        result = 'flex-start'
      }
      return `justify-content:${result}`
    }
  },
  methods:{
    pageSizeChanged(pageSize){
      this.config.currentPage = 1
      if(typeof this.config.pageSizeChanged === 'function'){
        this.config.pageSizeChanged(pageSize)
      }
    }
  }
}
</script>
