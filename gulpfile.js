const {series, src, dest, watch} = require('gulp');
const htmlClean = require('gulp-htmlclean');  //压缩html文件的插件
const less = require('gulp-less');   //压缩css文件的插件
const uglify = require('gulp-uglify');  //压缩js文件的插件
const rename = require('gulp-rename');  //重命名输出文件后缀的插件
const imgMin = require('gulp-imagemin'); //压缩img文件的插件  
//坑： 用npm安装该插件使用会报错   要使用cnpm安装才能使用  
const stripDebug = require('gulp-strip-debug'); //消除输出文件的debug语句的插件
const connect = require('gulp-connect');

const folder = { 
    src : 'src/',
    dest : 'dest/',
}

//处理 文件任务： 返回相应文件的压缩文件
function html() { 
    return src(folder.src + 'html/*')
            .pipe(htmlClean())
            .pipe(dest(folder.dest + 'html/'))
            .pipe(connect.reload());
}
function css() {
    return src(folder.src + 'css/*')
            .pipe(less())
            .pipe(dest(folder.dest + 'css/'))
            .pipe(connect.reload());
}
function js() {
    return src(folder.src + 'js/*')
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(dest(folder.dest + 'js/'))
            .pipe(connect.reload());
}
function image() {
    return src(folder.src + 'images/*')
            .pipe(imgMin())
            .pipe(dest(folder.dest + 'images/'))
}

function server(cb){ //开启一个服务器
    connect.server({
        port:'1573',  //端口
        livereload: true, //自动刷新
    })
    cb()
}

//文件监听
watch(folder.src + 'html/*',function(cb){
    html();
    cb();
})
watch(folder.src + 'css/*',function(cb){
    css();
    cb();
})
watch(folder.src + 'js/*',function(cb){
    js();
    cb();
})

exports.default = series(html, css, js, image, server)