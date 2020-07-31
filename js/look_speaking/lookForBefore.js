mui.init()
const set_before = new Vue({
    el: '#set_before',
    data: {
        Message: '',
        need: '',
        Num: '',
        tels: '',
        time: '',
        IsMessage: false,
        Isneed: false,
        IsNum: false,
        Istels: false,
        Istime: false,
        dtPicker: null
    },
    mixins: [userInfo],
    mounted: function() {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {

        }
    },
    methods: {
        DtPicker: function() {
            var that=this;
            var dtPicker = new mui.DtPicker({type:'date'});
            dtPicker.show(function(selectItems) {
                console.log(selectItems.y); //{text: "2016",value: 2016}
                console.log(selectItems.m); //{text: "05",value: "05"}
                that.time= selectItems.y.value+'-'+ selectItems.m.value +'-'+selectItems.d.value;
            })


        },
        submit: function() {
            var that = this;
            if(!this.Message) {
                this.IsMessage = true;
                mui.toast('请填写您的信息');
                return
            }
            if(!this.Num) {
                this.IsNum = true;
                mui.toast('请填写交流的人数');
                return
            };
            if(!this.time) {
                this.Istime = true;
                mui.toast('请填写参观交流的时间');
                return
            };
            if(!this.need) {
                this.Isneed = true;
                mui.toast('请填写参观交流的内容');
                return
            };
            if(!this.tels||this.tels.length!=11) {
                this.Istels = true;
                mui.toast('请填写正确格式手机号');
                return
            };
            var obj = {
                need: this.need,
                tels: this.tels,
                Message: this.Message,
                Num: this.Num,
                time: this.time,
                title: this.need
            }
            var params = {
                user_id: parseInt(sessionStorage.getItem('user_id')),
                type: 6, //参观交流
                state: 1, //
                cotent: JSON.stringify(obj),
                target_id:0
            }
            mui.showLoading("提交中..","div");
            order_create({
                data: params,
                success: function(result) {
                    mui.toast('预约成功');
                    that.need = "",
                        that.tels = ""
                    that.Message = ""
                    that.Num = ""
                    that.time = ""
                }
            })
        },
        IstimeActive: function() {
            this.Istime = false;
        },
        IsMessageActive: function() {
            this.IsMessage = false;
        },
        IsneedActive: function() {
            this.Isneed = false;
        },
        IsNumActive: function() {
            this.IsNum = false;
        },
        IstelsActive: function() {
            this.Istels = false;
        }
    }
})