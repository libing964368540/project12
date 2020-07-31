var set_before = new Vue({
    el:'#set_before',
    data:{
        need:'',
        tels:'',
        Isneed:false,
        Istels:false,
        type:0,
        title:''
    },
    mixins: [userInfo],
    mounted:function () {
        var arr=['预约硬件','预约场地'];
            document.getElementsByTagName('title')[0].innerHTML = arr[Number(sessionStorage.index)];
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.title = arr[Number(sessionStorage.index)]
        }
    },
    methods:{
        submit:function () {
            var that= this;
            var NowDetail=JSON.parse(sessionStorage.NowDetail);
            NowDetail.rich_text=null;
            this.type= Number(sessionStorage.index)>0?7:0
            if(!this.need){this.Isneed=true; mui.toast('请填写您的需求');return}
            if(!this.tels){this.Istels=true; mui.toast('请输入电话号码');return}
            if(this.tels.length!=11){ mui.toast('电话号码格式不正确');return}
            var obj={
                need:this.need,
                tels:this.tels,
                json:NowDetail
            }
            var params={
                user_id:parseInt(sessionStorage.getItem('user_id')),  //用户需求
                type:this.type,//技术服务
                state:1,//
                cotent:JSON.stringify(obj),
                target_id:NowDetail.id
            }
            mui.showLoading("提交中..","div");
            order_create({
                data:params,
                success:function(result){
                    mui.toast('预约成功');
                    that.need="",
                        that.tels=""
                }
            })

        },
        IsneedActive:function () {
            this.Isneed=false;
        },
        IstelsActive:function () {
            this.Istels=false;
        }
    }
})