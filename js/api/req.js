var codeSuc = 13; //定义服务器成功响应的code;
function req(opt) {
	opt.url = window.apiurl + opt.url;
	var parmas = opt.data;
//	plus.nativeUI.showWaiting( "拼命加载中..." );
	//输出请求api
	console.log('------------------------------------------------------')
	parmas.st=new Date().getTime();
	var strA = '?';
	for(var i in parmas) {
		strA += i + '=' + parmas[i]+'&';
	}
	console.log(opt.apiName+'-----请求url->'+opt.url+strA);
	mui.ajax({
		url: opt.url,
		data: parmas,
		type: opt.type || 'post',
		timeout: 20000,
		success: function(data) {
			mui.hideLoading()
			// plus.nativeUI.closeWaiting();
			var data = JSON.parse(data);
//			   mui.alert(JSON.stringify(data))
			if(!data.error) {
				console.log(opt.apiName+'成功'+JSON.stringify(data));
				console.log('------------------------------------------------------dd')
				opt.success(data);
			} else {
				console.log(opt.apiName+'失败'+data.message);
				console.log('------------------------------------------------------ss')
//				mui.toast(data.message);
				new fui({
					text: data.message,
					bg:'#FF3939'
				})
				if(opt.error){
				   opt.error(data);
				}
			}
		},
		error:function(xhr,type,errorThrown) {
			mui.hideLoading();
			// plus.nativeUI.closeWaiting();
			if(type != 'timeout') {
				console.log(opt.apiName+'失败'+type);
				console.log('------------------------------------------------------aa');
				new fui({
					text: '连接异常，请稍后重试。',
					bg:'#FF3939'
				})
			}else{
				new fui({
					text: '服务器连接超时，请稍后再试。',
					bg:'#FF3939'
				})
			}
			if(opt.error){
				   opt.error();
			}
		}
	});
}
Array.prototype.indexOf = function(val) { 
for (var i = 0; i < this.length; i++) { 
if (this[i] == val) return i; 
} 
return -1; 
};
Array.prototype.remove = function(val) { 
var index = this.indexOf(val); 
if (index > -1) { 
this.splice(index, 1); 
} 
};


