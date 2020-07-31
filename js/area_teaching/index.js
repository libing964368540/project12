function buqi(num){
    var a=num<10?'0'+num:num;
    return a;
}
const strongResources = new Vue({
    el:'#strongResources',
    mixins: [userInfo],
    data:{
        iscur:0,
        title:'社区培训',
        btnText:'查看',
        typeList:['开放预约','即将开始','往期回顾'],
        contentList:[],
        state:2
    },
    mounted:function () {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            this.area_teachGet()
        }
    },
    methods:{
        //获取社区培训
        area_teachGet:function(){
            var that = this;
            var params={
                page:0,
                size:100,
                state:this.state
            }
            mui.showLoading("正在加载..","div");
            area_teachGet({
                data:params,
                success:function(result){
                    var data = result.data;
                    that.contentList = data;
                }
            })
        },
        getYmd: function(time) {
            if(time) {
                var date = new Date(parseInt(time));
                return date.getFullYear() + '-' + buqi((date.getMonth() + 1)) + '-' + buqi(date.getDate())
            } else {
                return "暂无"
            }

        },
        //切换类型
        switchType:function (index) {
            this.iscur = index;
            var arr=[2,1,0];
            this.state= arr[index];
            this.area_teachGet()
        },
        //查看详情
        details:function (index) {
            sessionStorage.NowDetail=JSON.stringify(this.contentList[index]);
            mui.openWindow({
                url: 'details.html',
                id: 'details'
            });
        }
    }
})