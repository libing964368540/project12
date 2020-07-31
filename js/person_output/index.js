var xialaNumber = 0;
const strongResources = new Vue({
    el: '#strongResources',
    mixins: [userInfo],
    data: {
        title: '人才输送',
        contentList: [],
        page: 0,
        majorGroupPicker: null,
        tags: '',
        mescroll: null
    },
    mounted: function() {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.Get_brush();
            this.init();
        }
    },
    methods: {
        init: function() {
            var that = this;
            this.mescroll = new MeScroll("mescroll", {
                //第一个参数"mescroll"对应上面布局结构div的id
                //如果下拉刷新是重置列表数据,那么down完全可以不用配置
                down: {
//							callback: that.downCallback //下拉刷新的回调
                },
                up: {
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p>',
                    //上拉加载中的布局
                    htmlNodata: '<p class="upwarp-nodata">没有更多了..</p>',
                    page: {
                        num: 0,
                        size: 10
                    },
                    callback: that.upCallback, //上拉加载的回调
                    empty: {
                        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
                        warpId: 'mediaList', //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
                        icon: null, //图标,默认null
                        tip: "暂无相关数据~", //提示
                        btntext: "", //按钮,默认""
                        btnClick: null, //点击按钮的回调,默认null
                    }
                }
            });

        },
        downCallback: function() {
            this.contentList=[];
            this.mescroll.endErr();
            this.mescroll.resetUpScroll();
        },
        upCallback: function(page) {
            console.log(page.num)
            console.log(page.size);
            var pageNum = page.num - 1;
            this.page = pageNum;
            this.person_OutGet();
        },
        getFcount: function(item) {
            console.log(item.isAttention)
            var a = item.isAttention == 1 ? '已关注' : '关注'
            return a;
        },
        //转化特长
        changeLong: function(tags) {
            var arr = tags.split('-');
            return arr;
        },
        person_OutGet: function() {
            var params = {
                page: this.page,
                size: 10,
                tags: this.tags,
                user_id:sessionStorage.getItem('user_id')            //用户id
            }
            mui.showLoading("正在加载..","div");
            var that = this;
            person_OutGet({
                data: params,
                success: function(result) {
                    if(that.page == 0) {
                        that.contentList = [];
                    }
                    var data = result.data;
                    for(var i = 0; i < data.length; i++) {
                        var student_json = JSON.parse(data[i].student_json);
                        that.contentList.push({
                            id: data[i].student_id,
                            des: data[i].des,
                            tags: data[i].tags,
                            Json: student_json,
                            fcount: data[i].fcount,
                            isAttention: data[i].isAttention
                        })
                    }
                    that.mescroll.endByPage(data.length, 2280);
                    that.mescroll.endBySize(data.length, 228);
                    that.mescroll.endSuccess(data.length, true);
                }

            })
        },
        //填充专业部
        fillMajorGroup: function(data) {
            if(data && data.length > 0) {
                var dom = ""
                if(data[0].group) {
                    dom = data[0].group.name
                }
                return dom;
            }
        },
        //关注学生
        followStudent: function(item) {
            var that = this;
            //      		mui.alert(1);
            var el = event.currentTarget;
            mui.showLoading("正在加载..","div");
            var params = {
                user_id: sessionStorage.getItem('user_id'),   //用户id
                id: item.id
            }
            if(item.isAttention) {
                params.f = 0
            } else {
                params.f = 1
            }
            followStudent({
                data: params,
                success: function(result) {
                    mui.toast('操作成功');
                    if(item.isAttention) {
                        item.isAttention = 0
//								el.innerHTML = "关注";
                    } else {
                        item.isAttention = 1
//								el.innerHTML = "已关注";

                    }

                }
            })
        },
        //刷选功能的的设置
        Get_brush: function() {
            var that = this;
            var params = {};
            Get_brush({
                data: params,
                success: function(data) {
                    that.majorGroupPicker = new mui.PopPicker();
                    var arr = [];
                    //mui 下拉框必须要写个value text 醉了 生成value text数组
                    data.data.forEach(function(item) {
                        arr.push({
                            value: item,
                            text: item
                        })
                    })
                    that.majorGroupPicker.setData(arr);
                }
            })
        },
        showMajorGroupPick: function() {
            var that = this;
            this.majorGroupPicker.show(function(items) {
                that.tags = items[0].value;
                that.page = 0;
                that.downCallback();
            });
        },
        //跳转学生详情
        //查看详情
        details: function(index) {
            sessionStorage.NowDetail = JSON.stringify(this.contentList[index]);
            mui.openWindow({
                url: 'student_detail.html',
                id: 'student_detail'
            });
        }
    }

})
