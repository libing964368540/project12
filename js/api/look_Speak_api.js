/*
 *获取参观交流的接口
 *
 */
function look_SpeakGet(opt) {
    req({
        url: '/communication/gets.do',
        data: opt.data,
        apiName: '获取参观交流的接口',
        success: function(data) {
            opt.success(data);
        }
    })
}