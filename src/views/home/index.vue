<template>
  <div id="home_chart" :style="{width: '100%', height: '500px'}"></div>
</template>
<style lang="scss" scoped>
</style>
<script>
import chartDown from '~/utils/chart'
  export default {
    data() {
      return {
      }
    },
    created() {},
    mounted() {
        chartDown.initChart()
    },
    methods: {

    }
  }

</script>
