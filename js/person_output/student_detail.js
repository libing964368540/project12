Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../../img/timg.jpeg',
    attempt: 1
});

var vm = new Vue({
    el: '#app',
    data: {
        info: {},
        coreProject: {},
        subProject: [],
        scoreSucc: false,
        zan: [],
        dengpao: [],
        rankList:{
            top_rank:'',
            majorGroup_rank:'',
            classgrade_rank:''
        }
    },
    mixins: [userInfo],
    watch: {
        'info.id': function() {
            this.getStudentReport();
        }
    },
    mounted: function() {
        if(!window.sessionStorage.getItem('user_id')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
            this.getCode()
        } else {
            // 别的业务逻辑
            this.plusReady();
        }
    },
    methods: {
        plusReady: function() {
            var that = this;
            that.userInfo();

        },
        getStudentReport: function() {
            if(this.coreProject.statistics){
                this.coreProject.statistics.value="";
            }
            var that = this;
            mui.showLoading("正在加载..","div");
//							plus.nativeUI.showWaiting( "加载中..." )
            getPerformanceReport({
                data: {
                    id: this.info.id
                },
                success: function(data) {
                    var data=JSON.parse(data.data);
                    that.coreProject = data.data.projectPerformanc;
                    that.subProject = data.data.subProjectPerformanc;
                    //图表初始化
                    that.$nextTick(function() {
                        that.chartInit();
//										canvas_echars.render(that.coreProject.statistics);
                        canvas_echars.PercentPie(that.coreProject.statistics);
                    })
                    //灯泡和赞的展示
                    that.getZanAndDengPao();
                    //that.getZanAndDengPao('lastPerformanct','lastWeekZan','lastWeekDengPao');
                    //填充排名的名次
                    const top_rank = that.coreProject.statistics.top?that.coreProject.statistics.top:0;
                    const majorGroup_rank = that.coreProject.statistics.top_majorGroup?that.coreProject.statistics.top_majorGroup:0;
                    const classgrade_rank = that.coreProject.statistics.top_classgrade?that.coreProject.statistics.top_classgrade:0;
                    //that.getZanAndDengPao('lastPerformanct','lastWeekZan','lastWeekDengPao');
                    that.rankList.top_rank=top_rank;
                    that.rankList.majorGroup_rank=majorGroup_rank;
                    that.rankList.classgrade_rank=classgrade_rank;
                }
            })
        },
        userInfo: function() {
            this.info = JSON.parse(sessionStorage.NowDetail).Json;
            console.log(this.info);
            console.log(this.info.accountData.rname)
//							this.info = JSON.parse(plus.storage.getItem('studentDetail'));
        },
        getPhoto: function(item) {
            return window.imgpath2 + item.accountData.photopath;
        },
        showView: function(path) {
            mui.openWindow({
                url: path,
                id: path,
                extras: {
                    name: this.title
                }
            })
        },
        getDengpao: function(item) {
            var fazhi = {
                top: item.statistics.population * 0.9,
                majorGroup: item.statistics.population_majorGroup * 0.9,
                major: item.statistics.population_major * 0.9,
                classgrade: item.statistics.population_classgrade * 0.9
            };
            if(fazhi.top >= item.statistics.top) {
                return {
                    isDengpao: true,
                    name: item.statistics.project_name,
                    type: '全校'
                }
            }
            if(fazhi.majorGroup >= item.statistics.top_majorGroup) {
                return {
                    isDengpao: true,
                    name: item.statistics.project_name,
                    type: '全专业部'
                }
            }
            if(fazhi.top_major >= item.statistics.top_major) {
                return {
                    isDengpao: true,
                    name: item.statistics.project_name,
                    type: '全专业'
                }
            }
            if(fazhi.top_classgrade >= item.statistics.top_classgrade) {
                return {
                    isDengpao: true,
                    name: item.statistics.project_name,
                    type: '全班'
                }
            }
            return {
                isDengpao: false,
            }
        },
        getZanAndDengPao: function() {
            var that = this;
            this.zan = [];
            this.dengpao = [];
            var list = this.subProject;
            list.forEach(function(item) {
                if(item.statistics.top <= 5 || item.statistics.top_major <= 5 || item.statistics.top_majorGroup <= 5 || item.statistics.top_classgrade <= 5) {
                    var type = '';
                    var rank = '';
                    if(item.statistics.top <= 5) {
                        type = '全校';
                        rank = item.statistics.top;
                    } else if(item.statistics.top_major <= 5) {
                        type = '全专业';
                        rank = item.statistics.top_major;
                    }  else if(item.statistics.top_majorGroup <= 5) {
                        type = '全专业部';
                        rank = item.statistics.top_majorGroup;
                    } else if(item.statistics.top_classgrade <= 5) {
                        type = '全班';
                        rank = item.statistics.top_classgrade;
                    }
                    that.zan.push({
                        name: item.statistics.project_name,
                        type: type,
                        rank: rank
                    });
                } else {
                    var status = that.getDengpao(item);
                    if(status.isDengpao) {
                        that.dengpao.push({
                            name: status.name,
                            type: status.type
                        })
                    }
                }
            })
        },
        //echart 获取排名最高分数渲染
        getIndicator: function() {
            var indicator = [];
            this.subProject.forEach(function(item) {
                if(item.statistics.value+100 < 0){
                    indicator.push({
                        name: item.heightStatistics.project_name,
                        max: item.heightStatistics.value === null ? 100 : item.heightStatistics.value < 0 ? 100 : item.heightStatistics.value + 100,
                        min: item.statistics.value+100
                    });
                }else{
                    indicator.push({
                        name: item.heightStatistics.project_name,
                        max: item.heightStatistics.value === null ? 100 : item.heightStatistics.value < 0 ? 100 : item.heightStatistics.value + 100
                    });
                };

            })
            return indicator;
        },
        // echart 获取自己的分数渲染
        getChartMyScore: function() {
            var myScore = [];
            this.subProject.forEach(function(item) {

                myScore.push(item.statistics.value ? item.statistics.value + 100 : 100);

            })
            return myScore;
        },
        getLastWeekDengPaoText: function() {
            if(this.dengpao.length > this.laswWeekDengPao.length) {
                return {
                    type: '增加',
                    num: this.dengpao.length - this.laswWeekDengPao.length
                }
            } else {
                return {
                    type: '减少',
                    num: this.laswWeekDengPao.length - this.dengpao.length
                }
            }
        },
        getLastWeekZanText: function() {
            if(this.zan.length > this.lastWeekZan.length) {
                return {
                    type: '增加',
                    num: this.zan.length - this.lastWeekZan.length
                }
            } else {
                return {
                    type: '减少',
                    num: this.lastWeekZan.length - this.zan.length
                }
            }
        },
        chartInit: function() {
            var chart = echarts.init(document.getElementById('chart'));
            chart.setOption({
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: this.getIndicator()
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: this.getChartMyScore(),
                    }]
                }]
            })
        }
    }
})