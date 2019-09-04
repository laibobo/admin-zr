import Vue from 'vue'
import router from '~/router'
import Element from 'element-ui'
import store from './store'

import '~/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '~/assets/styles/alerts.scss'
import '~/assets/icons/iconfont.js'
import '~/permission.js'

import IconSvg from '~/components/icon-svg'
import Pagination from '~/components/pagination'

import mixin from '~/components/mixins/mixin.js'

import '../mock/index'
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, { rABS: false })

Vue.component('icon-svg', IconSvg)
const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

Vue.component('Pagination', Pagination)
Vue.use(Element)
Vue.config.productionTip = false

Vue.mixin(mixin)

new Vue({
    el: '#app',
    router,
    store
})