function PercentPie(option){
    this.backgroundColor = option.backgroundColor||'#fff';
    this.color           = option.color||['#38a8da','#d4effa'];
    this.fontSize        = option.fontSize||12;
    this.domEle          = option.domEle;
    this.value           = option.value;
    this.name            = option.name;
    this.title           = option.title;
}
PercentPie.prototype.init = function(){
    var _that = this;
    var option = {
        backgroundColor:_that.backgroundColor,
        color:_that.color,
        title: {
            text: _that.title,
            top:'3%',
            left:'1%',
            textStyle:{
                color: '#333',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 16,
            }
        },
        series: [{
            name: '来源',
            type: 'pie',
            radius: ['80%', '95%'],
            avoidLabelOverlap: false,
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize: _that.fontSize,
                         fontWeight: 'bold'
                    },
                    formatter:'{b}\n{c}%'
                }
            },
            data: [{
                value: _that.value,
                name: _that.name,
                label:{
                    normal:{
                        show:true
                    }
                }
            },
                {
                    value: 100-_that.value,
                    name: ''
                }
            ]
        }]
    };
    echarts.init(_that.domEle).setOption(option);
};
canvas_echars = (function() {
	var _m = {};
	var self = _m;
	
	//计算百分比
	 _m.Percentage = function (value,total) {
        if(value&&total){
            var num= (total-value+1)/total;
            if(num<1){
                num = Math.floor(num*100)/100;
            }
        }else {
            var num=0;
        }

        return num;
    }
	//重新绘制图标
	_m.clear = function(canvasObj){
		var obj = document.getElementById(canvasObj);　　
		var parentObj = obj.parentNode; //获取div的父对象
		     parentObj.removeChild(obj); //通过div的父对象把它删除
		var Newcanvas = document.createElement('canvas');
		    Newcanvas.id=canvasObj;
		    Newcanvas.width=100;
		    Newcanvas.height=100;
		    Newcanvas.style.margin='0 0 0 10px';
		    parentObj.insertBefore(Newcanvas,parentObj.childNodes[0]);
		
	}
	//通过echars 画出学生饼图
     _m.PercentPie = function (projectPerformanc) {
         const top= self.Percentage(projectPerformanc.top,projectPerformanc.population)||0;
         const top_majorGroup = self.Percentage(projectPerformanc.top_majorGroup,projectPerformanc.population_majorGroup)||0;
         // var top_major = self.Percentage(projectPerformanc.top_major,projectPerformanc.population_major)||0;
         const top_classgrade = self.Percentage(projectPerformanc.top_classgrade,projectPerformanc.population_classgrade)||0;
         const option1 = {
             value:top*100,//百分比,必填
             name:'超过',//必填
             title:'',
             backgroundColor:null,
             color:['#FF4081','#ffd9e6'],
             fontSize:12,           
             domEle:document.getElementById("canvas_top") //必填
         }
         const option2 = {
             value:top_majorGroup*100,//百分比,必填
             name:'超过',//必填
             title:'',
             backgroundColor:null,
             color:['#FF9800','#ffeacc'],
             fontSize:12,
             domEle:document.getElementById("canvas_top_majorGroup") //必填
         }
         const option3 = {
             value:top_classgrade*100,//百分比,必填
             name:'超过',//必填
             title:'',
             backgroundColor:null,
             color:['#8BC34A','#e8f3db'],
             fontSize:12,
             domEle:document.getElementById("canvas_top_classgrade") //必填
         }
         const percentPie1 = new PercentPie(option1);
         const percentPie2 = new PercentPie(option2);
         const percentPie3 = new PercentPie(option3);
         percentPie1.init();
         percentPie2.init();
         percentPie3.init();
         
     }
	return _m;
})();

