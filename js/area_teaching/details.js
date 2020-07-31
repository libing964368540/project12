const app = new Vue({
    el:"#details",
    data:{
        state:0,
        indexS:0,
        title:'就业基本技能培训：PS美工技术（1）',
        time:[
            '2019年4月1日 星期六 14:00-16:00',
            '2019年4月8日 星期日 14:00-16:00'
        ],
        rich_text:'',
        timeJson:[],
        tels:''
    },
    mixins: [userInfo],
    mounted:function(){
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
//          this.indexS= sessionStorage.index;
            var info=JSON.parse(sessionStorage.NowDetail);
            this.state=info.state;
            this.title=info.title
            this.rich_text = info.rich_text;
            this.timeJson = info.timeJson.split(',')
            document.getElementsByTagName('title')[0].innerHTML = '预约'+info.title;
        }
    },
    methods:{
        //跳转页面
        change:function (index) {
            this.indexS = index ;
        },
        //预约提交
        submit:function(){
            var that = this;
            var NowDetail=JSON.parse(sessionStorage.NowDetail);
            NowDetail.rich_text=null;
            if(!this.tels||this.tels.length!==11){mui.toast('请输入正确的手机号'); return}
            var obj={
                need:this.title,
                tels:this.tels,
                json:NowDetail,
                orderTime:this.timeJson[this.indexS],
            }
            var params={
                user_id:parseInt(sessionStorage.getItem('user_id')),
                type:5,//技术服务
                state:1,//
                cotent:JSON.stringify(obj),
                target_id:NowDetail.id
            }
            console.log(params);
            mui.showLoading("提交中..","div");
            order_create({
                data:params,
                success:function(result){
                    mui.toast('预约成功');
                    that.tels = "";
                }
            })
        }
    }
})
