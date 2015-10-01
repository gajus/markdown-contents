var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    Gitdown = require('gitdown');

gulp.task('test', function () {
    return gulp
        .src(['./test/*.js'], {
            read: false
        })
        .pipe(mocha());
});

gulp.task('gitdown', function () {
    return Gitdown
        .readFile(__dirname + '/.README/README.md')
        .writeFile('./README.md');
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*', './test/**/*'], ['default']);
    gulp.watch(['./.gitdown/**/*'], ['gitdown']);
});

gulp.task('default', ['test']);
