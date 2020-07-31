function buqi(num){
    var a=num<10?'0'+num:num;
    return a;
}
var vm = new Vue({
    el:"#app",
    mixins: [userInfo],
    data:{
        list:[],
        contentList:[],
        pingbi:[{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'}],

        headurl:''

    },
    mounted:function(){
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.order_getList();
//   	     	     this.getAttention();
            this.headurl=window.sessionStorage.getItem('header');
        }
    },
    mixins: [userInfo],
    methods:{
        pingbiScore:function(item){
            var dom="";
            if(item._value){
                for(var i=0;i<item._value;i++){
                    dom+='<i class="material-icons"  >star</i>'
                }

            }
            return dom;
        },
        getYmd: function(time) {
            if(time) {
                var date = new Date(parseInt(time));
                return date.getFullYear() + '.' + buqi((date.getMonth() + 1)) + '.' + buqi(date.getDate())
            } else {
                return "暂无"
            }
        },
        //转换类型
        changeType:function(item){
            var arr=['硬件设备','技术服务','数字媒体','电子信息','实习生','社区培训','参观交流','场地'];

            var a = arr[item.type];
            console.log(item.type);
            console.log(a);
            return a;
        },
        changeState:function(state){
            var arr=['已关闭','已创建','进行中','已完成'];
            var arr1=['已拒绝','已创建','进行中','已同意'];
//     	     		console.log(state)
            if(state==0||state==7){
                var a = arr1[parseInt(state)];
            }else {
                 var a = arr[parseInt(state)];
            }

//     	     		  console.log(a)
            return a;
        },
        //获取订单的详细信息
        getOrderDetail:function(cotent){
            var a= JSON.parse(cotent);
            var b= a.json;
            return b;
        },
        order_getList:function(){
            var that = this;
            //获取订单
            var params={
                page:0,
                size:10000,
                user_id:parseInt(sessionStorage.getItem('user_id'))
            }
            mui.showLoading("正在加载..","div");
            order_getList({
                data:params,
                success:function(data){
                    that.list = data.data.list;
                    that.getAttention();
                }
            })
        },
        //查看详情
        details:function (item,index) {
            sessionStorage.NowDetail=JSON.stringify(this.list[index]);
            if(item.type==6){
                mui.openWindow({
                    url: 'OrderForLookSpeak.html',
                    id: 'OrderForLookSpeak.html'
                });
            }else{
                mui.openWindow({
                    url: 'OrderDetail.html',
                    id: 'OrderDetail'
                });
            }

        },
        //跳转学生详情
        //查看详情
        detailsStudent: function(index) {
            sessionStorage.NowDetail = JSON.stringify(this.contentList[index]);
            mui.openWindow({
                url: '../person_output_5/student_detail.html',
                id: '../person_output_5/student_detail'
            });
        },
        //处理type为6（参观交流的数据）
        showType6:function(cotent){
            var cotent = JSON.parse(cotent);
            var a = cotent.title;
            return a;
        },
        //获取已关注的学生
        getAttention:function(){
            var that = this;
            var params={
                user_id:parseInt(sessionStorage.getItem('user_id')),   //用户id
                page:0,
                size:100
            }
            getAttention({
                data:params,
                success:function(result){
                    var data=result.data;
                    for(var i=0;i<data.length;i++ ){
                        var student_json = JSON.parse(data[i].student_json);
                        that.contentList.push({
                            id:data[i].student_id,
                            des:data[i].des,
                            tags:data[i].tags,
                            Json:student_json,
                            fcount:data[i].fcount,
                            isAttention:data[i].isAttention
                        })
                    }
                    console.log(that.contentList);
                }
            })
        },
        //填充专业部
        fillMajorGroup:function(data){
            if(data&&data.length>0){
                var dom=""
                if(data[0].group){
                    dom = data[0].group.name
                }
                return dom;
            }
        },
        getFcount:function(item){
            var a=item.isAttention==1?'已关注':'关注'
            return a;
        },
        //转化特长
        changeLong:function(tags){
            var arr = tags.split('-');
            return arr;
        }

    }
})