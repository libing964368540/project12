function buqi(num){
    var a=num<10?'0'+num:num;
    return a;
}
var app = new Vue({
    el:"#app",
    data:{
        haveSubmit:false,
        info:null,
        type:'',
        state:'',
        title:'',
        need:'',
        id:'',
        des:'',
        value:0,
        time:'',
        leaveMassage:'',
        pingbi:[{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'},{flag:false,text:'star_border'}]
    },
    mixins: [userInfo],
    mounted:function(){
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.info = JSON.parse(sessionStorage.NowDetail);
            if(this.info.des||this.info._value){
                this.des = this.info.des;
                this.haveSubmit=true;
                for(var i=0;i<this.info._value;i++){
                    this.pingbi[i].flag=true;
                    this.pingbi[i].text='star_rate';
                }
            }
            this.type = this.changeType(this.info.type);
            this.state = this.changeState(this.info.state);
            this.title = this.getOrderDetail(this.info.cotent).title;
            this.need = JSON.parse(this.info.cotent).need;
            this.id = this.info.id;
            this.time= this.getYmd(this.info.time);
            this.leaveMassage=this.info.leaveMessage
        }
    },
    methods:{
        changePingbi:function(index){
            if(this.haveSubmit){
                return;
            }
            for(var i=0;i<this.pingbi.length;i++){
                if(i<=index){
                    this.pingbi[i].flag=true;
                    this.pingbi[i].text='star_rate';
                }else{
                    this.pingbi[i].flag=false;
                    this.pingbi[i].text='star_border';
                }
            }
//			    	if(item.flag){
//			    		item.text='star_border';
//			    	}else{
//			    		item.text='star_rate';
//			    	}
//			    	item.flag=!item.flag;
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
        changeType:function(type){
            var arr=['硬件设备','技术服务','数字媒体','电子信息','实习生','社区培训','参观交流','场地'];
            var a = arr[type];
            return a;
        },
        changeState:function(state){
            var arr=['已关闭','已创建','进行中','已完成'];
            console.log(state)
            var a = arr[parseInt(state)];
            console.log(a)
            return a;
        },
        //获取订单的详细信息
        getOrderDetail:function(cotent){
            var a= JSON.parse(cotent);
            var b= a.json;
            return b;
        },
        submit:function(){
            var that = this;
            if(!this.des){
                mui.toast('请填写评论内容');
                return;
            }
            var arr=[];
            for(var i=0;i<this.pingbi.length;i++){
                if(this.pingbi[i].flag){
                    arr.push(this.pingbi[i]);
                }
            }
            this.value=arr.length;
            var params={
                id:this.id,
                des:this.des,
                value:this.value
            }
            mui.showLoading("提交中..","div");
            order_evaluate({
                data:params,
                success:function(result){
                    that.haveSubmit=true;
                    mui.toast('提交成功');
                }
            })
        }
    }
})