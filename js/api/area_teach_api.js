/*
 
 * 获取社区培训接口
 * 
 * */
function area_teachGet(opt) {
    req({
        url: '/train/gets.do',
        data: opt.data,
        apiName: '获取社区培训接口',
        success: function(data) {
            opt.success(data);
        }
    })
}