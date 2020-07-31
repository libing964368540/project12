const app = new Vue({
    el:"#app",
    mixins: [userInfo],
    data:{
        title:'资源服务丁兰小镇',
        bannerList:[
            {view:'view/bannerS.html',img:'img/banner.jpg'},
            {view:'view/bannerS.html',img:'img/banner.jpg'}
        ],
        moduleList:[
            {name:'硬件资源',back:'#e0e0d1',iconf:'#icon-xiangmu'},
            {name:'技术服务',back:'#e0995e',iconf:'#icon-keji'},
            {name:'人才输送',back:'#c75c5c',iconf:'#icon-xingxing'},
            {name:'社区培训',back:'#77b3d4',iconf:'#icon-gonggao'},
            {name:'参观交流',back:'#76c2af',iconf:'#icon-dingwei'}
        ],
        pageList:[
            {id:'strong_Resources',view:'view/strong_Resources_5/index.html'},
            {id:'kill_service/index',view:'view/Skill_service_5/index.html'},
            {id:'person_output',view:'view/person_output_5/index.html'},
            {id:'area_teaching',view:'view/area_teaching_5/index.html'},
            {id:'look_speaking',view:'view/look_speaking_5/index.html'}
        ],
        headurl:'img/head1.png'
    },
    mounted:function(){
        window.sessionStorage.setItem('user_id',1837);
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode();
            this.headurl = window.sessionStorage.getItem('header');
        } else {
//              	   if(window.sessionStorage.getItem('header')){
            this.headurl = window.sessionStorage.getItem('header');
//              	}
            // 别的业务逻辑
        }
    },
    methods:{
        //跳转页面
        showPage:function (index) {
            if(!window.sessionStorage.getItem('user_id')){
                this.getCode();
                return;
            }
            const that=this;
            mui.openWindow({
                url: that.pageList[index].view,
                id:that.pageList[index].view.id
            });
        },
        //跳转我的界面预约
        showMyOrder:function () {
            if(!window.sessionStorage.getItem('user_id')){
                this.getCode();
                return;
            }
            mui.openWindow({
                url:'view/MyOrder_5/MyOrder.html',
                id:'view/MyOrder_5/MyOrder.html'
            });
        }
    }
})