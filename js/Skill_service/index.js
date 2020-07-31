Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '',
    attempt: 1
});
var strongResources = new Vue({
    el:'#strongResources',
    mixins: [userInfo],
    data:{
        title:'技术服务',
        iscur:0,
        typeList:['软件开发','数字媒体','电子技术','实习生'],
        list:[],
        type:1
    },
    mounted:function () {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            this.get();
            sessionStorage.index=0;
        }
    },
    methods: {
        //切换类型
        switchType: function (index) {
            this.iscur = index;
            sessionStorage.index = this.iscur;
            this.type=index+1;
            this.get();
        },
        //预约跳转
        setBefore: function (index) {
            //存储这条记录的信息
            var obj = this.list[index];
            obj.rich_text=null;
            sessionStorage.NowDetail=JSON.stringify(obj);
            if (this.iscur == 3) {
                mui.openWindow({
                    url: 'set_beforeForStudent.html',
                    id: 'set_beforeForStudent'
                });
            } else {
                mui.openWindow({
                    url: 'set_before.html',
                    id: 'set_before'
                });
            }

        },
        //跳转到详情界面
        JumpDetail: function (index) {
            sessionStorage.NowDetail=JSON.stringify(this.list[index]);
            mui.openWindow({
                url: 'detail.html',
                id: 'detail'
            })
        },
        //获取技术服务页面
        get:function () {
            var that = this;
            var params={
                page:0,
                size:150,
                type:this.type,
                state:1
            }
            mui.showLoading("正在加载..","div");
            skill_Get({
                data:params,
                success:function (result) {
                    var data = result.data;
                    that.list = data;
                }
            })
        }
    }
})