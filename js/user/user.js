var userInfo = {
		data: function() {
		return {
			code: '',
			NoData:'',
			headurl:'img/head1.png'
		}
	},
	methods: {
			getCode() { // 非静默授权，第一次有弹框
				var that =this;
				this.code = ''
				var local = window.location.href // 获取页面url
//              var local = 'http://school.price51.com/SmartTown/index.html';
				var appid = 'wx2c96a93b04efcad0'
				this.code = this.getUrlCode().code // 截取code
				if(this.code == null || this.code === '') { // 如果没有code，则去请求
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
				} else {
					// 你自己的业务逻辑
					
//                mui.alert(this.code);
                    var params = {
                    	code:this.code
                    }
                    this.getName({
                    	data:params,
                    	success:function(data){
                    		that.headurl = data.data.header;
//                  		mui.alert(JSON.stringify(data));
//                  		mui.alert(JSON.stringify(data.data.id));
                    		sessionStorage.setItem('nickname',data.data.nickname) ;
                    		sessionStorage.setItem('header',data.data.header);
                    		sessionStorage.setItem('user_id',data.data.id);
                    		sessionStorage.setItem('username',data.data.username);
                        	if(typeof data.data.id != "number"){
                                that.getCode();
							}
                    	}
                    })
				}
			},
			getUrlCode() { // 截取url中的code方法
				var url = location.search
				this.winUrl = url
				var theRequest = new Object()
				if(url.indexOf("?") != -1) {
					var str = url.substr(1)
					var strs = str.split("&")
					for(var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
					}
				}
				return theRequest
			},
			scrollForBug(){
				 setTimeout(function() {
                     var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                 }, 100);
			},
			//获取用户信息
			getName(opt){
//				 mui.showLoading("正在加载..","div");
				 req({
                      url: '/user/wechat.do',
                     data: opt.data,
                  apiName: '获取用户信息接口',
                   success: function(data) {
                             opt.success(data);
                       }
                    })
			}

		}
	}