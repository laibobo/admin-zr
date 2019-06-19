import Vue from 'vue'
import router from '~/router'
import Element from 'element-ui'

import '~/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '~/assets/icons/iconfont.js'
import '~/permission'

import IconSvg from '~/components/icon-svg'

Vue.component('icon-svg', IconSvg)
const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router
})