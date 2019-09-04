export default {
   methods: {
        $alerts(msg, options,type = 'warning') {
            const opts = Object.assign({
                showClose: false,
                customClass: 'b-alerts',
                center: true
            }, options, {type})
            this.$alert(msg, opts)
        },
        $alertError(msg,options){
            this.$alerts(msg,options,'error')
        },
        $alertSuccess(msg,options){
            this.$alerts(msg,options,'success')
        },
        $alertWarning(msg,options){
            this.$alerts(msg,options)
        },
        $alertInfo(msg,options){
            this.$alerts(msg,options,'info')
        },
        //重置表单
        resetForm(formName){
            this.$refs[formName].resetFields()
        }
    }
}