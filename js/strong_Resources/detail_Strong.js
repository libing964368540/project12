var app = new Vue({
    el: "#details",
    mixins: [userInfo],
    data: {
        rich_text: ''
    },
    mounted: function() {
        if(!window.sessionStorage.getItem('user_id')) { // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            //          this.indexS= sessionStorage.index;
            var info = JSON.parse(sessionStorage.NowDetail);

            this.rich_text = info.rich_text;
            document.getElementsByTagName('title')[0].innerHTML = info.title;
        }

    },
    methods: {

    }
})