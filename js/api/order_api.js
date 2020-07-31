/*
 *有关订单的所有接口 
 *  
 * */
function order_getList(opt){
	 req({
        url: '/order/getsForUserId.do',
        data: opt.data,
        apiName: '获取所有订单',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 * 创建订单 
 * */
function order_create(opt){
	 req({
        url: '/order/create.do',
        data: opt.data,
        apiName: '创建订单',
        success: function(data) {
            opt.success(data);
        }
    })
}
/**
 * 修改订单状态
 *
 */
function order_update(opt){
	 req({
        url: '/order/update.do',
        data: opt.data,
        apiName: '修改订单状态',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 *删除订单 
 * 
 * 
 * */
function order_del(opt){
	 req({
        url: '/order/delete.do',
        data: opt.data,
        apiName: '删除订单',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 *定单评分 
 * 
 * */
function order_evaluate(opt){
	 req({
        url: '/order/evaluate.do',
        data: opt.data,
        apiName: '定单评分',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 * 获取已关注的学生
 * 
 * */
function getAttention(opt){
	 req({
        url: '/student/getAttention.do',
        data: opt.data,
        apiName: '获取已关注的学生',
        success: function(data) {
            opt.success(data);
        }
    })
}

