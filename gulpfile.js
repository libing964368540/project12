var gulp = require('gulp'),
    rev = require('gulp-rev'), //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'), //- 路径替换
    clean = require('gulp-clean');//- 清空文件夹，避免资源冗余

var web = {
    srcPath:{
        html:'*.html',
        html2:'view/**/*.html',
        css:'css/*css',
        js:'js/**/*.js',
        lib:'lib/*',
        img:'img/*',
        font:'font/*'
    },
    //发布地址
    releasePath:'dist/'
}
//清空文件夹，避免资源冗余css
gulp.task('cleancss',function(){
    return gulp.src(web.releasePath,{read:false}).pipe(clean());
});
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function() {
    return  gulp.src(web.srcPath.css)
        .pipe(rev())
        .pipe(gulp.dest('dist/css/'))//- 输出文件本地
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function() {
    return gulp.src(web.srcPath.js)
        .pipe(rev())
        .pipe(gulp.dest('dist/js/'))//- 输出文件本地
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});
gulp.task('img', function() {
    return gulp.src(web.srcPath.img)
        .pipe(gulp.dest(web.releasePath+'img/'));
});
gulp.task('font', function() {
    return gulp.src('font/*')
        .pipe(gulp.dest(web.releasePath+'font/'));
});
gulp.task('lib', function() {
    return gulp.src('lib/*')
        .pipe(gulp.dest(web.releasePath+'lib/'));
});
//Html更换css、js文件版本
gulp.task('revHtml', function() {
    return gulp.src(['rev/**/*.json', web.srcPath.html]) /*WEB-INF/views是本地html文件的路径，可自行配置*/
        .pipe(revCollector())
        .pipe(gulp.dest(web.releasePath)); /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
});
gulp.task('revHtml2', function() {
    return gulp.src(['rev/**/*.json', web.srcPath.html2]) /*WEB-INF/views是本地html文件的路径，可自行配置*/
        .pipe(revCollector())
        .pipe(gulp.dest(web.releasePath+'view/')); /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
});
//给js添加版本号
//给图片天剑版本号
gulp.task('default', gulp.series('cleancss','revCss','revJs','img','lib','font','revHtml','revHtml2'))















