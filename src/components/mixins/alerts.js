export default {   
    created() {
        console.log(111111111111111)
    },
    methods:{
        $alerts(msg,options){
           let opt = Object.assign({
            type:'warning',
            showClose:false,
            customClass:'b-alerts',
            center:true
           },options)
           console.log(11111111111111)
        //    this.$alert(msg,opt)
        }
    }
} 