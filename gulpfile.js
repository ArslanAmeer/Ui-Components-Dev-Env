const gulp = require("gulp");
const less = require("gulp-less");
const sourceMap = require("gulp-sourcemaps");
const cleanCss = require("gulp-clean-css");
const minHtml = require("gulp-htmlmin");
const minJs = require("gulp-uglify-es").default;
const minImage = require("gulp-imagemin");
const rename = require("gulp-rename")
const lessAutoPrefix = require("less-plugin-autoprefix");
const browserSync = require("browser-sync").create();

var autoprefix = new lessAutoPrefix({ browsers: ['last 2 versions'] });

// Step - 1 (minify and Compile Tasks)

gulp.task("html-Minify", function(){
    gulp.src("src/*.html")
        .pipe(minHtml({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task("image-Minify", function(){
    gulp.src("src/assets/images/*")
        .pipe(minImage())
        .pipe(gulp.dest("dist/assets/images"))
});

gulp.task("Js-Minify", function(){
    gulp.src("src/assets/js/*.js")
        .pipe(rename("mainscript.min.js"))
        .pipe(sourceMap.init())
        .pipe(minJs())
        .pipe(sourceMap.write('/maps'))
        .pipe(gulp.dest("dist/assets/js"))
        .pipe(browserSync.stream());
});

gulp.task("less", function(){
    gulp.src("src/assets/less/main.less")
        .pipe(rename("main.min.css"))
        .pipe(sourceMap.init())
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(cleanCss())
        .pipe(sourceMap.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browserSync.stream());
});

// Step - 2 (watch and Serve Task)

gulp.task('serve', function(){
    browserSync.init({server: "dist"})
    gulp.watch("src/*.html",["html-Minify"]);
    gulp.watch("src/assets/images/*",["image-Minify"]);
    gulp.watch("src/assets/js/*.js",["Js-Minify"]);
    gulp.watch("src/assets/less/**/*.less",["less"]);
    gulp.watch("dist/*.html").on("change", browserSync.reload);
});

// Step - 3 (Create Default Task)

gulp.task("default", ["html-Minify","image-Minify","Js-Minify","less","serve"])