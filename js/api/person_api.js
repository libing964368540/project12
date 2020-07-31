/*
 *获取人才名单
 * */
function person_OutGet(opt) {
    req({
        url: '/student/gets.do',
        data: opt.data,
        apiName: '获取学生名单',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 *关注学生
 *
 */
function followStudent(opt){
	 req({
        url: '/student/attention.do',
        data: opt.data,
        apiName: '关注学生',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 *获取人才标签
 *
 *
 */
function Get_brush(opt){
	 req({
        url: '/student/getTags.do',
        data: opt.data,
        apiName: '获取人才标签',
        success: function(data) {
            opt.success(data);
        }
    })
}
/*
 *获取学生成绩
 *
 *
 */
function getPerformanceReport(opt){
	 req({
        url: '/student/getdata.do',
        data: opt.data,
        apiName: '获取学生成绩',
        success: function(data) {
            opt.success(data);
        }
    })
}
