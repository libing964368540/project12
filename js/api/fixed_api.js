/*
* 获取设备
* */
function fixed_toolGet(opt) {
    req({
        url: '/device/gets.do',
        data: opt.data,
        apiName: '获取硬件设备',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
* 获取场地
*/
function fixed_palceGet(opt) {
    req({
        url: '/place/gets.do',
        data: opt.data,
        apiName: '获取场地',
        success: function(data) {
            opt.success(data);
        }
    })
}