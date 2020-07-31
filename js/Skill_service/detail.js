var app = new Vue({
    el:"#details",
    mixins: [userInfo],
    data:{
        indexS:0,
        title:'',
        rich_text:""
    },
    mounted:function(){
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            this.indexS= sessionStorage.index;
            var info=JSON.parse(sessionStorage.NowDetail);
            this.title=info.title
            this.rich_text = info.rich_text
            document.getElementsByTagName('title')[0].innerHTML = info.title;
        }
    },
    methods:{
        //跳转预约页面
        change:function () {
            if (this.indexS == 3) {
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
        }
        //
    }
})
