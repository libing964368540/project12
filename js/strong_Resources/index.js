mui.init();
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '',
    attempt: 1
});
const strongResources = new Vue({
    el:'#strongResources',
    mixins: [userInfo],
    data:{
        title:'硬件资源',
        iscur:0,
        typeList:[{name:'设备'},{name:'场地'}],
        contentList:[]
    },
    mounted:function () {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.fixed_toolGet();
        }
    },
    methods:{
        //切换类型
        switchType:function (index) {
            this.iscur = index;
            if(index==0){
                this.fixed_toolGet();
            }else {
                this.fixed_palceGet();
            }
        },
        //获取硬件设备
        fixed_toolGet:function () {
            var that= this;
            var params={
                page:0,
                size:150,
                state:1
            }
            mui.showLoading("正在加载..","div");
            fixed_toolGet({
                data:params,
                success:function (result) {
                    var data= result.data;
                    that.contentList=data;
                }
            });
        },
        //获取硬件场地
        fixed_palceGet:function () {
            var that= this;
            var params={
                page:0,
                size:150,
                state:1
            }
            mui.showLoading("正在加载..","div");
            fixed_palceGet({
                data:params,
                success:function (result) {
                    var data= result.data;
                    that.contentList=data;
                }
            });
        },
        //查看详情界面
        //跳转到详情界面
        JumpDetail: function (index) {
            sessionStorage.NowDetail=JSON.stringify(this.contentList[index]);
            mui.openWindow({
                url: 'detail_Strong.html',
                id: 'detail_Strong'
            })
        },
        //预约硬件设备
        //预约跳转
        setBefore: function (index) {
            sessionStorage.index = this.iscur;
            //存储这条记录的信息
            var obj = this.contentList[index];
            obj.rich_text=null;
            sessionStorage.NowDetail=JSON.stringify(obj);
            mui.openWindow({
                url: 'set_before.html',
                id: 'set_before'
            });

        }
    }
})