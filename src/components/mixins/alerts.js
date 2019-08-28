export default {
   methods: {
        $alerts(msg, options) {
            let opt = Object.assign({
                type: 'warning',
                showClose: false,
                customClass: 'b-alerts',
                center: true
            }, options)
            this.$alert(msg, opt)
        }
    }
}