const echarts = require('echarts');
let chartDown = class chartDown {
  constructor() {}

  static getOption() {
    return {
      title: {
        text: '系统用户登录次数月统计'
      },
      tooltip: {},
      xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月", '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {},
      series: [{
        name: '登录次数',
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: '#83bff6'
              }, {
                offset: 0.5,
                color: '#188df0'
              }, {
                offset: 1,
                color: '#188df0'
              }]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: '#2378f7'
              }, {
                offset: 0.7,
                color: '#2378f7'
              }, {
                offset: 1,
                color: '#83bff6'
              }]
            )
          }
        },
        data: [5, 20, 36, 10, 10, 20, 1, 20, 36, 0, 5, 11]
      }]
    }
  }
  static initChart() {
    this.loadingChart(this.getOption(), true)
  }
  static loadingChart(option, isDown = false) {
    const domChat = document.getElementById('home_chart')
    const myChart = echarts.init(domChat, 'walden')
    myChart.setOption(option, true)

    myChart.on('click', _ => {
      echarts.dispose(domChat)

      if (isDown) {
        option.xAxis.data = ['laiwb', 'admin']
        option.series[0].data = [10, 20]
      } else {
        option = this.getOption()
      }
      this.loadingChart(option, !isDown)
    })
  }
}
export default chartDown
