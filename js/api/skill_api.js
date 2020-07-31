/*
* 获取技术服务
*
* */
function skill_Get(opt) {
    req({
        url: '/waiter/gets.do',
        data: opt.data,
        apiName: '获取硬件设备',
        success: function(data) {
            opt.success(data);
        }
    })
}