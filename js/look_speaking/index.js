function buqi(num){
    var a=num<10?'0'+num:num;
    return a;
}
const lookSpeaking = new Vue({
    el:'#lookSpeaking',
    data:{
        typeList:[
            '参观交流',
            '地点介绍'
        ],
        schoolList:[],
        current:0,
        type:1
    },
    mixins: [userInfo],
    mounted:function () {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            this.look_SpeakGet();// 别的业务逻辑
        }
    },
    methods:{
        getYmd: function(time) {
            if(time) {
                var date = new Date(parseInt(time));
                return date.getFullYear() + '.' + buqi((date.getMonth() + 1)) + '.' + buqi(date.getDate())
            } else {
                return "暂无"
            }
        },
        //获取参观交流的接口
        look_SpeakGet:function(){
            var that = this;
            var params={
                page:0,
                size:100,
                state:1,
                type:this.type
            }
            mui.showLoading("正在加载..","div");
            that.schoolList=[];
            look_SpeakGet({
                data:params,
                success:function(result){
                    var data = result.data;
                    that.schoolList= data;
                }
            })
        },
        //切换地址和学校
        change:function (index) {
            this.current=index;
            this.type=index+1;

            this.look_SpeakGet();
        },
        //跳转预览页面
        jumpSetBefore:function () {
            mui.openWindow({
                url: 'lookForBefore.html',
                id: 'lookForBefore'
            });
        },
        //跳转详情
        jumpDeatils:function (index) {
            sessionStorage.NowDetail=JSON.stringify(this.schoolList[index]);
            mui.openWindow({
                url: 'details.html',
                id: 'details'
            });
        },
        //跳转详情2
        jumpDeatils2:function (index) {
            sessionStorage.NowDetail=JSON.stringify(this.schoolList[index]);
            mui.openWindow({
                url: 'details2.html',
                id: 'details2'
            });
        }

    }
})